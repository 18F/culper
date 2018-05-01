package api

// Audience types used with Javascript Web Tokens.
//
// BasicAuthAudience is used when basic authentication is used.
// TwoFactorAudience is used when multiple factor authentication is used.
// SingleSignOnAudience is used when SAML/OAuth authentication is used.
const (
	BasicAuthAudience    = "Basic"
	TwoFactorAudience    = "2FA"
	SingleSignOnAudience = "SSO"
)
