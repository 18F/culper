
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied

CREATE TABLE foreign_activities_benefits (
    id bigint NOT NULL,
    has_benefits_id bigint,
    list_id bigint
);
ALTER TABLE foreign_activities_benefits OWNER TO postgres;
CREATE SEQUENCE foreign_activities_benefits_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE foreign_activities_benefits_id_seq OWNER TO postgres;
ALTER SEQUENCE foreign_activities_benefits_id_seq OWNED BY foreign_activities_benefits.id;
ALTER TABLE ONLY foreign_activities_benefits
    ADD CONSTRAINT foreign_activities_benefits_pkey PRIMARY KEY (id);
ALTER TABLE ONLY foreign_activities_benefits
    ADD CONSTRAINT foreign_activities_benefits_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY foreign_activities_benefits
    ADD CONSTRAINT foreign_activities_benefits_has_benefits_id_fkey FOREIGN KEY (has_benefits_id) REFERENCES branches(id);
ALTER TABLE ONLY foreign_activities_benefits
    ADD CONSTRAINT foreign_activities_benefits_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE foreign_activities_directs (
    id bigint NOT NULL,
    has_interests_id bigint,
    list_id bigint
);
ALTER TABLE foreign_activities_directs OWNER TO postgres;
CREATE SEQUENCE foreign_activities_directs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE foreign_activities_directs_id_seq OWNER TO postgres;
ALTER SEQUENCE foreign_activities_directs_id_seq OWNED BY foreign_activities_directs.id;
ALTER TABLE ONLY foreign_activities_directs
    ADD CONSTRAINT foreign_activities_directs_pkey PRIMARY KEY (id);
ALTER TABLE ONLY foreign_activities_directs
    ADD CONSTRAINT foreign_activities_directs_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY foreign_activities_directs
    ADD CONSTRAINT foreign_activities_directs_has_interests_id_fkey FOREIGN KEY (has_interests_id) REFERENCES branches(id);
ALTER TABLE ONLY foreign_activities_directs
    ADD CONSTRAINT foreign_activities_directs_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE foreign_activities_indirects (
    id bigint NOT NULL,
    has_interests_id bigint,
    list_id bigint
);
ALTER TABLE foreign_activities_indirects OWNER TO postgres;
CREATE SEQUENCE foreign_activities_indirects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE foreign_activities_indirects_id_seq OWNER TO postgres;
ALTER SEQUENCE foreign_activities_indirects_id_seq OWNED BY foreign_activities_indirects.id;
ALTER TABLE ONLY foreign_activities_indirects
    ADD CONSTRAINT foreign_activities_indirects_pkey PRIMARY KEY (id);
ALTER TABLE ONLY foreign_activities_indirects
    ADD CONSTRAINT foreign_activities_indirects_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY foreign_activities_indirects
    ADD CONSTRAINT foreign_activities_indirects_has_interests_id_fkey FOREIGN KEY (has_interests_id) REFERENCES branches(id);
ALTER TABLE ONLY foreign_activities_indirects
    ADD CONSTRAINT foreign_activities_indirects_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE foreign_activities_real_estates (
    id bigint NOT NULL,
    has_interests_id bigint,
    list_id bigint
);
ALTER TABLE foreign_activities_real_estates OWNER TO postgres;
CREATE SEQUENCE foreign_activities_real_estates_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE foreign_activities_real_estates_id_seq OWNER TO postgres;
ALTER SEQUENCE foreign_activities_real_estates_id_seq OWNED BY foreign_activities_real_estates.id;
ALTER TABLE ONLY foreign_activities_real_estates
    ADD CONSTRAINT foreign_activities_real_estates_pkey PRIMARY KEY (id);
ALTER TABLE ONLY foreign_activities_real_estates
    ADD CONSTRAINT foreign_activities_real_estates_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY foreign_activities_real_estates
    ADD CONSTRAINT foreign_activities_real_estates_has_interests_id_fkey FOREIGN KEY (has_interests_id) REFERENCES branches(id);
ALTER TABLE ONLY foreign_activities_real_estates
    ADD CONSTRAINT foreign_activities_real_estates_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE foreign_activities_supports (
    id bigint NOT NULL,
    has_foreign_support_id bigint,
    list_id bigint
);
ALTER TABLE foreign_activities_supports OWNER TO postgres;
CREATE SEQUENCE foreign_activities_supports_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE foreign_activities_supports_id_seq OWNER TO postgres;
ALTER SEQUENCE foreign_activities_supports_id_seq OWNED BY foreign_activities_supports.id;
ALTER TABLE ONLY foreign_activities_supports
    ADD CONSTRAINT foreign_activities_supports_pkey PRIMARY KEY (id);
ALTER TABLE ONLY foreign_activities_supports
    ADD CONSTRAINT foreign_activities_supports_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY foreign_activities_supports
    ADD CONSTRAINT foreign_activities_supports_has_foreign_support_id_fkey FOREIGN KEY (has_foreign_support_id) REFERENCES branches(id);
ALTER TABLE ONLY foreign_activities_supports
    ADD CONSTRAINT foreign_activities_supports_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE foreign_business_advices (
    id bigint NOT NULL,
    has_foreign_advice_id bigint,
    list_id bigint
);
ALTER TABLE foreign_business_advices OWNER TO postgres;
CREATE SEQUENCE foreign_business_advices_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE foreign_business_advices_id_seq OWNER TO postgres;
ALTER SEQUENCE foreign_business_advices_id_seq OWNED BY foreign_business_advices.id;
ALTER TABLE ONLY foreign_business_advices
    ADD CONSTRAINT foreign_business_advices_pkey PRIMARY KEY (id);
ALTER TABLE ONLY foreign_business_advices
    ADD CONSTRAINT foreign_business_advices_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY foreign_business_advices
    ADD CONSTRAINT foreign_business_advices_has_foreign_advice_id_fkey FOREIGN KEY (has_foreign_advice_id) REFERENCES branches(id);
ALTER TABLE ONLY foreign_business_advices
    ADD CONSTRAINT foreign_business_advices_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE foreign_business_conferences (
    id bigint NOT NULL,
    has_foreign_conferences_id bigint,
    list_id bigint
);
ALTER TABLE foreign_business_conferences OWNER TO postgres;
CREATE SEQUENCE foreign_business_conferences_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE foreign_business_conferences_id_seq OWNER TO postgres;
ALTER SEQUENCE foreign_business_conferences_id_seq OWNED BY foreign_business_conferences.id;
ALTER TABLE ONLY foreign_business_conferences
    ADD CONSTRAINT foreign_business_conferences_pkey PRIMARY KEY (id);
ALTER TABLE ONLY foreign_business_conferences
    ADD CONSTRAINT foreign_business_conferences_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY foreign_business_conferences
    ADD CONSTRAINT foreign_business_conferences_has_foreign_conferences_id_fkey FOREIGN KEY (has_foreign_conferences_id) REFERENCES branches(id);
ALTER TABLE ONLY foreign_business_conferences
    ADD CONSTRAINT foreign_business_conferences_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE foreign_business_contacts (
    id bigint NOT NULL,
    has_foreign_contact_id bigint,
    list_id bigint
);
ALTER TABLE foreign_business_contacts OWNER TO postgres;
CREATE SEQUENCE foreign_business_contacts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE foreign_business_contacts_id_seq OWNER TO postgres;
ALTER SEQUENCE foreign_business_contacts_id_seq OWNED BY foreign_business_contacts.id;
ALTER TABLE ONLY foreign_business_contacts
    ADD CONSTRAINT foreign_business_contacts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY foreign_business_contacts
    ADD CONSTRAINT foreign_business_contacts_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY foreign_business_contacts
    ADD CONSTRAINT foreign_business_contacts_has_foreign_contact_id_fkey FOREIGN KEY (has_foreign_contact_id) REFERENCES branches(id);
ALTER TABLE ONLY foreign_business_contacts
    ADD CONSTRAINT foreign_business_contacts_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE foreign_business_employments (
    id bigint NOT NULL,
    has_foreign_employment_id bigint,
    list_id bigint
);
ALTER TABLE foreign_business_employments OWNER TO postgres;
CREATE SEQUENCE foreign_business_employments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE foreign_business_employments_id_seq OWNER TO postgres;
ALTER SEQUENCE foreign_business_employments_id_seq OWNED BY foreign_business_employments.id;
ALTER TABLE ONLY foreign_business_employments
    ADD CONSTRAINT foreign_business_employments_pkey PRIMARY KEY (id);
ALTER TABLE ONLY foreign_business_employments
    ADD CONSTRAINT foreign_business_employments_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY foreign_business_employments
    ADD CONSTRAINT foreign_business_employments_has_foreign_employment_id_fkey FOREIGN KEY (has_foreign_employment_id) REFERENCES branches(id);
ALTER TABLE ONLY foreign_business_employments
    ADD CONSTRAINT foreign_business_employments_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE foreign_business_families (
    id bigint NOT NULL,
    has_foreign_family_id bigint,
    list_id bigint
);
ALTER TABLE foreign_business_families OWNER TO postgres;
CREATE SEQUENCE foreign_business_families_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE foreign_business_families_id_seq OWNER TO postgres;
ALTER SEQUENCE foreign_business_families_id_seq OWNED BY foreign_business_families.id;
ALTER TABLE ONLY foreign_business_families
    ADD CONSTRAINT foreign_business_families_pkey PRIMARY KEY (id);
ALTER TABLE ONLY foreign_business_families
    ADD CONSTRAINT foreign_business_families_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY foreign_business_families
    ADD CONSTRAINT foreign_business_families_has_foreign_family_id_fkey FOREIGN KEY (has_foreign_family_id) REFERENCES branches(id);
ALTER TABLE ONLY foreign_business_families
    ADD CONSTRAINT foreign_business_families_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE foreign_business_politicals (
    id bigint NOT NULL,
    has_foreign_political_id bigint,
    list_id bigint
);
ALTER TABLE foreign_business_politicals OWNER TO postgres;
CREATE SEQUENCE foreign_business_politicals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE foreign_business_politicals_id_seq OWNER TO postgres;
ALTER SEQUENCE foreign_business_politicals_id_seq OWNED BY foreign_business_politicals.id;
ALTER TABLE ONLY foreign_business_politicals
    ADD CONSTRAINT foreign_business_politicals_pkey PRIMARY KEY (id);
ALTER TABLE ONLY foreign_business_politicals
    ADD CONSTRAINT foreign_business_politicals_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY foreign_business_politicals
    ADD CONSTRAINT foreign_business_politicals_has_foreign_political_id_fkey FOREIGN KEY (has_foreign_political_id) REFERENCES branches(id);
ALTER TABLE ONLY foreign_business_politicals
    ADD CONSTRAINT foreign_business_politicals_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE foreign_business_sponsorships (
    id bigint NOT NULL,
    has_foreign_sponsorship_id bigint,
    list_id bigint
);
ALTER TABLE foreign_business_sponsorships OWNER TO postgres;
CREATE SEQUENCE foreign_business_sponsorships_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE foreign_business_sponsorships_id_seq OWNER TO postgres;
ALTER SEQUENCE foreign_business_sponsorships_id_seq OWNED BY foreign_business_sponsorships.id;
ALTER TABLE ONLY foreign_business_sponsorships
    ADD CONSTRAINT foreign_business_sponsorships_pkey PRIMARY KEY (id);
ALTER TABLE ONLY foreign_business_sponsorships
    ADD CONSTRAINT foreign_business_sponsorships_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY foreign_business_sponsorships
    ADD CONSTRAINT foreign_business_sponsorships_has_foreign_sponsorship_id_fkey FOREIGN KEY (has_foreign_sponsorship_id) REFERENCES branches(id);
ALTER TABLE ONLY foreign_business_sponsorships
    ADD CONSTRAINT foreign_business_sponsorships_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE foreign_business_ventures (
    id bigint NOT NULL,
    has_foreign_ventures_id bigint,
    list_id bigint
);
ALTER TABLE foreign_business_ventures OWNER TO postgres;
CREATE SEQUENCE foreign_business_ventures_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE foreign_business_ventures_id_seq OWNER TO postgres;
ALTER SEQUENCE foreign_business_ventures_id_seq OWNED BY foreign_business_ventures.id;
ALTER TABLE ONLY foreign_business_ventures
    ADD CONSTRAINT foreign_business_ventures_pkey PRIMARY KEY (id);
ALTER TABLE ONLY foreign_business_ventures
    ADD CONSTRAINT foreign_business_ventures_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY foreign_business_ventures
    ADD CONSTRAINT foreign_business_ventures_has_foreign_ventures_id_fkey FOREIGN KEY (has_foreign_ventures_id) REFERENCES branches(id);
ALTER TABLE ONLY foreign_business_ventures
    ADD CONSTRAINT foreign_business_ventures_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE foreign_business_votings (
    id bigint NOT NULL,
    has_foreign_voting_id bigint,
    list_id bigint
);
ALTER TABLE foreign_business_votings OWNER TO postgres;
CREATE SEQUENCE foreign_business_votings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE foreign_business_votings_id_seq OWNER TO postgres;
ALTER SEQUENCE foreign_business_votings_id_seq OWNED BY foreign_business_votings.id;
ALTER TABLE ONLY foreign_business_votings
    ADD CONSTRAINT foreign_business_votings_pkey PRIMARY KEY (id);
ALTER TABLE ONLY foreign_business_votings
    ADD CONSTRAINT foreign_business_votings_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY foreign_business_votings
    ADD CONSTRAINT foreign_business_votings_has_foreign_voting_id_fkey FOREIGN KEY (has_foreign_voting_id) REFERENCES branches(id);
ALTER TABLE ONLY foreign_business_votings
    ADD CONSTRAINT foreign_business_votings_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE foreign_contacts (
    id bigint NOT NULL,
    has_foreign_contacts_id bigint,
    list_id bigint
);
ALTER TABLE foreign_contacts OWNER TO postgres;
CREATE SEQUENCE foreign_contacts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE foreign_contacts_id_seq OWNER TO postgres;
ALTER SEQUENCE foreign_contacts_id_seq OWNED BY foreign_contacts.id;
ALTER TABLE ONLY foreign_contacts
    ADD CONSTRAINT foreign_contacts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY foreign_contacts
    ADD CONSTRAINT foreign_contacts_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY foreign_contacts
    ADD CONSTRAINT foreign_contacts_has_foreign_contacts_id_fkey FOREIGN KEY (has_foreign_contacts_id) REFERENCES branches(id);
ALTER TABLE ONLY foreign_contacts
    ADD CONSTRAINT foreign_contacts_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE foreign_passports (
    id bigint NOT NULL,
    has_passports_id bigint,
    name_id bigint,
    card_id bigint,
    number_id bigint,
    issued_id bigint,
    expiration_id bigint,
    comments_id bigint
);
ALTER TABLE foreign_passports OWNER TO postgres;
CREATE SEQUENCE foreign_passports_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE foreign_passports_id_seq OWNER TO postgres;
ALTER SEQUENCE foreign_passports_id_seq OWNED BY foreign_passports.id;
ALTER TABLE ONLY foreign_passports
    ADD CONSTRAINT foreign_passports_pkey PRIMARY KEY (id);
ALTER TABLE ONLY foreign_passports
    ADD CONSTRAINT foreign_passports_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY foreign_passports
    ADD CONSTRAINT foreign_passports_has_passports_id_fkey FOREIGN KEY (has_passports_id) REFERENCES branches(id);
ALTER TABLE ONLY foreign_passports
    ADD CONSTRAINT foreign_passports_name_id_fkey FOREIGN KEY (name_id) REFERENCES names(id);
ALTER TABLE ONLY foreign_passports
    ADD CONSTRAINT foreign_passports_card_id_fkey FOREIGN KEY (card_id) REFERENCES radios(id);
ALTER TABLE ONLY foreign_passports
    ADD CONSTRAINT foreign_passports_number_id_fkey FOREIGN KEY (number_id) REFERENCES texts(id);
ALTER TABLE ONLY foreign_passports
    ADD CONSTRAINT foreign_passports_issued_id_fkey FOREIGN KEY (issued_id) REFERENCES date_controls(id);
ALTER TABLE ONLY foreign_passports
    ADD CONSTRAINT foreign_passports_expiration_id_fkey FOREIGN KEY (expiration_id) REFERENCES date_controls(id);
ALTER TABLE ONLY foreign_passports
    ADD CONSTRAINT foreign_passports_comments_id_fkey FOREIGN KEY (comments_id) REFERENCES textareas(id);

CREATE TABLE foreign_travels (
    id bigint NOT NULL,
    has_foreign_travel_outside_id bigint,
    has_foreign_travel_official_id bigint,
    list_id bigint
);
ALTER TABLE foreign_travels OWNER TO postgres;
CREATE SEQUENCE foreign_travels_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE foreign_travels_id_seq OWNER TO postgres;
ALTER SEQUENCE foreign_travels_id_seq OWNED BY foreign_travels.id;
ALTER TABLE ONLY foreign_travels
    ADD CONSTRAINT foreign_travels_pkey PRIMARY KEY (id);
ALTER TABLE ONLY foreign_travels
    ADD CONSTRAINT foreign_travels_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY foreign_travels
    ADD CONSTRAINT foreign_travels_has_foreign_travel_outside_id_fkey FOREIGN KEY (has_foreign_travel_outside_id) REFERENCES branches(id);
ALTER TABLE ONLY foreign_travels
    ADD CONSTRAINT foreign_travels_has_foreign_travel_official_id_fkey FOREIGN KEY (has_foreign_travel_official_id) REFERENCES branches(id);
ALTER TABLE ONLY foreign_travels
    ADD CONSTRAINT foreign_travels_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE foreign_activities_benefits;
DROP TABLE foreign_activities_directs;
DROP TABLE foreign_activities_indirects;
DROP TABLE foreign_activities_real_estates;
DROP TABLE foreign_activities_supports;
DROP TABLE foreign_business_advices;
DROP TABLE foreign_business_conferences;
DROP TABLE foreign_business_contacts;
DROP TABLE foreign_business_employments;
DROP TABLE foreign_business_families;
DROP TABLE foreign_business_politicals;
DROP TABLE foreign_business_sponsorships;
DROP TABLE foreign_business_ventures;
DROP TABLE foreign_business_votings;
DROP TABLE foreign_contacts;
DROP TABLE foreign_passports;
DROP TABLE foreign_travels;
