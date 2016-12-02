import axios from 'axios'
import { env } from '../config'

class Api {
  constructor () {
    this.proxy = axios.create({
      baseURL: env.ApiBaseURL(),
      timeout: 1000
    })

    this.proxySecured = axios.create({
      baseURL: env.ApiBaseURL(),
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
      return this.proxy.post(env.EndpointTwoFactorVerify(account), { token: token })
    }

    return this.proxy.get(env.EndpointTwoFactor(account))
  }

  login (username, password) {
    return this.proxy.post(env.EndpointBasicAuthentication(), { username: username, password: password })
  }

  validateSSN (ssn) {
    return this.proxySecured.get(env.EndpointValidateSSN(ssn))
  }

  validatePassport (passport) {
    return this.proxySecured.get(env.EndpointValidatePassport(passport))
  }

  validateCity (city) {
    return this.proxySecured.get(env.EndpointValidateCity(city))
  }

  validateZipcode (zipcode) {
    return this.proxySecured.get(env.EndpointValidateZipcode(zipcode))
  }

  validateState (state) {
    return this.proxySecured.get(env.EndpointValidateState(state))
  }

  validateAddress (address) {
    return this.proxySecured.post(env.EndpointValidateAddress(), address)
  }
}

const api = new Api()
export { api }
