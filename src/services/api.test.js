import { api, getQueryValue } from './api'
import MockAdapter from 'axios-mock-adapter'

describe('The API', () => {
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

  it('can save via API calls', () => {
    const mock = new MockAdapter(api.proxy)
    mock.onPost('/me/save').reply(200, true)
    api.save({}).then(response => {
      expect(response.data).toEqual(true)
    })
  })

  it('can validate via API calls', () => {
    const mock = new MockAdapter(api.proxy)
    mock.onPost('/me/validate').reply(200, true)
    api.validate({}).then(response => {
      expect(response.data).toEqual(true)
    })
  })

  it('can parse query parameters from url', () => {
    const previousLocation = window.location
    Object.defineProperty(window.location, 'search', {
      writable: true,
      value: '?foo=bar&test=1'
    })

    let foo = getQueryValue('foo')
    expect(foo).toEqual('bar')

    window.location.search = ''
    foo = getQueryValue('foo')
    expect(foo).toEqual(null)

    window.location.search = '?foo=bar&foo=meh'
    foo = getQueryValue('foo')
    expect(foo).toEqual('bar')

    window.location = previousLocation
  })
})
