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

  getCookieValue (key) {
    let cookies = document.cookie
    let vars = cookies.split(';')
    let values = []

    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split('=')
      if (pair[0].trim() === key) {
        values.push(pair[1].trim())
      }
    }

    if (values.length === 0) {
      return null
    } else if (values.length === 1) {
      return values[0]
    }

    return values
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

    return token
  }

  setToken (token) {
    this.proxySecured.defaults.headers.common.Authorization = token

    if (this.supportForLocalStorage()) {
      window.localStorage.setItem('token', token)
    } else {
      document.cookie = 'token=' + token
    }
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

  twoFactor (account, token) {
    // TODO: Fix secure proxy
    if (token) {
      return this.proxy.post(env.EndpointTwoFactorVerify(account), { token: token })
    }

    return this.proxy.get(env.EndpointTwoFactor(account))
  }

  twoFactorReset (account) {
    return this.proxy.get(env.EndpointTwoFactorReset(account))
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

  validateApplicantName (name) {
    return this.proxySecured.post(env.EndpointValidateApplicantName(), name)
  }

  validateApplicantBirthdate (birthdate) {
    return this.proxySecured.post(env.EndpointValidateApplicantBirthdate(), birthdate)
  }
}

const api = new Api()
export { api }
