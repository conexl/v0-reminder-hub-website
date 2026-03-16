package telegram

import (
	"context"
	"fmt"
	"strings"
	"time"

	"core/internal/database"
	"core/internal/rabbitmq"
	"core/internal/security"
	"core/internal/util"
	"reminder-hub/pkg/logger"
	"reminder-hub/pkg/models"
)

const maxTGUpdates = 50

type Syncer struct {
	db        *database.DB
	rabbit    *rabbitmq.Producer
	encryptor security.Encryptor
	timeout   time.Duration
	log       *logger.CurrentLogger
}

func NewSyncer(db *database.DB, rabbit *rabbitmq.Producer, enc security.Encryptor, timeout time.Duration, log *logger.CurrentLogger) *Syncer {
	return &Syncer{db: db, rabbit: rabbit, encryptor: enc, timeout: timeout, log: log}
}

func (s *Syncer) SyncIntegration(integration *database.MessengerIntegration) error {
	if integration.Platform != "telegram" {
		return nil
	}

	ctx := context.Background()
	ctx = logger.WithRequestID(ctx, integration.ID)

	token, err := s.encryptor.Decrypt(integration.BotTokenEnc)
	if err != nil {
		return fmt.Errorf("decrypt token: %w", err)
	}

	client := NewClient(token, s.timeout)
	if err := client.DeleteWebhook(); err != nil {
		s.log.Warn(ctx, "Delete webhook failed", "error", err)
	}
	var offset *int64
	if integration.LastUpdateID != nil {
		next := *integration.LastUpdateID + 1
		offset = &next
	}

	updates, err := client.GetUpdates(offset, maxTGUpdates)
	if err != nil {
		return fmt.Errorf("get updates: %w", err)
	}

	var lastUpdateID *int64
	var batch *models.RawEmails
	processed := 0

	for _, upd := range updates {
		lastID := upd.UpdateID
		lastUpdateID = &lastID

		msg := upd.Message
		if msg == nil {
			continue
		}

		text := strings.TrimSpace(msg.Text)
		if text == "" {
			text = strings.TrimSpace(msg.Caption)
		}
		if text == "" {
			continue
		}

		messageID := fmt.Sprintf("tg:%d", upd.UpdateID)
		exists, err := s.db.EmailExists(ctx, integration.UserID, messageID)
		if err != nil {
			s.log.Warn(ctx, "Check message exists failed", "error", err, "message_id", messageID)
			continue
		}
		if exists {
			continue
		}

		emailID, err := util.GenerateUUID()
		if err != nil {
			s.log.Warn(ctx, "Generate UUID failed", "error", err)
			continue
		}

		from := formatSender(msg.From)
		subject := buildSubject(msg)
		date := time.Unix(msg.Date, 0).UTC()

		email := &database.EmailRaw{
			ID:           emailID,
			UserID:       integration.UserID,
			MessageID:    messageID,
			FromAddress:  from,
			Subject:      subject,
			BodyText:     text,
			DateReceived: date,
			Processed:    false,
		}
		if err := s.db.SaveEmail(ctx, email); err != nil {
			s.log.Warn(ctx, "Save message failed", "error", err, "message_id", messageID)
			continue
		}

		rabbitMsg := models.RawEmail{
			EmailID:   email.ID,
			UserID:    email.UserID,
			MessageID: email.MessageID,
			From:      email.FromAddress,
			Subject:   email.Subject,
			Text:      email.BodyText,
			Date:      email.DateReceived.Format(time.RFC3339),
			TimeStamp: time.Now().UTC().Format(time.RFC3339),
		}
		if batch == nil {
			batch = &models.RawEmails{}
		}
		batch.RawEmail = append(batch.RawEmail, rabbitMsg)
		processed++

		if len(batch.RawEmail) >= 7 {
			if err := s.rabbit.PublishEmailBatch(batch); err != nil {
				return fmt.Errorf("publish batch: %w", err)
			}
			batch = nil
		}
	}

	if batch != nil && len(batch.RawEmail) > 0 {
		if err := s.rabbit.PublishEmailBatch(batch); err != nil {
			return fmt.Errorf("publish batch: %w", err)
		}
	}

	if err := s.db.UpdateMessengerSync(ctx, integration.ID, lastUpdateID); err != nil {
		return fmt.Errorf("update sync: %w", err)
	}

	s.log.Info(ctx, "Telegram sync done", "processed", processed, "integration_id", integration.ID)
	return nil
}

func formatSender(u *User) string {
	if u == nil {
		return "telegram"
	}
	if u.Username != "" {
		return "@" + u.Username
	}
	name := strings.TrimSpace(strings.TrimSpace(u.FirstName + " " + u.LastName))
	if name != "" {
		return name
	}
	return fmt.Sprintf("user_%d", u.ID)
}

func buildSubject(msg *Message) string {
	if msg == nil || msg.Chat == nil {
		return "Telegram message"
	}
	if msg.Chat.Title != "" {
		return "Telegram: " + msg.Chat.Title
	}
	return "Telegram message"
}
