-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
ALTER TABLE locations ADD COLUMN country_comments text;


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
ALTER TABLE locations DROP COLUMN country_comments;
