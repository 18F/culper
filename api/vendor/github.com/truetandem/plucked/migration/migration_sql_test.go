package migration

import (
	"os"
	"strings"
	"testing"
)

func TestSemicolons(t *testing.T) {
	type testData struct {
		line   string
		result bool
	}

	tests := []testData{
		{
			line:   "END;",
			result: true,
		},
		{
			line:   "END; -- comment",
			result: true,
		},
		{
			line:   "END   ; -- comment",
			result: true,
		},
		{
			line:   "END -- comment",
			result: false,
		},
		{
			line:   "END -- comment ;",
			result: false,
		},
		{
			line:   "END \" ; \" -- comment",
			result: false,
		},
	}

	for _, test := range tests {
		r := endsWithSemicolon(test.line)
		if r != test.result {
			t.Errorf("incorrect semicolon. got %v, want %v", r, test.result)
		}
	}
}

func TestSplitStatements(t *testing.T) {
	type testData struct {
		sql       string
		direction bool
		count     int
		setup     func()
		teardown  func()
	}

	tests := []testData{
		{
			sql:       functxt,
			direction: true,
			count:     2,
			setup:     func() {},
			teardown:  func() {},
		},
		{
			sql:       functxt,
			direction: false,
			count:     2,
			setup:     func() {},
			teardown:  func() {},
		},
		{
			sql:       multitxt,
			direction: true,
			count:     2,
			setup:     func() {},
			teardown:  func() {},
		},
		{
			sql:       multitxt,
			direction: false,
			count:     2,
			setup:     func() {},
			teardown:  func() {},
		},
		{
			sql:       envartxt,
			direction: true,
			count:     2,
			setup:     func() { _ = os.Setenv("GOLANG_ENV", "production") },
			teardown:  func() { _ = os.Unsetenv("GOLANG_ENV") },
		},
		{
			sql:       envartxt,
			direction: false,
			count:     2,
			setup:     func() { _ = os.Setenv("GOLANG_ENV", "production") },
			teardown:  func() { _ = os.Unsetenv("GOLANG_ENV") },
		},
		{
			sql:       envartxt,
			direction: true,
			count:     0,
			setup:     func() { _ = os.Setenv("GOLANG_ENV", "development") },
			teardown:  func() { _ = os.Unsetenv("GOLANG_ENV") },
		},
		{
			sql:       envartxt,
			direction: false,
			count:     0,
			setup:     func() { _ = os.Setenv("GOLANG_ENV", "development") },
			teardown:  func() { _ = os.Unsetenv("GOLANG_ENV") },
		},
	}

	for _, test := range tests {
		test.setup()
		stmts := splitSQLStatements(strings.NewReader(test.sql), test.direction)
		test.teardown()
		if len(stmts) != test.count {
			t.Errorf("incorrect number of stmts. got %v, want %v", len(stmts), test.count)
		}
	}
}

var functxt = `-- +goose Up
CREATE TABLE IF NOT EXISTS histories (
  id                BIGSERIAL  PRIMARY KEY,
  current_value     varchar(2000) NOT NULL,
  created_at      timestamp with time zone  NOT NULL
);

-- +goose StatementBegin
CREATE OR REPLACE FUNCTION histories_partition_creation( DATE, DATE )
returns void AS $$
DECLARE
  create_query text;
BEGIN
  FOR create_query IN SELECT
      'CREATE TABLE IF NOT EXISTS histories_'
      || TO_CHAR( d, 'YYYY_MM' )
      || ' ( CHECK( created_at >= timestamp '''
      || TO_CHAR( d, 'YYYY-MM-DD 00:00:00' )
      || ''' AND created_at < timestamp '''
      || TO_CHAR( d + INTERVAL '1 month', 'YYYY-MM-DD 00:00:00' )
      || ''' ) ) inherits ( histories );'
    FROM generate_series( $1, $2, '1 month' ) AS d
  LOOP
    EXECUTE create_query;
  END LOOP;  -- LOOP END
END;         -- FUNCTION END
$$
language plpgsql;
-- +goose StatementEnd

-- +goose Down
drop function histories_partition_creation(DATE, DATE);
drop TABLE histories;
`

// test multiple up/down transitions in a single script
var multitxt = `-- +goose Up
CREATE TABLE post (
    id int NOT NULL,
    title text,
    body text,
    PRIMARY KEY(id)
);

-- +goose Down
DROP TABLE post;

-- +goose Up
CREATE TABLE fancier_post (
    id int NOT NULL,
    title text,
    body text,
    created_on timestamp without time zone,
    PRIMARY KEY(id)
);

-- +goose Down
DROP TABLE fancier_post;
`

// test environment specific scripts
var envartxt = `-- +goose Env BSD:HUGS GOLANG_ENV:production
-- +goose Up
CREATE TABLE post (
    id int NOT NULL,
    title text,
    body text,
    PRIMARY KEY(id)
);

-- +goose Down
DROP TABLE post;

-- +goose Up
CREATE TABLE fancier_post (
    id int NOT NULL,
    title text,
    body text,
    created_on timestamp without time zone,
    PRIMARY KEY(id)
);

-- +goose Down
DROP TABLE fancier_post;
`
