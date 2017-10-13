
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied

CREATE TABLE history_educations (
    id bigint NOT NULL,
    has_attended_id bigint,
    has_degree10_id bigint,
    list_id bigint
);
ALTER TABLE history_educations OWNER TO postgres;
CREATE SEQUENCE history_educations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE history_educations_id_seq OWNER TO postgres;
ALTER SEQUENCE history_educations_id_seq OWNED BY history_educations.id;
ALTER TABLE ONLY history_educations
    ADD CONSTRAINT history_educations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY history_educations
    ADD CONSTRAINT history_educations_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY history_educations
    ADD CONSTRAINT history_educations_has_attended_id_fkey FOREIGN KEY (has_attended_id) REFERENCES branches(id);
ALTER TABLE ONLY history_educations
    ADD CONSTRAINT history_educations_has_degree10_id_fkey FOREIGN KEY (has_degree10_id) REFERENCES branches(id);
ALTER TABLE ONLY history_educations
    ADD CONSTRAINT history_educations_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE history_employments (
    id bigint NOT NULL,
    list_id bigint
);
ALTER TABLE history_employments OWNER TO postgres;
CREATE SEQUENCE history_employments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE history_employments_id_seq OWNER TO postgres;
ALTER SEQUENCE history_employments_id_seq OWNED BY history_employments.id;
ALTER TABLE ONLY history_employments
    ADD CONSTRAINT history_employments_pkey PRIMARY KEY (id);
ALTER TABLE ONLY history_employments
    ADD CONSTRAINT history_employments_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY history_employments
    ADD CONSTRAINT history_employments_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE history_federals (
    id bigint NOT NULL,
    has_federal_service_id bigint,
    list_id bigint
);
ALTER TABLE history_federals OWNER TO postgres;
CREATE SEQUENCE history_federals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE history_federals_id_seq OWNER TO postgres;
ALTER SEQUENCE history_federals_id_seq OWNED BY history_federals.id;
ALTER TABLE ONLY history_federals
    ADD CONSTRAINT history_federals_pkey PRIMARY KEY (id);
ALTER TABLE ONLY history_federals
    ADD CONSTRAINT history_federals_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY history_federals
    ADD CONSTRAINT history_federals_has_federal_service_id_fkey FOREIGN KEY (has_federal_service_id) REFERENCES branches(id);
ALTER TABLE ONLY history_federals
    ADD CONSTRAINT history_federals_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE history_residences (
    id bigint NOT NULL,
    list_id bigint
);
ALTER TABLE history_residences OWNER TO postgres;
CREATE SEQUENCE history_residences_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE history_residences_id_seq OWNER TO postgres;
ALTER SEQUENCE history_residences_id_seq OWNED BY history_residences.id;
ALTER TABLE ONLY history_residences
    ADD CONSTRAINT history_residences_pkey PRIMARY KEY (id);
ALTER TABLE ONLY history_residences
    ADD CONSTRAINT history_residences_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY history_residences
    ADD CONSTRAINT history_residences_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE history_educations;
DROP TABLE history_employments;
DROP TABLE history_federals;
DROP TABLE history_residences;
