package db

import (
	"log"
	"net/url"
	"strings"
	"time"

	"github.com/18F/e-QIP-prototype/api/cf"
	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

// DatabaseContext to help abstract the technical implementation per driver used.
type DatabaseContext struct {
	Database *pg.DB
}

// NewDB establishes a new database connection
func NewDB() *DatabaseContext {
	addr := cf.DatabaseURI("aws-rds")

	// Parse the address as a URI. If it fails return an empty connection
	uri, err := url.Parse(addr)
	if err != nil {
		return &DatabaseContext{Database: pg.Connect(&pg.Options{})}
	}

	// Remove the leading slash on the path to retrieve the database name
	dbURI := strings.TrimPrefix(uri.Path, "/")

	// Ignore whether the password was set or not since an empty string suffices
	// for the connection options as well.
	pw, _ := uri.User.Password()
	db := pg.Connect(&pg.Options{
		User:     uri.User.Username(),
		Password: pw,
		Addr:     uri.Host,
		Database: dbURI,
	})

	// Add logging
	db.OnQueryProcessed(func(event *pg.QueryProcessedEvent) {
		query, err := event.FormattedQuery()
		if err == nil {
			log.Printf("%s %s", time.Since(event.StartTime), query)
		}
	})

	return &DatabaseContext{Database: db}
}

// CheckTable ensures a the table exists for the persistor.
func (context *DatabaseContext) CheckTable(entity interface{}) error {
	options := &orm.CreateTableOptions{
		Temp:        cf.IsTest(),
		IfNotExists: true,
	}
	return context.Database.CreateTable(entity, options)
}

// Raw executes a string of SQL.
func (context *DatabaseContext) Raw(sql string) error {
	_, err := context.Database.Exec(sql)
	return err
}

// RawBytes executes a byte array of SQL.
func (context *DatabaseContext) RawBytes(sql []byte) error {
	return context.Raw(string(sql))
}

func (context *DatabaseContext) Insert(query ...interface{}) error {
	return context.Database.Insert(query)
}

func (context *DatabaseContext) Update(query ...interface{}) error {
	return context.Database.Update(query)
}

func (context *DatabaseContext) Delete(query interface{}) error {
	return context.Database.Delete(query)
}

func (context *DatabaseContext) Select(query interface{}) error {
	return context.Database.Select(query)
}
