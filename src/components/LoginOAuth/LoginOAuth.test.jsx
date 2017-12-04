import React from 'react'
import LoginOAuth from './LoginOAuth'
import { shallow } from 'enzyme'
import { GithubOAuth, OAuth } from '../../services'

describe('The login button', () => {
  const today = new Date()
  const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1)

  it('renders login button if not authenticated', () => {
    GithubOAuth.token = null
    GithubOAuth.expiration = null
    GithubOAuth.url = window.location.href

    const login = shallow(<LoginOAuth>Login</LoginOAuth>)
    expect(login.text()).toEqual('Login')

    GithubOAuth.token = 'faketoken'
    GithubOAuth.expiration = tomorrow
    login.find('button').simulate('click')
    expect(login.text()).toEqual('Logout')
  })

  it('renders logout button if authenticated', () => {
    GithubOAuth.token = 'faketoken'
    GithubOAuth.expiration = tomorrow

    const logout = shallow(<LoginOAuth>Login</LoginOAuth>)
    expect(logout.text()).toEqual('Logout')

    logout.find('button').simulate('click')
    expect(GithubOAuth.token).toEqual('')
    expect(GithubOAuth.expiration).toEqual(null)
    expect(logout.text()).toEqual('Login')
  })
})
