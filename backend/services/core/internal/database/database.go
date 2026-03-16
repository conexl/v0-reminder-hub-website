package database

import (
	"context"
	"database/sql"

	"github.com/lib/pq"
	_ "github.com/lib/pq"
)

type DB struct {
	*sql.DB
}

type DBer interface {
	CreateIntegration(ctx context.Context, integration *EmailIntegration) error
	GetUserIntegrations(ctx context.Context, userID string) ([]EmailIntegration, error)
	DeleteIntegration(ctx context.Context, userID, integrationID string) error
	CreateMessengerIntegration(ctx context.Context, integration *MessengerIntegration, tokenEnc string) error
	GetMessengerIntegrations(ctx context.Context, userID string) ([]MessengerIntegration, error)
	DeleteMessengerIntegration(ctx context.Context, userID, integrationID string) error
	GetMessengerIntegrationsForSync(ctx context.Context, limit int) ([]MessengerIntegration, error)
	UpdateMessengerSync(ctx context.Context, integrationID string, lastUpdateID *int64) error
	GetIntegrationsForSync(ctx context.Context, limit int) ([]EmailIntegration, error)
	UpdateLastSync(ctx context.Context, integrationID string) error
	EmailExists(ctx context.Context, userID, messageID string) (bool, error)
	SaveEmail(ctx context.Context, email *EmailRaw) error
}

func NewDB(url string) (*DB, error) {
	db, err := sql.Open("postgres", url)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}

	return &DB{db}, nil
}

func (db *DB) CreateIntegration(ctx context.Context, integration *EmailIntegration) error {
	query := `INSERT INTO email_integrations (id, user_id, email_address, imap_host, imap_port, use_ssl, password, created_at, updated_at)
              VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())`
	_, err := db.ExecContext(ctx, query,
		integration.ID, integration.UserID, integration.EmailAddress,
		integration.ImapHost, integration.ImapPort, integration.UseSSL, integration.Password)
	return err
}

func (db *DB) GetUserIntegrations(ctx context.Context, userID string) ([]EmailIntegration, error) {
	query := `SELECT id, user_id, email_address, imap_host, imap_port, use_ssl, created_at, updated_at, last_sync_at
              FROM email_integrations WHERE user_id = $1`
	rows, err := db.QueryContext(ctx, query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var integrations []EmailIntegration
	for rows.Next() {
		var integration EmailIntegration
		err := rows.Scan(&integration.ID, &integration.UserID, &integration.EmailAddress,
			&integration.ImapHost, &integration.ImapPort, &integration.UseSSL,
			&integration.CreatedAt, &integration.UpdatedAt, &integration.LastSyncAt)
		if err != nil {
			return nil, err
		}
		integrations = append(integrations, integration)
	}
	return integrations, nil
}

func (db *DB) DeleteIntegration(ctx context.Context, userID, integrationID string) error {
	query := `DELETE FROM email_integrations WHERE user_id = $1 AND id = $2`
	result, err := db.ExecContext(ctx, query, userID, integrationID)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return ErrIntegrationNotFound
	}

	return nil
}

func (db *DB) CreateMessengerIntegration(ctx context.Context, integration *MessengerIntegration, tokenEnc string) error {
	query := `INSERT INTO messenger_integrations (id, user_id, platform, username, bot_token, status, analyze_private_chats, analyze_groups, auto_create_reminders, created_at, updated_at)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())`
	_, err := db.ExecContext(ctx, query,
		integration.ID, integration.UserID, integration.Platform, integration.Username, tokenEnc, integration.Status,
		integration.Settings.AnalyzePrivateChats, integration.Settings.AnalyzeGroups, integration.Settings.AutoCreateReminders)
	if err != nil {
		if pqErr, ok := err.(*pq.Error); ok && pqErr.Code == "23505" {
			return ErrDuplicateIntegration
		}
		return err
	}
	return nil
}

func (db *DB) GetMessengerIntegrations(ctx context.Context, userID string) ([]MessengerIntegration, error) {
	query := `SELECT id, user_id, platform, username, status, monitored_chats_count, tasks_extracted,
                     analyze_private_chats, analyze_groups, auto_create_reminders, created_at, updated_at, last_update_id, last_sync_at
              FROM messenger_integrations WHERE user_id = $1 ORDER BY created_at DESC`
	rows, err := db.QueryContext(ctx, query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var integrations []MessengerIntegration
	for rows.Next() {
		var integration MessengerIntegration
		err := rows.Scan(&integration.ID, &integration.UserID, &integration.Platform, &integration.Username,
			&integration.Status, &integration.MonitoredChatsCount, &integration.TasksExtracted,
			&integration.Settings.AnalyzePrivateChats, &integration.Settings.AnalyzeGroups, &integration.Settings.AutoCreateReminders,
			&integration.CreatedAt, &integration.UpdatedAt, &integration.LastUpdateID, &integration.LastSyncAt)
		if err != nil {
			return nil, err
		}
		integrations = append(integrations, integration)
	}
	return integrations, nil
}

func (db *DB) DeleteMessengerIntegration(ctx context.Context, userID, integrationID string) error {
	query := `DELETE FROM messenger_integrations WHERE user_id = $1 AND id = $2`
	result, err := db.ExecContext(ctx, query, userID, integrationID)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return ErrIntegrationNotFound
	}

	return nil
}

func (db *DB) GetMessengerIntegrationsForSync(ctx context.Context, limit int) ([]MessengerIntegration, error) {
	query := `SELECT id, user_id, platform, username, status, monitored_chats_count, tasks_extracted,
                     analyze_private_chats, analyze_groups, auto_create_reminders, created_at, updated_at, last_update_id, last_sync_at, bot_token
              FROM messenger_integrations
              ORDER BY last_sync_at ASC NULLS FIRST
              LIMIT $1`
	rows, err := db.QueryContext(ctx, query, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var integrations []MessengerIntegration
	for rows.Next() {
		var integration MessengerIntegration
		var botTokenEnc string
		err := rows.Scan(&integration.ID, &integration.UserID, &integration.Platform, &integration.Username,
			&integration.Status, &integration.MonitoredChatsCount, &integration.TasksExtracted,
			&integration.Settings.AnalyzePrivateChats, &integration.Settings.AnalyzeGroups, &integration.Settings.AutoCreateReminders,
			&integration.CreatedAt, &integration.UpdatedAt, &integration.LastUpdateID, &integration.LastSyncAt, &botTokenEnc)
		if err != nil {
			return nil, err
		}
		integration.BotTokenEnc = botTokenEnc
		integrations = append(integrations, integration)
	}
	return integrations, nil
}

func (db *DB) UpdateMessengerSync(ctx context.Context, integrationID string, lastUpdateID *int64) error {
	query := `UPDATE messenger_integrations SET last_sync_at = NOW(), updated_at = NOW(), last_update_id = COALESCE($2, last_update_id) WHERE id = $1`
	_, err := db.ExecContext(ctx, query, integrationID, lastUpdateID)
	return err
}

func (db *DB) GetIntegrationsForSync(ctx context.Context, limit int) ([]EmailIntegration, error) {
	query := `SELECT id, user_id, email_address, imap_host, imap_port, use_ssl, password, last_sync_at
              FROM email_integrations
              ORDER BY last_sync_at ASC NULLS FIRST
              LIMIT $1`
	rows, err := db.QueryContext(ctx, query, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var integrations []EmailIntegration
	for rows.Next() {
		var integration EmailIntegration
		err := rows.Scan(&integration.ID, &integration.UserID, &integration.EmailAddress,
			&integration.ImapHost, &integration.ImapPort, &integration.UseSSL,
			&integration.Password, &integration.LastSyncAt)
		if err != nil {
			return nil, err
		}
		integrations = append(integrations, integration)
	}
	return integrations, nil
}

func (db *DB) UpdateLastSync(ctx context.Context, integrationID string) error {
	query := `UPDATE email_integrations SET last_sync_at = NOW(), updated_at = NOW() WHERE id = $1`
	_, err := db.ExecContext(ctx, query, integrationID)
	return err
}

func (db *DB) EmailExists(ctx context.Context, userID, messageID string) (bool, error) {
	var exists bool
	query := `SELECT EXISTS(SELECT 1 FROM emails_raw WHERE user_id = $1 AND message_id = $2)`
	err := db.QueryRowContext(ctx, query, userID, messageID).Scan(&exists)
	return exists, err
}

func (db *DB) SaveEmail(ctx context.Context, email *EmailRaw) error {
	query := `INSERT INTO emails_raw (id, user_id, message_id, from_address, subject, body_text, date_received, processed, created_at)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())`
	_, err := db.ExecContext(ctx, query,
		email.ID, email.UserID, email.MessageID, email.FromAddress,
		email.Subject, email.BodyText, email.DateReceived, email.Processed)
	return err
}
