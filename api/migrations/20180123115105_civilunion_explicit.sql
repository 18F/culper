
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin

DROP TABLE civil_unions;
CREATE TABLE civil_unions (
    id                                  bigserial PRIMARY KEY,
    account_id                          bigint    REFERENCES accounts(id) NOT NULL,
    address_id                          bigint    REFERENCES locations(id),
    address_separated_id                bigint    REFERENCES locations(id),
    address_separated_not_applicable_id bigint    REFERENCES not_applicables(id),
    birth_place_id                      bigint    REFERENCES locations(id),
    birthdate_id                        bigint    REFERENCES date_controls(id),
    citizenship_id                      bigint    REFERENCES countries(id),
    date_separated_id                   bigint    REFERENCES date_controls(id),
    divorced_id                         bigint    REFERENCES branches(id),
    email_id                            bigint    REFERENCES emails(id),
    entered_civil_union_id              bigint    REFERENCES date_controls(id),
    foreign_born_document_id            bigint    REFERENCES foreign_born_documents(id),
    name_id                             bigint    REFERENCES names(id),
    other_names_id                      bigint    REFERENCES collections(id),
    ssnid                               bigint    REFERENCES ssns(id),
    separated_id                        bigint    REFERENCES branches(id),
    telephone_id                        bigint    REFERENCES telephones(id)
);

-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
DROP TABLE civil_unions;
-- +goose StatementEnd
