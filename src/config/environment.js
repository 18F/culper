import { createHashHistory, createBrowserHistory } from 'history'

class Env {
  History () {
    const useHashRouting = process.env.HASH_ROUTING || ''
    if (!this.history) {
      this.history = useHashRouting ? createHashHistory() : createBrowserHistory()
    }
    return this.history
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

  BasicAuthenticationEnabled () {
    return (process.env.BASIC_ENABLED || '').length
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
  EndpointSave (payload) { return '/me/save' }
  EndpointSection (type) { return `/me/section?type=${type || ''}` }
  EndpointForm () { return '/me/form' }
  EndpointFormHash () { return '/me/form/hash' }
  EndpointValidate (payload) { return '/me/validate' }
}

const env = new Env()
export default env
