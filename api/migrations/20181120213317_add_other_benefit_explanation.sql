
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
ALTER TABLE benefits ADD COLUMN other_frequency_type_explanation_id bigint REFERENCES textareas(id);
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
ALTER TABLE benefits DROP COLUMN IF EXISTS other_frequency_type_explanation_id;
-- +goose StatementEnd
