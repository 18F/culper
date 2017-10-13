
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied

CREATE TABLE relationships_cohabitants (
    id bigint NOT NULL,
    has_cohabitant_id bigint,
    cohabitant_list_id bigint
);
ALTER TABLE relationships_cohabitants OWNER TO postgres;
CREATE SEQUENCE relationships_cohabitants_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE relationships_cohabitants_id_seq OWNER TO postgres;
ALTER SEQUENCE relationships_cohabitants_id_seq OWNED BY relationships_cohabitants.id;
ALTER TABLE ONLY relationships_cohabitants
    ADD CONSTRAINT relationships_cohabitants_pkey PRIMARY KEY (id);
ALTER TABLE ONLY relationships_cohabitants
    ADD CONSTRAINT relationships_cohabitants_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY relationships_cohabitants
    ADD CONSTRAINT relationships_cohabitants_has_cohabitant_id_fkey FOREIGN KEY (has_cohabitant_id) REFERENCES branches(id);
ALTER TABLE ONLY relationships_cohabitants
    ADD CONSTRAINT relationships_cohabitants_cohabitant_list_id_fkey FOREIGN KEY (cohabitant_list_id) REFERENCES collections(id);

CREATE TABLE relationships_maritals (
    id bigint NOT NULL,
    status_id bigint,
    civil_union_id bigint,
    divorced_list_id bigint
);
ALTER TABLE relationships_maritals OWNER TO postgres;
CREATE SEQUENCE relationships_maritals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE relationships_maritals_id_seq OWNER TO postgres;
ALTER SEQUENCE relationships_maritals_id_seq OWNED BY relationships_maritals.id;
ALTER TABLE ONLY relationships_maritals
    ADD CONSTRAINT relationships_maritals_pkey PRIMARY KEY (id);
ALTER TABLE ONLY relationships_maritals
    ADD CONSTRAINT relationships_maritals_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY relationships_maritals
    ADD CONSTRAINT relationships_maritals_status_id_fkey FOREIGN KEY (status_id) REFERENCES radios(id);
-- ALTER TABLE ONLY relationships_maritals
--     ADD CONSTRAINT relationships_maritals_civil_union_id_fkey FOREIGN KEY (civil_union_id) REFERENCES civil_unions(id);
ALTER TABLE ONLY relationships_maritals
    ADD CONSTRAINT relationships_maritals_divorced_list_id_fkey FOREIGN KEY (divorced_list_id) REFERENCES collections(id);

CREATE TABLE relationships_peoples (
    id bigint NOT NULL,
    list_id bigint
);
ALTER TABLE relationships_peoples OWNER TO postgres;
CREATE SEQUENCE relationships_peoples_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE relationships_peoples_id_seq OWNER TO postgres;
ALTER SEQUENCE relationships_peoples_id_seq OWNED BY relationships_peoples.id;
ALTER TABLE ONLY relationships_peoples
    ADD CONSTRAINT relationships_peoples_pkey PRIMARY KEY (id);
ALTER TABLE ONLY relationships_peoples
    ADD CONSTRAINT relationships_peoples_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY relationships_peoples
    ADD CONSTRAINT relationships_peoples_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE relationships_relatives (
    id bigint NOT NULL,
    list_id bigint
);
ALTER TABLE relationships_relatives OWNER TO postgres;
CREATE SEQUENCE relationships_relatives_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE relationships_relatives_id_seq OWNER TO postgres;
ALTER SEQUENCE relationships_relatives_id_seq OWNED BY relationships_relatives.id;
ALTER TABLE ONLY relationships_relatives
    ADD CONSTRAINT relationships_relatives_pkey PRIMARY KEY (id);
ALTER TABLE ONLY relationships_relatives
    ADD CONSTRAINT relationships_relatives_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY relationships_relatives
    ADD CONSTRAINT relationships_relatives_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE relationships_cohabitants;
DROP TABLE relationships_maritals;
DROP TABLE relationships_peoples;
DROP TABLE relationships_relatives;
