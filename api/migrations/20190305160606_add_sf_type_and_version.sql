
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
ALTER TABLE accounts ADD COLUMN form_type TEXT NOT NULL DEFAULT 'SF86';
ALTER TABLE accounts ALTER COLUMN form_type DROP DEFAULT;
ALTER TABLE accounts ADD COLUMN form_version TEXT NOT NULL DEFAULT '2016-11';
ALTER TABLE accounts ALTER COLUMN form_version DROP DEFAULT;
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
ALTER TABLE accounts DROP COLUMN IF EXISTS sf_type;
ALTER TABLE accounts DROP COLUMN IF EXISTS sf_version;
-- +goose StatementEnd
