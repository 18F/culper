
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
ALTER TABLE ACCOUNTS ADD COLUMN TOKEN VARCHAR(16);
ALTER TABLE ACCOUNTS ADD COLUMN TOKEN_USED BOOLEAN;
-- +goose StatementEnd


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
ALTER TABLE ACCOUNTS DROP COLUMN IF EXISTS TOKEN;
ALTER TABLE ACCOUNTS DROP COLUMN IF EXISTS TOKEN_USED;
-- +goose StatementEnd
