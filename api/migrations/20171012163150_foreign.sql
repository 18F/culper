
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin

CREATE TABLE foreign_activities_benefits (
    id              bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_benefits_id bigint REFERENCES branches(id),
    list_id         bigint REFERENCES collections(id)
);

CREATE TABLE foreign_activities_directs (
    id               bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_interests_id bigint REFERENCES branches(id),
    list_id          bigint REFERENCES collections(id)
);

CREATE TABLE foreign_activities_indirects (
    id               bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_interests_id bigint REFERENCES branches(id),
    list_id          bigint REFERENCES collections(id)
);

CREATE TABLE foreign_activities_real_estates (
    id               bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_interests_id bigint REFERENCES branches(id),
    list_id          bigint REFERENCES collections(id)
);

CREATE TABLE foreign_activities_supports (
    id                     bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_foreign_support_id bigint REFERENCES branches(id),
    list_id                bigint REFERENCES collections(id)
);

CREATE TABLE foreign_business_advices (
    id                    bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_foreign_advice_id bigint REFERENCES branches(id),
    list_id               bigint REFERENCES collections(id)
);

CREATE TABLE foreign_business_conferences (
    id                         bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_foreign_conferences_id bigint REFERENCES branches(id),
    list_id                    bigint REFERENCES collections(id)
);

CREATE TABLE foreign_business_contacts (
    id                     bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_foreign_contact_id bigint REFERENCES branches(id),
    list_id                bigint REFERENCES collections(id)
);

CREATE TABLE foreign_business_employments (
    id                        bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_foreign_employment_id bigint REFERENCES branches(id),
    list_id                   bigint REFERENCES collections(id)
);

CREATE TABLE foreign_business_families (
    id                    bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_foreign_family_id bigint REFERENCES branches(id),
    list_id               bigint REFERENCES collections(id)
);

CREATE TABLE foreign_business_politicals (
    id                       bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_foreign_political_id bigint REFERENCES branches(id),
    list_id                  bigint REFERENCES collections(id)
);

CREATE TABLE foreign_business_sponsorships (
    id                         bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_foreign_sponsorship_id bigint REFERENCES branches(id),
    list_id                    bigint REFERENCES collections(id)
);

CREATE TABLE foreign_business_ventures (
    id                      bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_foreign_ventures_id bigint REFERENCES branches(id),
    list_id                 bigint REFERENCES collections(id)
);

CREATE TABLE foreign_business_votings (
    id                    bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_foreign_voting_id bigint REFERENCES branches(id),
    list_id               bigint REFERENCES collections(id)
);

CREATE TABLE foreign_contacts (
    id                      bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_foreign_contacts_id bigint REFERENCES branches(id),
    list_id                 bigint REFERENCES collections(id)
);

CREATE TABLE foreign_passports (
    id               bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_passports_id bigint REFERENCES branches(id),
    name_id          bigint REFERENCES names(id),
    card_id          bigint REFERENCES radios(id),
    number_id        bigint REFERENCES texts(id),
    issued_id        bigint REFERENCES date_controls(id),
    expiration_id    bigint REFERENCES date_controls(id),
    comments_id      bigint REFERENCES textareas(id)
);

CREATE TABLE foreign_travels (
    id                             bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_foreign_travel_outside_id  bigint REFERENCES branches(id),
    has_foreign_travel_official_id bigint REFERENCES branches(id),
    list_id                        bigint REFERENCES collections(id)
);
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
DROP TABLE foreign_activities_benefits;
DROP TABLE foreign_activities_directs;
DROP TABLE foreign_activities_indirects;
DROP TABLE foreign_activities_real_estates;
DROP TABLE foreign_activities_supports;
DROP TABLE foreign_business_advices;
DROP TABLE foreign_business_conferences;
DROP TABLE foreign_business_contacts;
DROP TABLE foreign_business_employments;
DROP TABLE foreign_business_families;
DROP TABLE foreign_business_politicals;
DROP TABLE foreign_business_sponsorships;
DROP TABLE foreign_business_ventures;
DROP TABLE foreign_business_votings;
DROP TABLE foreign_contacts;
DROP TABLE foreign_passports;
DROP TABLE foreign_travels;
-- +goose StatementEnd
