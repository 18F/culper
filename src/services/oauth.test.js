import { GithubOAuth } from './oauth'

describe('OAuth', () => {
  'use strict'

  it('OAuth checks if user is not authentiated', () => {
    GithubOAuth.token = null
    GithubOAuth.expiration = null
    expect(GithubOAuth.authenticated()).toBe(false)
  })

  it('OAuth checks if user is authentiated', () => {
    GithubOAuth.token = 'faketoken'
    GithubOAuth.expiration = new Date('2017-12-01')
    expect(GithubOAuth.authenticated()).toEqual(true)
  })

  it('OAuth checks if user authentication has expired', () => {
    GithubOAuth.token = 'faketoken'
    GithubOAuth.expiration = new Date('2015-12-01')
    expect(GithubOAuth.authenticated()).toEqual(false)
  })

  it('OAuth logs out an authenticated user', () => {
    GithubOAuth.token = 'faketoken'
    GithubOAuth.expiration = new Date('2017-12-01')
    expect(GithubOAuth.authenticated()).toEqual(true)

    GithubOAuth.logout()
    expect(GithubOAuth.authenticated()).toEqual(false)
  })

  it('OAuth can parse query parameters from url', () => {
    Object.defineProperty(window.location, 'search', {
      writable: true,
      value: '?foo=bar&test=1'
    })

    let foo = GithubOAuth.getQueryValue('foo')
    expect(foo).toEqual('bar')

    window.location.search = ''
    foo = GithubOAuth.getQueryValue('foo')
    expect(foo).toEqual(null)

    window.location.search = '?foo=bar&foo=meh'
    foo = GithubOAuth.getQueryValue('foo')
    expect(foo).toEqual(['bar', 'meh'])
  })
})
