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

  it('can issue refresh of token', () => {
    const mock = new MockAdapter(api.proxy)
    mock.onPost('/refresh').reply(200, true)
    api.refresh().then(response => {
      expect(response.data).toEqual(true)
    })
  })

  it('can issue save', () => {
    const mock = new MockAdapter(api.proxy)
    mock.onPost('/me/save').reply(200, true)
    api.save({}).then(response => {
      expect(response.data).toEqual(true)
    })
  })

  it('can request section', () => {
    const mock = new MockAdapter(api.proxy)
    mock.onGet('/me/form/section?type=blah').reply(200, true)
    api.section('blah').then(response => {
      expect(response.data).toEqual(true)
    })
  })

  it('can status', () => {
    const mock = new MockAdapter(api.proxy)
    mock.onGet('/me/status').reply(200, true)
    api.status().then(response => {
      expect(response.data).toEqual(true)
    })
  })

  it('can submit', () => {
    const mock = new MockAdapter(api.proxy)
    mock.onPost('/me/form/submit').reply(200, true)
    api.submit({}).then(response => {
      expect(response.data).toEqual(true)
    })
  })

  it('can get form data', () => {
    const mock = new MockAdapter(api.proxy)
    mock.onGet('/me/form').reply(200, true)
    api.form().then(response => {
      expect(response.data).toEqual(true)
    })
  })

  it('can get form hash', () => {
    const mock = new MockAdapter(api.proxy)
    mock.onGet('/me/form/hash').reply(200, true)
    api.hash().then(response => {
      expect(response.data).toEqual(true)
    })
  })

  it('can get SAML request', () => {
    const mock = new MockAdapter(api.proxy)
    mock.onGet('/auth/saml').reply(200, true)
    api.saml().then(response => {
      expect(response.data).toEqual(true)
    })
  })

  it('can list attachments', () => {
    const mock = new MockAdapter(api.proxy)
    mock.onGet('/me/attachment').reply(200, true)
    api.listAttachments().then(response => {
      expect(response.data).toEqual(true)
    })
  })

  it('can save attachment', () => {
    const mock = new MockAdapter(api.proxy)
    mock.onPost('/me/attachment').reply(200, true)
    api.saveAttachment({}).then(response => {
      expect(response.data).toEqual(true)
    })
  })

  it('can update attachment', () => {
    const mock = new MockAdapter(api.proxy)
    mock.onPost('/me/attachment/1').reply(200, true)
    mock.onPost('/me/attachment/1/delete').reply(200, true)
    api.updateAttachment(1, 'blah').then(response => {
      expect(response.data).toEqual(true)
    })
  })

  it('can delete attachment', () => {
    const mock = new MockAdapter(api.proxy)
    mock.onPost('/me/attachment/1/delete').reply(200, true)
    api.deleteAttachment(1).then(response => {
      expect(response.data).toEqual(true)
    })
  })
})
