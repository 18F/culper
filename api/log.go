package api

// LogFields are named keys to hold additional information to be reported
// in the log messages.
type LogFields map[string]interface{}

// LogService represents common methods for a logging service.
type LogService interface {
	AddField(name string, value interface{})
	Print(message string, fields LogFields)
	PrintError(message string, err error, fields LogFields)
	Debug(message string, fields LogFields)
	DebugError(message string, err error, fields LogFields)
	Warn(message string, fields LogFields)
	WarnError(message string, err error, fields LogFields)
	Info(message string, fields LogFields)
	InfoError(message string, err error, fields LogFields)
	Fatal(message string, fields LogFields)
	FatalError(message string, err error, fields LogFields)
	Panic(message string, fields LogFields)
	PanicError(message string, err error, fields LogFields)
}

// Warning messages
const (
	AccountLocked                              = "The account is currently locked"
	AccountUpdateError                         = "Not able to update account information"
	BasicAuthAttemptDenied                     = "An attempt for basic authentication was denied"
	BasicAuthError                             = "Failed to decode JSON for basic authentication"
	BasicAuthInvalid                           = "Basic authentication invalid"
	BasicAuthMissingPassword                   = "Basic authentication failed because missing a password"
	BasicAuthMissingUsername                   = "Basic authentication failed because missing a username"
	CORSDenied                                 = "CORS request denied"
	CookieDomainNotSet                         = "Cookie Domain is not set"
	EntityError                                = "Error getting entity data"
	EntitySaveError                            = "Error getting entity data"
	InvalidJWT                                 = "Invalid JSON web token"
	JWTError                                   = "Failed to generate JSON web token"
	JWTSecretNotSet                            = "JSON web token secret is not set"
	MFAAttemptDenied                           = "An attempt for multiple factor authentication was denied"
	MFAEmailError                              = "Failed to send email for multiple factor authentication"
	MFAError                                   = "Error during multiple factor authentication"
	MFAInvalid                                 = "Failed multiple factor authentication"
	MFAResetAttempt                            = "An attempt to reset multiple factor authentication was denied"
	MiddlewareError                            = "Middleware has thrown an error"
	MigrationUnsupported                       = "Database migrations are not automated for Windows. Please manually execute the migrations."
	NoAccount                                  = "Unable to retrieve account"
	NoAuthorizationToken                       = "No authorization token header found"
	NoUsername                                 = "Unable to retrieve account because no username was provided"
	PayloadDeserializeError                    = "Failed to deserialize payload"
	PayloadEmpty                               = "Payload not provided"
	PayloadEntityError                         = "Error creating entity from the payload"
	PayloadInvalid                             = "Payload is invalid"
	PayloadMissingType                         = "Payload is missing a type"
	PdfError                                   = "Error generating archival signature PDFs"
	QRCodeError                                = "Failed to generate multiple factor authentication QR code"
	RetrievingAccount                          = "Retrieving account"
	SamlAttemptDenied                          = "An attempt for SAML authentication was denied"
	SamlFormError                              = "SAML response form value missing"
	SamlIdentifierMissing                      = "SAML attribute identifier missing"
	SamlInvalid                                = "SAML response invalid"
	SamlParseError                             = "Error parsing SAML response"
	SamlRequestError                           = "Error creating SAML authentication request"
	SamlRequestURLError                        = "Error creating SAML authentication request URL"
	SamlVerificationError                      = "Error verifying SAML response"
	USPSDecodeError                            = "Error decoding USPS geocoding response"
	USPSKnownErrorCode                         = "USPS known error received"
	USPSMissingKey                             = "USPS API key has not been set"
	USPSRequestError                           = "Error executing USPS geocoding request"
	USPSUnknownErrorCode                       = "USPS known error received"
	WarnFailedMigration                        = "Failed to migrate database"
	WebserviceMissingURL                       = "Missing endpoint URL for web service"
	WebserviceMissingKey                       = "Missing private key for web service"
	WebserviceMissingCallerInfoAgencyID        = "Missing Caller Info Agency ID"
	WebserviceMissingCallerInfoAgencySSN       = "Missing Caller Info Agency SSN"
	WebserviceMissingCallerInfoAgencyPseudoSSN = "Missing Caller Info Agency Pseudo SSN"
	WebserviceCannotGetApplicationData         = "Unable to retrieve Form Application Data"
	WebserviceMissingAgencyID                  = "Missing Agency ID"
	WebserviceErrorCreatingImportRequest       = "Unable to create import request"
	TransmissionError                          = "Error transmitting package"
	TransmissionStorageError                   = "Failed to store transmission record"
	AttachmentDenied                           = "An attempt for attachments was denied"
	AttachmentNoFile                           = "No attachment file found in multipart form data"
	AttachmentCopyBufferError                  = "Could not copy file buffer"
	AttachmentNotSaved                         = "Attachment file failed to save in persistent storage"
	AttachmentNotDeleted                       = "Attachment file failed to delete"
	AttachmentNoID                             = "No identifier for attachment provided"
	AttachmentNotFound                         = "Attachment file not found"
	AttachmentSizeMismatch                     = "Attachment file size mismatch"
	AttachmentSizeExceeded                     = "Attachment file size exceeded maximum allowed"
	AttachmentTypeNotAllowed                   = "Attachment file type not allowed"
)

// Informative messages
const (
	BasicAuthValid       = "Basic authentication validated"
	GenerateQRCode       = "Generating multiple factor authentication QR code"
	GeneratingPackage    = "Generating package for transmission"
	LoggedOut            = "Logged out"
	MFAValid             = "Multiple factor authentication validated"
	PurgeAccountData     = "Purging account data"
	ResetMFA             = "Reset of multiple factor authentication"
	SamlValid            = "SAML authentication validated"
	StartingServer       = "Starting server"
	StartingServerTLS    = "Starting server with HTTPS/TLS"
	StoppingServer       = "Stopping server"
	TransmissionRecorded = "Transmission recorded"
	TransmissionStarted  = "Transmission began"
	TransmissionStopped  = "Transmission ended"
	ValidatingJWT        = "Validating JSON web token"
	CORSIgnored          = "CORS ignoring OPTION method"
	WebRequest           = "Web server request received"
	JWTSecretSet         = "JSON web token secret is set"
	AttachmentSaved      = "Attachment saved"
	AttachmentDeleted    = "Attachment deleted"
	AttachmentDownloaded = "Attachment downloaded"
	CacheHeaders         = "Applying headers for caching"
)
