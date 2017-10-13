
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied

CREATE TABLE substance_alcohol_additionals (
    id bigint NOT NULL,
    received_treatment_id bigint,
    list_id bigint
);
ALTER TABLE substance_alcohol_additionals OWNER TO postgres;
CREATE SEQUENCE substance_alcohol_additionals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE substance_alcohol_additionals_id_seq OWNER TO postgres;
ALTER SEQUENCE substance_alcohol_additionals_id_seq OWNED BY substance_alcohol_additionals.id;
ALTER TABLE ONLY substance_alcohol_additionals
    ADD CONSTRAINT substance_alcohol_additionals_pkey PRIMARY KEY (id);
ALTER TABLE ONLY substance_alcohol_additionals
    ADD CONSTRAINT substance_alcohol_additionals_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY substance_alcohol_additionals
    ADD CONSTRAINT substance_alcohol_additionals_received_treatment_id_fkey FOREIGN KEY (received_treatment_id) REFERENCES branches(id);
ALTER TABLE ONLY substance_alcohol_additionals
    ADD CONSTRAINT substance_alcohol_additionals_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE substance_alcohol_negatives (
    id bigint NOT NULL,
    has_impacts_id bigint,
    list_id bigint
);
ALTER TABLE substance_alcohol_negatives OWNER TO postgres;
CREATE SEQUENCE substance_alcohol_negatives_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE substance_alcohol_negatives_id_seq OWNER TO postgres;
ALTER SEQUENCE substance_alcohol_negatives_id_seq OWNED BY substance_alcohol_negatives.id;
ALTER TABLE ONLY substance_alcohol_negatives
    ADD CONSTRAINT substance_alcohol_negatives_pkey PRIMARY KEY (id);
ALTER TABLE ONLY substance_alcohol_negatives
    ADD CONSTRAINT substance_alcohol_negatives_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY substance_alcohol_negatives
    ADD CONSTRAINT substance_alcohol_negatives_has_impacts_id_fkey FOREIGN KEY (has_impacts_id) REFERENCES branches(id);
ALTER TABLE ONLY substance_alcohol_negatives
    ADD CONSTRAINT substance_alcohol_negatives_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE substance_alcohol_ordereds (
    id bigint NOT NULL,
    has_been_ordered_id bigint,
    list_id bigint
);
ALTER TABLE substance_alcohol_ordereds OWNER TO postgres;
CREATE SEQUENCE substance_alcohol_ordereds_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE substance_alcohol_ordereds_id_seq OWNER TO postgres;
ALTER SEQUENCE substance_alcohol_ordereds_id_seq OWNED BY substance_alcohol_ordereds.id;
ALTER TABLE ONLY substance_alcohol_ordereds
    ADD CONSTRAINT substance_alcohol_ordereds_pkey PRIMARY KEY (id);
ALTER TABLE ONLY substance_alcohol_ordereds
    ADD CONSTRAINT substance_alcohol_ordereds_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY substance_alcohol_ordereds
    ADD CONSTRAINT substance_alcohol_ordereds_has_been_ordered_id_fkey FOREIGN KEY (has_been_ordered_id) REFERENCES branches(id);
ALTER TABLE ONLY substance_alcohol_ordereds
    ADD CONSTRAINT substance_alcohol_ordereds_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE substance_alcohol_voluntaries (
    id bigint NOT NULL,
    sought_treatment_id bigint,
    list_id bigint
);
ALTER TABLE substance_alcohol_voluntaries OWNER TO postgres;
CREATE SEQUENCE substance_alcohol_voluntaries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE substance_alcohol_voluntaries_id_seq OWNER TO postgres;
ALTER SEQUENCE substance_alcohol_voluntaries_id_seq OWNED BY substance_alcohol_voluntaries.id;
ALTER TABLE ONLY substance_alcohol_voluntaries
    ADD CONSTRAINT substance_alcohol_voluntaries_pkey PRIMARY KEY (id);
ALTER TABLE ONLY substance_alcohol_voluntaries
    ADD CONSTRAINT substance_alcohol_voluntaries_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY substance_alcohol_voluntaries
    ADD CONSTRAINT substance_alcohol_voluntaries_sought_treatment_id_fkey FOREIGN KEY (sought_treatment_id) REFERENCES branches(id);
ALTER TABLE ONLY substance_alcohol_voluntaries
    ADD CONSTRAINT substance_alcohol_voluntaries_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE substance_drug_clearances (
    id bigint NOT NULL,
    used_drugs_id bigint,
    list_id bigint
);
ALTER TABLE substance_drug_clearances OWNER TO postgres;
CREATE SEQUENCE substance_drug_clearances_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE substance_drug_clearances_id_seq OWNER TO postgres;
ALTER SEQUENCE substance_drug_clearances_id_seq OWNED BY substance_drug_clearances.id;
ALTER TABLE ONLY substance_drug_clearances
    ADD CONSTRAINT substance_drug_clearances_pkey PRIMARY KEY (id);
ALTER TABLE ONLY substance_drug_clearances
    ADD CONSTRAINT substance_drug_clearances_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY substance_drug_clearances
    ADD CONSTRAINT substance_drug_clearances_used_drugs_id_fkey FOREIGN KEY (used_drugs_id) REFERENCES branches(id);
ALTER TABLE ONLY substance_drug_clearances
    ADD CONSTRAINT substance_drug_clearances_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE substance_drug_misuses (
    id bigint NOT NULL,
    used_drugs_id bigint,
    list_id bigint
);
ALTER TABLE substance_drug_misuses OWNER TO postgres;
CREATE SEQUENCE substance_drug_misuses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE substance_drug_misuses_id_seq OWNER TO postgres;
ALTER SEQUENCE substance_drug_misuses_id_seq OWNED BY substance_drug_misuses.id;
ALTER TABLE ONLY substance_drug_misuses
    ADD CONSTRAINT substance_drug_misuses_pkey PRIMARY KEY (id);
ALTER TABLE ONLY substance_drug_misuses
    ADD CONSTRAINT substance_drug_misuses_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY substance_drug_misuses
    ADD CONSTRAINT substance_drug_misuses_used_drugs_id_fkey FOREIGN KEY (used_drugs_id) REFERENCES branches(id);
ALTER TABLE ONLY substance_drug_misuses
    ADD CONSTRAINT substance_drug_misuses_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE substance_drug_ordereds (
    id bigint NOT NULL,
    involved_id bigint,
    list_id bigint
);
ALTER TABLE substance_drug_ordereds OWNER TO postgres;
CREATE SEQUENCE substance_drug_ordereds_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE substance_drug_ordereds_id_seq OWNER TO postgres;
ALTER SEQUENCE substance_drug_ordereds_id_seq OWNED BY substance_drug_ordereds.id;
ALTER TABLE ONLY substance_drug_ordereds
    ADD CONSTRAINT substance_drug_ordereds_pkey PRIMARY KEY (id);
ALTER TABLE ONLY substance_drug_ordereds
    ADD CONSTRAINT substance_drug_ordereds_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY substance_drug_ordereds
    ADD CONSTRAINT substance_drug_ordereds_involved_id_fkey FOREIGN KEY (involved_id) REFERENCES branches(id);
ALTER TABLE ONLY substance_drug_ordereds
    ADD CONSTRAINT substance_drug_ordereds_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE substance_drug_public_safeties (
    id bigint NOT NULL,
    used_drugs_id bigint,
    list_id bigint
);
ALTER TABLE substance_drug_public_safeties OWNER TO postgres;
CREATE SEQUENCE substance_drug_public_safeties_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE substance_drug_public_safeties_id_seq OWNER TO postgres;
ALTER SEQUENCE substance_drug_public_safeties_id_seq OWNED BY substance_drug_public_safeties.id;
ALTER TABLE ONLY substance_drug_public_safeties
    ADD CONSTRAINT substance_drug_public_safeties_pkey PRIMARY KEY (id);
ALTER TABLE ONLY substance_drug_public_safeties
    ADD CONSTRAINT substance_drug_public_safeties_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY substance_drug_public_safeties
    ADD CONSTRAINT substance_drug_public_safeties_used_drugs_id_fkey FOREIGN KEY (used_drugs_id) REFERENCES branches(id);
ALTER TABLE ONLY substance_drug_public_safeties
    ADD CONSTRAINT substance_drug_public_safeties_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE substance_drug_purchases (
    id bigint NOT NULL,
    involved_id bigint,
    list_id bigint
);
ALTER TABLE substance_drug_purchases OWNER TO postgres;
CREATE SEQUENCE substance_drug_purchases_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE substance_drug_purchases_id_seq OWNER TO postgres;
ALTER SEQUENCE substance_drug_purchases_id_seq OWNED BY substance_drug_purchases.id;
ALTER TABLE ONLY substance_drug_purchases
    ADD CONSTRAINT substance_drug_purchases_pkey PRIMARY KEY (id);
ALTER TABLE ONLY substance_drug_purchases
    ADD CONSTRAINT substance_drug_purchases_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY substance_drug_purchases
    ADD CONSTRAINT substance_drug_purchases_involved_id_fkey FOREIGN KEY (involved_id) REFERENCES branches(id);
ALTER TABLE ONLY substance_drug_purchases
    ADD CONSTRAINT substance_drug_purchases_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE substance_drug_usages (
    id bigint NOT NULL,
    used_drugs_id bigint,
    list_id bigint
);
ALTER TABLE substance_drug_usages OWNER TO postgres;
CREATE SEQUENCE substance_drug_usages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE substance_drug_usages_id_seq OWNER TO postgres;
ALTER SEQUENCE substance_drug_usages_id_seq OWNED BY substance_drug_usages.id;
ALTER TABLE ONLY substance_drug_usages
    ADD CONSTRAINT substance_drug_usages_pkey PRIMARY KEY (id);
ALTER TABLE ONLY substance_drug_usages
    ADD CONSTRAINT substance_drug_usages_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY substance_drug_usages
    ADD CONSTRAINT substance_drug_usages_used_drugs_id_fkey FOREIGN KEY (used_drugs_id) REFERENCES branches(id);
ALTER TABLE ONLY substance_drug_usages
    ADD CONSTRAINT substance_drug_usages_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE substance_drug_voluntaries (
    id bigint NOT NULL,
    involved_id bigint,
    list_id bigint
);
ALTER TABLE substance_drug_voluntaries OWNER TO postgres;
CREATE SEQUENCE substance_drug_voluntaries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE substance_drug_voluntaries_id_seq OWNER TO postgres;
ALTER SEQUENCE substance_drug_voluntaries_id_seq OWNED BY substance_drug_voluntaries.id;
ALTER TABLE ONLY substance_drug_voluntaries
    ADD CONSTRAINT substance_drug_voluntaries_pkey PRIMARY KEY (id);
ALTER TABLE ONLY substance_drug_voluntaries
    ADD CONSTRAINT substance_drug_voluntaries_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY substance_drug_voluntaries
    ADD CONSTRAINT substance_drug_voluntaries_involved_id_fkey FOREIGN KEY (involved_id) REFERENCES branches(id);
ALTER TABLE ONLY substance_drug_voluntaries
    ADD CONSTRAINT substance_drug_voluntaries_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
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
