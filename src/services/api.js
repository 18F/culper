import axios from 'axios'

class Api {
  constructor () {
    this.proxy = axios.create({
      baseURL: 'http://localhost:3000',
      timeout: 1000
    })

    this.proxySecured = axios.create({
      baseURL: 'http://localhost:3000',
      timeout: 1000,
      headers: {
        'Authorization': ''
      }
    })
  }

    /**
     * Helper method to extract query parameters from the url
     */
  getQueryValue (key) {
    let query = window.location.search.substring(1)
    let vars = query.split('&')
    let values = []

    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split('=')
      if (pair[0] === key) {
        values.push(pair[1])
      }
    }

    if (values.length === 0) {
      return null
    } else if (values.length === 1) {
      return values[0]
    }

    return values
  }

  setToken (token) {
    this.proxySecured.defaults.headers.common.Authorization = token
  }

  information () {
    return this.proxy.get('/')
  }

  twoFactor (account, token) {
    // TODO: Fix secure proxy
    if (token) {
      return this.proxy.post('/2fa/' + account + '/verify', { token: token })
    }

    return this.proxy.get('/2fa/' + account)
  }

  login (username, password) {
    return this.proxy.post('/auth/basic', { username: username, password: password })
  }

  validateSSN (ssn) {
    return this.proxySecured.get(`/validate/ssn/${ssn}`)
  }

  validatePassport (passport) {
    return this.proxySecured.get(`/validate/passport/${passport}`)
  }

  validateCity (city) {
    return this.proxySecured.get(`/validate/address/${city}`)
  }

  validateZipcode (zipcode) {
    return this.proxySecured.get(`/validate/address/${zipcode}`)
  }

  validateState (state) {
    return this.proxySecured.get(`/validate/address/${state}`)
  }

  validateAddress (address) {
    return this.proxySecured.post('/validate/address', address)
  }
}

const api = new Api()
export { api }
