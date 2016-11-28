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
}

const api = new Api()
export { api }
