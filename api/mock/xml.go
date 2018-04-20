package mock

import "html/template"

type XmlService struct{}

func (service *XmlService) DefaultTemplate(templateName string, data map[string]interface{}) template.HTML {
	return template.HTML("<span>test</span>")
}
