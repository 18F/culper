-- +goose Env GOLANG_ENV:development GOLANG_ENV:staging
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
INSERT INTO ACCOUNTS (ID, USERNAME, FIRSTNAME, LASTNAME, TOKEN) VALUES (DEFAULT, 'spec01', 'Spec', 'Account', '');
INSERT INTO BASIC_AUTH_MEMBERSHIPS (ACCOUNT_ID, PASSWORD_HASH, CREATED) VALUES ((SELECT ID FROM ACCOUNTS WHERE USERNAME = 'spec01'), '$2a$10$NOHK.2LsTVVxjNDzo6Dqd.l/c9vEYNH.JmdxjnxjvDN9Q4XzRx4QG', CURRENT_TIMESTAMP);
-- +goose StatementEnd


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
DELETE FROM BASIC_AUTH_MEMBERSHIPS WHERE ACCOUNT_ID = (SELECT ID FROM ACCOUNTS WHERE USERNAME LIKE 'spec%');
DELETE FROM ACCOUNTS WHERE USERNAME LIKE 'spec%';
-- +goose StatementEnd
