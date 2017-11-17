
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin

CREATE TABLE psychological_competences (
    id                bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    is_incompetent_id bigint REFERENCES branches(id),
    list_id           bigint REFERENCES collections(id)
);

CREATE TABLE psychological_consultations (
    id           bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    consulted_id bigint REFERENCES branches(id),
    list_id      bigint REFERENCES collections(id)
);

CREATE TABLE psychological_diagnoses (
    id                 bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    diagnosed_id       bigint REFERENCES branches(id),
    did_not_consult_id bigint REFERENCES branches(id),
    diagnosis_list_id  bigint REFERENCES collections(id),
    in_treatment_id    bigint REFERENCES branches(id),
    treatment_list_id  bigint REFERENCES collections(id)
);

CREATE TABLE psychological_existings (
    id                            bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_condition_id              bigint REFERENCES branches(id),
    received_treatment_id         bigint REFERENCES radios(id),
    explanation_id                bigint REFERENCES textareas(id),
    treatment_list_id             bigint REFERENCES collections(id),
    did_not_follow_id             bigint REFERENCES branches(id),
    did_not_follow_explanation_id bigint REFERENCES textareas(id)
);

CREATE TABLE psychological_hospitalizations (
    id              bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    hospitalized_id bigint REFERENCES branches(id),
    list_id         bigint REFERENCES collections(id)
);
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
DROP TABLE psychological_competences;
DROP TABLE psychological_consultations;
DROP TABLE psychological_diagnoses;
DROP TABLE psychological_existings;
DROP TABLE psychological_hospitalizations;
-- +goose StatementEnd
