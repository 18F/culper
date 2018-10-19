package mock

// DatabaseService mock implementation.
type DatabaseService struct {
	SelectFn    func(query interface{}) error
	SelectCount int
}

// Configure establishes a new database connection
func (service *DatabaseService) Configure() {
}

// CheckTable ensures a the table exists for the persistor.
func (service *DatabaseService) CheckTable(entity interface{}) error {
	return nil
}

// Raw executes a string of SQL.
func (service *DatabaseService) Raw(query interface{}, params ...interface{}) error {
	return nil
}

// Find will check if the model exists and run the additional functionality.
func (service *DatabaseService) Find(query interface{}, callback func(query interface{})) {
}

// FindAll instances of a type of model.
func (service *DatabaseService) FindAll(model interface{}) error {
	return nil
}

// Where is a conditional selection based on the model in the data store.
func (service *DatabaseService) Where(model interface{}, condition string, params ...interface{}) error {
	return nil
}

// ColumnsWhere is a Conditional selection based on the model in the data store only returning specific quoted columns.
func (service *DatabaseService) ColumnsWhere(model interface{}, columns []string, condition string, params ...interface{}) error {
	return nil
}

// Count return the number of rows found.
func (service *DatabaseService) Count(model interface{}, condition string, params ...interface{}) int {
	return 0
}

// CountExpr return the number of rows found with an expression.
func (service *DatabaseService) CountExpr(model interface{}, expr string, retval interface{}, condition string, params ...interface{}) {
}

// Array fills an array from the model and expression.
func (service *DatabaseService) Array(model interface{}, expr string, retval interface{}, condition string, params ...interface{}) {
}

// Insert persists the new model in the data store
func (service *DatabaseService) Insert(query ...interface{}) error {
	return nil
}

// Update persists the existing model in the data store
func (service *DatabaseService) Update(query interface{}) error {
	return nil
}

// Save persists the model in the data store
func (service *DatabaseService) Save(query ...interface{}) error {
	return nil
}

// Delete removes the model from the data store
func (service *DatabaseService) Delete(query interface{}) error {
	return nil
}

// Select returns the model from the data store
func (service *DatabaseService) Select(query interface{}) error {
	service.SelectCount++
	return service.SelectFn(query)
}
