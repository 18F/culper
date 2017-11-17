
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin

CREATE TABLE branches (
    id    bigserial PRIMARY KEY,
    value text
);

CREATE TABLE checkbox_groups (
    id       bigserial PRIMARY KEY,
    "values" jsonb
);

CREATE TABLE checkboxes (
    id      bigserial PRIMARY KEY,
    value   text,
    checked boolean
);

CREATE TABLE civil_unions (
    id         bigserial PRIMARY KEY,
    account_id bigint NOT NULL REFERENCES accounts(id),
    name       text NOT NULL,
    "table"    text,
    item_id    bigint
);

CREATE TABLE collections (
    id         bigserial PRIMARY KEY,
    account_id bigint NOT NULL REFERENCES accounts(id),
    branch_id  bigint REFERENCES branches(id)
);

CREATE TABLE collection_items (
    id      bigint NOT NULL REFERENCES collections(id),
    index   bigint NOT NULL,
    name    text NOT NULL,
    type    text,
    item_id bigint
);
ALTER TABLE ONLY collection_items
    ADD CONSTRAINT collection_items_pkey PRIMARY KEY (id, index, name);

CREATE TABLE contacts (
    id         bigserial PRIMARY KEY,
    account_id bigint REFERENCES accounts(id),
    list_id    bigint REFERENCES collections(id)
);

CREATE TABLE countries (
    id       bigserial PRIMARY KEY,
    value    text[],
    comments text
);

CREATE TABLE date_controls (
    id        bigserial PRIMARY KEY,
    month     text,
    day       text,
    year      text,
    estimated boolean,
    date      timestamp with time zone
);

CREATE TABLE date_ranges (
    present    boolean,
    id         bigserial PRIMARY KEY,
    account_id bigint    REFERENCES accounts(id),
    from_id    bigint    REFERENCES date_controls(id),
    to_id      bigint    REFERENCES date_controls(id)
);

CREATE TABLE emails (
    id    bigserial PRIMARY KEY,
    value text
);

CREATE TABLE employment_activities (
    id                bigserial PRIMARY KEY,
    value             text,
    other_explanation text
);

CREATE TABLE heights (
    id     bigserial PRIMARY KEY,
    feet   bigint,
    inches bigint
);

CREATE TABLE locations (
    id       bigserial PRIMARY KEY,
    layout   text,
    street1  text,
    street2  text,
    city     text,
    state    text,
    zipcode  text,
    county   text,
    country  text,
    validated boolean
);

CREATE TABLE names (
    id                  bigserial PRIMARY KEY,
    first               text,
    first_initial_only  boolean,
    middle              text,
    middle_initial_only boolean,
    no_middle_name      boolean,
    last                text,
    last_initial_only   boolean,
    suffix              text,
    suffix_other        text
);

CREATE TABLE not_applicables (
    id         bigserial PRIMARY KEY,
    applicable boolean
);

CREATE TABLE numbers (
    id    bigserial PRIMARY KEY,
    value text
);

CREATE TABLE radios (
    id      bigserial PRIMARY KEY,
    value   text,
    checked boolean
);

CREATE TABLE ssns (
    id             bigserial PRIMARY KEY,
    first          text,
    middle         text,
    last           text,
    not_applicable boolean
);

CREATE TABLE telephones (
    id          bigserial PRIMARY KEY,
    time_of_day text,
    type        text,
    number_type text,
    number      text,
    extension   text,
    no_number   boolean
);

CREATE TABLE textareas (
    id    bigserial PRIMARY KEY,
    value text
);

CREATE TABLE texts (
    id    bigserial PRIMARY KEY,
    value text
);

CREATE TABLE treatments (
    id         bigserial PRIMARY KEY,
    name_id    bigint    REFERENCES texts(id),
    phone_id   bigint    REFERENCES telephones(id),
    address_id bigint    REFERENCES locations(id)
);

CREATE TABLE benefits (
    id                       bigserial PRIMARY KEY,
    account_id               bigint    REFERENCES accounts(id),
    begin_id                 bigint    REFERENCES date_controls(id),
    end_id                   bigint    REFERENCES date_controls(id),
    frequency_id             bigint    REFERENCES radios(id),
    other_frequency_id       bigint    REFERENCES textareas(id),
    received_id              bigint    REFERENCES date_controls(id),
    country_id               bigint    REFERENCES countries(id),
    value_id                 bigint    REFERENCES numbers(id),
    value_estimated_id       bigint    REFERENCES checkboxes(id),
    reason_id                bigint    REFERENCES textareas(id),
    obligated_id             bigint    REFERENCES branches(id),
    obligated_explanation_id bigint    REFERENCES textareas(id)
);

CREATE TABLE clearance_levels (
    id             bigserial PRIMARY KEY,
    account_id     bigint    REFERENCES accounts(id),
    level_id       bigint    REFERENCES radios(id),
    explanation_id bigint    REFERENCES textareas(id)
);

CREATE TABLE co_owners (
    id         bigserial PRIMARY KEY,
    account_id bigint    REFERENCES accounts(id),
    list_id    bigint    REFERENCES collections(id)
);

CREATE TABLE foreign_born_documents (
    id                                    bigserial PRIMARY KEY,
    account_id                            bigint    REFERENCES accounts(id),
    document_type_id                      bigint    REFERENCES radios(id),
    other_explanation_id                  bigint    REFERENCES textareas(id),
    document_number_id                    bigint    REFERENCES texts(id),
    document_expiration_id                bigint    REFERENCES date_controls(id),
    document_expiration_not_applicable_id bigint    REFERENCES not_applicables(id)
);

CREATE TABLE physical_addresses (
    id                       bigserial PRIMARY KEY,
    account_id               bigint    REFERENCES accounts(id),
    has_different_address_id bigint    REFERENCES branches(id),
    address_id               bigint    REFERENCES locations(id),
    telephone_id             bigint    REFERENCES telephones(id)
);

CREATE TABLE reason_lefts (
    id                    bigserial PRIMARY KEY,
    account_id            bigint    REFERENCES accounts(id),
    comments_id           bigint    REFERENCES textareas(id),
    reasons_id            bigint    REFERENCES collections(id),
    reason_description_id bigint    REFERENCES textareas(id)
);

CREATE TABLE "references" (
    id                      bigserial PRIMARY KEY,
    account_id              bigint    REFERENCES accounts(id),
    full_name_id            bigint    REFERENCES names(id),
    last_contact_id         bigint    REFERENCES date_controls(id),
    relationship_id         bigint    REFERENCES checkbox_groups(id),
    relationship_other_id   bigint    REFERENCES texts(id),
    phone_id                bigint    REFERENCES telephones(id),
    email_id                bigint    REFERENCES emails(id),
    email_not_applicable_id bigint    REFERENCES not_applicables(id),
    address_id              bigint    REFERENCES locations(id)
);

CREATE TABLE sentences (
    id                       bigserial PRIMARY KEY,
    account_id               bigint    REFERENCES accounts(id),
    description_id           bigint    REFERENCES textareas(id),
    exceeds_year_id          bigint    REFERENCES branches(id),
    incarcerated_id          bigint    REFERENCES branches(id),
    incarceration_dates_id   bigint    REFERENCES date_ranges(id),
    incarceration_dates_naid bigint    REFERENCES not_applicables(id),
    probation_dates_id       bigint    REFERENCES date_ranges(id),
    probation_dates_naid     bigint    REFERENCES not_applicables(id)
);

CREATE TABLE supervisors (
    id                      bigserial PRIMARY KEY,
    account_id              bigint    REFERENCES accounts(id),
    supervisor_name_id      bigint    REFERENCES texts(id),
    title_id                bigint    REFERENCES texts(id),
    email_id                bigint    REFERENCES emails(id),
    email_not_applicable_id bigint    REFERENCES not_applicables(id),
    address_id              bigint    REFERENCES locations(id),
    telephone_id            bigint    REFERENCES telephones(id)
);
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
DROP TABLE supervisors;
DROP TABLE sentences;
DROP TABLE "references";
DROP TABLE reason_lefts;
DROP TABLE physical_addresses;
DROP TABLE foreign_born_documents;
DROP TABLE co_owners;
DROP TABLE clearance_levels;
DROP TABLE benefits;
DROP TABLE treatments;
DROP TABLE texts;
DROP TABLE textareas;
DROP TABLE telephones;
DROP TABLE ssns;
DROP TABLE radios;
DROP TABLE numbers;
DROP TABLE not_applicables;
DROP TABLE names;
DROP TABLE locations;
DROP TABLE heights;
DROP TABLE employment_activities;
DROP TABLE emails;
DROP TABLE date_ranges;
DROP TABLE date_controls;
DROP TABLE countries;
DROP TABLE contacts;
DROP TABLE collection_items;
DROP TABLE collections;
DROP TABLE civil_unions;
DROP TABLE checkboxes;
DROP TABLE checkbox_groups;
DROP TABLE branches;
-- +goose StatementEnd
