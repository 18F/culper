package main

import (
	"bufio"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/user"
	"path/filepath"
	"strings"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/cmd"
)

const passwordFilename = ".eapass"
const bearerTokenPrefix = "Bearer "

// readPasswordFile searches `~/.eapass` and returns the password or bearer
// token corresponding to the username specified. This file should contain lines
// in one of the following colon-delimited formats:
// 1) username:password
// 2) username:Bearer token-value
//
// The first match is returned if found, otherwise the empty string.
// The literal string `Bearer ` must preceed a bearer token value.
//
// By reading credentials from a file we avoid passing secrets on the
// command-line, which are available to all system users in the process
// listing.
func readPasswordFile(username string) string {
	usr, _ := user.Current()
	dir := usr.HomeDir
	path := filepath.Join(dir, passwordFilename)

	if _, err := os.Stat(path); err == nil {
		file, err := os.Open(path)
		if err == nil {
			scanner := bufio.NewScanner(file)
			for scanner.Scan() {
				line := scanner.Text()
				fields := strings.SplitN(line, ":", 2)
				// username:value
				if len(fields) == 2 && fields[0] == username {
					return fields[1]
				}
			}
		}
		defer file.Close()
	}

	return ""
}

// Loads a complete eApp application form from its native JSON format,
// using the backend API to load each section of the application into
// a specified user account.
//
// See api/testdata/complete-scenarios/*.json for examples.
func main() {
	username := flag.String("U", "", "username to access API")
	url := flag.String("url", "", "URL of API endpoint")

	flag.Usage = func() {
		fmt.Fprintf(os.Stderr,
			"usage: load-scenario [-url URL | -U USERNAME] test-case.json\n"+
				"~/.eapass may be used to specify the password or bearer token to use; \n"+
				"see comments on readPasswordFile() for details.\n")
	}

	flag.Parse()

	if len(flag.Args()) != 1 {
		flag.Usage()
		// Mimick flag.ExitOnError
		os.Exit(2)
	}

	form, err := cmd.ReadSectionData(flag.Arg(0))
	if err != nil {
		log.Fatalln("error reading from file:", err)
	}

	// Create a web client to interface with the RESTful API.
	webclient := &cmd.WebClient{
		Client: &http.Client{},
	}
	webclient.Username = *username
	webclient.Address = *url

	credential := readPasswordFile(*username)
	if credential != "" {
		if strings.HasPrefix(credential, bearerTokenPrefix) {
			// webclient.Token = strings.TrimPrefix(credential, bearerTokenPrefix)
			log.Fatal("Not Using bearer token from ~/" + passwordFilename)
		} else {
			webclient.Password = credential
			log.Printf("Using password from ~/" + passwordFilename)
		}
	}

	for _, v := range api.Catalogue() {
		// If the source data represents a scenario that has been submitted
		// to e-QIP, etc. already, do not re-load that meta-data
		if v.Payload == "submission.releases" {
			log.Printf("Skipping `%s:%s`\n", v.Name, v.Subsection)
			continue
		}

		val, ok := form[v.Name].(map[string]interface{})
		if !ok {
			log.Fatalf("`%s` is not found\n", v.Name)
		}

		js, ok := val[v.Subsection].(map[string]interface{})
		if !ok {
			log.Fatalf("`%s:%s` is not found\n", v.Name, v.Subsection)
		}

		jsonString, err := json.Marshal(js)
		if err != nil {
			log.Fatalf("Could not marshal json for `%s:%s`\n", v.Name, v.Subsection)
		}
		log.Printf("Saving `%s:%s`\n", v.Name, v.Subsection)
		webclient.Save(jsonString)
	}
	webclient.Logout()
}
