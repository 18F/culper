
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin

CREATE TABLE relationships_cohabitants (
    id                 bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_cohabitant_id  bigint REFERENCES branches(id),
    cohabitant_list_id bigint REFERENCES collections(id)
);

CREATE TABLE relationships_maritals (
    id               bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    status_id        bigint REFERENCES radios(id),
    civil_union_id   bigint,
    divorced_list_id bigint REFERENCES collections(id)
);

CREATE TABLE relationships_peoples (
    id      bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    list_id bigint REFERENCES collections(id)
);

CREATE TABLE relationships_relatives (
    id      bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    list_id bigint REFERENCES collections(id)
);
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
DROP TABLE relationships_cohabitants;
DROP TABLE relationships_maritals;
DROP TABLE relationships_peoples;
DROP TABLE relationships_relatives;
-- +goose StatementEnd
