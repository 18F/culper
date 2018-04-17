
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
CREATE TABLE attachments (
    id          bigserial PRIMARY KEY,
    account_id  bigint NOT NULL REFERENCES accounts(id),
		description text,
		filename    text NOT NULL,
		"size"      bigint NOT NULL,
		raw         bytea
);

CREATE TABLE submission_attachments (
    id           bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    method_id    bigint REFERENCES texts(id)
);

ALTER TABLE submissions ADD COLUMN attachments_id bigint REFERENCES submission_attachments(id);
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
ALTER TABLE submissions DROP COLUMN IF EXISTS attachments_id;
DROP TABLE submission_attachments;
DROP TABLE attachments;
-- +goose StatementEnd
