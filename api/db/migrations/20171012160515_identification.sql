
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied

CREATE TABLE identification_birth_dates (
    id bigint NOT NULL,
    date_id bigint
);
ALTER TABLE identification_birth_dates OWNER TO postgres;
CREATE SEQUENCE identification_birth_dates_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE identification_birth_dates_id_seq OWNER TO postgres;
ALTER SEQUENCE identification_birth_dates_id_seq OWNED BY identification_birth_dates.id;
ALTER TABLE ONLY identification_birth_dates
    ADD CONSTRAINT identification_birth_dates_pkey PRIMARY KEY (id);
ALTER TABLE ONLY identification_birth_dates
    ADD CONSTRAINT identification_birth_dates_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY identification_birth_dates
    ADD CONSTRAINT identification_birth_dates_date_id_fkey FOREIGN KEY (date_id) REFERENCES date_controls(id);

CREATE TABLE identification_birth_places (
    id bigint NOT NULL,
    location_id bigint
);
ALTER TABLE identification_birth_places OWNER TO postgres;
CREATE SEQUENCE identification_birth_places_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE identification_birth_places_id_seq OWNER TO postgres;
ALTER SEQUENCE identification_birth_places_id_seq OWNED BY identification_birth_places.id;
ALTER TABLE ONLY identification_birth_places
    ADD CONSTRAINT identification_birth_places_pkey PRIMARY KEY (id);
ALTER TABLE ONLY identification_birth_places
    ADD CONSTRAINT identification_birth_places_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY identification_birth_places
    ADD CONSTRAINT identification_birth_places_location_id_fkey FOREIGN KEY (location_id) REFERENCES locations(id);

CREATE TABLE identification_contacts (
    id bigint NOT NULL,
    emails_id bigint,
    phone_numbers_id bigint
);
ALTER TABLE identification_contacts OWNER TO postgres;
CREATE SEQUENCE identification_contacts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE identification_contacts_id_seq OWNER TO postgres;
ALTER SEQUENCE identification_contacts_id_seq OWNED BY identification_contacts.id;
ALTER TABLE ONLY identification_contacts
    ADD CONSTRAINT identification_contacts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY identification_contacts
    ADD CONSTRAINT identification_contacts_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY identification_contacts
    ADD CONSTRAINT identification_contacts_emails_id_fkey FOREIGN KEY (emails_id) REFERENCES collections(id);
ALTER TABLE ONLY identification_contacts
    ADD CONSTRAINT identification_contacts_phone_numbers_id_fkey FOREIGN KEY (phone_numbers_id) REFERENCES collections(id);

CREATE TABLE identification_names (
    id bigint NOT NULL,
    name_id bigint
);
ALTER TABLE identification_names OWNER TO postgres;
CREATE SEQUENCE identification_names_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE identification_names_id_seq OWNER TO postgres;
ALTER SEQUENCE identification_names_id_seq OWNED BY identification_names.id;
ALTER TABLE ONLY identification_names
    ADD CONSTRAINT identification_names_pkey PRIMARY KEY (id);
ALTER TABLE ONLY identification_names
    ADD CONSTRAINT identification_names_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY identification_names
    ADD CONSTRAINT identification_names_name_id_fkey FOREIGN KEY (name_id) REFERENCES names(id);

CREATE TABLE identification_other_names (
    id bigint NOT NULL,
    has_other_names_id bigint,
    list_id bigint
);
ALTER TABLE identification_other_names OWNER TO postgres;
CREATE SEQUENCE identification_other_names_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE identification_other_names_id_seq OWNER TO postgres;
ALTER SEQUENCE identification_other_names_id_seq OWNED BY identification_other_names.id;
ALTER TABLE ONLY identification_other_names
    ADD CONSTRAINT identification_other_names_pkey PRIMARY KEY (id);
ALTER TABLE ONLY identification_other_names
    ADD CONSTRAINT identification_other_names_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY identification_other_names
    ADD CONSTRAINT identification_other_names_has_other_names_id_fkey FOREIGN KEY (has_other_names_id) REFERENCES branches(id);
ALTER TABLE ONLY identification_other_names
    ADD CONSTRAINT identification_other_names_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE identification_physicals (
    id bigint NOT NULL,
    comments_id bigint,
    eye_color_id bigint,
    hair_color_id bigint,
    sex_id bigint,
    height_id bigint,
    weight_id bigint
);
ALTER TABLE identification_physicals OWNER TO postgres;
CREATE SEQUENCE identification_physicals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE identification_physicals_id_seq OWNER TO postgres;
ALTER SEQUENCE identification_physicals_id_seq OWNED BY identification_physicals.id;
ALTER TABLE ONLY identification_physicals
    ADD CONSTRAINT identification_physicals_pkey PRIMARY KEY (id);
ALTER TABLE ONLY identification_physicals
    ADD CONSTRAINT identification_physicals_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY identification_physicals
    ADD CONSTRAINT identification_physicals_comments_id_fkey FOREIGN KEY (comments_id) REFERENCES textareas(id);
ALTER TABLE ONLY identification_physicals
    ADD CONSTRAINT identification_physicals_eye_color_id_fkey FOREIGN KEY (eye_color_id) REFERENCES texts(id);
ALTER TABLE ONLY identification_physicals
    ADD CONSTRAINT identification_physicals_hair_color_id_fkey FOREIGN KEY (hair_color_id) REFERENCES texts(id);
ALTER TABLE ONLY identification_physicals
    ADD CONSTRAINT identification_physicals_sex_id_fkey FOREIGN KEY (sex_id) REFERENCES texts(id);
ALTER TABLE ONLY identification_physicals
    ADD CONSTRAINT identification_physicals_height_id_fkey FOREIGN KEY (height_id) REFERENCES heights(id);
ALTER TABLE ONLY identification_physicals
    ADD CONSTRAINT identification_physicals_weight_id_fkey FOREIGN KEY (weight_id) REFERENCES numbers(id);

CREATE TABLE identification_ssns (
    id bigint NOT NULL,
    verified boolean,
    ssnid bigint
);
ALTER TABLE identification_ssns OWNER TO postgres;
CREATE SEQUENCE identification_ssns_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE identification_ssns_id_seq OWNER TO postgres;
ALTER SEQUENCE identification_ssns_id_seq OWNED BY identification_ssns.id;
ALTER TABLE ONLY identification_ssns
    ADD CONSTRAINT identification_ssns_pkey PRIMARY KEY (id);
ALTER TABLE ONLY identification_ssns
    ADD CONSTRAINT identification_ssns_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY identification_ssns
    ADD CONSTRAINT identification_ssns_ssnid_fkey FOREIGN KEY (ssnid) REFERENCES ssns(id);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE identification_birth_dates;
DROP TABLE identification_birth_places;
DROP TABLE identification_contacts;
DROP TABLE identification_names;
DROP TABLE identification_other_names;
DROP TABLE identification_physicals;
DROP TABLE identification_ssns;
