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

  EndpointBasicAuthentication () { return '/auth/basic' }
  EndpointRefresh () { return '/refresh' }
  EndpointTwoFactor (account) { return `/2fa/${account}` }
  EndpointTwoFactorVerify (account) { return `/2fa/${account}/verify` }
  EndpointTwoFactorReset (account) { return `/2fa/${account}/reset` }
  EndpointOAuth (service) { return `/auth/${service}` }
  EndpointSave (payload) { return '/me/save' }
  EndpointSection (type) { return `/me/section?type=${type || ''}` }
  EndpointValidate (payload) { return '/me/validate' }
}

const env = new Env()
export default env
