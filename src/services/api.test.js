import { api } from './api'
import MockAdapter from 'axios-mock-adapter'

describe('The API', () => {
  'use strict'

  it('can get information on version and endpoints', () => {
    const expected = {}
    const mock = new MockAdapter(api.proxy)
    mock.onGet('/').reply(200, {})

    let actual = null
    api
      .information()
      .then(function (response) {
        actual = response.data
        expect(actual).toEqual(expected)
      })
  })

  it('can set authorization token', () => {
    const token = 'my-token'
    api.setToken(token)

    let actual = api.proxySecured.defaults.headers.common.Authorization.indexOf(token)
    expect(actual).not.toEqual(-1)
  })

  it('can get PNG for two-factor authentication initialization', () => {
    const expected = 'my-fake-base64'
    const mock = new MockAdapter(api.proxy)
    mock.onGet('/2fa').reply(200, expected)

    let actual = null
    api.setToken('my-token')
    api
      .twoFactor()
      .then(function (response) {
        actual = response.data
        expect(actual).toEqual(expected)
      })
  })

  it('can get verify token with two-factor authentication', () => {
    const expected = ''
    const mock = new MockAdapter(api.proxy)
    mock.onPost('/2fa/verify').reply(200, expected)

    let actual = null
    api.setToken('my-token')
    api
      .twoFactor('123456')
      .then(function (response) {
        actual = response.data
        expect(actual).toEqual(expected)
      })
  })

  it('can login user', () => {
    const expected = 'faketoken'
    const mock = new MockAdapter(api.proxy)
    mock.onPost('/basic/auth').reply(200, expected)
    api
      .login('john', 'admin')
      .then(function (response) {
        expect(response.data).toEqual(expected)
      })
  })

  it('can parse query parameters from url', () => {
    Object.defineProperty(window.location, 'search', {
      writable: true,
      value: '?foo=bar&test=1'
    })

    let foo = api.getQueryValue('foo')
    expect(foo).toEqual('bar')

    window.location.search = ''
    foo = api.getQueryValue('foo')
    expect(foo).toEqual(null)

    window.location.search = '?foo=bar&foo=meh'
    foo = api.getQueryValue('foo')
    expect(foo).toEqual(['bar', 'meh'])
  })

  it('can validate SSN', () => {
    const expected = { Valid: true }
    const mock = new MockAdapter(api.proxy)
    mock.onGet('/validate/ssn/123-45-6789').reply(200, expected)
    api
      .validateSSN('123-45-6789')
      .then(function (response) {
        expect(response.data).toEqual(expected)
      })
  })

  it('can validate passport', () => {
    const expected = { Valid: true }
    const mock = new MockAdapter(api.proxy)
    mock.onGet('/validate/passport/1234-11').reply(200, expected)
    api
      .validatePassport('1234-11')
      .then(function (response) {
        expect(response.data).toEqual(expected)
      })
  })

  it('can validate city', () => {
    const expected = { Valid: true }
    const mock = new MockAdapter(api.proxy)
    mock.onGet('/validate/address/city/someville').reply(200, expected)
    api
      .validateCity('someville')
      .then(function (response) {
        expect(response.data).toEqual(expected)
      })
  })

  it('can validate zipcode', () => {
    const expected = { Valid: true }
    const mock = new MockAdapter(api.proxy)
    mock.onGet('/validate/address/zipcode/000000').reply(200, expected)
    api
      .validateZipcode('000000')
      .then(function (response) {
        expect(response.data).toEqual(expected)
      })
  })

  it('can validate state', () => {
    const expected = { Valid: true }
    const mock = new MockAdapter(api.proxy)
    mock.onGet('/validate/address/state/VA').reply(200, expected)
    api
      .validateState('VA')
      .then(function (response) {
        expect(response.data).toEqual(expected)
      })
  })

  it('can validate address', () => {
    const address = {
      Address: '123',
      City: 'Someville'
    }

    const expected = { Valid: true }
    const mock = new MockAdapter(api.proxy)
    mock.onPost('/validate/address').reply(200, expected)
    api
      .validateAddress(address)
      .then(function (response) {
        expect(response.data).toEqual(expected)
      })
  })
})
