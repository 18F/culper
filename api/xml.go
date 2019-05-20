package api

import "html/template"

// XMLService represents a basic interface to XML related functionality.
type XMLService interface {
	PackageXML(app Application) (template.HTML, error)
	DefaultTemplate(templateName string, data map[string]interface{}) (template.HTML, error)
}
