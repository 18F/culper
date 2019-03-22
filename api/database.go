package api

import (
	"github.com/pkg/errors"
)

type DatabaseErrorNotFound string

func (d DatabaseErrorNotFound) Error() string {
	return string(d)
}

func IsDatabaseErrorNotFound(err error) bool {
	_, valueOk := errors.Cause(err).(DatabaseErrorNotFound)
	_, pointerOk := errors.Cause(err).(*DatabaseErrorNotFound)

	if valueOk || pointerOk {
		return true
	}
	return false
}

// DatabaseService represents a persisted data storage.
type DatabaseService interface {
	Configure()
	CheckTable(entity interface{}) error
	Raw(query interface{}, params ...interface{}) error
	Find(query interface{}, callback func(query interface{}))
	FindAll(model interface{}) error
	Where(model interface{}, condition string, params ...interface{}) error
	ColumnsWhere(model interface{}, columns []string, condition string, params ...interface{}) error
	Insert(query ...interface{}) error
	Update(query interface{}) error
	Save(query ...interface{}) error
	Delete(query interface{}) error
	Select(query interface{}) error
	Count(model interface{}, condition string, params ...interface{}) int
	CountExpr(model interface{}, expr string, retval interface{}, condition string, params ...interface{})
	Array(model interface{}, expr string, retval interface{}, condition string, params ...interface{})
}
