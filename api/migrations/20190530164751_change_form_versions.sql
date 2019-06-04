
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
UPDATE accounts SET form_version = '2017-07' where form_version = '2016-11';
UPDATE accounts SET form_version = '2017-12-draft7' where form_version = '2017-12_draft7';
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
UPDATE accounts SET form_version = '2016-11' where form_version = '2017-07';
UPDATE accounts SET form_version = '2017-12_draft7' where form_version = '2017-12-draft7';
-- +goose StatementEnd
