package model

import "time"

type OAuthMembership struct {
	tableName  struct{} `sql:"oauth_membership"`
	ID         int64
	Identifier string
	Provider   string
	Account    *Account
	AccountID  int64
	Created    time.Time
}
