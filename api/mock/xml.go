package mock

import "html/template"

// XMLService is a mock implementation of handling XML.
type XMLService struct{}

// DefaultTemplate returns a template given data.
func (service *XMLService) DefaultTemplate(templateName string, data map[string]interface{}) template.HTML {
	return template.HTML("<span>test</span>")
}
