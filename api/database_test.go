package api

import (
	"testing"

	"github.com/pkg/errors"
)

func TestDataBaseNotFoundErrorCorrect(t *testing.T) {
	var err DatabaseErrorNotFound
	IsDatabaseErrorNotFound(err)
	if !IsDatabaseErrorNotFound(err) {
		t.Log("Should have returned true")
		t.Fail()
	}
}

func TestDataBaseNotFoundError(t *testing.T) {
	err := errors.New("database is found but sleepy error")
	if IsDatabaseErrorNotFound(err) {
		t.Log("Should have returned false")
		t.Fail()
	}
}
