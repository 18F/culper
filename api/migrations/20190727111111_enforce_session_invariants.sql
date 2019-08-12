
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
ALTER TABLE sessions ADD CONSTRAINT sessions_account_fk FOREIGN KEY (account_id) REFERENCES accounts (id);
ALTER TABLE sessions ALTER COLUMN account_id SET NOT NULL;
ALTER TABLE sessions ALTER COLUMN expiration_date SET NOT NULL;
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
ALTER TABLE sessions DROP CONSTRAINT sessions_account_fk;
ALTER TABLE sessions ALTER COLUMN account_id SET NULL;
ALTER TABLE sessions ALTER COLUMN expiration_date SET NULL;
-- +goose StatementEnd
