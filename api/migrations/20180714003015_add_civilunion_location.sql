
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
ALTER TABLE civil_unions ADD COLUMN location_id bigint REFERENCES locations(id);
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
ALTER TABLE civil_unions DROP COLUMN IF EXISTS location_id;
-- +goose StatementEnd
