package api

type DatabaseService interface {
	NewDatabase() DatabaseService
	CheckTable(entity interface{}) error
	Raw(query interface{}, params ...interface{}) error
	Find(query interface{}, callback func(query interface{}))
	Insert(query ...interface{}) error
	Update(query ...interface{}) error
	Save(query ...interface{}) error
	Delete(query interface{}) error
	Select(query interface{}) error
}
