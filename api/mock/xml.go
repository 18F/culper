package mock

import (
	"html/template"

	"github.com/18F/e-QIP-prototype/api"
)

// XMLService is a mock implementation of handling XML.
type XMLService struct{}

// PackageXML returns a template given data.
func (service *XMLService) PackageXML(app api.Application) (template.HTML, error) {
	return template.HTML("<span>test</span>"), nil
}
