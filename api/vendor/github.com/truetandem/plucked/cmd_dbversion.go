package main

import (
	"fmt"
	"log"

	"github.com/truetandem/plucked/migration"
)

var dbVersionCmd = &Command{
	Name:    "dbversion",
	Usage:   "",
	Summary: "Print the current version of the database",
	Help:    `dbversion extended help here...`,
	Run:     dbVersionRun,
}

func dbVersionRun(cmd *Command, args ...string) {
	conf, err := dbConfFromFlags()
	if err != nil {
		log.Fatal(err)
	}

	current, err := migration.GetDBVersion(conf)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("plucked: dbversion %v\n", current)
}
