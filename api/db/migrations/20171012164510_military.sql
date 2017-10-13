
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied

CREATE TABLE military_disciplinaries (
    id bigint NOT NULL,
    has_disciplinary_id bigint,
    list_id bigint
);
ALTER TABLE military_disciplinaries OWNER TO postgres;
CREATE SEQUENCE military_disciplinaries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE military_disciplinaries_id_seq OWNER TO postgres;
ALTER SEQUENCE military_disciplinaries_id_seq OWNED BY military_disciplinaries.id;
ALTER TABLE ONLY military_disciplinaries
    ADD CONSTRAINT military_disciplinaries_pkey PRIMARY KEY (id);
ALTER TABLE ONLY military_disciplinaries
    ADD CONSTRAINT military_disciplinaries_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY military_disciplinaries
    ADD CONSTRAINT military_disciplinaries_has_disciplinary_id_fkey FOREIGN KEY (has_disciplinary_id) REFERENCES branches(id);
ALTER TABLE ONLY military_disciplinaries
    ADD CONSTRAINT military_disciplinaries_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE military_foreigns (
    id bigint NOT NULL,
    list_id bigint
);
ALTER TABLE military_foreigns OWNER TO postgres;
CREATE SEQUENCE military_foreigns_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE military_foreigns_id_seq OWNER TO postgres;
ALTER SEQUENCE military_foreigns_id_seq OWNED BY military_foreigns.id;
ALTER TABLE ONLY military_foreigns
    ADD CONSTRAINT military_foreigns_pkey PRIMARY KEY (id);
ALTER TABLE ONLY military_foreigns
    ADD CONSTRAINT military_foreigns_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY military_foreigns
    ADD CONSTRAINT military_foreigns_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE military_histories (
    id bigint NOT NULL,
    has_served_id bigint,
    list_id bigint
);
ALTER TABLE military_histories OWNER TO postgres;
CREATE SEQUENCE military_histories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE military_histories_id_seq OWNER TO postgres;
ALTER SEQUENCE military_histories_id_seq OWNED BY military_histories.id;
ALTER TABLE ONLY military_histories
    ADD CONSTRAINT military_histories_pkey PRIMARY KEY (id);
ALTER TABLE ONLY military_histories
    ADD CONSTRAINT military_histories_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY military_histories
    ADD CONSTRAINT military_histories_has_served_id_fkey FOREIGN KEY (has_served_id) REFERENCES branches(id);
ALTER TABLE ONLY military_histories
    ADD CONSTRAINT military_histories_list_id_fkey FOREIGN KEY (list_id) REFERENCES collections(id);

CREATE TABLE military_selectives (
    id bigint NOT NULL,
    was_born_after_id bigint,
    has_registered_id bigint,
    registration_number_id bigint,
    explanation_id bigint
);
ALTER TABLE military_selectives OWNER TO postgres;
CREATE SEQUENCE military_selectives_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE military_selectives_id_seq OWNER TO postgres;
ALTER SEQUENCE military_selectives_id_seq OWNED BY military_selectives.id;
ALTER TABLE ONLY military_selectives
    ADD CONSTRAINT military_selectives_pkey PRIMARY KEY (id);
ALTER TABLE ONLY military_selectives
    ADD CONSTRAINT military_selectives_account_id_fkey FOREIGN KEY (id) REFERENCES accounts(id);
ALTER TABLE ONLY military_selectives
    ADD CONSTRAINT military_selectives_was_born_after_id_fkey FOREIGN KEY (was_born_after_id) REFERENCES branches(id);
ALTER TABLE ONLY military_selectives
    ADD CONSTRAINT military_selectives_has_registered_id_fkey FOREIGN KEY (has_registered_id) REFERENCES branches(id);
ALTER TABLE ONLY military_selectives
    ADD CONSTRAINT military_selectives_registration_number_id_fkey FOREIGN KEY (registration_number_id) REFERENCES texts(id);
ALTER TABLE ONLY military_selectives
    ADD CONSTRAINT military_selectives_explanation_id_fkey FOREIGN KEY (explanation_id) REFERENCES textareas(id);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE military_disciplinaries;
DROP TABLE military_foreigns;
DROP TABLE military_histories;
DROP TABLE military_selectives;
