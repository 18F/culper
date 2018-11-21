-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
ALTER TABLE civil_unions ADD COLUMN alternate_address_id bigint REFERENCES physical_addresses(id);
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
ALTER TABLE civil_unions DROP COLUMN IF EXISTS alternate_address_id;
-- +goose StatementEnd
