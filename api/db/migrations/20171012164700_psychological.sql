
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied

CREATE TABLE psychological_competences (
    id bigint NOT NULL,
    is_incompetent_id bigint,
    list_id bigint
);
ALTER TABLE psychological_competences OWNER TO postgres;
CREATE SEQUENCE psychological_competences_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE psychological_competences_id_seq OWNER TO postgres;
ALTER SEQUENCE psychological_competences_id_seq OWNED BY psychological_competences.id;
ALTER TABLE ONLY psychological_competences
    ADD CONSTRAINT psychological_competences_pkey PRIMARY KEY (id);
ALTER TABLE ONLY psychological_competences
    ADD CONSTRAINT psychological_competences_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY psychological_competences
    ADD CONSTRAINT psychological_competences_is_incompetent_id_fkey FOREIGN KEY (is_incompetent_id) REFERENCES branches(id);
ALTER TABLE ONLY psychological_competences
    ADD CONSTRAINT psychological_competences_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE psychological_consultations (
    id bigint NOT NULL,
    consulted_id bigint,
    list_id bigint
);
ALTER TABLE psychological_consultations OWNER TO postgres;
CREATE SEQUENCE psychological_consultations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE psychological_consultations_id_seq OWNER TO postgres;
ALTER SEQUENCE psychological_consultations_id_seq OWNED BY psychological_consultations.id;
ALTER TABLE ONLY psychological_consultations
    ADD CONSTRAINT psychological_consultations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY psychological_consultations
    ADD CONSTRAINT psychological_consultations_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY psychological_consultations
    ADD CONSTRAINT psychological_consultations_consulted_id_fkey FOREIGN KEY (consulted_id) REFERENCES branches(id);
ALTER TABLE ONLY psychological_consultations
    ADD CONSTRAINT psychological_consultations_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE psychological_diagnoses (
    id bigint NOT NULL,
    diagnosed_id bigint,
    did_not_consult_id bigint,
    diagnosis_list_id bigint,
    in_treatment_id bigint,
    treatment_list_id bigint
);
ALTER TABLE psychological_diagnoses OWNER TO postgres;
CREATE SEQUENCE psychological_diagnoses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE psychological_diagnoses_id_seq OWNER TO postgres;
ALTER SEQUENCE psychological_diagnoses_id_seq OWNED BY psychological_diagnoses.id;
ALTER TABLE ONLY psychological_diagnoses
    ADD CONSTRAINT psychological_diagnoses_pkey PRIMARY KEY (id);
ALTER TABLE ONLY psychological_diagnoses
    ADD CONSTRAINT psychological_diagnoses_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY psychological_diagnoses
    ADD CONSTRAINT psychological_diagnoses_diagnosed_id_fkey FOREIGN KEY (diagnosed_id) REFERENCES branches(id);
ALTER TABLE ONLY psychological_diagnoses
    ADD CONSTRAINT psychological_diagnoses_did_not_consult_id_fkey FOREIGN KEY (did_not_consult_id) REFERENCES branches(id);
ALTER TABLE ONLY psychological_diagnoses
    ADD CONSTRAINT psychological_diagnoses_diagnosis_list_id_fkey FOREIGN KEY (diagnosis_list_id) REFERENCES collections(id);
ALTER TABLE ONLY psychological_diagnoses
    ADD CONSTRAINT psychological_diagnoses_in_treatment_id_fkey FOREIGN KEY (in_treatment_id) REFERENCES branches(id);
ALTER TABLE ONLY psychological_diagnoses
    ADD CONSTRAINT psychological_diagnoses_treatment_list_id_fkey FOREIGN KEY (treatment_list_id) REFERENCES collections(id);

CREATE TABLE psychological_existings (
    id bigint NOT NULL,
    has_condition_id bigint,
    received_treatment_id bigint,
    explanation_id bigint,
    treatment_list_id bigint,
    did_not_follow_id bigint,
    did_not_follow_explanation_id bigint
);
ALTER TABLE psychological_existings OWNER TO postgres;
CREATE SEQUENCE psychological_existings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE psychological_existings_id_seq OWNER TO postgres;
ALTER SEQUENCE psychological_existings_id_seq OWNED BY psychological_existings.id;
ALTER TABLE ONLY psychological_existings
    ADD CONSTRAINT psychological_existings_pkey PRIMARY KEY (id);
ALTER TABLE ONLY psychological_existings
    ADD CONSTRAINT psychological_existings_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY psychological_existings
    ADD CONSTRAINT psychological_existings_has_condition_id_fkey FOREIGN KEY (has_condition_id) REFERENCES branches(id);
ALTER TABLE ONLY psychological_existings
    ADD CONSTRAINT psychological_existings_received_treatment_id_fkey FOREIGN KEY (received_treatment_id) REFERENCES radios(id);
ALTER TABLE ONLY psychological_existings
    ADD CONSTRAINT psychological_existings_explanation_id_fkey FOREIGN KEY (explanation_id) REFERENCES textareas(id);
ALTER TABLE ONLY psychological_existings
    ADD CONSTRAINT psychological_existings_treatment_list_id_fkey FOREIGN KEY (treatment_list_id) REFERENCES collections(id);
ALTER TABLE ONLY psychological_existings
    ADD CONSTRAINT psychological_existings_did_not_follow_id_fkey FOREIGN KEY (did_not_follow_id) REFERENCES branches(id);
ALTER TABLE ONLY psychological_existings
    ADD CONSTRAINT psychological_existings_did_not_follow_explanation_id_fkey FOREIGN KEY (did_not_follow_explanation_id) REFERENCES textareas(id);

CREATE TABLE psychological_hospitalizations (
    id bigint NOT NULL,
    hospitalized_id bigint,
    list_id bigint
);
ALTER TABLE psychological_hospitalizations OWNER TO postgres;
CREATE SEQUENCE psychological_hospitalizations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE psychological_hospitalizations_id_seq OWNER TO postgres;
ALTER SEQUENCE psychological_hospitalizations_id_seq OWNED BY psychological_hospitalizations.id;
ALTER TABLE ONLY psychological_hospitalizations
    ADD CONSTRAINT psychological_hospitalizations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY psychological_hospitalizations
    ADD CONSTRAINT psychological_hospitalizations_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY psychological_hospitalizations
    ADD CONSTRAINT psychological_hospitalizations_hospitalized_id_fkey FOREIGN KEY (hospitalized_id) REFERENCES branches(id);
ALTER TABLE ONLY psychological_hospitalizations
    ADD CONSTRAINT psychological_hospitalizations_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE psychological_competences;
DROP TABLE psychological_consultations;
DROP TABLE psychological_diagnoses;
DROP TABLE psychological_existings;
DROP TABLE psychological_hospitalizations;
