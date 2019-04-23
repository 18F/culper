package postgresql

import (
	"fmt"
	"net/url"
	"time"

	"github.com/go-pg/pg"

	"github.com/18F/e-QIP-prototype/api"
)

// Service to help abstract the technical implementation per driver used.
type Service struct {
	Log      api.LogService
	Env      api.Settings
	database *pg.DB
}

// DBConfig contains everything neccecary to setup a postgres db connection
type DBConfig struct {
	User     string
	Password string
	Address  string
	DBName   string
}

// PostgresConnectURI creates a connection string, which is used by the golang sql Open() function
func PostgresConnectURI(conf DBConfig) string {
	// By user (+ password) + database + host
	uri := &url.URL{Scheme: "postgres"}
	username := conf.User

	// Check if there is a password set. If not then we need to create
	// the Userinfo structure in a different way so we don't include
	// exta colons (:).
	pw := conf.Password
	if pw == "" {
		uri.User = url.User(username)
	} else {
		uri.User = url.UserPassword(username, pw)
	}

	// The database name will be part of the URI path so it needs
	// a prefix of "/"
	database := conf.DBName
	uri.Path = fmt.Sprintf("/%s", database)

	// Host can be either "address + port" or just "address"
	host := conf.Address
	uri.Host = host

	return uri.String()
}

// NewPostgresService returns a configured postgres service
func NewPostgresService(config DBConfig, logger api.LogService) *Service {
	service := Service{
		Log: logger,
	}

	db := pg.Connect(&pg.Options{
		User:     config.User,
		Password: config.Password,
		Addr:     config.Address,
		Database: config.DBName,
	})

	// Add logging
	db.OnQueryProcessed(func(event *pg.QueryProcessedEvent) {
		query, err := event.FormattedQuery()
		if err == nil {
			service.Log.Debug("Executed database query", api.LogFields{
				"elapsed": time.Since(event.StartTime),
				"query":   query,
			})
		}
	})

	service.database = db

	return &service
}

// Raw executes a string of SQL.
func (service *Service) Raw(query interface{}, params ...interface{}) error {
	_, err := service.database.Exec(query, params...)
	return err
}

// Find will check if the model exists and run the additional functionality.
func (service *Service) Find(query interface{}, callback func(query interface{})) {
	if count, err := service.database.Model(query).Count(); count > 0 && err == nil {
		service.Select(query)
		callback(query)
	}
}

// FindAll instances of a type of model.
func (service *Service) FindAll(query interface{}) error {
	return explicitNotFoundError(service.database.Model(query).Select())
}

// Where is a conditional selection based on the model in the data store.
func (service *Service) Where(model interface{}, condition string, params ...interface{}) error {
	return explicitNotFoundError(service.database.Model(model).Where(condition, params...).Select())
}

// ColumnsWhere is a conditional selection based on the model in the data store only returning specific quoted columns.
func (service *Service) ColumnsWhere(model interface{}, columns []string, condition string, params ...interface{}) error {
	return explicitNotFoundError(service.database.Model(model).Column(columns...).Where(condition, params...).Select())
}

// Count return the number of rows found.
func (service *Service) Count(model interface{}, condition string, params ...interface{}) int {
	count, _ := service.database.Model(model).Where(condition, params...).Count()
	return count
}

// CountExpr return the number of rows found with an expression.
func (service *Service) CountExpr(model interface{}, expr string, retval interface{}, condition string, params ...interface{}) {
	service.database.Model(model).ColumnExpr(expr).Where(condition, params...).Select(retval)
}

// Array fills an array from the model and expression.
func (service *Service) Array(model interface{}, expr string, retval interface{}, condition string, params ...interface{}) {
	service.database.Model(model).ColumnExpr(expr).Where(condition, params...).Select(pg.Array(retval))
}

// Insert persists the new model in the data store
func (service *Service) Insert(query ...interface{}) error {
	return service.database.Insert(query...)
}

// Update persists the existing model in the data store
func (service *Service) Update(query interface{}) error {
	return service.database.Update(query)
}

// Save persists the model in the data store
func (service *Service) Save(query ...interface{}) error {
	for _, q := range query {
		err := service.Insert(q)
		if err != nil {
			err = service.Update(q)
		}

		// If there were no rows found we already handle this.
		if err != nil && err != pg.ErrNoRows {
			return err
		}
	}

	return nil
}

// Delete removes the model from the data store
func (service *Service) Delete(query interface{}) error {
	return service.database.Delete(query)
}

// Select returns the model from the data store
func (service *Service) Select(query interface{}) error {
	return explicitNotFoundError(service.database.Select(query))
}

func explicitNotFoundError(err error) error {
	if err == pg.ErrNoRows {
		return api.DatabaseErrorNotFound("NOT_FOUND")
	}
	return err
}
