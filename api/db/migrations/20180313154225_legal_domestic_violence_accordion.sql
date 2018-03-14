
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
ALTER TABLE legal_police_domestic_violences ADD COLUMN has_domestic_violence_id bigint REFERENCES branches(id);
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
ALTER TABLE legal_police_domestic_violences DROP COLUMN IF EXISTS has_domestic_violence_id;
-- +goose StatementEnd
