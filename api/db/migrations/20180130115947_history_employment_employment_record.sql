
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
ALTER TABLE history_employments ADD COLUMN employment_record_id BIGINT REFERENCES branches(id);
ALTER TABLE date_controls DROP COLUMN date;


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
ALTER TABLE history_employments DROP COLUMN employment_record_id;
ALTER TABLE date_controls ADD COLUMN date timestamp with time zone;
