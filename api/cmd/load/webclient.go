package main

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

func webclient(payloads []json.RawMessage) {
	client := &http.Client{}
	address := readline("API address: ", false)
	username := readline("Username: ", false)
	password := readline("Password: ", true)

	// Send POST for authentication and receive JWT token
	jwt := authenticate(client, address, username, password)
	if jwt == "" {
		return
	}

	// Loop through all sections received
	for _, payload := range payloads {
		// POST a save request for section
		save(client, address, jwt, payload)
	}

	// Logout
	logout(client, address, jwt)
}

func authenticate(c *http.Client, address, username, password string) string {
	data := json.RawMessage(`{ "username": "` + username + `", "password": "` + password + `" }`)
	req, err := http.NewRequest("POST", address+"/auth/basic", bytes.NewBuffer(data))
	if err != nil {
		return ""
	}
	req.Header.Add("Content-Type", "application/json")

	resp, err := c.Do(req)
	if err != nil || resp.StatusCode < 200 || resp.StatusCode > 299 {
		return ""
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return ""
	}
	return strings.Trim(strings.TrimSpace(string(body)), "\"")
}

func save(c *http.Client, address, jwt string, payload json.RawMessage) {
	req, err := http.NewRequest("POST", address+"/me/save", bytes.NewBuffer(payload))
	if err != nil {
		log.Println("Error creating request for saving payload.", err)
		return
	}
	req.Header.Add("Authorization", "Bearer "+jwt)
	req.Header.Add("Content-Type", "application/json")

	resp, err := c.Do(req)
	if err != nil || resp.StatusCode < 200 || resp.StatusCode > 299 {
		log.Println("Error or bad response while saving payload.", err)
		return
	}
	defer resp.Body.Close()

}

func logout(c *http.Client, address, jwt string) {
	req, err := http.NewRequest("GET", address+"/me/logout", nil)
	if err != nil {
		log.Println("Error creating request for logging out.", err)
		return
	}
	req.Header.Add("Authorization", "Bearer "+jwt)

	resp, err := c.Do(req)
	if err != nil || resp.StatusCode < 200 || resp.StatusCode > 299 {
		log.Println("Error or bad response while logging out.", err)
		return
	}
	defer resp.Body.Close()
}

func readline(prefix string, secret bool) string {
	var input string
	var reader *bufio.Reader

	if Piped {
		fi, err := os.Open("/dev/tty")
		if err != nil {
			return ""
		}
		defer fi.Close()
		reader = bufio.NewReader(fi)
	} else {
		reader = bufio.NewReader(os.Stdin)
	}

	// for loop := true; loop; loop = (input == "") {
	// reader.Print(prefix)
	fmt.Print(prefix)
	if secret {
		echo(false)
	}
	input, _ = reader.ReadString('\n')
	// fmt.Scanln(&input)
	input = strings.TrimSpace(input)
	if secret {
		echo(true)
	}
	// }

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
