
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
ALTER TABLE military_selectives ADD COLUMN has_registered_not_applicable_id bigint REFERENCES not_applicables(id);
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
ALTER TABLE military_selectives DROP COLUMN IF EXISTS has_registered_not_applicable_id;
-- +goose StatementEnd
