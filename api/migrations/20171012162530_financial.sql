
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin

CREATE TABLE financial_bankruptcies (
    id                bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_bankruptcy_id bigint REFERENCES branches(id),
    list_id           bigint REFERENCES collections(id)
);

CREATE TABLE financial_cards (
    id                bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_card_abuse_id bigint REFERENCES branches(id),
    list_id           bigint REFERENCES collections(id)
);

CREATE TABLE financial_credits (
    id                       bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_credit_counseling_id bigint REFERENCES branches(id),
    list_id                  bigint REFERENCES collections(id)
);

CREATE TABLE financial_delinquents (
    id                bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_delinquent_id bigint REFERENCES branches(id),
    list_id           bigint REFERENCES collections(id)
);

CREATE TABLE financial_gamblings (
    id                   bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_gambling_debt_id bigint REFERENCES branches(id),
    list_id              bigint REFERENCES collections(id)
);

CREATE TABLE financial_nonpayments (
    id                bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_nonpayment_id bigint REFERENCES branches(id),
    list_id           bigint REFERENCES collections(id)
);

CREATE TABLE financial_taxes (
    id           bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_taxes_id bigint REFERENCES branches(id),
    list_id      bigint REFERENCES collections(id)
);
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
DROP TABLE financial_bankruptcies;
DROP TABLE financial_cards;
DROP TABLE financial_credits;
DROP TABLE financial_delinquents;
DROP TABLE financial_gamblings;
DROP TABLE financial_nonpayments;
DROP TABLE financial_taxes;
-- +goose StatementEnd
