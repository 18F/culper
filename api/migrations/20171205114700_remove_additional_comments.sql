
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
ALTER TABLE submission_additional_comments DROP COLUMN IF EXISTS additional_comments_id;
-- +goose StatementEnd


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
ALTER TABLE submission_additional_comments ADD COLUMN (
    additional_comments_id bigint REFERENCES textareas(id)
);
-- +goose StatementEnd
