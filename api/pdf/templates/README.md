## Notes on creating release/certification PDF templates

No convenient open-source library existed for Go that would allow easy customization of PDFs from a template. A work-around doing basic text substitution was devised, with PDF templates generated from the following process:

1. Extract single-page PDFs from multi-page SF-86 PDF.
2. Using OmniGraffle on macOS, create look-alike forms, starting off with result of PDF import.
3. Adjust layout of form fields as appropriate to accommodate e-signature legalese, etc.
4. Add placeholder text with appropriate font and size and length in the area of the form where text will be substituted.
5. To minimize PDF size, only use Helvetica or Courier. Use Courier for the non-signature auto-populated fields, as a monospace type simplifies layout. Use Helvetica to provide visual contrast for the e-signature fields (full name as signature and date). Tab through all the text in the document and make sure no other fonts are in use.
5. By default, when exporting to PDF, OmniGraffle will structure the PDF objects in such a way to make basic text substitution difficult (i.e., it positions every character separately). To avoid this, place holder text should be a number string (e.g., `1111111111`) of the same length as the desired fixed width field. OmniGraffle will position the string as a single text object surrounded by parentheses (e.g., `(111111111111)` and will make simple substitution possible. In a later stage, the number string will be replaced with a self-describing field name (e.g., `(SSN         )`)
6. Export each OmniGraffle file to PDF.
7. Use `qpdf --qdf` on each PDF to get a text editable file.
8. OmniGraffle will embed a subset of the TrueType font instead of relying on the default PDF fonts. Replace those with equivalent Type1 directives for `Helvetica`, `Helvetica-Bold`, `Helvetica-Oblique`, and `Courier`.
9. Replace number strings field placeholders with more self-documenting equivalent (e.g., `SSN`, `FIRST_MIDDLE_LAST`, `DOB`, etc.). Pad the field with the space character to preserve the object and xref byte offsets in the PDF, so we don't have to parse and re-calculate these values at run-time.
10. Run `fix-qdf` on each file to renumber PDF object.
11. Run `qpdf --qdf` on each file again to remove dangling PDF object references (e.g., the embedded fonts that are no longer used).
12. Validate templates with the [3-Heights PDF validator](https://www.pdf-online.com/osa/validate.aspx) or similar.
