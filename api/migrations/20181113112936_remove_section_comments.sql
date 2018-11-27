
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin
DROP TABLE identification_comments;
DROP TABLE citizenship_comments;
DROP TABLE financial_comments;
DROP TABLE foreign_comments;
DROP TABLE history_comments;
DROP TABLE legal_comments;
DROP TABLE military_comments;
DROP TABLE psychological_comments;
DROP TABLE relationships_comments;
DROP TABLE substance_comments;
-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
CREATE TABLE identification_comments (
    id          bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    comments_id bigint REFERENCES texts(id)
);

CREATE TABLE citizenship_comments (
    id          bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    comments_id bigint REFERENCES texts(id)
);

CREATE TABLE financial_comments (
    id          bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    comments_id bigint REFERENCES texts(id)
);

CREATE TABLE foreign_comments (
    id          bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    comments_id bigint REFERENCES texts(id)
);

CREATE TABLE history_comments (
    id          bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    comments_id bigint REFERENCES texts(id)
);

CREATE TABLE legal_comments (
    id          bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    comments_id bigint REFERENCES texts(id)
);

CREATE TABLE military_comments (
    id          bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    comments_id bigint REFERENCES texts(id)
);

CREATE TABLE psychological_comments (
    id          bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    comments_id bigint REFERENCES texts(id)
);

CREATE TABLE relationships_comments (
    id          bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    comments_id bigint REFERENCES texts(id)
);

CREATE TABLE substance_comments (
    id          bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    comments_id bigint REFERENCES texts(id)
);
-- +goose StatementEnd
