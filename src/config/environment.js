import { hashHistory, browserHistory } from 'react-router'

class Env {
  History () {
    const useHashRouting = process.env.HASH_ROUTING || ''
    return useHashRouting ? hashHistory : browserHistory
  }

  ApiBaseURL () {
    let url = process.env.API_BASE_URL || ''

    if (url === '' && window) {
      const loc = window.location || {}
      const protocol = loc.protocol || 'http:'
      const hostname = loc.hostname || 'localhost'
      const port = loc.port || '8080'
      return `${protocol}//${hostname}${port ? ':' + port : ''}/api`
    }

    return url
  }

  AllowTwoFactorReset () { return process.env.ALLOW_2FA_RESET || false }
  EndpointBasicAuthentication () { return '/auth/basic' }
  EndpointTwoFactor (account) { return `/2fa/${account}` }
  EndpointTwoFactorVerify (account) { return `/2fa/${account}/verify` }
  EndpointTwoFactorReset (account) { return `/2fa/${account}/reset` }
  EndpointOAuth (service) { return `/auth/${service}` }
  EndpointValidateSSN (ssn) { return `/validate/ssn/${ssn}` }
  EndpointValidatePassport (passport) { return `/validate/passport/${passport}` }
  EndpointValidateZipcode (zipcode) { return `/validate/zipcode/${zipcode}` }
  EndpointValidateAddress () { return '/validate/address' }
  EndpointValidateName () { return '/validate/name' }
  EndpointValidateApplicantBirthdate () { return '/validate/applicant/birthdate' }
}

const env = new Env()
export default env
