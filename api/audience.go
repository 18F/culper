package api

// Audience types used with Javascript Web Tokens.
//
// BasicAuthAudience is used when basic authentication is used.
// SingleSignOnAudience is used when SAML/OAuth authentication is used.
const (
	BasicAuthAudience    = "Basic"
	SingleSignOnAudience = "SSO"
)
