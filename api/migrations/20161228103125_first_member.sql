-- +goose Env GOLANG_ENV:development GOLANG_ENV:staging
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
INSERT INTO ACCOUNTS (USERNAME, FIRSTNAME, LASTNAME) VALUES ('admin', 'Sudo', 'McSudoson');
INSERT INTO BASIC_AUTH_MEMBERSHIPS (ACCOUNT_ID, PASSWORD_HASH, CREATED) VALUES (LASTVAL(), '$2a$10$s4IjNKAwwWSOJWMYRe5LK.ZRJr8pFRfIXtdJpQrJaYGjTKk/W6Kt6', CURRENT_TIMESTAMP);
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
DELETE FROM BASIC_AUTH_MEMBERSHIPS WHERE ACCOUNT_ID = (SELECT ID FROM ACCOUNTS WHERE USERNAME = 'admin');
DELETE FROM ACCOUNTS WHERE USERNAME = 'admin';
-- +goose StatementEnd
