
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin

CREATE TABLE identification_birth_dates (
    id      bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    date_id bigint REFERENCES date_controls(id)
);

CREATE TABLE identification_birth_places (
    id          bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    location_id bigint REFERENCES locations(id)
);

CREATE TABLE identification_contacts (
    id               bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    emails_id        bigint REFERENCES collections(id),
    phone_numbers_id bigint REFERENCES collections(id)
);

CREATE TABLE identification_names (
    id      bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    name_id bigint REFERENCES names(id)
);

CREATE TABLE identification_other_names (
    id                 bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_other_names_id bigint REFERENCES branches(id),
    list_id            bigint REFERENCES collections(id)
);

CREATE TABLE identification_physicals (
    id            bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    comments_id   bigint REFERENCES textareas(id),
    eye_color_id  bigint REFERENCES texts(id),
    hair_color_id bigint REFERENCES texts(id),
    sex_id        bigint REFERENCES texts(id),
    height_id     bigint REFERENCES heights(id),
    weight_id     bigint REFERENCES numbers(id)
);

CREATE TABLE identification_ssns (
    id       bigint NOT NULL PRIMARY KEY REFERENCES accounts(id),
    verified boolean,
    ssnid    bigint REFERENCES ssns(id)
);
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
DROP TABLE identification_birth_dates;
DROP TABLE identification_birth_places;
DROP TABLE identification_contacts;
DROP TABLE identification_names;
DROP TABLE identification_other_names;
DROP TABLE identification_physicals;
DROP TABLE identification_ssns;
-- +goose StatementEnd
