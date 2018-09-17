
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
ALTER TABLE identification_contacts DROP COLUMN IF EXISTS emails_id;
ALTER TABLE identification_contacts ADD COLUMN home_email_id bigint REFERENCES emails(id);
ALTER TABLE identification_contacts ADD COLUMN work_email_id bigint REFERENCES emails(id);
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
ALTER TABLE identification_contacts ADD COLUMN emails_id bigint REFERENCES collections(id);
ALTER TABLE identification_contacts DROP COLUMN IF EXISTS home_email_id;
ALTER TABLE identification_contacts DROP COLUMN IF EXISTS work_email_id;
-- +goose StatementEnd
