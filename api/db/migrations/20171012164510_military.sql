
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin

CREATE TABLE military_disciplinaries (
    id                  bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_disciplinary_id bigint REFERENCES branches(id),
    list_id             bigint REFERENCES collections(id)
);

CREATE TABLE military_foreigns (
    id      bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    list_id bigint REFERENCES collections(id)
);

CREATE TABLE military_histories (
    id            bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_served_id bigint REFERENCES branches(id),
    list_id       bigint REFERENCES collections(id)
);

CREATE TABLE military_selectives (
    id                     bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    was_born_after_id      bigint REFERENCES branches(id),
    has_registered_id      bigint REFERENCES branches(id),
    registration_number_id bigint REFERENCES texts(id),
    explanation_id         bigint REFERENCES textareas(id)
);
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
DROP TABLE military_disciplinaries;
DROP TABLE military_foreigns;
DROP TABLE military_histories;
DROP TABLE military_selectives;
-- +goose StatementEnd
