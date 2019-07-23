# Dev Tools

We distribute a handful of tools for interacting with eApp on the command line.

To build these tools, run `make build-cmd`

That will build the tool to run on linux. You can then run it by spinning up the containers with `make run` and then using docker exec to run the commands. So, for example, to run the `sftype` command, you would run

 `docker exec e-qip-prototype_api_1 bin/sftype test02 SF85 2017-12-draft7`

Here are the available commands:

### compare -- compares two json structures to see if they are the same

usage: `docker exec e-qip-prototype_api_1 bin/compare path/to/section.json [another/path/to/section.json]`

compare prints out `++` if a given section matches the given user and `--` if it does not.

### dbmigrate -- run any un-run migrations for a given database

usage: `docker exec e-qip-prototype_api_1 bin/dbmigrate -migrations_path ./migrations <db_name>`

dbmigrate will run any un-run migrations on the given db

### dbreset -- delete all data in a given database.

usage: `docker exec e-qip-prototype_api_1 bin/dbreset [-force] <db_name>`

dbreset drops the given db if it exists and then recreates it. WARNING: This deletes all user accounts, after running dbmigrate only the default test01-test20 accounts will exist.

### flush -- deletes all application data in a given account

usage: `docker exec e-qip-prototype_api_1 bin/flush <username>`

### form -- fetch the form for a given user

usage: `docker exec e-qip-prototype_api_1 bin/form <output_filename>`

### fuzzer -- takes given section json files and fills them out at random.

usage: `docker exec e-qip-prototype_api_1 bin/fuzzer path/to/section.json [path/to/another.json]`

### load -- save a section of the form for a given user

usage: `docker exec e-qip-prototype_api_1 bin/load path/to/section.json [path/to/another.json]`

### load-scenario -- save an entire form for a given user

usage, see `docs/test-scenarios.md`

### sftype -- set the form type and version for a given user

usage: `docker exec e-qip-prototype_api_1 bin/sftype <username> <form type> <form version>`

you can also see the current type by ommitting the type and version parameters

### submit -- takes a full json from and submits it to eQIP

usage: See the file `docs/test-scenarios.md` for instructions

### transmit -- Calls the submit api for a given user

usage: `docker exec e-qip-prototype_api_1 bin/transmit`

### unlock -- unlock a locked user so that their form can be edited again

usage: `docker exec e-qip-prototype_api_1 bin/unlock`

unlock sets the status of an account to INCOMPLETE
