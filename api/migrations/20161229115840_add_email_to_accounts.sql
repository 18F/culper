
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
ALTER TABLE ACCOUNTS ADD COLUMN EMAIL VARCHAR(255);
-- +goose StatementEnd


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
ALTER TABLE ACCOUNTS DROP COLUMN IF EXISTS EMAIL;
-- +goose StatementEnd
