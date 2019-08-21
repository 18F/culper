-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
-- +goose StatementBegin

CREATE TABLE package_comments (
    id              bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    has_comments_id bigint REFERENCES branches(id),
    comments_id     bigint REFERENCES textareas(id)
);

-- +goose StatementEnd

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +goose StatementBegin
DROP TABLE package_comments;
-- +goose StatementEnd
