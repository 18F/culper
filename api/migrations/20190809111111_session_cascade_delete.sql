
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
ALTER TABLE sessions DROP CONSTRAINT sessions_account_fk;
ALTER TABLE sessions ADD CONSTRAINT sessions_account_fk FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE CASCADE;
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
ALTER TABLE sessions DROP CONSTRAINT sessions_account_fk;
ALTER TABLE sessions ADD CONSTRAINT sessions_account_fk FOREIGN KEY (account_id) REFERENCES accounts (id);
-- +goose StatementEnd
