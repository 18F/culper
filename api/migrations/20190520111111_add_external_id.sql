
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
ALTER TABLE accounts ADD COLUMN external_id text NOT NULL DEFAULT 'temporarily-unset-external-id';
UPDATE accounts SET external_id = id;
ALTER TABLE accounts ALTER COLUMN external_id DROP DEFAULT;
ALTER TABLE accounts ADD CONSTRAINT external_id_unique UNIQUE (external_id);

-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
ALTER TABLE accounts DROP COLUMN external_id;
ALTER TABLE accounts DROP CONSTRAINT external_id_unique;
-- +goose StatementEnd
