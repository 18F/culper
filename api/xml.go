package api

import "html/template"

type XmlService interface {
	DefaultTemplate(templateName string, data map[string]interface{}) template.HTML
}
