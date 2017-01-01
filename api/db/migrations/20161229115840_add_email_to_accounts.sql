
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
ALTER TABLE ACCOUNTS ADD COLUMN EMAIL VARCHAR(255);


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
ALTER TABLE ACCOUNTS DROP COLUMN IF EXISTS EMAIL;
