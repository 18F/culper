
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin

ALTER TABLE submissions ADD COLUMN hash text;
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
ALTER TABLE submissions DROP COLUMN IF EXISTS hash;
-- +goose StatementEnd
