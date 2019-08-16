package cmd

import (
	"bufio"
	"bytes"
	"crypto/tls"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
	"syscall"
	"unsafe"

	eapphttp "github.com/18F/e-QIP-prototype/api/http"
)

// WebClient is a basic web client to be used with various utility functionality.
type WebClient struct {
	Client          *http.Client
	Address         string
	Username        string
	Password        string
	UseSessionToken bool
	SessionToken    string
	SessionCookie   *http.Cookie
}

// createSessionCookie sets a session cookie
func (wc *WebClient) createSessionCookie() {
	wc.SessionCookie = &http.Cookie{
		Secure:   false,
		Name:     eapphttp.SessionCookieName,
		Value:    wc.SessionToken,
		HttpOnly: true,
		Path:     "/",
		// Omit MaxAge and Expires to make this a session cookie.
		// Omit domain to default to the full domain
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
		wc.createSessionCookie()
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

func (wc *WebClient) preflight() {
	http.DefaultTransport.(*http.Transport).TLSClientConfig = &tls.Config{InsecureSkipVerify: true}
	if wc.SessionCookie == nil {
		wc.GetInformation()
		if wc.SessionCookie == nil {
			wc.Authenticate()
		}
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

	resp, err := wc.Client.Do(req)
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
		if cookie.Name == eapphttp.SessionCookieName {
			sessionCookie = cookie
			break
		}
	}
	if sessionCookie.Name == "" {
		log.Fatal("No session cookie returned by request")
	}

	wc.SessionCookie = sessionCookie
}

// GetCSRFToken calls /status and returns the csrf token
func (wc *WebClient) addCSRF(r *http.Request) {
	req, err := http.NewRequest("GET", wc.Address+"/me/status", nil)
	if err != nil {
		log.Fatalln("Error creating request for getting status.", err)
	}
	req.AddCookie(wc.SessionCookie)

	resp, err := wc.Client.Do(req)
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

	r.AddCookie(csrfCookie)
	r.Header.Set("X-CSRF-Token", csrfToken)

}

// Save a JSON structure to the RESTful service.
func (wc *WebClient) Save(payload json.RawMessage) {
	wc.preflight()

	req, err := http.NewRequest("POST", wc.Address+"/me/save", bytes.NewBuffer(payload))
	if err != nil {
		log.Fatalln("Error creating request for saving payload.", err)
	}
	wc.addCSRF(req)
	req.AddCookie(wc.SessionCookie)
	req.Header.Add("Content-Type", "application/json")

	resp, err := wc.Client.Do(req)
	if err != nil || resp.StatusCode < 200 || resp.StatusCode > 299 {
		log.Fatalln("Error or bad response while saving payload.", err, resp.StatusCode)
	}
	defer resp.Body.Close()
}

// Form returns the entire application as a JSON structure.
func (wc *WebClient) Form() json.RawMessage {
	wc.preflight()
	req, err := http.NewRequest("GET", wc.Address+"/me/form", nil)
	if err != nil {
		log.Fatalln("Error creating request for submitting application.", err)
	}
	req.AddCookie(wc.SessionCookie)

	resp, err := wc.Client.Do(req)
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
	wc.preflight()
	req, err := http.NewRequest("POST", wc.Address+"/me/form/submit", nil)
	if err != nil {
		log.Fatalln("Error creating request for submitting application.", err)
	}
	wc.addCSRF(req)
	req.AddCookie(wc.SessionCookie)

	resp, err := wc.Client.Do(req)
	if err != nil || resp.StatusCode < 200 || resp.StatusCode > 299 {
		log.Fatalln("Error or bad response while submitting application.", err, resp.StatusCode)
	}
	defer resp.Body.Close()
}

// Logout will end a session.
func (wc *WebClient) Logout() {
	wc.preflight()
	req, err := http.NewRequest("POST", wc.Address+"/me/logout", nil)
	if err != nil {
		log.Fatalln("Error creating request for logging out.", err)
	}
	wc.addCSRF(req)
	req.AddCookie(wc.SessionCookie)

	resp, err := wc.Client.Do(req)
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
