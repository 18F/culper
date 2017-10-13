
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied

CREATE TABLE financial_bankruptcies (
    id bigint NOT NULL,
    has_bankruptcy_id bigint,
    list_id bigint
);
ALTER TABLE financial_bankruptcies OWNER TO postgres;
CREATE SEQUENCE financial_bankruptcies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE financial_bankruptcies_id_seq OWNER TO postgres;
ALTER SEQUENCE financial_bankruptcies_id_seq OWNED BY financial_bankruptcies.id;
ALTER TABLE ONLY financial_bankruptcies
    ADD CONSTRAINT financial_bankruptcies_pkey PRIMARY KEY (id);
ALTER TABLE ONLY financial_bankruptcies
    ADD CONSTRAINT financial_bankruptcies_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY financial_bankruptcies
    ADD CONSTRAINT financial_bankruptcies_has_bankruptcy_id_fkey FOREIGN KEY (has_bankruptcy_id) REFERENCES branches(id);
ALTER TABLE ONLY financial_bankruptcies
    ADD CONSTRAINT financial_bankruptcies_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE financial_cards (
    id bigint NOT NULL,
    has_card_abuse_id bigint,
    list_id bigint
);
ALTER TABLE financial_cards OWNER TO postgres;
CREATE SEQUENCE financial_cards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE financial_cards_id_seq OWNER TO postgres;
ALTER SEQUENCE financial_cards_id_seq OWNED BY financial_cards.id;
ALTER TABLE ONLY financial_cards
    ADD CONSTRAINT financial_cards_pkey PRIMARY KEY (id);
ALTER TABLE ONLY financial_cards
    ADD CONSTRAINT financial_cards_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY financial_cards
    ADD CONSTRAINT financial_cards_has_card_abuse_id_fkey FOREIGN KEY (has_card_abuse_id) REFERENCES branches(id);
ALTER TABLE ONLY financial_cards
    ADD CONSTRAINT financial_cards_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE financial_credits (
    id bigint NOT NULL,
    has_credit_counseling_id bigint,
    list_id bigint
);
ALTER TABLE financial_credits OWNER TO postgres;
CREATE SEQUENCE financial_credits_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE financial_credits_id_seq OWNER TO postgres;
ALTER SEQUENCE financial_credits_id_seq OWNED BY financial_credits.id;
ALTER TABLE ONLY financial_credits
    ADD CONSTRAINT financial_credits_pkey PRIMARY KEY (id);
ALTER TABLE ONLY financial_credits
    ADD CONSTRAINT financial_credits_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY financial_credits
    ADD CONSTRAINT financial_credits_has_credit_counseling_id_fkey FOREIGN KEY (has_credit_counseling_id) REFERENCES branches(id);
ALTER TABLE ONLY financial_credits
    ADD CONSTRAINT financial_credits_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE financial_delinquents (
    id bigint NOT NULL,
    has_delinquent_id bigint,
    list_id bigint
);
ALTER TABLE financial_delinquents OWNER TO postgres;
CREATE SEQUENCE financial_delinquents_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE financial_delinquents_id_seq OWNER TO postgres;
ALTER SEQUENCE financial_delinquents_id_seq OWNED BY financial_delinquents.id;
ALTER TABLE ONLY financial_delinquents
    ADD CONSTRAINT financial_delinquents_pkey PRIMARY KEY (id);
ALTER TABLE ONLY financial_delinquents
    ADD CONSTRAINT financial_delinquents_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY financial_delinquents
    ADD CONSTRAINT financial_delinquents_has_delinquent_id_fkey FOREIGN KEY (has_delinquent_id) REFERENCES branches(id);
ALTER TABLE ONLY financial_delinquents
    ADD CONSTRAINT financial_delinquents_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE financial_gamblings (
    id bigint NOT NULL,
    has_gambling_debt_id bigint,
    list_id bigint
);
ALTER TABLE financial_gamblings OWNER TO postgres;
CREATE SEQUENCE financial_gamblings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE financial_gamblings_id_seq OWNER TO postgres;
ALTER SEQUENCE financial_gamblings_id_seq OWNED BY financial_gamblings.id;
ALTER TABLE ONLY financial_gamblings
    ADD CONSTRAINT financial_gamblings_pkey PRIMARY KEY (id);
ALTER TABLE ONLY financial_gamblings
    ADD CONSTRAINT financial_gamblings_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY financial_gamblings
    ADD CONSTRAINT financial_gamblings_has_gambling_debt_id_fkey FOREIGN KEY (has_gambling_debt_id) REFERENCES branches(id);
ALTER TABLE ONLY financial_gamblings
    ADD CONSTRAINT financial_gamblings_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE financial_nonpayments (
    id bigint NOT NULL,
    has_nonpayment_id bigint,
    list_id bigint
);
ALTER TABLE financial_nonpayments OWNER TO postgres;
CREATE SEQUENCE financial_nonpayments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE financial_nonpayments_id_seq OWNER TO postgres;
ALTER SEQUENCE financial_nonpayments_id_seq OWNED BY financial_nonpayments.id;
ALTER TABLE ONLY financial_nonpayments
    ADD CONSTRAINT financial_nonpayments_pkey PRIMARY KEY (id);
ALTER TABLE ONLY financial_nonpayments
    ADD CONSTRAINT financial_nonpayments_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY financial_nonpayments
    ADD CONSTRAINT financial_nonpayments_has_nonpayment_id_fkey FOREIGN KEY (has_nonpayment_id) REFERENCES branches(id);
ALTER TABLE ONLY financial_nonpayments
    ADD CONSTRAINT financial_nonpayments_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE financial_taxes (
    id bigint NOT NULL,
    has_taxes_id bigint,
    list_id bigint
);
ALTER TABLE financial_taxes OWNER TO postgres;
CREATE SEQUENCE financial_taxes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE financial_taxes_id_seq OWNER TO postgres;
ALTER SEQUENCE financial_taxes_id_seq OWNED BY financial_taxes.id;
ALTER TABLE ONLY financial_taxes
    ADD CONSTRAINT financial_taxes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY financial_taxes
    ADD CONSTRAINT financial_taxes_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY financial_taxes
    ADD CONSTRAINT financial_taxes_has_taxes_id_fkey FOREIGN KEY (has_taxes_id) REFERENCES branches(id);
ALTER TABLE ONLY financial_taxes
    ADD CONSTRAINT financial_taxes_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE financial_bankruptcies;
DROP TABLE financial_cards;
DROP TABLE financial_credits;
DROP TABLE financial_delinquents;
DROP TABLE financial_gamblings;
DROP TABLE financial_nonpayments;
DROP TABLE financial_taxes;
