import React from 'react'
import LoginOAuth from './LoginOAuth'
import { shallow } from 'enzyme'
import { GithubOAuth, OAuth } from '../../services'

describe('The login button', () => {
  it('renders login button if not authenticated', () => {
    GithubOAuth.token = null
    GithubOAuth.expiration = null
    GithubOAuth.url = window.location.href

    const login = shallow(<LoginOAuth />)
    expect(login.text()).toEqual('Login')

    GithubOAuth.token = 'faketoken'
    GithubOAuth.expiration = new Date('2017-12-01')
    login.find('button').simulate('click')
    expect(login.text()).toEqual('Logout')
  })

  it('renders logout button if authenticated', () => {
    GithubOAuth.token = 'faketoken'
    GithubOAuth.expiration = new Date('2017-12-01')

    const logout = shallow(<LoginOAuth />)
    expect(logout.text()).toEqual('Logout')

    logout.find('button').simulate('click')
    expect(GithubOAuth.token).toEqual('')
    expect(GithubOAuth.expiration).toEqual(null)
    expect(logout.text()).toEqual('Login')
  })
})
