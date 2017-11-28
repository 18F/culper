
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
CREATE TABLE substance_alcohol_additionals (
    id                    bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    received_treatment_id bigint REFERENCES branches(id),
    list_id               bigint REFERENCES collections(id)
);

CREATE TABLE substance_alcohol_negatives (
    id             bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_impacts_id bigint REFERENCES branches(id),
    list_id        bigint REFERENCES collections(id)
);

CREATE TABLE substance_alcohol_ordereds (
    id                  bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_been_ordered_id bigint REFERENCES branches(id),
    list_id             bigint REFERENCES collections(id)
);

CREATE TABLE substance_alcohol_voluntaries (
    id                  bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    sought_treatment_id bigint REFERENCES branches(id),
    list_id             bigint REFERENCES collections(id)
);

CREATE TABLE substance_drug_clearances (
    id            bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    used_drugs_id bigint REFERENCES branches(id),
    list_id       bigint REFERENCES collections(id)
);

CREATE TABLE substance_drug_misuses (
    id            bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    used_drugs_id bigint REFERENCES branches(id),
    list_id       bigint REFERENCES collections(id)
);

CREATE TABLE substance_drug_ordereds (
    id          bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    involved_id bigint REFERENCES branches(id),
    list_id     bigint REFERENCES collections(id)
);

CREATE TABLE substance_drug_public_safeties (
    id            bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    used_drugs_id bigint REFERENCES branches(id),
    list_id       bigint REFERENCES collections(id)
);

CREATE TABLE substance_drug_purchases (
    id          bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    involved_id bigint REFERENCES branches(id),
    list_id     bigint REFERENCES collections(id)
);

CREATE TABLE substance_drug_usages (
    id            bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    used_drugs_id bigint REFERENCES branches(id),
    list_id       bigint REFERENCES collections(id)
);

CREATE TABLE substance_drug_voluntaries (
    id          bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    involved_id bigint REFERENCES branches(id),
    list_id     bigint REFERENCES collections(id)
);
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
DROP TABLE substance_alcohol_additionals;
DROP TABLE substance_alcohol_negatives;
DROP TABLE substance_alcohol_ordereds;
DROP TABLE substance_alcohol_voluntaries;
DROP TABLE substance_drug_clearances;
DROP TABLE substance_drug_misuses;
DROP TABLE substance_drug_ordereds;
DROP TABLE substance_drug_public_safeties;
DROP TABLE substance_drug_purchases;
DROP TABLE substance_drug_usages;
DROP TABLE substance_drug_voluntaries;
-- +goose StatementEnd
