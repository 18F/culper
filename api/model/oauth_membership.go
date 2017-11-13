package model

import "time"

type OAuthMembership struct {
	tableName  struct{} `sql:"oauth_membership"`
	ID         int
	Identifier string
	Provider   string
	Account    *Account
	AccountID  int
	Created    time.Time
}
