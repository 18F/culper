package api

import "html/template"

// XMLService represents a basic interface to XML related functionality.
type XMLService interface {
	PackageXML(app Application) (template.HTML, error)
}
