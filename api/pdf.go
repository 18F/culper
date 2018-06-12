package api

// An ArchivalPdf represents a PDF that needs to be retained and submitted to e-QIP.
type ArchivalPdf struct {
	Template string // filename of PDF template that will be populated
	Section  string // eApp sub-section where signature information is stored
	DocType  string // document type derived from e-QIP (e.g., CER, REL, etc.)
}

type PdfService interface {
	CreatePdf(application map[string]interface{}, pdfType ArchivalPdf) ([]byte, error)
	IsSignatureAvailable(application map[string]interface{}, pdfType ArchivalPdf) bool
}
