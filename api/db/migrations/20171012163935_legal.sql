
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied

CREATE TABLE legal_associations_activities_to_overthrows (
    id bigint NOT NULL,
    has_activities_id bigint,
    list_id bigint
);
ALTER TABLE legal_associations_activities_to_overthrows OWNER TO postgres;
CREATE SEQUENCE legal_associations_activities_to_overthrows_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE legal_associations_activities_to_overthrows_id_seq OWNER TO postgres;
ALTER SEQUENCE legal_associations_activities_to_overthrows_id_seq OWNED BY legal_associations_activities_to_overthrows.id;
ALTER TABLE ONLY legal_associations_activities_to_overthrows
    ADD CONSTRAINT legal_associations_activities_to_overthrows_pkey PRIMARY KEY (id);
ALTER TABLE ONLY legal_associations_activities_to_overthrows
    ADD CONSTRAINT legal_associations_activities_to_overthrows_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY legal_associations_activities_to_overthrows
    ADD CONSTRAINT legal_associations_activities_to_overthrows_has_activities_id_fkey FOREIGN KEY (has_activities_id) REFERENCES branches(id);
ALTER TABLE ONLY legal_associations_activities_to_overthrows
    ADD CONSTRAINT legal_associations_activities_to_overthrows_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE legal_associations_advocatings (
    id bigint NOT NULL,
    has_advocated_id bigint,
    list_id bigint
);
ALTER TABLE legal_associations_advocatings OWNER TO postgres;
CREATE SEQUENCE legal_associations_advocatings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE legal_associations_advocatings_id_seq OWNER TO postgres;
ALTER SEQUENCE legal_associations_advocatings_id_seq OWNED BY legal_associations_advocatings.id;
ALTER TABLE ONLY legal_associations_advocatings
    ADD CONSTRAINT legal_associations_advocatings_pkey PRIMARY KEY (id);
ALTER TABLE ONLY legal_associations_advocatings
    ADD CONSTRAINT legal_associations_advocatings_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY legal_associations_advocatings
    ADD CONSTRAINT legal_associations_advocatings_has_advocated_id_fkey FOREIGN KEY (has_advocated_id) REFERENCES branches(id);
ALTER TABLE ONLY legal_associations_advocatings
    ADD CONSTRAINT legal_associations_advocatings_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE legal_associations_engaged_in_terrorisms (
    id bigint NOT NULL,
    has_engaged_id bigint,
    list_id bigint
);
ALTER TABLE legal_associations_engaged_in_terrorisms OWNER TO postgres;
CREATE SEQUENCE legal_associations_engaged_in_terrorisms_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE legal_associations_engaged_in_terrorisms_id_seq OWNER TO postgres;
ALTER SEQUENCE legal_associations_engaged_in_terrorisms_id_seq OWNED BY legal_associations_engaged_in_terrorisms.id;
ALTER TABLE ONLY legal_associations_engaged_in_terrorisms
    ADD CONSTRAINT legal_associations_engaged_in_terrorisms_pkey PRIMARY KEY (id);
ALTER TABLE ONLY legal_associations_engaged_in_terrorisms
    ADD CONSTRAINT legal_associations_engaged_in_terrorisms_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY legal_associations_engaged_in_terrorisms
    ADD CONSTRAINT legal_associations_engaged_in_terrorisms_has_engaged_id_fkey FOREIGN KEY (has_engaged_id) REFERENCES branches(id);
ALTER TABLE ONLY legal_associations_engaged_in_terrorisms
    ADD CONSTRAINT legal_associations_engaged_in_terrorisms_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE legal_associations_membership_overthrows (
    id bigint NOT NULL,
    has_overthrow_id bigint,
    list_id bigint
);
ALTER TABLE legal_associations_membership_overthrows OWNER TO postgres;
CREATE SEQUENCE legal_associations_membership_overthrows_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE legal_associations_membership_overthrows_id_seq OWNER TO postgres;
ALTER SEQUENCE legal_associations_membership_overthrows_id_seq OWNED BY legal_associations_membership_overthrows.id;
ALTER TABLE ONLY legal_associations_membership_overthrows
    ADD CONSTRAINT legal_associations_membership_overthrows_pkey PRIMARY KEY (id);
ALTER TABLE ONLY legal_associations_membership_overthrows
    ADD CONSTRAINT legal_associations_membership_overthrows_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY legal_associations_membership_overthrows
    ADD CONSTRAINT legal_associations_membership_overthrows_has_overthrow_id_fkey FOREIGN KEY (has_overthrow_id) REFERENCES branches(id);
ALTER TABLE ONLY legal_associations_membership_overthrows
    ADD CONSTRAINT legal_associations_membership_overthrows_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE legal_associations_membership_violences (
    id bigint NOT NULL,
    has_violence_id bigint,
    list_id bigint
);
ALTER TABLE legal_associations_membership_violences OWNER TO postgres;
CREATE SEQUENCE legal_associations_membership_violences_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE legal_associations_membership_violences_id_seq OWNER TO postgres;
ALTER SEQUENCE legal_associations_membership_violences_id_seq OWNED BY legal_associations_membership_violences.id;
ALTER TABLE ONLY legal_associations_membership_violences
    ADD CONSTRAINT legal_associations_membership_violences_pkey PRIMARY KEY (id);
ALTER TABLE ONLY legal_associations_membership_violences
    ADD CONSTRAINT legal_associations_membership_violences_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY legal_associations_membership_violences
    ADD CONSTRAINT legal_associations_membership_violences_has_violence_id_fkey FOREIGN KEY (has_violence_id) REFERENCES branches(id);
ALTER TABLE ONLY legal_associations_membership_violences
    ADD CONSTRAINT legal_associations_membership_violences_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE legal_associations_terrorism_associations (
    id bigint NOT NULL,
    has_terrorism_id bigint,
    explanation_id bigint
);
ALTER TABLE legal_associations_terrorism_associations OWNER TO postgres;
CREATE SEQUENCE legal_associations_terrorism_associations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE legal_associations_terrorism_associations_id_seq OWNER TO postgres;
ALTER SEQUENCE legal_associations_terrorism_associations_id_seq OWNED BY legal_associations_terrorism_associations.id;
ALTER TABLE ONLY legal_associations_terrorism_associations
    ADD CONSTRAINT legal_associations_terrorism_associations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY legal_associations_terrorism_associations
    ADD CONSTRAINT legal_associations_terrorism_associations_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY legal_associations_terrorism_associations
    ADD CONSTRAINT legal_associations_terrorism_associations_has_terrorism_id_fkey FOREIGN KEY (has_terrorism_id) REFERENCES branches(id);
ALTER TABLE ONLY legal_associations_terrorism_associations
    ADD CONSTRAINT legal_associations_terrorism_associations_explanation_id_fkey FOREIGN KEY (explanation_id) REFERENCES collections(id);

CREATE TABLE legal_associations_terrorist_organizations (
    id bigint NOT NULL,
    has_terrorist_id bigint,
    list_id bigint
);
ALTER TABLE legal_associations_terrorist_organizations OWNER TO postgres;
CREATE SEQUENCE legal_associations_terrorist_organizations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE legal_associations_terrorist_organizations_id_seq OWNER TO postgres;
ALTER SEQUENCE legal_associations_terrorist_organizations_id_seq OWNED BY legal_associations_terrorist_organizations.id;
ALTER TABLE ONLY legal_associations_terrorist_organizations
    ADD CONSTRAINT legal_associations_terrorist_organizations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY legal_associations_terrorist_organizations
    ADD CONSTRAINT legal_associations_terrorist_organizations_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY legal_associations_terrorist_organizations
    ADD CONSTRAINT legal_associations_terrorist_organizations_has_terrorist_id_fkey FOREIGN KEY (has_terrorist_id) REFERENCES branches(id);
ALTER TABLE ONLY legal_associations_terrorist_organizations
    ADD CONSTRAINT legal_associations_terrorist_organizations_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE legal_courts (
    id bigint NOT NULL,
    has_court_actions_id bigint,
    list_id bigint
);
ALTER TABLE legal_courts OWNER TO postgres;
CREATE SEQUENCE legal_courts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE legal_courts_id_seq OWNER TO postgres;
ALTER SEQUENCE legal_courts_id_seq OWNED BY legal_courts.id;
ALTER TABLE ONLY legal_courts
    ADD CONSTRAINT legal_courts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY legal_courts
    ADD CONSTRAINT legal_courts_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY legal_courts
    ADD CONSTRAINT legal_courts_has_court_actions_id_fkey FOREIGN KEY (has_court_actions_id) REFERENCES branches(id);
ALTER TABLE ONLY legal_courts
    ADD CONSTRAINT legal_courts_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE legal_investigations_debarreds (
    id bigint NOT NULL,
    has_debarment_id bigint,
    list_id bigint
);
ALTER TABLE legal_investigations_debarreds OWNER TO postgres;
CREATE SEQUENCE legal_investigations_debarreds_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE legal_investigations_debarreds_id_seq OWNER TO postgres;
ALTER SEQUENCE legal_investigations_debarreds_id_seq OWNED BY legal_investigations_debarreds.id;
ALTER TABLE ONLY legal_investigations_debarreds
    ADD CONSTRAINT legal_investigations_debarreds_pkey PRIMARY KEY (id);
ALTER TABLE ONLY legal_investigations_debarreds
    ADD CONSTRAINT legal_investigations_debarreds_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY legal_investigations_debarreds
    ADD CONSTRAINT legal_investigations_debarreds_has_debarment_id_fkey FOREIGN KEY (has_debarment_id) REFERENCES branches(id);
ALTER TABLE ONLY legal_investigations_debarreds
    ADD CONSTRAINT legal_investigations_debarreds_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE legal_investigations_histories (
    id bigint NOT NULL,
    has_history_id bigint,
    list_id bigint
);
ALTER TABLE legal_investigations_histories OWNER TO postgres;
CREATE SEQUENCE legal_investigations_histories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE legal_investigations_histories_id_seq OWNER TO postgres;
ALTER SEQUENCE legal_investigations_histories_id_seq OWNED BY legal_investigations_histories.id;
ALTER TABLE ONLY legal_investigations_histories
    ADD CONSTRAINT legal_investigations_histories_pkey PRIMARY KEY (id);
ALTER TABLE ONLY legal_investigations_histories
    ADD CONSTRAINT legal_investigations_histories_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY legal_investigations_histories
    ADD CONSTRAINT legal_investigations_histories_has_history_id_fkey FOREIGN KEY (has_history_id) REFERENCES branches(id);
ALTER TABLE ONLY legal_investigations_histories
    ADD CONSTRAINT legal_investigations_histories_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE legal_investigations_revokeds (
    id bigint NOT NULL,
    has_revocations_id bigint,
    list_id bigint
);
ALTER TABLE legal_investigations_revokeds OWNER TO postgres;
CREATE SEQUENCE legal_investigations_revokeds_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE legal_investigations_revokeds_id_seq OWNER TO postgres;
ALTER SEQUENCE legal_investigations_revokeds_id_seq OWNED BY legal_investigations_revokeds.id;
ALTER TABLE ONLY legal_investigations_revokeds
    ADD CONSTRAINT legal_investigations_revokeds_pkey PRIMARY KEY (id);
ALTER TABLE ONLY legal_investigations_revokeds
    ADD CONSTRAINT legal_investigations_revokeds_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY legal_investigations_revokeds
    ADD CONSTRAINT legal_investigations_revokeds_has_revocations_id_fkey FOREIGN KEY (has_revocations_id) REFERENCES branches(id);
ALTER TABLE ONLY legal_investigations_revokeds
    ADD CONSTRAINT legal_investigations_revokeds_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE legal_police_additional_offenses (
    id bigint NOT NULL,
    has_other_offenses_id bigint,
    list_id bigint
);
ALTER TABLE legal_police_additional_offenses OWNER TO postgres;
CREATE SEQUENCE legal_police_additional_offenses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE legal_police_additional_offenses_id_seq OWNER TO postgres;
ALTER SEQUENCE legal_police_additional_offenses_id_seq OWNED BY legal_police_additional_offenses.id;
ALTER TABLE ONLY legal_police_additional_offenses
    ADD CONSTRAINT legal_police_additional_offenses_pkey PRIMARY KEY (id);
ALTER TABLE ONLY legal_police_additional_offenses
    ADD CONSTRAINT legal_police_additional_offenses_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY legal_police_additional_offenses
    ADD CONSTRAINT legal_police_additional_offenses_has_other_offenses_id_fkey FOREIGN KEY (has_other_offenses_id) REFERENCES branches(id);
ALTER TABLE ONLY legal_police_additional_offenses
    ADD CONSTRAINT legal_police_additional_offenses_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE legal_police_domestic_violences (
    id bigint NOT NULL,
    list_id bigint
);
ALTER TABLE legal_police_domestic_violences OWNER TO postgres;
CREATE SEQUENCE legal_police_domestic_violences_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE legal_police_domestic_violences_id_seq OWNER TO postgres;
ALTER SEQUENCE legal_police_domestic_violences_id_seq OWNED BY legal_police_domestic_violences.id;
ALTER TABLE ONLY legal_police_domestic_violences
    ADD CONSTRAINT legal_police_domestic_violences_pkey PRIMARY KEY (id);
ALTER TABLE ONLY legal_police_domestic_violences
    ADD CONSTRAINT legal_police_domestic_violences_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY legal_police_domestic_violences
    ADD CONSTRAINT legal_police_domestic_violences_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE legal_police_offenses (
    id bigint NOT NULL,
    has_offenses_id bigint,
    list_id bigint
);
ALTER TABLE legal_police_offenses OWNER TO postgres;
CREATE SEQUENCE legal_police_offenses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE legal_police_offenses_id_seq OWNER TO postgres;
ALTER SEQUENCE legal_police_offenses_id_seq OWNED BY legal_police_offenses.id;
ALTER TABLE ONLY legal_police_offenses
    ADD CONSTRAINT legal_police_offenses_pkey PRIMARY KEY (id);
ALTER TABLE ONLY legal_police_offenses
    ADD CONSTRAINT legal_police_offenses_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY legal_police_offenses
    ADD CONSTRAINT legal_police_offenses_has_offenses_id_fkey FOREIGN KEY (has_offenses_id) REFERENCES branches(id);
ALTER TABLE ONLY legal_police_offenses
    ADD CONSTRAINT legal_police_offenses_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE legal_technology_manipulatings (
    id bigint NOT NULL,
    has_manipulating_id bigint,
    list_id bigint
);
ALTER TABLE legal_technology_manipulatings OWNER TO postgres;
CREATE SEQUENCE legal_technology_manipulatings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE legal_technology_manipulatings_id_seq OWNER TO postgres;
ALTER SEQUENCE legal_technology_manipulatings_id_seq OWNED BY legal_technology_manipulatings.id;
ALTER TABLE ONLY legal_technology_manipulatings
    ADD CONSTRAINT legal_technology_manipulatings_pkey PRIMARY KEY (id);
ALTER TABLE ONLY legal_technology_manipulatings
    ADD CONSTRAINT legal_technology_manipulatings_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY legal_technology_manipulatings
    ADD CONSTRAINT legal_technology_manipulatings_has_manipulating_id_fkey FOREIGN KEY (has_manipulating_id) REFERENCES branches(id);
ALTER TABLE ONLY legal_technology_manipulatings
    ADD CONSTRAINT legal_technology_manipulatings_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE legal_technology_unauthorizeds (
    id bigint NOT NULL,
    has_unauthorized_id bigint,
    list_id bigint
);
ALTER TABLE legal_technology_unauthorizeds OWNER TO postgres;
CREATE SEQUENCE legal_technology_unauthorizeds_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE legal_technology_unauthorizeds_id_seq OWNER TO postgres;
ALTER SEQUENCE legal_technology_unauthorizeds_id_seq OWNED BY legal_technology_unauthorizeds.id;
ALTER TABLE ONLY legal_technology_unauthorizeds
    ADD CONSTRAINT legal_technology_unauthorizeds_pkey PRIMARY KEY (id);
ALTER TABLE ONLY legal_technology_unauthorizeds
    ADD CONSTRAINT legal_technology_unauthorizeds_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY legal_technology_unauthorizeds
    ADD CONSTRAINT legal_technology_unauthorizeds_has_unauthorized_id_fkey FOREIGN KEY (has_unauthorized_id) REFERENCES branches(id);
ALTER TABLE ONLY legal_technology_unauthorizeds
    ADD CONSTRAINT legal_technology_unauthorizeds_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE legal_technology_unlawfuls (
    id bigint NOT NULL,
    has_unlawful_id bigint,
    list_id bigint
);
ALTER TABLE legal_technology_unlawfuls OWNER TO postgres;
CREATE SEQUENCE legal_technology_unlawfuls_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE legal_technology_unlawfuls_id_seq OWNER TO postgres;
ALTER SEQUENCE legal_technology_unlawfuls_id_seq OWNED BY legal_technology_unlawfuls.id;
ALTER TABLE ONLY legal_technology_unlawfuls
    ADD CONSTRAINT legal_technology_unlawfuls_pkey PRIMARY KEY (id);
ALTER TABLE ONLY legal_technology_unlawfuls
    ADD CONSTRAINT legal_technology_unlawfuls_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY legal_technology_unlawfuls
    ADD CONSTRAINT legal_technology_unlawfuls_has_unlawful_id_fkey FOREIGN KEY (has_unlawful_id) REFERENCES branches(id);
ALTER TABLE ONLY legal_technology_unlawfuls
    ADD CONSTRAINT legal_technology_unlawfuls_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
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
