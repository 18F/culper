
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
CREATE TYPE documenttype AS ENUM ('CER', 'FCR', 'MEL', 'REL');
COMMENT ON TYPE documenttype is 'Document type of attachment: certification, credit release, medical release, general release';

ALTER TABLE attachments ADD COLUMN doc_type documenttype;
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
ALTER TABLE attachments DROP COLUMN IF EXISTS doc_type;
DROP TYPE documenttype;
-- +goose StatementEnd
