
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
CREATE TABLE sessions(
    session_key     text PRIMARY KEY,
    account_id      integer UNIQUE,
    expiration_date timestamp
);

-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
DROP TABLE sessions;
-- +goose StatementEnd
