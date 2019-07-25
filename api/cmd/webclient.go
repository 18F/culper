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
)

// WebClient is a basic web client to be used with various utility functionality.
type WebClient struct {
	Client   *http.Client
	Address  string
	Username string
	Password string
	Token    string
}

// GetInformation will ask for more information if not already known.
func (wc *WebClient) GetInformation() {
	emptyline := false
	if wc.Address == "" {
		emptyline = true
		wc.Address = readline("API address: ", false)
	}
	if wc.Username == "" {
		emptyline = true
		wc.Username = readline("Username: ", false)
	}
	if wc.Password == "" {
		emptyline = true
		wc.Password = readline("Password: ", true)
	}
	if emptyline {
		fmt.Printf("\n\n")
	}
}

func (wc *WebClient) preflight() {
	http.DefaultTransport.(*http.Transport).TLSClientConfig = &tls.Config{InsecureSkipVerify: true}
	if wc.Token == "" {
		wc.GetInformation()
		wc.Authenticate()
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

	if resp.StatusCode < 200 || resp.StatusCode > 299 {
		log.Fatalf("Bad response code: %d", resp.StatusCode)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	wc.Token = strings.Trim(strings.TrimSpace(string(body)), "\"")
}

// Save a JSON structure to the RESTful service.
func (wc *WebClient) Save(payload json.RawMessage) {
	wc.preflight()
	req, err := http.NewRequest("POST", wc.Address+"/me/save", bytes.NewBuffer(payload))
	if err != nil {
		log.Fatalln("Error creating request for saving payload.", err)
	}
	req.Header.Add("Authorization", "Bearer "+wc.Token)
	req.Header.Add("Content-Type", "application/json")

	resp, err := wc.Client.Do(req)
	if err != nil || resp.StatusCode < 200 || resp.StatusCode > 299 {
		log.Fatalln("Error or bad response while saving payload.", err)
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
	req.Header.Add("Authorization", "Bearer "+wc.Token)

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
	req, err := http.NewRequest("GET", wc.Address+"/me/form/submit", nil)
	if err != nil {
		log.Fatalln("Error creating request for submitting application.", err)
	}
	req.Header.Add("Authorization", "Bearer "+wc.Token)

	resp, err := wc.Client.Do(req)
	if err != nil || resp.StatusCode < 200 || resp.StatusCode > 299 {
		log.Fatalln("Error or bad response while submitting application.", err, resp.StatusCode)
	}
	defer resp.Body.Close()
}

// Logout will end a session.
func (wc *WebClient) Logout() {
	wc.preflight()
	req, err := http.NewRequest("GET", wc.Address+"/me/logout", nil)
	if err != nil {
		log.Fatalln("Error creating request for logging out.", err)
	}
	req.Header.Add("Authorization", "Bearer "+wc.Token)

	resp, err := wc.Client.Do(req)
	if err != nil || resp.StatusCode < 200 || resp.StatusCode > 299 {
		log.Fatalln("Error or bad response while logging out.", err)
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
