package telegram

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strconv"
	"time"
)

type Client struct {
	baseURL    string
	httpClient *http.Client
}

func NewClient(token string, timeout time.Duration) *Client {
	return &Client{
		baseURL: "https://api.telegram.org/bot" + token,
		httpClient: &http.Client{
			Timeout: timeout,
		},
	}
}

type UpdatesResponse struct {
	Ok     bool     `json:"ok"`
	Result []Update `json:"result"`
}

type Update struct {
	UpdateID int64    `json:"update_id"`
	Message  *Message `json:"message,omitempty"`
}

type Message struct {
	MessageID int64  `json:"message_id"`
	Date      int64  `json:"date"`
	Text      string `json:"text,omitempty"`
	Caption   string `json:"caption,omitempty"`
	From      *User  `json:"from,omitempty"`
	Chat      *Chat  `json:"chat,omitempty"`
}

type User struct {
	ID        int64  `json:"id"`
	Username  string `json:"username,omitempty"`
	FirstName string `json:"first_name,omitempty"`
	LastName  string `json:"last_name,omitempty"`
}

type Chat struct {
	ID    int64  `json:"id"`
	Type  string `json:"type"`
	Title string `json:"title,omitempty"`
}

type MeResponse struct {
	Ok     bool `json:"ok"`
	Result User `json:"result"`
}

type WebhookResponse struct {
	Ok          bool   `json:"ok"`
	Description string `json:"description,omitempty"`
}

func (c *Client) DeleteWebhook() error {
	u := c.baseURL + "/deleteWebhook"
	req, err := http.NewRequest(http.MethodGet, u, nil)
	if err != nil {
		return err
	}

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("telegram api status %d", resp.StatusCode)
	}

	var data WebhookResponse
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return err
	}
	if !data.Ok {
		return fmt.Errorf("telegram api returned not ok")
	}
	return nil
}

func (c *Client) GetUpdates(offset *int64, limit int) ([]Update, error) {
	u, err := url.Parse(c.baseURL + "/getUpdates")
	if err != nil {
		return nil, err
	}

	q := u.Query()
	if offset != nil {
		q.Set("offset", strconv.FormatInt(*offset, 10))
	}
	if limit > 0 {
		q.Set("limit", strconv.Itoa(limit))
	}
	q.Set("timeout", "0")
	u.RawQuery = q.Encode()

	req, err := http.NewRequest(http.MethodGet, u.String(), nil)
	if err != nil {
		return nil, err
	}

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("telegram api status %d", resp.StatusCode)
	}

	var data UpdatesResponse
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return nil, err
	}
	if !data.Ok {
		return nil, fmt.Errorf("telegram api returned not ok")
	}
	return data.Result, nil
}

func (c *Client) GetMe() (string, error) {
	u := c.baseURL + "/getMe"
	req, err := http.NewRequest(http.MethodGet, u, nil)
	if err != nil {
		return "", err
	}

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("telegram api status %d", resp.StatusCode)
	}

	var data MeResponse
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return "", err
	}
	if !data.Ok {
		return "", fmt.Errorf("telegram api returned not ok")
	}
	if data.Result.Username == "" {
		return "telegram_bot", nil
	}
	return "@" + data.Result.Username, nil
}
