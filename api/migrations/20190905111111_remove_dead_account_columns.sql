
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
ALTER TABLE accounts DROP COLUMN firstname;
ALTER TABLE accounts DROP COLUMN lastname;
ALTER TABLE accounts DROP COLUMN token;
ALTER TABLE accounts DROP COLUMN token_used;

-- +goose StatementEnd


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
ALTER TABLE accounts ADD COLUMN (
    firstname character varying(200)
    lastname character varying(200)
    token character varying(16)
    token_used boolean
);
-- +goose StatementEnd
