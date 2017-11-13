package model

import (
	"io/ioutil"
	"log"

	"github.com/18F/e-QIP-prototype/api/db"
)

func LoadSchema(context *db.DatabaseContext) {
	b, err := ioutil.ReadFile("../../db/schema.sql")
	if err != nil {
		log.Println(err)
	}
	context.RawBytes(b)
}

func NewTestDB() *db.DatabaseContext {
	return db.NewDB()
}
