-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
ALTER TABLE locations ADD COLUMN country_comments text;
-- +goose StatementEnd


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
ALTER TABLE locations DROP COLUMN country_comments;
-- +goose StatementEnd
