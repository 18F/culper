
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
ALTER TABLE civil_unions ADD COLUMN email_not_applicable_id bigint REFERENCES not_applicables(id);
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
ALTER TABLE civil_unions DROP COLUMN IF EXISTS email_not_applicable_id;
-- +goose StatementEnd
