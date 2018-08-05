package api

import "html/template"

// XMLService represents a basic interface to XML related functionality.
type XMLService interface {
	DefaultTemplate(templateName string, data map[string]interface{}) (template.HTML, error)
}
