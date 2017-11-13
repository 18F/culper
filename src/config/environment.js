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

  IsProduction () {
    return process.env.NODE_ENV === 'production'
  }

  IsTest () {
    return process.env.NODE_ENV === 'test'
  }

  MultipleFactorAuthentication () {
    if (this.IsTest()) {
      return {
        resettable: false,
        enabled: true
      }
    }

    return {
      resettable: (process.env.ALLOW_2FA_RESET || '') !== '',
      enabled: (process.env.DISABLE_2FA || '') === ''
    }
  }

  OAuthEnabled () {
    return (process.env.OAUTH_ENABLED || '').length
  }

  SamlEnabled () {
    return (process.env.SAML_ENABLED || '').length
  }

  EndpointBasicAuthentication () { return '/auth/basic' }
  EndpointRefresh () { return '/refresh' }
  EndpointSaml () { return `${this.ApiBaseURL()}/auth/saml` }
  EndpointTwoFactor (account) { return `/2fa/${account}` }
  EndpointTwoFactorVerify (account) { return `/2fa/${account}/verify` }
  EndpointTwoFactorReset (account) { return `/2fa/${account}/reset` }
  EndpointOAuth (service) { return `/auth/${service}` }
  EndpointSave (payload) { return '/me/save' }
  EndpointValidate (payload) { return '/me/validate' }
}

const env = new Env()
export default env
