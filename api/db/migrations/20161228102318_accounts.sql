
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
CREATE TABLE ACCOUNTS (
    ID            SERIAL       PRIMARY KEY,
    USERNAME      VARCHAR(200),
    FIRSTNAME     VARCHAR(200),
    LASTNAME      VARCHAR(200),
    UNIQUE (USERNAME)
);
-- +goose StatementEnd


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
DROP TABLE ACCOUNTS;
-- +goose StatementEnd
