package session

import (
	"fmt"
	"os"
	"testing"
	"time"

	"github.com/pkg/errors"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/env"
	"github.com/18F/e-QIP-prototype/api/log"
	"github.com/18F/e-QIP-prototype/api/mock"
	"github.com/18F/e-QIP-prototype/api/postgresql"
	"github.com/18F/e-QIP-prototype/api/simplestore"
)

func getSimpleStore() api.StorageService {
	env := &env.Native{}
	os.Setenv(api.LogLevel, "info")
	env.Configure()

	log := &log.Service{Log: log.NewLogger()}

	dbConf := postgresql.DBConfig{
		User:     env.String(api.DatabaseUser),
		Password: env.String(api.DatabasePassword),
		Address:  env.String(api.DatabaseHost),
		DBName:   env.String(api.TestDatabaseName),
	}

	connString := postgresql.PostgresConnectURI(dbConf)

	serializer := simplestore.JSONSerializer{}

	store, storeErr := simplestore.NewSimpleStore(connString, log, serializer)
	if storeErr != nil {
		fmt.Println("Unable to configure simple store", storeErr)
		os.Exit(1)
	}
	return store
}

func TestAuthExists(t *testing.T) {

	timeout := 5 * time.Second
	store := getSimpleStore()
	sessionLog := &mock.LogService{}
	session := NewSessionService(timeout, store, sessionLog)

	session.UserDidAuthenticate(0, simplestore.NullString())
}

func TestLogSessionCreatedDestroyed(t *testing.T) {

	timeout := 5 * time.Second
	store := getSimpleStore()
	sessionLog := &logRecorder{}

	session := NewSessionService(timeout, store, sessionLog)

	account := simplestore.CreateTestAccount(t, store.(simplestore.SimpleStore))

	sessionKey, authErr := session.UserDidAuthenticate(account.ID, simplestore.NullString())
	if authErr != nil {
		t.Fatal(authErr)
	}

	createMsg, logErr := sessionLog.getOnlyMatchingMessage(api.SessionCreated)
	if logErr != nil {
		t.Fatal(logErr)
	}

	if createMsg.level != "INFO" {
		t.Fatal("Wrong Log Level", createMsg.level)
	}

	sessionHash, ok := createMsg.fields["session_hash"]
	if !ok {
		t.Fatal("Didn't log the hashed session key")
	}

	if sessionHash == sessionKey {
		t.Fatal("We logged the actual session key!")
	}

	delErr := session.UserDidLogout(sessionKey)
	if delErr != nil {
		t.Fatal(delErr)
	}

	delMsg, delLogErr := sessionLog.getOnlyMatchingMessage(api.SessionDestroyed)
	if delLogErr != nil {
		t.Fatal(delLogErr)
	}

	delSessionHash, ok := delMsg.fields["session_hash"]
	if !ok {
		t.Fatal("Didn't log the hashed session key")
	}

	if delSessionHash == sessionKey {
		t.Fatal("We logged the actual session key!")
	}

	_, _, getErr := session.GetAccountIfSessionIsValid(sessionKey)
	if getErr != api.ErrValidSessionNotFound {
		t.Fatal(getErr)
	}

	nonExistantMsg, logNonExistantErr := sessionLog.getOnlyMatchingMessage(api.SessionDoesNotExist)
	if logNonExistantErr != nil {
		t.Fatal(logNonExistantErr)
	}

	nonExistantSessionHash, ok := nonExistantMsg.fields["session_hash"]
	if !ok {
		t.Fatal("Didn't log the hashed session key")
	}

	if nonExistantSessionHash == sessionKey {
		t.Fatal("We logged the actual session key!")
	}

}

func TestLogSessionExpired(t *testing.T) {

	timeout := -5 * time.Second
	store := getSimpleStore()
	sessionLog := &logRecorder{}

	session := NewSessionService(timeout, store, sessionLog)

	account := simplestore.CreateTestAccount(t, store.(simplestore.SimpleStore))

	sessionKey, authErr := session.UserDidAuthenticate(account.ID, simplestore.NullString())
	if authErr != nil {
		t.Fatal(authErr)
	}

	_, logCreateErr := sessionLog.getOnlyMatchingMessage(api.SessionCreated)
	if logCreateErr != nil {
		t.Fatal(logCreateErr)
	}

	_, _, getErr := session.GetAccountIfSessionIsValid(sessionKey)
	if getErr != api.ErrSessionExpired {
		t.Fatal("didn't get the right error back getting the expired session:", getErr)
	}

	expiredMsg, logExpiredErr := sessionLog.getOnlyMatchingMessage(api.SessionExpired)
	if logExpiredErr != nil {
		t.Fatal(logExpiredErr)
	}

	expiredSessionHash, ok := expiredMsg.fields["session_hash"]
	if !ok {
		t.Fatal("Didn't log the hashed session key")
	}

	if expiredSessionHash == sessionKey {
		t.Fatal("We logged the actual session key!")
	}

	// make sure you can re-auth after ending a session
	_, newAuthErr := session.UserDidAuthenticate(account.ID, simplestore.NullString())
	if newAuthErr != nil {
		t.Fatal(newAuthErr)
	}

}

// TestLogConcurrentSession tests that if you create a session, then create a new session over it, we log something.
func TestLogConcurrentSession(t *testing.T) {

	timeout := 5 * time.Second
	store := getSimpleStore()
	sessionLog := &logRecorder{}

	session := NewSessionService(timeout, store, sessionLog)

	account := simplestore.CreateTestAccount(t, store.(simplestore.SimpleStore))

	_, authErr := session.UserDidAuthenticate(account.ID, simplestore.NullString())
	if authErr != nil {
		t.Fatal(authErr)
	}

	_, logCreateErr := sessionLog.getOnlyMatchingMessage(api.SessionCreated)
	if logCreateErr != nil {
		t.Fatal(logCreateErr)
	}

	// Now login again:
	_, authAgainErr := session.UserDidAuthenticate(account.ID, simplestore.NullString())
	if authAgainErr != nil {
		t.Fatal(authAgainErr)
	}

	createMessages := sessionLog.matchingMessages(api.SessionCreated)
	if len(createMessages) != 2 {
		t.Fatal("Should have 2 create messages now")
	}

	_, logConcurrentErr := sessionLog.getOnlyMatchingMessage(api.SessionConcurrentLogin)
	if logConcurrentErr != nil {
		t.Fatal(logConcurrentErr)
	}

}

// Log Recorder

type logLine struct {
	level   string
	message string
	fields  api.LogFields
}

type logRecorder struct {
	mock.LogService
	lines   []logLine
	globals api.LogFields
}

func (r *logRecorder) recordLine(level string, message string, fields api.LogFields) logLine {
	newLine := logLine{
		level:   level,
		message: message,
		fields:  api.LogFields{},
	}

	for k, v := range r.globals {
		newLine.fields[k] = v
	}

	for k, v := range fields {
		newLine.fields[k] = v
	}

	r.lines = append(r.lines, newLine)

	return newLine
}

func (r *logRecorder) Info(message string, fields api.LogFields) {
	line := r.recordLine("INFO", message, fields)
	r.LogService.Info(line.message, line.fields)
}

func (r *logRecorder) AddField(name string, value interface{}) {
	if r.globals == nil {
		r.globals = api.LogFields{}
	}
	r.globals[name] = value
}

func (r *logRecorder) getOnlyMatchingMessage(message string) (logLine, error) {
	messages := r.matchingMessages(message)
	if len(messages) != 1 {
		return logLine{}, errors.New(fmt.Sprintf("Didn't find only one line for message: %s (%s) ", message, messages))
	}
	return messages[0], nil
}

func (r *logRecorder) matchingMessages(message string) []logLine {
	matches := []logLine{}
	for _, line := range r.lines {
		if line.message == message {
			matches = append(matches, line)
		}
	}
	return matches
}
