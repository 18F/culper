
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
ALTER TABLE attachments ADD metadata bytea;
ALTER TABLE attachments ADD body bytea;
ALTER TABLE attachments ALTER COLUMN filename DROP NOT NULL;
ALTER TABLE attachments ALTER COLUMN size DROP NOT NULL;

-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
ALTER TABLE attachments DROP COLUMN metadata;
ALTER TABLE attachments DROP COLUMN body;
-- we would have to do a migration for this to work live.
ALTER TABLE attachments ALTER COLUMN filename SET NOT NULL;
ALTER TABLE attachments ALTER COLUMN size SET NOT NULL;
-- +goose StatementEnd
