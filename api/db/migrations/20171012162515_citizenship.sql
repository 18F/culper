
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied

CREATE TABLE citizenship_multiples (
    id bigint NOT NULL,
    has_multiple_id bigint,
    list_id bigint
);
ALTER TABLE citizenship_multiples OWNER TO postgres;
CREATE SEQUENCE citizenship_multiples_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE citizenship_multiples_id_seq OWNER TO postgres;
ALTER SEQUENCE citizenship_multiples_id_seq OWNED BY citizenship_multiples.id;
ALTER TABLE ONLY citizenship_multiples
    ADD CONSTRAINT citizenship_multiples_pkey PRIMARY KEY (id);
ALTER TABLE ONLY citizenship_multiples
    ADD CONSTRAINT citizenship_multiples_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY citizenship_multiples
    ADD CONSTRAINT citizenship_multiples_has_multiple_id_fkey FOREIGN KEY (has_multiple_id) REFERENCES branches(id);
ALTER TABLE ONLY citizenship_multiples
    ADD CONSTRAINT citizenship_multiples_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE citizenship_passports (
    id bigint NOT NULL,
    passports_id bigint
);
ALTER TABLE citizenship_passports OWNER TO postgres;
CREATE SEQUENCE citizenship_passports_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE citizenship_passports_id_seq OWNER TO postgres;
ALTER SEQUENCE citizenship_passports_id_seq OWNED BY citizenship_passports.id;
ALTER TABLE ONLY citizenship_passports
    ADD CONSTRAINT citizenship_passports_pkey PRIMARY KEY (id);
ALTER TABLE ONLY citizenship_passports
    ADD CONSTRAINT citizenship_passports_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY citizenship_passports
    ADD CONSTRAINT citizenship_passports_passports_id_fkey FOREIGN KEY (passports_id) REFERENCES collections(id);

CREATE TABLE citizenship_statuses (
    id bigint NOT NULL,
    citizenship_status_id bigint,
    abroad_documentation_id bigint,
    explanation_id bigint,
    document_number_id bigint,
    document_issued_id bigint,
    document_name_id bigint,
    document_expiration_id bigint,
    document_type_id bigint,
    place_issued_id bigint,
    certificate_number_id bigint,
    certificate_issued_id bigint,
    certificate_name_id bigint,
    certificate_court_name_id bigint,
    certificate_court_address_id bigint,
    born_on_military_installation_id bigint,
    military_base_id bigint,
    entry_date_id bigint,
    entry_location_id bigint,
    prior_citizenship_id bigint,
    has_alien_registration_id bigint,
    alien_registration_number_id bigint,
    alien_registration_expiration_id bigint,
    basis_id bigint,
    permanent_resident_card_number_id bigint,
    residence_status_id bigint
);
ALTER TABLE citizenship_statuses OWNER TO postgres;
CREATE SEQUENCE citizenship_statuses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE citizenship_statuses_id_seq OWNER TO postgres;
ALTER SEQUENCE citizenship_statuses_id_seq OWNED BY citizenship_statuses.id;
ALTER TABLE ONLY citizenship_statuses
    ADD CONSTRAINT citizenship_statuses_pkey PRIMARY KEY (id);
ALTER TABLE ONLY citizenship_statuses
    ADD CONSTRAINT citizenship_statuses_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY citizenship_statuses
    ADD CONSTRAINT citizenship_statuses_citizenship_status_id_fkey FOREIGN KEY (citizenship_status_id) REFERENCES radios(id);
ALTER TABLE ONLY citizenship_statuses
    ADD CONSTRAINT citizenship_statuses_abroad_documentation_id_fkey FOREIGN KEY (abroad_documentation_id) REFERENCES radios(id);
ALTER TABLE ONLY citizenship_statuses
    ADD CONSTRAINT citizenship_statuses_explanation_id_fkey FOREIGN KEY (explanation_id) REFERENCES textareas(id);
ALTER TABLE ONLY citizenship_statuses
    ADD CONSTRAINT citizenship_statuses_document_number_id_fkey FOREIGN KEY (document_number_id) REFERENCES texts(id);
ALTER TABLE ONLY citizenship_statuses
    ADD CONSTRAINT citizenship_statuses_document_issued_id_fkey FOREIGN KEY (document_issued_id) REFERENCES date_controls(id);
ALTER TABLE ONLY citizenship_statuses
    ADD CONSTRAINT citizenship_statuses_document_name_id_fkey FOREIGN KEY (document_name_id) REFERENCES names(id);
ALTER TABLE ONLY citizenship_statuses
    ADD CONSTRAINT citizenship_statuses_document_type_id_fkey FOREIGN KEY (document_type_id) REFERENCES radios(id);
ALTER TABLE ONLY citizenship_statuses
    ADD CONSTRAINT citizenship_statuses_document_expiration_id_fkey FOREIGN KEY (document_expiration_id) REFERENCES date_controls(id);
ALTER TABLE ONLY citizenship_statuses
    ADD CONSTRAINT citizenship_statuses_place_issued_id_fkey FOREIGN KEY (place_issued_id) REFERENCES locations(id);
ALTER TABLE ONLY citizenship_statuses
    ADD CONSTRAINT citizenship_statuses_certificate_number_id_fkey FOREIGN KEY (certificate_number_id) REFERENCES texts(id);
ALTER TABLE ONLY citizenship_statuses
    ADD CONSTRAINT citizenship_statuses_certificate_issued_id_fkey FOREIGN KEY (certificate_issued_id) REFERENCES date_controls(id);
ALTER TABLE ONLY citizenship_statuses
    ADD CONSTRAINT citizenship_statuses_certificate_name_id_fkey FOREIGN KEY (certificate_name_id) REFERENCES names(id);
ALTER TABLE ONLY citizenship_statuses
    ADD CONSTRAINT citizenship_statuses_certificate_court_name_id_fkey FOREIGN KEY (certificate_court_name_id) REFERENCES texts(id);
ALTER TABLE ONLY citizenship_statuses
    ADD CONSTRAINT citizenship_statuses_certificate_court_address_id_fkey FOREIGN KEY (certificate_court_address_id) REFERENCES locations(id);
ALTER TABLE ONLY citizenship_statuses
    ADD CONSTRAINT citizenship_statuses_born_on_military_installation_id_fkey FOREIGN KEY (born_on_military_installation_id) REFERENCES branches(id);
ALTER TABLE ONLY citizenship_statuses
    ADD CONSTRAINT citizenship_statuses_military_base_id_fkey FOREIGN KEY (military_base_id) REFERENCES texts(id);
ALTER TABLE ONLY citizenship_statuses
    ADD CONSTRAINT citizenship_statuses_entry_date_id_fkey FOREIGN KEY (entry_date_id) REFERENCES date_controls(id);
ALTER TABLE ONLY citizenship_statuses
    ADD CONSTRAINT citizenship_statuses_entry_location_id_fkey FOREIGN KEY (entry_location_id) REFERENCES locations(id);
ALTER TABLE ONLY citizenship_statuses
    ADD CONSTRAINT citizenship_statuses_prior_citizenship_id_fkey FOREIGN KEY (prior_citizenship_id) REFERENCES countries(id);
ALTER TABLE ONLY citizenship_statuses
    ADD CONSTRAINT citizenship_statuses_has_alien_registration_id_fkey FOREIGN KEY (has_alien_registration_id) REFERENCES branches(id);
ALTER TABLE ONLY citizenship_statuses
    ADD CONSTRAINT citizenship_statuses_alien_registration_number_id_fkey FOREIGN KEY (alien_registration_number_id) REFERENCES texts(id);
ALTER TABLE ONLY citizenship_statuses
    ADD CONSTRAINT citizenship_statuses_alien_registration_expiration_id_fkey FOREIGN KEY (alien_registration_expiration_id) REFERENCES date_controls(id);
ALTER TABLE ONLY citizenship_statuses
    ADD CONSTRAINT citizenship_statuses_basis_id_fkey FOREIGN KEY (basis_id) REFERENCES radios(id);
ALTER TABLE ONLY citizenship_statuses
    ADD CONSTRAINT citizenship_statuses_permanent_resident_card_number_id_fkey FOREIGN KEY (permanent_resident_card_number_id) REFERENCES texts(id);
ALTER TABLE ONLY citizenship_statuses
    ADD CONSTRAINT citizenship_statuses_residence_status_id_fkey FOREIGN KEY (residence_status_id) REFERENCES texts(id);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE citizenship_multiples;
DROP TABLE citizenship_passports;
DROP TABLE citizenship_statuses;
