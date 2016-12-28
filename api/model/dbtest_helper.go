package model

import (
	"io/ioutil"
	"log"

	"github.com/18F/e-QIP-prototype/api/db"

	pg "gopkg.in/pg.v5"
)

func LoadSchema(db *pg.DB) {
	b, err := ioutil.ReadFile("../../db/schema.sql")
	if err != nil {
		log.Println(err)
	}

	db.Exec(string(b))

}

func NewTestDB() *pg.DB {
	db := db.NewDB()
	return db
}
