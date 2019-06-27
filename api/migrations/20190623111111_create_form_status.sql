
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
ALTER TABLE accounts ADD COLUMN status text NOT NULL DEFAULT 'INCOMPLETE';
UPDATE accounts SET status = 'SUBMITTED' WHERE locked = true;
ALTER TABLE accounts ALTER COLUMN status DROP DEFAULT;
ALTER TABLE accounts DROP COLUMN locked;
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
ALTER TABLE accounts ADD COLUMN locked bool NOT NULL DEFAULT false;
UPDATE accounts SET locked = true WHERE status = 'SUBMITTED';
ALTER TABLE accounts ALTER COLUMN locked DROP DEFAULT;
ALTER TABLE accounts DROP COLUMN status;
-- +goose StatementEnd
