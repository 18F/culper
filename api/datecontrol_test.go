package api

import (
	"testing"
	"time"
)

var failTime = time.Time{}

func TestDateControl(t *testing.T) {
	datec := DateControl{
		Month:     "11",
		Day:       "24",
		Year:      "4000",
		Estimated: true,
	}
	time := datec.Date()
	if failTime == time {
		t.Log("Should have received an time.Date object, instead got ", failTime)
		t.Fail()
	}
}

func TestDateControlMonthFail(t *testing.T) {
	datec := DateControl{
		Month:     "four",
		Day:       "11",
		Year:      "2000",
		Estimated: false,
	}
	time := datec.Date()
	if failTime != time {
		t.Log("Should have received a blank time object, instead got ", time)
		t.Fail()
	}
}

func TestDateControlDayFail(t *testing.T) {
	datec := DateControl{
		Month:     "1",
		Day:       "eleven",
		Year:      "2000",
		Estimated: false,
	}
	time := datec.Date()
	if failTime != time {
		t.Log("Should have received a blank time object, instead got ", time)
		t.Fail()
	}
}

func TestDateControlYearFail(t *testing.T) {
	datec := DateControl{
		Month:     "1",
		Day:       "11",
		Year:      "two",
		Estimated: false,
	}
	time := datec.Date()
	if failTime != time {
		t.Log("Should have received a blank time object, instead got ", time)
		t.Fail()
	}
}
