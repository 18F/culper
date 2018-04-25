package cmd

import (
	"bufio"
	"bytes"
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

type WebClient struct {
	Client   *http.Client
	Address  string
	Username string
	Password string
	token    string
}

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
	if wc.token == "" {
		wc.GetInformation()
		wc.Authenticate()
	}
}

func (wc *WebClient) Authenticate() {
	data := json.RawMessage(`{ "username": "` + wc.Username + `", "password": "` + wc.Password + `" }`)
	req, err := http.NewRequest("POST", wc.Address+"/auth/basic", bytes.NewBuffer(data))
	if err != nil {
		return
	}
	req.Header.Add("Content-Type", "application/json")

	resp, err := wc.Client.Do(req)
	if err != nil || resp.StatusCode < 200 || resp.StatusCode > 299 {
		return
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return
	}
	wc.token = strings.Trim(strings.TrimSpace(string(body)), "\"")
}

func (wc *WebClient) Save(payload json.RawMessage) {
	wc.preflight()
	req, err := http.NewRequest("POST", wc.Address+"/me/save", bytes.NewBuffer(payload))
	if err != nil {
		log.Println("Error creating request for saving payload.", err)
		return
	}
	req.Header.Add("Authorization", "Bearer "+wc.token)
	req.Header.Add("Content-Type", "application/json")

	resp, err := wc.Client.Do(req)
	if err != nil || resp.StatusCode < 200 || resp.StatusCode > 299 {
		log.Println("Error or bad response while saving payload.", err)
		return
	}
	defer resp.Body.Close()
}

func (wc *WebClient) Form() json.RawMessage {
	wc.preflight()
	req, err := http.NewRequest("GET", wc.Address+"/me/form", nil)
	if err != nil {
		log.Println("Error creating request for submitting application.", err)
		return []byte{}
	}
	req.Header.Add("Authorization", "Bearer "+wc.token)

	resp, err := wc.Client.Do(req)
	if err != nil || resp.StatusCode < 200 || resp.StatusCode > 299 {
		log.Println("Error or bad response while submitting application.", err)
		return []byte{}
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return []byte{}
	}
	return body
}

func (wc *WebClient) Submit() {
	wc.preflight()
	req, err := http.NewRequest("GET", wc.Address+"/me/form/submit", nil)
	if err != nil {
		log.Println("Error creating request for submitting application.", err)
		return
	}
	req.Header.Add("Authorization", "Bearer "+wc.token)

	resp, err := wc.Client.Do(req)
	if err != nil || resp.StatusCode < 200 || resp.StatusCode > 299 {
		log.Println("Error or bad response while submitting application.", err)
		return
	}
	defer resp.Body.Close()
}

func (wc *WebClient) Logout() {
	wc.preflight()
	req, err := http.NewRequest("GET", wc.Address+"/me/logout", nil)
	if err != nil {
		log.Println("Error creating request for logging out.", err)
		return
	}
	req.Header.Add("Authorization", "Bearer "+wc.token)

	resp, err := wc.Client.Do(req)
	if err != nil || resp.StatusCode < 200 || resp.StatusCode > 299 {
		log.Println("Error or bad response while logging out.", err)
		return
	}
	defer resp.Body.Close()
}

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

	if _, _, err := syscall.Syscall(syscall.SYS_IOCTL, fd, syscall.TCGETS, uintptr(unsafe.Pointer(termios))); err != 0 {
		return
	}

	if visible {
		termios.Lflag |= syscall.ECHO
	} else {
		termios.Lflag &^= syscall.ECHO
	}

	if _, _, err := syscall.Syscall(syscall.SYS_IOCTL, fd, syscall.TCSETS, uintptr(unsafe.Pointer(termios))); err != 0 {
		return
	}
}
