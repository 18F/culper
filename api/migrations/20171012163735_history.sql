
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin

CREATE TABLE history_educations (
    id              bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_attended_id bigint REFERENCES branches(id),
    has_degree10_id bigint REFERENCES branches(id),
    list_id         bigint REFERENCES collections(id)
);

CREATE TABLE history_employments (
    id      bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    list_id bigint REFERENCES collections(id)
);

CREATE TABLE history_federals (
    id                     bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_federal_service_id bigint REFERENCES branches(id),
    list_id                bigint REFERENCES collections(id)
);

CREATE TABLE history_residences (
    id      bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    list_id bigint REFERENCES collections(id)
);
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
DROP TABLE history_educations;
DROP TABLE history_employments;
DROP TABLE history_federals;
DROP TABLE history_residences;
-- +goose StatementEnd
