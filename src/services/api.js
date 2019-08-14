/* eslint import/no-cycle: 0 */
import axios from 'axios'
import env from '../config/environment'

const getSplitValue = (key, raw, delim1, delim2) => {
  const vars = raw.split(delim1)

  for (let i = 0; i < vars.length; i += 1) {
    const pair = vars[i].split(delim2)
    if (pair.length === 2) {
      const pairKey = pair[0].trim()
      const pairValue = pair[1].trim()
      if (pairKey === key && pairValue) {
        return pairValue
      }
    }
  }

  return null
}

export const getQueryValue = (queryString, key) => getSplitValue(key, queryString.substring(1), '&', '=')

class Api {
  constructor() {
    this.proxy = axios.create({
      baseURL: env ? env.ApiBaseURL() : '/api',
      timeout: 30000,
      withCredentials: true,
    })

    this.proxy.interceptors.response.use(this.handleResponseSuccess, this.handleResponseError)
  }

  handleResponseSuccess = (response) => {
    // On a successful /status call, stash the CSRF token for later use.
    if (response.config.url.endsWith(env.EndpointStatus())) {
      this.csrfToken = response.headers['x-csrf-token']
    }
    return response
  }

  handleResponseError = (error) => {
    console.warn(`API request failed: ${error.message}`)
    return Promise.reject(error)
  }

  information() {
    return this.proxy.get('/')
  }

  get(endpoint) {
    return this.proxy.get(endpoint)
  }

  post(endpoint, params = {}, ignoreCSRF = false) {
    const { csrfToken } = this
    const headers = {}
    if (!ignoreCSRF && !csrfToken) {
      console.error('Attempting to make a POST without a CSRF Token set.', endpoint)
    } else {
      headers['X-CSRF-Token'] = csrfToken
    }

    return this.proxy.post(endpoint, params, { headers })
  }

  /** AUTH */
  saml() {
    return this.get(env.EndpointSaml())
  }

  samlSLO() {
    return this.get(env.EndpointSamlSLO())
  }

  login = (username, password) => this.post(
    env.EndpointBasicAuthentication(),
    { username, password },
    true,
  )

  logout = () => this.post(env.EndpointLogout(), {}, true)

  refresh = () => this.post(env.EndpointRefresh())

  /** FORM */
  save(payload) {
    return this.post(env.EndpointSave(), payload)
  }

  status = () => this.get(env.EndpointStatus())

  submit() {
    return this.post(env.EndpointSubmit())
  }

  form = () => this.get(env.EndpointForm())

  validate(payload) {
    return this.post(env.EndpointValidate(), payload)
  }

  /** ATTACHMENTS */
  listAttachments() {
    return this.get(env.EndpointAttachment())
  }

  saveAttachment(formData) {
    return this.post(env.EndpointAttachment(), formData)
  }

  updateAttachment(id, description) {
    return this.post(env.EndpointAttachmentUpdate(id), {
      description,
    })
  }

  getAttachment(id) {
    return this.get(env.EndpointAttachmentGet(id))
  }

  deleteAttachment(id) {
    return this.post(env.EndpointAttachmentDelete(id))
  }
}

const api = new Api()

export { api }
