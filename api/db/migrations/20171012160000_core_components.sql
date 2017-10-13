
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied

CREATE TABLE branches (
    id bigint NOT NULL,
    value text
);
ALTER TABLE branches OWNER TO postgres;
CREATE SEQUENCE branches_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE branches_id_seq OWNER TO postgres;
ALTER SEQUENCE branches_id_seq OWNED BY branches.id;
ALTER TABLE ONLY branches
    ADD CONSTRAINT branches_pkey PRIMARY KEY (id);

CREATE TABLE checkbox_groups (
    id bigint NOT NULL,
    "values" jsonb
);
ALTER TABLE checkbox_groups OWNER TO postgres;
CREATE SEQUENCE checkbox_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE checkbox_groups_id_seq OWNER TO postgres;
ALTER SEQUENCE checkbox_groups_id_seq OWNED BY checkbox_groups.id;
ALTER TABLE ONLY checkbox_groups
    ADD CONSTRAINT checkbox_groups_pkey PRIMARY KEY (id);

CREATE TABLE checkboxes (
    id bigint NOT NULL,
    value text,
    checked boolean
);
ALTER TABLE checkboxes OWNER TO postgres;
CREATE SEQUENCE checkboxes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE checkboxes_id_seq OWNER TO postgres;
ALTER SEQUENCE checkboxes_id_seq OWNED BY checkboxes.id;
ALTER TABLE ONLY checkboxes
    ADD CONSTRAINT checkboxes_pkey PRIMARY KEY (id);

CREATE TABLE civil_unions (
    id bigint NOT NULL,
    account_id bigint NOT NULL,
    name text NOT NULL,
    "table" text,
    item_id bigint
);
ALTER TABLE civil_unions OWNER TO postgres;
CREATE SEQUENCE civil_unions_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE civil_unions_account_id_seq OWNER TO postgres;
ALTER SEQUENCE civil_unions_account_id_seq OWNED BY civil_unions.account_id;
CREATE SEQUENCE civil_unions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE civil_unions_id_seq OWNER TO postgres;
ALTER SEQUENCE civil_unions_id_seq OWNED BY civil_unions.id;
ALTER TABLE ONLY civil_unions
    ADD CONSTRAINT civil_unions_pkey PRIMARY KEY (id, account_id, name);
ALTER TABLE ONLY civil_unions
    ADD CONSTRAINT civil_unions_account_id_fkey FOREIGN KEY (account_id) REFERENCES accounts(id);

CREATE TABLE collections (
    id bigint NOT NULL,
    account_id bigint,
    branch_id bigint
);
ALTER TABLE collections OWNER TO postgres;
CREATE SEQUENCE collections_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE collections_id_seq OWNER TO postgres;
ALTER SEQUENCE collections_id_seq OWNED BY collections.id;
ALTER TABLE ONLY collections
    ADD CONSTRAINT collections_pkey PRIMARY KEY (id);
ALTER TABLE ONLY collections
    ADD CONSTRAINT collections_account_id_fkey FOREIGN KEY (account_id) REFERENCES accounts(id);
ALTER TABLE ONLY collections
    ADD CONSTRAINT collections_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES branches(id);

CREATE TABLE collection_items (
    id bigint NOT NULL,
    index bigint NOT NULL,
    name text NOT NULL,
    type text,
    item_id bigint
);
ALTER TABLE collection_items OWNER TO postgres;
CREATE SEQUENCE collection_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE collection_items_id_seq OWNER TO postgres;
ALTER SEQUENCE collection_items_id_seq OWNED BY collection_items.id;
CREATE SEQUENCE collection_items_index_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE collection_items_index_seq OWNER TO postgres;
ALTER SEQUENCE collection_items_index_seq OWNED BY collection_items.index;
ALTER TABLE ONLY collection_items
    ADD CONSTRAINT collection_items_pkey PRIMARY KEY (id, index, name);
ALTER TABLE ONLY collection_items
    ADD CONSTRAINT collection_items_collection_id_fkey FOREIGN KEY (id) REFERENCES collections(id);

CREATE TABLE contacts (
    id bigint NOT NULL,
    account_id bigint,
    list_id bigint
);
ALTER TABLE contacts OWNER TO postgres;
CREATE SEQUENCE contacts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE contacts_id_seq OWNER TO postgres;
ALTER SEQUENCE contacts_id_seq OWNED BY contacts.id;
ALTER TABLE ONLY contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY contacts
    ADD CONSTRAINT contacts_account_id_fkey FOREIGN KEY (account_id) REFERENCES accounts(id);
ALTER TABLE ONLY contacts
    ADD CONSTRAINT contacts_collection_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE countries (
    id bigint NOT NULL,
    value text,
    comments text
);
ALTER TABLE countries OWNER TO postgres;
CREATE SEQUENCE countries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE countries_id_seq OWNER TO postgres;
ALTER SEQUENCE countries_id_seq OWNED BY countries.id;
ALTER TABLE ONLY countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);

CREATE TABLE date_controls (
    id bigint NOT NULL,
    month text,
    day text,
    year text,
    estimated boolean,
    date timestamp with time zone
);
ALTER TABLE date_controls OWNER TO postgres;
CREATE SEQUENCE date_controls_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE date_controls_id_seq OWNER TO postgres;
ALTER SEQUENCE date_controls_id_seq OWNED BY date_controls.id;
ALTER TABLE ONLY date_controls
    ADD CONSTRAINT date_controls_pkey PRIMARY KEY (id);

CREATE TABLE date_ranges (
    present boolean,
    id bigint NOT NULL,
    account_id bigint,
    from_id bigint,
    to_id bigint
);
ALTER TABLE date_ranges OWNER TO postgres;
CREATE SEQUENCE date_ranges_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE date_ranges_id_seq OWNER TO postgres;
ALTER SEQUENCE date_ranges_id_seq OWNED BY date_ranges.id;
ALTER TABLE ONLY date_ranges
    ADD CONSTRAINT date_ranges_pkey PRIMARY KEY (id);
ALTER TABLE ONLY date_ranges
    ADD CONSTRAINT date_ranges_account_id_fkey FOREIGN KEY (account_id) REFERENCES accounts(id);
ALTER TABLE ONLY date_ranges
    ADD CONSTRAINT date_ranges_from_id_fkey FOREIGN KEY (from_id) REFERENCES date_controls(id);
ALTER TABLE ONLY date_ranges
    ADD CONSTRAINT date_ranges_to_id_fkey FOREIGN KEY (to_id) REFERENCES date_controls(id);

CREATE TABLE emails (
    id bigint NOT NULL,
    value text
);
ALTER TABLE emails OWNER TO postgres;
CREATE SEQUENCE emails_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE emails_id_seq OWNER TO postgres;
ALTER SEQUENCE emails_id_seq OWNED BY emails.id;
ALTER TABLE ONLY emails
    ADD CONSTRAINT emails_pkey PRIMARY KEY (id);

CREATE TABLE employment_activities (
    id bigint NOT NULL,
    value text,
    other_explanation text
);
ALTER TABLE employment_activities OWNER TO postgres;
CREATE SEQUENCE employment_activities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE employment_activities_id_seq OWNER TO postgres;
ALTER SEQUENCE employment_activities_id_seq OWNED BY employment_activities.id;
ALTER TABLE ONLY employment_activities
    ADD CONSTRAINT employment_activities_pkey PRIMARY KEY (id);

CREATE TABLE heights (
    id bigint NOT NULL,
    feet bigint,
    inches bigint
);
ALTER TABLE heights OWNER TO postgres;
CREATE SEQUENCE heights_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE heights_id_seq OWNER TO postgres;
ALTER SEQUENCE heights_id_seq OWNED BY heights.id;
ALTER TABLE ONLY heights
    ADD CONSTRAINT heights_pkey PRIMARY KEY (id);

CREATE TABLE locations (
    id bigint NOT NULL,
    layout text,
    street1 text,
    street2 text,
    city text,
    state text,
    zipcode text,
    county text,
    country text,
    validated boolean
);
ALTER TABLE locations OWNER TO postgres;
CREATE SEQUENCE locations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE locations_id_seq OWNER TO postgres;
ALTER SEQUENCE locations_id_seq OWNED BY locations.id;
ALTER TABLE ONLY locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);

CREATE TABLE names (
    id bigint NOT NULL,
    first text,
    first_initial_only boolean,
    middle text,
    middle_initial_only boolean,
    no_middle_name boolean,
    last text,
    last_initial_only boolean,
    suffix text,
    suffix_other text
);
ALTER TABLE names OWNER TO postgres;
CREATE SEQUENCE names_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE names_id_seq OWNER TO postgres;
ALTER SEQUENCE names_id_seq OWNED BY names.id;
ALTER TABLE ONLY names
    ADD CONSTRAINT names_pkey PRIMARY KEY (id);

CREATE TABLE not_applicables (
    id bigint NOT NULL,
    applicable boolean
);
ALTER TABLE not_applicables OWNER TO postgres;
CREATE SEQUENCE not_applicables_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE not_applicables_id_seq OWNER TO postgres;
ALTER SEQUENCE not_applicables_id_seq OWNED BY not_applicables.id;
ALTER TABLE ONLY not_applicables
    ADD CONSTRAINT not_applicables_pkey PRIMARY KEY (id);

CREATE TABLE numbers (
    id bigint NOT NULL,
    value text
);
ALTER TABLE numbers OWNER TO postgres;
CREATE SEQUENCE numbers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE numbers_id_seq OWNER TO postgres;
ALTER SEQUENCE numbers_id_seq OWNED BY numbers.id;
ALTER TABLE ONLY numbers
    ADD CONSTRAINT numbers_pkey PRIMARY KEY (id);

CREATE TABLE radios (
    id bigint NOT NULL,
    value text,
    checked boolean
);
ALTER TABLE radios OWNER TO postgres;
CREATE SEQUENCE radios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE radios_id_seq OWNER TO postgres;
ALTER SEQUENCE radios_id_seq OWNED BY radios.id;
ALTER TABLE ONLY radios
    ADD CONSTRAINT radios_pkey PRIMARY KEY (id);

CREATE TABLE ssns (
    id bigint NOT NULL,
    first text,
    middle text,
    last text,
    not_applicable boolean
);
ALTER TABLE ssns OWNER TO postgres;
CREATE SEQUENCE ssns_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE ssns_id_seq OWNER TO postgres;
ALTER SEQUENCE ssns_id_seq OWNED BY ssns.id;
ALTER TABLE ONLY ssns
    ADD CONSTRAINT ssns_pkey PRIMARY KEY (id);

CREATE TABLE telephones (
    id bigint NOT NULL,
    time_of_day text,
    type text,
    number_type text,
    number text,
    extension text,
    no_number boolean
);
ALTER TABLE telephones OWNER TO postgres;
CREATE SEQUENCE telephones_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE telephones_id_seq OWNER TO postgres;
ALTER SEQUENCE telephones_id_seq OWNED BY telephones.id;
ALTER TABLE ONLY telephones
    ADD CONSTRAINT telephones_pkey PRIMARY KEY (id);

CREATE TABLE textareas (
    id bigint NOT NULL,
    value text
);
ALTER TABLE textareas OWNER TO postgres;
CREATE SEQUENCE textareas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE textareas_id_seq OWNER TO postgres;
ALTER SEQUENCE textareas_id_seq OWNED BY textareas.id;
ALTER TABLE ONLY textareas
    ADD CONSTRAINT textareas_pkey PRIMARY KEY (id);

CREATE TABLE texts (
    id bigint NOT NULL,
    value text
);
ALTER TABLE texts OWNER TO postgres;
CREATE SEQUENCE texts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE texts_id_seq OWNER TO postgres;
ALTER SEQUENCE texts_id_seq OWNED BY texts.id;
ALTER TABLE ONLY texts
    ADD CONSTRAINT texts_pkey PRIMARY KEY (id);

CREATE TABLE treatments (
    id bigint NOT NULL,
    name_id bigint,
    phone_id bigint,
    address_id bigint
);
ALTER TABLE treatments OWNER TO postgres;
CREATE SEQUENCE treatments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE treatments_id_seq OWNER TO postgres;
ALTER SEQUENCE treatments_id_seq OWNED BY treatments.id;
ALTER TABLE ONLY treatments
    ADD CONSTRAINT treatments_pkey PRIMARY KEY (id);
ALTER TABLE ONLY treatments
    ADD CONSTRAINT treatments_name_id_fkey FOREIGN KEY (name_id) REFERENCES texts(id);
ALTER TABLE ONLY treatments
    ADD CONSTRAINT treatments_phone_id_fkey FOREIGN KEY (phone_id) REFERENCES telephones(id);
ALTER TABLE ONLY treatments
    ADD CONSTRAINT treatments_address_id_fkey FOREIGN KEY (address_id) REFERENCES locations(id);

CREATE TABLE benefits (
    id bigint NOT NULL,
    account_id bigint,
    begin_id bigint,
    end_id bigint,
    frequency_id bigint,
    other_frequency_id bigint,
    received_id bigint,
    country_id bigint,
    value_id bigint,
    value_estimated_id bigint,
    reason_id bigint,
    obligated_id bigint,
    obligated_explanation_id bigint
);
ALTER TABLE benefits OWNER TO postgres;
CREATE SEQUENCE benefits_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE benefits_id_seq OWNER TO postgres;
ALTER SEQUENCE benefits_id_seq OWNED BY benefits.id;
ALTER TABLE ONLY benefits
    ADD CONSTRAINT benefits_pkey PRIMARY KEY (id);
ALTER TABLE ONLY benefits
    ADD CONSTRAINT benefits_account_id_fkey FOREIGN KEY (account_id) REFERENCES accounts(id);
ALTER TABLE ONLY benefits
    ADD CONSTRAINT benefits_begin_id_fkey FOREIGN KEY (begin_id) REFERENCES date_controls(id);
ALTER TABLE ONLY benefits
    ADD CONSTRAINT benefits_end_id_fkey FOREIGN KEY (end_id) REFERENCES date_controls(id);
ALTER TABLE ONLY benefits
    ADD CONSTRAINT benefits_frequency_id_fkey FOREIGN KEY (frequency_id) REFERENCES radios(id);
ALTER TABLE ONLY benefits
    ADD CONSTRAINT benefits_other_frequency_id_fkey FOREIGN KEY (other_frequency_id) REFERENCES textareas(id);
ALTER TABLE ONLY benefits
    ADD CONSTRAINT benefits_received_id_fkey FOREIGN KEY (received_id) REFERENCES date_controls(id);
ALTER TABLE ONLY benefits
    ADD CONSTRAINT benefits_country_id_fkey FOREIGN KEY (country_id) REFERENCES countries(id);
ALTER TABLE ONLY benefits
    ADD CONSTRAINT benefits_value_id_fkey FOREIGN KEY (value_id) REFERENCES numbers(id);
ALTER TABLE ONLY benefits
    ADD CONSTRAINT benefits_value_estimated_id_fkey FOREIGN KEY (value_estimated_id) REFERENCES checkboxes(id);
ALTER TABLE ONLY benefits
    ADD CONSTRAINT benefits_reason_id_fkey FOREIGN KEY (reason_id) REFERENCES textareas(id);
ALTER TABLE ONLY benefits
    ADD CONSTRAINT benefits_obligated_id_fkey FOREIGN KEY (obligated_id) REFERENCES branches(id);
ALTER TABLE ONLY benefits
    ADD CONSTRAINT benefits_obligated_explanation_id_fkey FOREIGN KEY (obligated_explanation_id) REFERENCES textareas(id);

CREATE TABLE clearance_levels (
    id bigint NOT NULL,
    account_id bigint,
    level_id bigint,
    explanation_id bigint
);
ALTER TABLE clearance_levels OWNER TO postgres;
CREATE SEQUENCE clearance_levels_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE clearance_levels_id_seq OWNER TO postgres;
ALTER SEQUENCE clearance_levels_id_seq OWNED BY clearance_levels.id;
ALTER TABLE ONLY clearance_levels
    ADD CONSTRAINT clearance_levels_pkey PRIMARY KEY (id);
ALTER TABLE ONLY clearance_levels
    ADD CONSTRAINT clearance_levels_account_id_fkey FOREIGN KEY (account_id) REFERENCES accounts(id);
ALTER TABLE ONLY clearance_levels
    ADD CONSTRAINT clearance_levels_level_id_fkey FOREIGN KEY (level_id) REFERENCES radios(id);
ALTER TABLE ONLY clearance_levels
    ADD CONSTRAINT clearance_levels_explanation_id_fkey FOREIGN KEY (explanation_id) REFERENCES textareas(id);

CREATE TABLE co_owners (
    id bigint NOT NULL,
    account_id bigint,
    list_id bigint
);
ALTER TABLE co_owners OWNER TO postgres;
CREATE SEQUENCE co_owners_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE co_owners_id_seq OWNER TO postgres;
ALTER SEQUENCE co_owners_id_seq OWNED BY co_owners.id;
ALTER TABLE ONLY co_owners
    ADD CONSTRAINT co_owners_pkey PRIMARY KEY (id);
ALTER TABLE ONLY co_owners
    ADD CONSTRAINT co_owners_account_id_fkey FOREIGN KEY (account_id) REFERENCES accounts(id);
ALTER TABLE ONLY co_owners
    ADD CONSTRAINT co_owners_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE foreign_born_documents (
    id bigint NOT NULL,
    account_id bigint,
    document_type_id bigint,
    other_explanation_id bigint,
    document_number_id bigint,
    document_expiration_id bigint,
    document_expiration_not_applicable_id bigint
);
ALTER TABLE foreign_born_documents OWNER TO postgres;
CREATE SEQUENCE foreign_born_documents_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE foreign_born_documents_id_seq OWNER TO postgres;
ALTER SEQUENCE foreign_born_documents_id_seq OWNED BY foreign_born_documents.id;
ALTER TABLE ONLY foreign_born_documents
    ADD CONSTRAINT foreign_born_documents_pkey PRIMARY KEY (id);
ALTER TABLE ONLY foreign_born_documents
    ADD CONSTRAINT foreign_born_documents_account_id_fkey FOREIGN KEY (account_id) REFERENCES accounts(id);
ALTER TABLE ONLY foreign_born_documents
    ADD CONSTRAINT foreign_born_documents_document_type_id_fkey FOREIGN KEY (document_type_id) REFERENCES radios(id);
ALTER TABLE ONLY foreign_born_documents
    ADD CONSTRAINT foreign_born_documents_other_explanation_id_fkey FOREIGN KEY (other_explanation_id) REFERENCES textareas(id);
ALTER TABLE ONLY foreign_born_documents
    ADD CONSTRAINT foreign_born_documents_document_number_id_fkey FOREIGN KEY (document_number_id) REFERENCES texts(id);
ALTER TABLE ONLY foreign_born_documents
    ADD CONSTRAINT foreign_born_documents_document_expiration_id_fkey FOREIGN KEY (document_expiration_id) REFERENCES date_controls(id);
ALTER TABLE ONLY foreign_born_documents
    ADD CONSTRAINT foreign_born_documents_document_expiration_not_applicable_id_fkey FOREIGN KEY (document_expiration_not_applicable_id) REFERENCES not_applicables(id);

CREATE TABLE physical_addresses (
    id bigint NOT NULL,
    account_id bigint,
    has_different_address_id bigint,
    address_id bigint,
    telephone_id bigint
);
ALTER TABLE physical_addresses OWNER TO postgres;
CREATE SEQUENCE physical_addresses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE physical_addresses_id_seq OWNER TO postgres;
ALTER SEQUENCE physical_addresses_id_seq OWNED BY physical_addresses.id;
ALTER TABLE ONLY physical_addresses
    ADD CONSTRAINT physical_addresses_pkey PRIMARY KEY (id);
ALTER TABLE ONLY physical_addresses
    ADD CONSTRAINT physical_addresses_account_id_fkey FOREIGN KEY (account_id) REFERENCES accounts(id);
ALTER TABLE ONLY physical_addresses
    ADD CONSTRAINT physical_addresses_has_different_address_id_fkey FOREIGN KEY (has_different_address_id) REFERENCES branches(id);
ALTER TABLE ONLY physical_addresses
    ADD CONSTRAINT physical_addresses_address_id_fkey FOREIGN KEY (address_id) REFERENCES locations(id);
ALTER TABLE ONLY physical_addresses
    ADD CONSTRAINT physical_addresses_telephone_id_fkey FOREIGN KEY (telephone_id) REFERENCES telephones(id);

CREATE TABLE reason_lefts (
    id bigint NOT NULL,
    account_id bigint,
    comments_id bigint,
    reasons_id bigint,
    reason_description_id bigint
);
ALTER TABLE reason_lefts OWNER TO postgres;
CREATE SEQUENCE reason_lefts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE reason_lefts_id_seq OWNER TO postgres;
ALTER SEQUENCE reason_lefts_id_seq OWNED BY reason_lefts.id;
ALTER TABLE ONLY reason_lefts
    ADD CONSTRAINT reason_lefts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY reason_lefts
    ADD CONSTRAINT reason_lefts_account_id_fkey FOREIGN KEY (account_id) REFERENCES accounts(id);
ALTER TABLE ONLY reason_lefts
    ADD CONSTRAINT reason_lefts_comments_id_fkey FOREIGN KEY (comments_id) REFERENCES textareas(id);
ALTER TABLE ONLY reason_lefts
    ADD CONSTRAINT reason_lefts_reasons_id_fkey FOREIGN KEY (reasons_id) REFERENCES collections(id);
ALTER TABLE ONLY reason_lefts
    ADD CONSTRAINT reason_lefts_reason_description_id_fkey FOREIGN KEY (reason_description_id) REFERENCES textareas(id);

CREATE TABLE "references" (
    id bigint NOT NULL,
    account_id bigint,
    full_name_id bigint,
    last_contact_id bigint,
    relationship_id bigint,
    relationship_other_id bigint,
    phone_id bigint,
    email_id bigint,
    email_not_applicable_id bigint,
    address_id bigint
);
ALTER TABLE "references" OWNER TO postgres;
CREATE SEQUENCE references_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE references_id_seq OWNER TO postgres;
ALTER SEQUENCE references_id_seq OWNED BY "references".id;
ALTER TABLE ONLY "references"
    ADD CONSTRAINT references_pkey PRIMARY KEY (id);
ALTER TABLE ONLY "references"
    ADD CONSTRAINT references_account_id_fkey FOREIGN KEY (account_id) REFERENCES accounts(id);
ALTER TABLE ONLY "references"
    ADD CONSTRAINT references_full_name_fkey FOREIGN KEY (full_name_id) REFERENCES names(id);
ALTER TABLE ONLY "references"
    ADD CONSTRAINT references_last_contact_fkey FOREIGN KEY (last_contact_id) REFERENCES date_controls(id);
ALTER TABLE ONLY "references"
    ADD CONSTRAINT references_relationship_id_fkey FOREIGN KEY (relationship_id) REFERENCES checkbox_groups(id);
ALTER TABLE ONLY "references"
    ADD CONSTRAINT references_relationship_other_fkey FOREIGN KEY (relationship_other_id) REFERENCES texts(id);
ALTER TABLE ONLY "references"
    ADD CONSTRAINT references_phone_id_fkey FOREIGN KEY (phone_id) REFERENCES telephones(id);
ALTER TABLE ONLY "references"
    ADD CONSTRAINT references_email_id_fkey FOREIGN KEY (email_id) REFERENCES emails(id);
ALTER TABLE ONLY "references"
    ADD CONSTRAINT references_email_not_applicable_id_fkey FOREIGN KEY (email_not_applicable_id) REFERENCES not_applicables(id);
ALTER TABLE ONLY "references"
    ADD CONSTRAINT references_address_id_fkey FOREIGN KEY (address_id) REFERENCES locations(id);

CREATE TABLE sentences (
    id bigint NOT NULL,
    account_id bigint,
    description_id bigint,
    exceeds_year_id bigint,
    incarcerated_id bigint,
    incarceration_dates_id bigint,
    incarceration_dates_naid bigint,
    probation_dates_id bigint,
    probation_dates_naid bigint
);
ALTER TABLE sentences OWNER TO postgres;
CREATE SEQUENCE sentences_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE sentences_id_seq OWNER TO postgres;
ALTER SEQUENCE sentences_id_seq OWNED BY sentences.id;
ALTER TABLE ONLY sentences
    ADD CONSTRAINT sentences_pkey PRIMARY KEY (id);
ALTER TABLE ONLY sentences
    ADD CONSTRAINT sentences_account_id_fkey FOREIGN KEY (account_id) REFERENCES accounts(id);
ALTER TABLE ONLY sentences
    ADD CONSTRAINT sentences_description_id_fkey FOREIGN KEY (description_id) REFERENCES textareas(id);
ALTER TABLE ONLY sentences
    ADD CONSTRAINT sentences_exceeds_year_id_fkey FOREIGN KEY (exceeds_year_id) REFERENCES branches(id);
ALTER TABLE ONLY sentences
    ADD CONSTRAINT sentences_incarcerated_id_fkey FOREIGN KEY (incarcerated_id) REFERENCES branches(id);
ALTER TABLE ONLY sentences
    ADD CONSTRAINT sentences_incarceration_dates_id_fkey FOREIGN KEY (incarceration_dates_id) REFERENCES date_ranges(id);
ALTER TABLE ONLY sentences
    ADD CONSTRAINT sentences_incarceration_dates_naid_fkey FOREIGN KEY (incarceration_dates_naid) REFERENCES not_applicables(id);
ALTER TABLE ONLY sentences
    ADD CONSTRAINT sentences_probation_dates_id_fkey FOREIGN KEY (probation_dates_id) REFERENCES date_ranges(id);
ALTER TABLE ONLY sentences
    ADD CONSTRAINT sentences_probation_dates_naid_fkey FOREIGN KEY (probation_dates_naid) REFERENCES not_applicables(id);

CREATE TABLE supervisors (
    id bigint NOT NULL,
    account_id bigint,
    supervisor_name_id bigint,
    title_id bigint,
    email_id bigint,
    email_not_applicable_id bigint,
    address_id bigint,
    telephone_id bigint
);
ALTER TABLE supervisors OWNER TO postgres;
CREATE SEQUENCE supervisors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE supervisors_id_seq OWNER TO postgres;
ALTER SEQUENCE supervisors_id_seq OWNED BY supervisors.id;
ALTER TABLE ONLY supervisors
    ADD CONSTRAINT supervisors_pkey PRIMARY KEY (id);
ALTER TABLE ONLY supervisors
    ADD CONSTRAINT supervisors_account_id_fkey FOREIGN KEY (account_id) REFERENCES accounts(id);
ALTER TABLE ONLY supervisors
    ADD CONSTRAINT supervisors_supervisor_name_id_fkey FOREIGN KEY (supervisor_name_id) REFERENCES texts(id);
ALTER TABLE ONLY supervisors
    ADD CONSTRAINT supervisors_title_id_fkey FOREIGN KEY (title_id) REFERENCES texts(id);
ALTER TABLE ONLY supervisors
    ADD CONSTRAINT supervisors_email_id_fkey FOREIGN KEY (email_id) REFERENCES emails(id);
ALTER TABLE ONLY supervisors
    ADD CONSTRAINT supervisors_email_not_applicable_id_fkey FOREIGN KEY (email_not_applicable_id) REFERENCES not_applicables(id);
ALTER TABLE ONLY supervisors
    ADD CONSTRAINT supervisors_address_id_fkey FOREIGN KEY (address_id) REFERENCES locations(id);
ALTER TABLE ONLY supervisors
    ADD CONSTRAINT supervisors_telephone_id_fkey FOREIGN KEY (telephone_id) REFERENCES telephones(id);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE benefits;
DROP TABLE branches;
DROP TABLE checkbox_groups;
DROP TABLE checkboxes;
DROP TABLE civil_unions;
DROP TABLE clearance_levels;
DROP TABLE co_owners;
DROP TABLE collection_items;
DROP TABLE collections;
DROP TABLE contacts;
DROP TABLE countries;
DROP TABLE date_controls;
DROP TABLE date_ranges;
DROP TABLE emails;
DROP TABLE employment_activities;
DROP TABLE foreign_born_documents;
DROP TABLE heights;
DROP TABLE locations;
DROP TABLE names;
DROP TABLE not_applicables;
DROP TABLE numbers;
DROP TABLE physical_addresses;
DROP TABLE radios;
DROP TABLE reason_lefts;
DROP TABLE "references";
DROP TABLE sentences;
DROP TABLE ssns;
DROP TABLE supervisors;
DROP TABLE telephones;
DROP TABLE textareas;
DROP TABLE texts;
DROP TABLE treatments;
