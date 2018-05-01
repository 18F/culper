package api

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
