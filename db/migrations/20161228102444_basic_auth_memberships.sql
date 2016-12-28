
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE BASIC_AUTH_MEMBERSHIPS (
    ID              SERIAL       PRIMARY KEY,
    ACCOUNT_ID      INTEGER      REFERENCES ACCOUNTS (ID),
    PASSWORD_HASH   VARCHAR(400),
    CREATED         TIMESTAMP
);


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE BASIC_AUTH_MEMBERSHIPS;
