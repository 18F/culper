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

  IsTest () {
    return process.env.NODE_ENV === 'test'
  }

  AllowTwoFactorReset () { return process.env.ALLOW_2FA_RESET || false }
  EndpointBasicAuthentication () { return '/auth/basic' }
  EndpointRefresh () { return '/refresh' }
  EndpointTwoFactor (account) { return `/2fa/${account}` }
  EndpointTwoFactorVerify (account) { return `/2fa/${account}/verify` }
  EndpointTwoFactorReset (account) { return `/2fa/${account}/reset` }
  EndpointOAuth (service) { return `/auth/${service}` }
  EndpointSave (payload) { return '/me/save' }
  EndpointValidate (payload) { return '/me/validate' }
}

const env = new Env()
export default env
