-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
CREATE TABLE transmissions (
    id          bigserial PRIMARY KEY,
    account_id  bigint    NOT NULL REFERENCES accounts(id),
    raw         bytea,
    request_key text,
    agency_key  integer,
    status      text,
    created     timestamp,
    modified    timestamp
);
-- +goose StatementEnd


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
DROP TABLE transmissions;
-- +goose StatementEnd
