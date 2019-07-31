import axios from 'axios'
import Cookies from 'js-cookie'
import env from '../config/environment'

export const getQueryValue = (queryString, key) => {
  return getSplitValue(key, queryString.substring(1), '&', '=')
}

const getSplitValue = (key, raw, delim1, delim2) => {
  const vars = raw.split(delim1)

  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split(delim2)
    if (pair.length !== 2) {
      continue
    }

    const pairKey = pair[0].trim()
    const pairValue = pair[1].trim()
    if (pairKey === key && pairValue) {
      return pairValue
    }
  }

  return null
}

export const deleteCookie = name => {
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
      timeout: 30000
    })
  }

  getToken() {
    return window.token
  }

  setToken(token) {
    window.token = token
  }

  bearerToken() {
    return { Authorization: `Bearer ${this.getToken()}` }
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

  saml() {
    return this.get(env.EndpointSaml(), false)
  }

  samlSLO() {
    return this.get(env.EndpointSamlSLO())
  }

  login(username, password) {
    return this.post(
      env.EndpointBasicAuthentication(),
      { username: username, password: password },
      false
    )
  }

  logout() {
    return this.get(env.EndpointLogout())
  }

  refresh() {
    return this.post(env.EndpointRefresh())
  }

  save(payload) {
    return this.post(env.EndpointSave(), payload)
  }

  section(type) {
    return this.get(env.EndpointSection(type))
  }

  status() {
    return this.get(env.EndpointStatus())
  }

  submit() {
    return this.post(env.EndpointSubmit())
  }

  form = () => {
    return this.get(env.EndpointForm())
  }

  hash() {
    return this.get(env.EndpointFormHash())
  }

  validate(payload) {
    return this.post(env.EndpointValidate(), payload)
  }

  listAttachments() {
    return this.get(env.EndpointAttachment())
  }

  saveAttachment(formData) {
    return this.post(env.EndpointAttachment(), formData)
  }

  updateAttachment(id, description) {
    return this.post(env.EndpointAttachmentUpdate(id), {
      description: description
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
