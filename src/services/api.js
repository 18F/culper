import axios from 'axios'
import env from '../config/environment'

class Api {
  constructor () {
    this.proxy = axios.create({
      baseURL: env ? env.ApiBaseURL() : '/api',
      timeout: 10000
    })
  }

  /**
   * Helper method to extract query parameters from the url
   */
  getQueryValue (key) {
    return this.getSplitValue(key, window.location.search.substring(1), '&', '=')
  }

  getCookieValue (key) {
    return this.getSplitValue(key, document.cookie, ';', '=')
  }

  getSplitValue (key, raw, delim1, delim2) {
    const vars = raw.split(delim1)

    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split(delim2)
      if (pair.length != 2) {
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

  getToken () {
    // Look for token in local storage
    let token = null
    if (this.supportForLocalStorage()) {
      token = window.localStorage.getItem('token')
    }

    // Look for token as cookie
    if (token === null) {
      token = this.getCookieValue('token')
    }

    // Look for token in query string
    if (token === null) {
      token = this.getQueryValue('token')
    }

    if (token === null && env && env.IsTest()) {
      token = window.token
    }

    return token
  }

  setToken (token) {
    if (this.supportForLocalStorage()) {
      window.localStorage.setItem('token', token)
    } else {
      document.cookie = 'token=' + token
    }
  }

  bearerToken () {
    return { 'Authorization': `Bearer ${this.getToken()}` }
  }

  supportForLocalStorage () {
    try {
      return 'localStorage' in window && window['localStorage'] !== null
    } catch (e) {
      return false
    }
  }

  information () {
    return this.proxy.get('/')
  }

  get (endpoint, secure = true) {
    const headers = secure ? { headers: this.bearerToken() } : {}
    return this.proxy.get(endpoint, headers)
  }

  post (endpoint, params = {}, secure = true) {
    const headers = secure ? { headers: this.bearerToken() } : {}
    return this.proxy.post(endpoint, params, headers)
  }

  saml () {
    return this.get(env.EndpointSaml(), false)
  }

  twoFactor (account, token) {
    if (token) {
      return this.post(env.EndpointTwoFactorVerify(account), { token: token })
    }

    return this.get(env.EndpointTwoFactor(account))
  }

  twoFactorReset (account) {
    return this.get(env.EndpointTwoFactorReset(account))
  }

  login (username, password) {
    return this.post(env.EndpointBasicAuthentication(), { username: username, password: password }, false)
  }

  logout () {
    return this.get(env.EndpointLogout())
  }

  refresh () {
    return this.post(env.EndpointRefresh())
  }

  save (payload) {
    return this.post(env.EndpointSave(), payload)
  }

  section (type) {
    return this.get(env.EndpointSection(type))
  }

  status () {
    return this.get(env.EndpointStatus())
  }

  submit () {
    return this.post(env.EndpointSubmit())
  }

  form () {
    return this.get(env.EndpointForm())
  }

  hash () {
    return this.get(env.EndpointFormHash())
  }

  validate (payload) {
    return this.post(env.EndpointValidate(), payload)
  }
}

const api = new Api()
export { api }
