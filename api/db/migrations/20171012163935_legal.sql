
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin

CREATE TABLE legal_associations_activities_to_overthrows (
    id                bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_activities_id bigint REFERENCES branches(id),
    list_id           bigint REFERENCES collections(id)
);

CREATE TABLE legal_associations_advocatings (
    id               bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_advocated_id bigint REFERENCES branches(id),
    list_id          bigint REFERENCES collections(id)
);

CREATE TABLE legal_associations_engaged_in_terrorisms (
    id             bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_engaged_id bigint REFERENCES branches(id),
    list_id        bigint REFERENCES collections(id)
);

CREATE TABLE legal_associations_membership_overthrows (
    id               bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_overthrow_id bigint REFERENCES branches(id),
    list_id          bigint REFERENCES collections(id)
);

CREATE TABLE legal_associations_membership_violences (
    id              bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_violence_id bigint REFERENCES branches(id),
    list_id         bigint REFERENCES collections(id)
);

CREATE TABLE legal_associations_terrorism_associations (
    id               bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_terrorism_id bigint REFERENCES branches(id),
    explanation_id   bigint REFERENCES textareas(id)
);

CREATE TABLE legal_associations_terrorist_organizations (
    id               bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_terrorist_id bigint REFERENCES branches(id),
    list_id          bigint REFERENCES collections(id)
);

CREATE TABLE legal_courts (
    id                   bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_court_actions_id bigint REFERENCES branches(id),
    list_id              bigint REFERENCES collections(id)
);

CREATE TABLE legal_investigations_debarreds (
    id               bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_debarment_id bigint REFERENCES branches(id),
    list_id          bigint REFERENCES collections(id)
);

CREATE TABLE legal_investigations_histories (
    id             bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_history_id bigint REFERENCES branches(id),
    list_id        bigint REFERENCES collections(id)
);

CREATE TABLE legal_investigations_revokeds (
    id                 bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_revocations_id bigint REFERENCES branches(id),
    list_id            bigint REFERENCES collections(id)
);

CREATE TABLE legal_police_additional_offenses (
    id                    bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_other_offenses_id bigint REFERENCES branches(id),
    list_id               bigint REFERENCES collections(id)
);

CREATE TABLE legal_police_domestic_violences (
    id      bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    list_id bigint REFERENCES collections(id)
);

CREATE TABLE legal_police_offenses (
    id              bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_offenses_id bigint REFERENCES branches(id),
    list_id         bigint REFERENCES collections(id)
);

CREATE TABLE legal_technology_manipulatings (
    id                  bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_manipulating_id bigint REFERENCES branches(id),
    list_id             bigint REFERENCES collections(id)
);

CREATE TABLE legal_technology_unauthorizeds (
    id                  bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_unauthorized_id bigint REFERENCES branches(id),
    list_id             bigint REFERENCES collections(id)
);

CREATE TABLE legal_technology_unlawfuls (
    id              bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_unlawful_id bigint REFERENCES branches(id),
    list_id         bigint REFERENCES collections(id)
);
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
DROP TABLE legal_associations_activities_to_overthrows;
DROP TABLE legal_associations_advocatings;
DROP TABLE legal_associations_engaged_in_terrorisms;
DROP TABLE legal_associations_membership_overthrows;
DROP TABLE legal_associations_membership_violences;
DROP TABLE legal_associations_terrorism_associations;
DROP TABLE legal_associations_terrorist_organizations;
DROP TABLE legal_courts;
DROP TABLE legal_investigations_debarreds;
DROP TABLE legal_investigations_histories;
DROP TABLE legal_investigations_revokeds;
DROP TABLE legal_police_additional_offenses;
DROP TABLE legal_police_domestic_violences;
DROP TABLE legal_police_offenses;
DROP TABLE legal_technology_manipulatings;
DROP TABLE legal_technology_unauthorizeds;
DROP TABLE legal_technology_unlawfuls;
-- +goose StatementEnd
