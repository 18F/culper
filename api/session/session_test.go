package session

import (
	"fmt"
	"os"
	"testing"
	"time"

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
	sessionLog := &mock.LogRecorder{}

	session := NewSessionService(timeout, store, sessionLog)

	account := simplestore.CreateTestAccount(t, store.(simplestore.SimpleStore))

	sessionKey, authErr := session.UserDidAuthenticate(account.ID, simplestore.NullString())
	if authErr != nil {
		t.Fatal(authErr)
	}

	createMsg, logErr := sessionLog.GetOnlyMatchingMessage(api.SessionCreated)
	if logErr != nil {
		t.Fatal(logErr)
	}

	if createMsg.Level != "INFO" {
		t.Fatal("Wrong Log Level", createMsg.Level)
	}

	sessionHash, ok := createMsg.Fields["session_hash"]
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

	delMsg, delLogErr := sessionLog.GetOnlyMatchingMessage(api.SessionDestroyed)
	if delLogErr != nil {
		t.Fatal(delLogErr)
	}

	if delMsg.Level != "INFO" {
		t.Fatal("Wrong Log Level", delMsg.Level)
	}

	delSessionHash, ok := delMsg.Fields["session_hash"]
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

	nonExistantMsg, logNonExistantErr := sessionLog.GetOnlyMatchingMessage(api.SessionDoesNotExist)
	if logNonExistantErr != nil {
		t.Fatal(logNonExistantErr)
	}

	nonExistantSessionHash, ok := nonExistantMsg.Fields["session_hash"]
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
	sessionLog := &mock.LogRecorder{}

	session := NewSessionService(timeout, store, sessionLog)

	account := simplestore.CreateTestAccount(t, store.(simplestore.SimpleStore))

	sessionKey, authErr := session.UserDidAuthenticate(account.ID, simplestore.NullString())
	if authErr != nil {
		t.Fatal(authErr)
	}

	logCreateMsg, logCreateErr := sessionLog.GetOnlyMatchingMessage(api.SessionCreated)
	if logCreateErr != nil {
		t.Fatal(logCreateErr)
	}

	if logCreateMsg.Level != "INFO" {
		t.Fatal("Wrong Log Level", logCreateMsg.Level)
	}

	_, _, getErr := session.GetAccountIfSessionIsValid(sessionKey)
	if getErr != api.ErrSessionExpired {
		t.Fatal("didn't get the right error back getting the expired session:", getErr)
	}

	expiredMsg, logExpiredErr := sessionLog.GetOnlyMatchingMessage(api.SessionExpired)
	if logExpiredErr != nil {
		t.Fatal(logExpiredErr)
	}

	expiredSessionHash, ok := expiredMsg.Fields["session_hash"]
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
	sessionLog := &mock.LogRecorder{}

	session := NewSessionService(timeout, store, sessionLog)

	account := simplestore.CreateTestAccount(t, store.(simplestore.SimpleStore))

	_, authErr := session.UserDidAuthenticate(account.ID, simplestore.NullString())
	if authErr != nil {
		t.Fatal(authErr)
	}

	_, logCreateErr := sessionLog.GetOnlyMatchingMessage(api.SessionCreated)
	if logCreateErr != nil {
		t.Fatal(logCreateErr)
	}

	// Now login again:
	_, authAgainErr := session.UserDidAuthenticate(account.ID, simplestore.NullString())
	if authAgainErr != nil {
		t.Fatal(authAgainErr)
	}

	createMessages := sessionLog.MatchingMessages(api.SessionCreated)
	if len(createMessages) != 2 {
		t.Fatal("Should have 2 create messages now")
	}

	_, logConcurrentErr := sessionLog.GetOnlyMatchingMessage(api.SessionConcurrentLogin)
	if logConcurrentErr != nil {
		t.Fatal(logConcurrentErr)
	}

}
