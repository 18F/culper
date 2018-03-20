
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
ALTER TABLE identification_birth_dates ADD COLUMN confirmed_id bigint REFERENCES checkboxes(id);
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
ALTER TABLE identification_birth_dates DROP COLUMN IF EXISTS confirmed_id;
-- +goose StatementEnd
