package api

import "time"

// An ArchivalPdf represents a PDF (Portable Document Format) file that needs to be retained and submitted to e-QIP.
type ArchivalPdf struct {
	Name     string // document type name shown to users (e.g, Certification, Medical Release, etc.)
	Template string // filename of PDF template that will be populated
	Section  string // eApp sub-section where signature information is stored
	DocType  string // document type derived from e-QIP (e.g., CER, MEL, etc.)
}

// PdfService declares operations to create and query archival PDFs.
type PdfService interface {
	GenerateReleases(account Account, app Application) ([]Attachment, error)
	CreatePdf(application map[string]interface{}, pdfType ArchivalPdf, hash string) ([]byte, error)
	SignatureAvailable(application map[string]interface{}, pdfType ArchivalPdf) (*time.Time, bool)
}
