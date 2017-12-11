package model

import (
	"io/ioutil"

	"github.com/18F/e-QIP-prototype/api/db"
	log "github.com/sirupsen/logrus"
)

func LoadSchema(context *db.DatabaseContext) {
	b, err := ioutil.ReadFile("../../db/schema.sql")
	if err != nil {
		log.Debug(err)
	}
	context.RawBytes(b)
}

func NewTestDB() *db.DatabaseContext {
	return db.NewDB()
}
