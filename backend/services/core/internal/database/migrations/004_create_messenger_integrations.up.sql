CREATE TABLE IF NOT EXISTS messenger_integrations (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    platform VARCHAR(32) NOT NULL,
    username VARCHAR(128) NOT NULL,
    bot_token TEXT NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'connected',
    analyze_private_chats BOOLEAN NOT NULL DEFAULT TRUE,
    analyze_groups BOOLEAN NOT NULL DEFAULT TRUE,
    auto_create_reminders BOOLEAN NOT NULL DEFAULT TRUE,
    monitored_chats_count INTEGER NOT NULL DEFAULT 0,
    tasks_extracted INTEGER NOT NULL DEFAULT 0,
    last_update_id BIGINT,
    last_sync_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messenger_integrations_user ON messenger_integrations(user_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_messenger_integrations_user_platform ON messenger_integrations(user_id, platform);
