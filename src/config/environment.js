import {
  createHashHistory,
  createBrowserHistory,
  createMemoryHistory
} from 'history'

const parseBool = val => {
  const str = `${val || ''}`
  switch (str.toLowerCase()) {
    case '1':
    case 't':
    case 'true':
      return true
    default:
      return false
  }
}

class Env {
  History() {
    if (!this.history) {
      const useHashRouting = parseBool(process.env.HASH_ROUTING)
      if (useHashRouting) {
        this.history = createHashHistory()
      } else if (this.IsTest()) {
        this.history = createMemoryHistory()
      } else {
        this.history = createBrowserHistory()
      }
    }
    return this.history
  }

  ApiBaseURL() {
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

  IsProduction() {
    return process.env.NODE_ENV === 'production'
  }

  IsTest() {
    return process.env.NODE_ENV === 'test'
  }

  BasicAuthenticationEnabled() {
    return parseBool(process.env.BASIC_ENABLED)
  }

  SamlEnabled() {
    return parseBool(process.env.SAML_ENABLED)
  }

  SessionTimeout() {
    return parseInt(process.env.SESSION_TIMEOUT || '15', 10)
  }

  AttachmentsEnabled() {
    return parseBool(process.env.ATTACHMENTS_ENABLED)
  }

  FileMaximumSize() {
    return parseInt(process.env.FILE_MAXIMUM_SIZE || '5000000', 10)
  }

  FileTypes() {
    return (process.env.FILE_TYPES || '.tiff;.png;.pdf').split(';').map(x => {
      return x.replace('.', '').toUpperCase()
    })
  }

  EndpointBasicAuthentication() {
    return '/auth/basic'
  }
  EndpointLogout() {
    return '/me/logout'
  }
  EndpointRefresh() {
    return '/refresh'
  }
  EndpointSaml() {
    return `${this.ApiBaseURL()}/auth/saml`
  }
  EndpointSave(payload) {
    return '/me/save'
  }
  EndpointSection(type) {
    return `/me/section?type=${type || ''}`
  }
  EndpointStatus() {
    return '/me/status'
  }
  EndpointForm() {
    return '/me/form'
  }
  EndpointSubmit() {
    return '/me/form/submit'
  }
  EndpointFormHash() {
    return '/me/form/hash'
  }
  EndpointValidate(payload) {
    return '/me/validate'
  }
  EndpointAttachment() {
    return '/me/attachment'
  }
  EndpointAttachmentUpdate(id) {
    return `/me/attachment/${id}`
  }
  EndpointAttachmentGet(id) {
    return `/me/attachment/${id}`
  }
  EndpointAttachmentDelete(id) {
    return `/me/attachment/${id}/delete`
  }
}

const env = new Env()
export default env
