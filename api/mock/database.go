package mock

type DatabaseService struct{}

func (service *DatabaseService) CheckTable(entity interface{}) error {
	return nil
}

func (service *DatabaseService) Raw(query interface{}, params ...interface{}) error {
	return nil
}

func (service *DatabaseService) Find(query interface{}, callback func(query interface{})) {
}

func (service *DatabaseService) FindAll(model interface{}) error {
	return nil
}

func (service *DatabaseService) Where(model interface{}, condition string, params ...interface{}) error {
	return nil
}

func (service *DatabaseService) ColumnsWhere(model interface{}, columns []string, condition string, params ...interface{}) error {
	return nil
}

func (service *DatabaseService) Insert(query ...interface{}) error {
	return nil
}

func (service *DatabaseService) Update(query interface{}) error {
	return nil
}

func (service *DatabaseService) Save(query ...interface{}) error {
	return nil
}

func (service *DatabaseService) Delete(query interface{}) error {
	return nil
}

func (service *DatabaseService) Select(query interface{}) error {
	return nil
}

func (service *DatabaseService) Count(model interface{}, condition string, params ...interface{}) int {
	return 0
}

func (service *DatabaseService) CountExpr(model interface{}, expr string, retval interface{}, condition string, params ...interface{}) {
}

func (service *DatabaseService) Array(model interface{}, expr string, retval interface{}, condition string, params ...interface{}) {
}
