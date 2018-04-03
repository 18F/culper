package api

import (
	"time"
)

// Transmission record of application being sent to external system for
// additional processing.
type Transmission struct {
	ID         int
	AccountID  int
	Raw        []byte
	RequestKey string
	AgencyKey  int
	Status     string
	Created    time.Time
	Modified   time.Time
}
