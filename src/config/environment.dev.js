class Env {
  ApiBaseURL () { return 'http://localhost:3000' }
  EndpointBasicAuthentication () { return '/auth/basic' }
  EndpointTwoFactor (account) { return `/2fa/${account}` }
  EndpointTwoFactorVerify (account) { return `/2fa/${account}/verify` }
  EndpointOAuth (service) { return `/auth/${service}` }
  EndpointValidateSSN (ssn) { return `/validate/ssn/${ssn}` }
  EndpointValidatePassport (passport) { return `/validate/passport/${passport}` }
  EndpointValidateCity (city) { return `/validate/address/${city}` }
  EndpointValidateZipcode (zipcode) { return `/validate/zipcode/${zipcode}` }
  EndpointValidateState (state) { return `/validate/state/${state}` }
  EndpointValidateAddress () { return '/validate/address' }
}

const env = new Env()
export default env
