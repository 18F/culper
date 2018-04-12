package db

import (
	"net/url"
	"strings"
	"time"

	"github.com/18F/e-QIP-prototype/api/cf"
	"github.com/18F/e-QIP-prototype/api/logmsg"
	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
	"github.com/sirupsen/logrus"
)

// DatabaseContext to help abstract the technical implementation per driver used.
type DatabaseContext struct {
	Database *pg.DB
}

// NewDB establishes a new database connection
func NewDB() *DatabaseContext {
	log := logmsg.NewLogger()
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
			log.WithFields(logrus.Fields{
				"elapsed": time.Since(event.StartTime),
				"query":   query,
			}).Debug("Executed database query")
		}
	})

	return &DatabaseContext{Database: db}
}

// CheckTable ensures a the table exists for the persistor.
func (context *DatabaseContext) CheckTable(entity interface{}) error {
	test := cf.IsTest()
	if test {
		options := &orm.CreateTableOptions{
			Temp:        test,
			IfNotExists: true,
		}
		return context.Database.CreateTable(entity, options)
	}
	return nil
}

// Raw executes a string of SQL.
func (context *DatabaseContext) Raw(query interface{}, params ...interface{}) error {
	_, err := context.Database.Exec(query, params...)
	return err
}

// Find will check if the model exists and run the additional functionality.
func (context *DatabaseContext) Find(query interface{}, callback func(query interface{})) {
	if count, err := context.Database.Model(query).Count(); count > 0 && err == nil {
		context.Select(query)
		callback(query)
	}
}

// Insert persists the new model in the data store
func (context *DatabaseContext) Insert(query ...interface{}) error {
	return context.Database.Insert(query...)
}

// Update persists the existing model in the data store
func (context *DatabaseContext) Update(query interface{}) error {
	return context.Database.Update(query)
}

// Save persists the model in the data store
func (context *DatabaseContext) Save(query ...interface{}) error {
	for _, q := range query {
		err := context.Insert(q)
		if err != nil {
			err = context.Update(q)
		}

		// If there were no rows found we already handle this.
		if err != nil && err != pg.ErrNoRows {
			return err
		}
	}

	return nil
}

// Delete removes the model from the data store
func (context *DatabaseContext) Delete(query interface{}) error {
	return context.Database.Delete(query)
}

// Select returns the model from the data store
func (context *DatabaseContext) Select(query interface{}) error {
	return context.Database.Select(query)
}
