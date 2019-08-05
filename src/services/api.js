import axios from 'axios'
import Cookies from 'js-cookie'
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

export const deleteCookie = (name) => {
  const domain = process.env.COOKIE_DOMAIN || window.location.hostname
  Cookies.remove(name, { domain })
  if (Cookies.get(name)) {
    console.warn(
      `${name} cookie couldn't be removed - check that domain matches, etc.`
    )
  }
}

class Api {
  constructor() {
    this.proxy = axios.create({
      baseURL: env ? env.ApiBaseURL() : '/api',
      timeout: 30000,
      withCredentials: true,
    })

    this.proxy.interceptors.response.use(this.handleResponseSuccess, this.handleResponseError)
  }

  getToken = () => window.token

  setToken = (token) => {
    window.token = token
  }

  bearerToken() {
    return { Authorization: `Bearer ${this.getToken()}` }
  }

  handleResponseSuccess = response => response

  handleResponseError = (error) => {
    console.warn(`API request failed: ${error.message}`)
    return Promise.reject(error)
  }

  information() {
    return this.proxy.get('/')
  }

  get(endpoint, secure = true, headers = {}) {
    const h = secure
      ? { headers: { ...headers, ...this.bearerToken() } }
      : headers

    return this.proxy.get(endpoint, h)
  }

  post(endpoint, params = {}, secure = true, headers = {}) {
    const h = secure
      ? { headers: { ...headers, ...this.bearerToken() } }
      : headers

    return this.proxy.post(endpoint, params, h)
  }

  /** AUTH */
  saml() {
    return this.get(env.EndpointSaml(), false)
  }

  samlSLO() {
    return this.get(env.EndpointSamlSLO())
  }

  login = (username, password) => this.post(
    env.EndpointBasicAuthentication(),
    { username, password },
    false
  )

  // TODO logout calls are failing - does this need to change?
  logout = () => {
    return this.get(env.EndpointLogout())
  }

  refresh() {
    return this.post(env.EndpointRefresh())
  }

  /** FORM */
  save(payload) {
    return this.post(env.EndpointSave(), payload)
  }

  status = () => {
    return this.get(env.EndpointStatus())
  }

  submit() {
    return this.post(env.EndpointSubmit())
  }

  form = () => {
    return this.get(env.EndpointForm())
  }

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
