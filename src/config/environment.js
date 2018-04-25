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

  SessionTimeout () {
    return parseInt(process.env.SESSION_TIMEOUT || '15', 10)
  }

  FileMaximumSize () {
    return parseInt(process.env.FILE_MAXIMUM_SIZE || '5000000', 10)
  }

  FileTypes () {
    return (process.env.FILE_TYPES || '.tiff;.png;.pdf').split(';').map(x => {
      return x.replace('.', '').toUpperCase()
    })
  }

  EndpointBasicAuthentication () { return '/auth/basic' }
  EndpointLogout () { return '/me/logout' }
  EndpointRefresh () { return '/refresh' }
  EndpointSaml () { return `${this.ApiBaseURL()}/auth/saml` }
  EndpointTwoFactor () { return '/2fa/' }
  EndpointTwoFactorVerify () { return '/2fa/verify' }
  EndpointTwoFactorReset () { return '/2fa/reset' }
  EndpointSave (payload) { return '/me/save' }
  EndpointSection (type) { return `/me/section?type=${type || ''}` }
  EndpointStatus () { return '/me/status' }
  EndpointForm () { return '/me/form' }
  EndpointSubmit () { return '/me/form/submit' }
  EndpointFormHash () { return '/me/form/hash' }
  EndpointValidate (payload) { return '/me/validate' }
  EndpointAttachment () { return '/me/attachment' }
  EndpointAttachmentUpdate (id) { return `/me/attachment/${id}` }
  EndpointAttachmentGet (id) { return `/me/attachment/${id}` }
  EndpointAttachmentDelete (id) { return `/me/attachment/${id}/delete` }
}

const env = new Env()
export default env
