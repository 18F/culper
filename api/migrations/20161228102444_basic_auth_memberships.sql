
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
CREATE TABLE BASIC_AUTH_MEMBERSHIPS (
    ID              SERIAL       PRIMARY KEY,
    ACCOUNT_ID      INTEGER      REFERENCES ACCOUNTS (ID),
    PASSWORD_HASH   VARCHAR(400),
    CREATED         TIMESTAMP
);
-- +goose StatementEnd


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
DROP TABLE BASIC_AUTH_MEMBERSHIPS;
-- +goose StatementEnd
