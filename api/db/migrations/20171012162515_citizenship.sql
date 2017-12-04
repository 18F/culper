
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin

CREATE TABLE citizenship_multiples (
    id              bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_multiple_id bigint REFERENCES branches(id),
    list_id         bigint REFERENCES collections(id)
);

CREATE TABLE citizenship_passports (
    id           bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    passports_id bigint REFERENCES collections(id)
);

CREATE TABLE citizenship_statuses (
    id                                bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    citizenship_status_id             bigint REFERENCES radios(id),
    abroad_documentation_id           bigint REFERENCES radios(id),
    explanation_id                    bigint REFERENCES textareas(id),
    document_number_id                bigint REFERENCES texts(id),
    document_issued_id                bigint REFERENCES date_controls(id),
    document_name_id                  bigint REFERENCES names(id),
    document_expiration_id            bigint REFERENCES date_controls(id),
    document_type_id                  bigint REFERENCES radios(id),
    place_issued_id                   bigint REFERENCES locations(id),
    certificate_number_id             bigint REFERENCES texts(id),
    certificate_issued_id             bigint REFERENCES date_controls(id),
    certificate_name_id               bigint REFERENCES names(id),
    certificate_court_name_id         bigint REFERENCES texts(id),
    certificate_court_address_id      bigint REFERENCES locations(id),
    born_on_military_installation_id  bigint REFERENCES branches(id),
    military_base_id                  bigint REFERENCES texts(id),
    entry_date_id                     bigint REFERENCES date_controls(id),
    entry_location_id                 bigint REFERENCES locations(id),
    prior_citizenship_id              bigint REFERENCES countries(id),
    has_alien_registration_id         bigint REFERENCES branches(id),
    alien_registration_number_id      bigint REFERENCES texts(id),
    alien_registration_expiration_id  bigint REFERENCES date_controls(id),
    basis_id                          bigint REFERENCES radios(id),
    permanent_resident_card_number_id bigint REFERENCES texts(id),
    residence_status_id               bigint REFERENCES texts(id)
);
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
DROP TABLE citizenship_multiples;
DROP TABLE citizenship_passports;
DROP TABLE citizenship_statuses;
-- +goose StatementEnd
