package cmd

import (
	"bufio"
	"bytes"
	"crypto/tls"
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/user"
	"path/filepath"
	"strings"
	"syscall"
	"unsafe"
)

const passwordFilename = ".eapass"
const tokenPrefix = "Token "

// If a username is specified, readPasswordFile searches `~/.eapass` and returns the
// password or session token corresponding to that username. This file should
// contain lines in one of the following colon-delimited formats:
// 1) username:password
// 2) username:Token token-value
//
// The first match is returned if found, otherwise the empty string.
// The literal string `Token ` must preceed a session token value.
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

// WebClient is a basic web client to be used with various utility functionality.
type WebClient struct {
	client          *http.Client
	Address         string
	Username        string
	Password        string
	UseSessionToken bool
	SessionToken    string
	sessionCookie   *http.Cookie
	csrfToken       string
	csrfCookie      *http.Cookie
}

// WebClientConfig is used to configure a web client.
type WebClientConfig struct {
	Address         string
	Username        string
	UseSessionToken bool
}

// NewWebClient returns a configured web client.
func NewWebClient(config WebClientConfig) *WebClient {
	client := &WebClient{
		client: &http.Client{
			Transport: http.DefaultTransport,
		},
		Address:         config.Address,
		Username:        config.Username,
		UseSessionToken: config.UseSessionToken,
	}

	client.client.Transport.(*http.Transport).TLSClientConfig = &tls.Config{InsecureSkipVerify: true}

	// Pull credentials from the password file if they exist
	credential := readPasswordFile(config.Username)
	if credential != "" {
		if strings.HasPrefix(credential, tokenPrefix) {
			client.SessionToken = strings.TrimPrefix(credential, tokenPrefix)
			client.createsessionCookie()
			client.UseSessionToken = true
			log.Printf("Using session token from ~/" + passwordFilename)
		} else {
			client.Password = credential
			log.Printf("Using password from ~/" + passwordFilename)
		}
	}

	client.GetInformation()

	return client
}

// WebClientConfigFlags is a struct used for configuring flags the same across
// different binaries. By calling
// SetupWebClientFlags() followed by flag.Parse() followed by wccFlags.Parse()
// we can use the same flags to configure several binaries that are using
type WebClientConfigFlags struct {
	Address         *string
	Username        *string
	UseSessionToken *bool
}

// ConfiguredClient takes the parsed flags and creates a NewWebClient configured accordingly
func (f WebClientConfigFlags) ConfiguredClient() *WebClient {
	if *f.Username != "" && *f.UseSessionToken {
		fmt.Println("Using -U and -useSessionToken are mutually exclusive.\n",
			"If you want to be prompted for a session token, only use -useSessionToken.\n",
			"If you want to read creds from a ~/.eapass file, only use -U")
		flag.Usage()
		os.Exit(2)
	}

	config := WebClientConfig{
		Address:         *f.Address,
		Username:        *f.Username,
		UseSessionToken: *f.UseSessionToken,
	}
	return NewWebClient(config)
}

// SetupWebClientFlags configures the flags package for the flags common to all binaries
// using WebClient. It also sets the usage, pass in any extra usage that needs to be inserted.
// It must be called in main() before flag.Parse has been called.
// Then, after flag.Parse() has been called, you can call Parse() on the returned configFlags
func SetupWebClientFlags(cmdName string, usage string) WebClientConfigFlags {
	usageFmt := "usage: %s [-url URL | -U USERNAME | -useSessionToken] %s\n" +
		"~/.eapass may be used to specify the password or session token to use; \n" +
		"see comments on readPasswordFile() for details.\n"

	flag.Usage = func() {
		fmt.Fprintf(os.Stderr, usageFmt, cmdName, usage)
	}

	return WebClientConfigFlags{
		Address:         flag.String("url", "", "URL of API endpoint"),
		Username:        flag.String("U", "", "username to access API"),
		UseSessionToken: flag.Bool("useSessionToken", false, "wether to use a valid session token instead of a username/password for auth"),
	}
}

// createsessionCookie sets a session cookie
func (wc *WebClient) createsessionCookie() {
	wc.sessionCookie = &http.Cookie{
		Secure:   false,
		Name:     "eapp-session-key",
		Value:    wc.SessionToken,
		HttpOnly: true,
		Path:     "/",
	}
}

// GetInformation will ask for more information if not already known.
func (wc *WebClient) GetInformation() {
	emptyline := false
	if wc.Address == "" {
		emptyline = true
		wc.Address = readline("API address: ", false)
	}
	if wc.UseSessionToken {
		if wc.SessionToken == "" {
			emptyline = true
			wc.SessionToken = readline("Session Token: ", false)
		}
		wc.createsessionCookie()
	} else {
		if wc.Username == "" {
			emptyline = true
			wc.Username = readline("Username: ", false)
		}
		if wc.Password == "" {
			emptyline = true
			wc.Password = readline("Password: ", true)
		}
	}
	if emptyline {
		fmt.Printf("\n\n")
	}
}

// Authenticate against the RESTful service with basic authentication.
func (wc *WebClient) Authenticate() {
	data := json.RawMessage(`{ "username": "` + wc.Username + `", "password": "` + wc.Password + `" }`)
	req, err := http.NewRequest("POST", wc.Address+"/auth/basic", bytes.NewBuffer(data))
	if err != nil {
		log.Fatal(err)
	}
	req.Header.Add("Content-Type", "application/json")

	resp, err := wc.client.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	if resp.StatusCode < 200 || resp.StatusCode > 299 {
		log.Fatalf("Bad response code: %d :: %s", resp.StatusCode, string(body))
	}

	var sessionCookie *http.Cookie
	for _, cookie := range resp.Cookies() {
		if cookie.Name == "eapp-session-key" {
			sessionCookie = cookie
			break
		}
	}
	if sessionCookie.Name == "" {
		log.Fatal("No session cookie returned by request")
	}

	wc.sessionCookie = sessionCookie
}

// WithAuth executes the passed in function surrounded by Login and Logout if neccecary to authenticate
func (wc *WebClient) WithAuth(authedFunc func()) {
	didLogin := false
	if wc.sessionCookie == nil {
		wc.Authenticate()
		didLogin = true
	}
	authedFunc()

	if didLogin {
		wc.Logout()
	}

}

// GetCSRFToken calls /status and returns the csrf token
func (wc *WebClient) addCSRF(r *http.Request) {
	if wc.csrfCookie == nil {
		req, err := http.NewRequest("GET", wc.Address+"/me/status", nil)
		if err != nil {
			log.Fatalln("Error creating request for getting status.", err)
		}
		req.AddCookie(wc.sessionCookie)

		resp, err := wc.client.Do(req)
		if err != nil || resp.StatusCode != 200 {
			log.Fatalln("Error or bad response while saving payload.", err, resp.StatusCode)
		}
		defer resp.Body.Close()

		csrfToken := resp.Header.Get("X-CSRF-Token")

		var csrfCookie *http.Cookie
		for _, cookie := range resp.Cookies() {
			if cookie.Name == "_gorilla_csrf" {
				csrfCookie = cookie
				break
			}
		}
		if csrfCookie.Name == "" {
			log.Fatal("No CSRF cookie returned by request")
		}

		wc.csrfToken = csrfToken
		wc.csrfCookie = csrfCookie

	}

	r.AddCookie(wc.csrfCookie)
	r.Header.Set("X-CSRF-Token", wc.csrfToken)

}

// Save a JSON structure to the RESTful service.
func (wc *WebClient) Save(payload json.RawMessage) {
	req, err := http.NewRequest("POST", wc.Address+"/me/save", bytes.NewBuffer(payload))
	if err != nil {
		log.Fatalln("Error creating request for saving payload.", err)
	}
	wc.addCSRF(req)
	req.AddCookie(wc.sessionCookie)
	req.Header.Add("Content-Type", "application/json")

	resp, err := wc.client.Do(req)
	if err != nil || resp.StatusCode < 200 || resp.StatusCode > 299 {
		log.Fatalln("Error or bad response while saving payload.", err, resp.StatusCode)
	}
	defer resp.Body.Close()
}

// Form returns the entire application as a JSON structure.
func (wc *WebClient) Form() json.RawMessage {
	req, err := http.NewRequest("GET", wc.Address+"/me/form", nil)
	if err != nil {
		log.Fatalln("Error creating request for submitting application.", err)
	}
	req.AddCookie(wc.sessionCookie)

	resp, err := wc.client.Do(req)
	if err != nil || resp.StatusCode < 200 || resp.StatusCode > 299 {
		log.Fatalln("Error or bad response while submitting application.", err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	return body
}

// Submit will submit an application through the RESTful service.
func (wc *WebClient) Submit() {
	req, err := http.NewRequest("POST", wc.Address+"/me/form/submit", nil)
	if err != nil {
		log.Fatalln("Error creating request for submitting application.", err)
	}
	wc.addCSRF(req)
	req.AddCookie(wc.sessionCookie)

	resp, err := wc.client.Do(req)
	if err != nil || resp.StatusCode < 200 || resp.StatusCode > 299 {
		log.Fatalln("Error or bad response while submitting application.", err, resp.StatusCode)
	}
	defer resp.Body.Close()
}

// Logout will end a session.
func (wc *WebClient) Logout() {
	req, err := http.NewRequest("POST", wc.Address+"/me/logout", nil)
	if err != nil {
		log.Fatalln("Error creating request for logging out.", err)
	}
	wc.addCSRF(req)
	req.AddCookie(wc.sessionCookie)

	resp, err := wc.client.Do(req)
	if err != nil || resp.StatusCode < 200 || resp.StatusCode > 299 {
		log.Fatalln("Error or bad response while logging out.", err, resp.StatusCode)
	}
	defer resp.Body.Close()
}

// IsPiped returns whether the command was started with piped input.
func IsPiped() bool {
	stat, _ := os.Stdin.Stat()
	mode := stat.Mode()
	return mode&os.ModeNamedPipe != 0
}

func readline(prefix string, secret bool) string {
	var input string
	var reader *bufio.Reader

	if IsPiped() {
		fi, err := os.Open("/dev/tty")
		if err != nil {
			return ""
		}
		defer fi.Close()
		reader = bufio.NewReader(fi)
	} else {
		reader = bufio.NewReader(os.Stdin)
	}

	fmt.Print(prefix)
	if secret {
		echo(false)
	}
	input, _ = reader.ReadString('\n')
	input = strings.TrimSpace(input)
	if secret {
		echo(true)
	}

	return input
}

func echo(visible bool) {
	var termios = &syscall.Termios{}
	var fd = os.Stdout.Fd()

	if _, _, err := syscall.Syscall(syscall.SYS_IOCTL, fd, ioctlReadTermios, uintptr(unsafe.Pointer(termios))); err != 0 {
		return
	}

	if visible {
		termios.Lflag |= syscall.ECHO
	} else {
		termios.Lflag &^= syscall.ECHO
	}

	if _, _, err := syscall.Syscall(syscall.SYS_IOCTL, fd, ioctlWriteTermios, uintptr(unsafe.Pointer(termios))); err != 0 {
		return
	}
}
