package form

import "reflect"
import "strconv"

func MinLength(fieldName string, t interface{}) (int64, bool) {
	v, ok := Extract(fieldName, "minLength", t)
	if !ok {
		return 0, false
	}
	n, err := strconv.ParseInt(v, 10, 64)
	return n, err == nil
}

func MaxLength(fieldName string, t interface{}) (int64, bool) {
	v, ok := Extract(fieldName, "maxLength", t)
	if !ok {
		return 0, false
	}
	n, err := strconv.ParseInt(v, 10, 64)
	return n, err == nil
}

func Extract(fieldName, tag string, t interface{}) (s string, ok bool) {
	st := reflect.TypeOf(t)
	field, ok := st.FieldByName(fieldName)
	if !ok {
		return "", false
	}
	return field.Tag.Lookup(tag)
}
