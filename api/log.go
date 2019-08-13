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
	StatusError                                = "Unable to determine the status of the application"
	BasicAuthNotImplemented                    = "Basic authentication is not implemented"
	BasicAuthAttemptDenied                     = "An attempt for basic authentication was denied"
	BasicAuthError                             = "Failed to decode JSON for basic authentication"
	BasicAuthInvalid                           = "Basic authentication invalid"
	BasicAuthMissingPassword                   = "Basic authentication failed because missing a password"
	BasicAuthMissingUsername                   = "Basic authentication failed because missing a username"
	BasicLogoutFailed                          = "Failed to logout user"
	SessionExpired                             = "Auth failed because of an expired session"
	SessionDoesNotExist                        = "Auth failed because of an invalid session"
	SessionUnexpectedError                     = "An unexpected error occured while checking the session."
	CSRFTokenMissing                           = "The state modifying request is missing a CSRF Token"
	CSRFTokenInvalid                           = "The state modifying request has an invalid CSRF Token"
	RequestIsMissingSessionCookie              = "Unauthorized: Request is missing a session cookie"
	CORSDenied                                 = "CORS request denied"
	CookieDomainNotSet                         = "Cookie Domain is not set"
	EntityError                                = "Error getting entity data"
	EntitySaveError                            = "Error saving entity data"
	FormDecodingError                          = "Error serializing form"
	HashingFailure                             = "Error calculating hash"
	MiddlewareError                            = "Middleware has thrown an error"
	MigrationUnsupported                       = "Database migrations are not automated for Windows. Please manually execute the migrations."
	NoAccount                                  = "Unable to retrieve account"
	NoAuthorizationToken                       = "No authorization token header found"
	NoUsername                                 = "Unable to retrieve account because no username was provided"
	PayloadDeserializeError                    = "Failed to deserialize payload"
	PayloadEmpty                               = "Payload not provided"
	PayloadEntityError                         = "Error converting payload into valid entity"
	PayloadInvalid                             = "Payload is invalid"
	PayloadMissingType                         = "Payload is missing a type"
	PdfError                                   = "Error generating archival signature PDFs"
	RetrievingAccount                          = "Retrieving account"
	SamlNotImplemented                         = "SAML is not implemented"
	SamlAttemptDenied                          = "An attempt for SAML authentication was denied"
	SamlNotEnabled                             = "SAML is not enabled"
	SamlSLONotEnabled                          = "SAML SLO is not enabled"
	SamlSLOLogoutFailed                        = "Failed to SAML logout user"
	SamlFormError                              = "SAML response form value missing"
	SamlIdentifierMissing                      = "SAML attribute identifier missing"
	SamlInvalid                                = "SAML response invalid"
	SamlParseError                             = "Error parsing SAML response"
	SamlRequestError                           = "Error creating SAML authentication request"
	SamlRequestURLError                        = "Error creating SAML authentication request URL"
	SamlVerificationError                      = "Error verifying SAML response"
	SamlSLORequestGeneration                   = "Error generating SAML SLO Request"
	SamlSLOMissingSessionIndex                 = "Missing Session Index from AuthNResponse. WSO2 may be mis-configured"
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
	WebserviceCannotGenerateInboundXML         = "Unable to generate XML from Form Application Data"
	WebserviceCannotGetApplicationData         = "Unable to retrieve Form Application Data"
	WebserviceMissingAgencyID                  = "Missing Agency ID"
	WebserviceErrorCreatingImportRequest       = "Unable to create import request"
	TransmissionError                          = "Error transmitting package"
	TransmissionStorageError                   = "Failed to store transmission record"
	AttachmentsNotImplemented                  = "Attachments is not implemented"
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
	BasicAuthValid         = "Basic authentication validated"
	GeneratingPackage      = "Generating package for transmission"
	LoggedOut              = "Logged out"
	PurgeAccountData       = "Purging account data"
	SamlValid              = "SAML authentication validated"
	SessionCreated         = "New Session Created"
	SessionDestroyed       = "Session Was Destroyed"
	SessionRefreshed       = "Session was refreshed with the refresh API"
	SessionConcurrentLogin = "User logged in again with a concurrent active session"
	StartingServer         = "Starting server"
	StartingServerTLS      = "Starting server with HTTPS/TLS"
	StoppingServer         = "Stopping server"
	TransmissionRecorded   = "Transmission recorded"
	TransmissionStarted    = "Transmission began"
	TransmissionStopped    = "Transmission ended"
	CORSIgnored            = "CORS ignoring OPTION method"
	WebRequest             = "Web server request received"
	AttachmentSaved        = "Attachment saved"
	AttachmentDeleted      = "Attachment deleted"
	AttachmentDownloaded   = "Attachment downloaded"
	CacheHeaders           = "Applying headers for caching"
)
