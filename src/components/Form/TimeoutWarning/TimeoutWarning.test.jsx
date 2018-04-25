import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import TimeoutWarning from './TimeoutWarning'

describe('The timeout warning component', () => {
  // Setup
  window.token = 'fake-token'
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('not displayed if outside threshold', () => {
    const store = mockStore({ application: { Settings: { lastRefresh: new Date() } }, authentication: { authenticated: true, twofactor: true } })
    const component = mount(<Provider store={store}><MemoryRouter><TimeoutWarning timeout="15" /></MemoryRouter></Provider>)
    console.log(component.html())
    expect(component.find('.timeout-warning').length).toEqual(1)
    expect(component.find('.modal').length).toEqual(0)
  })

  it('displayed when inside threshold', () => {
    const now = new Date()
    let lastRefresh = new Date(now.setMinutes(now.getMinutes() - 14))
    const store = mockStore({ application: { Settings: { lastRefresh: lastRefresh } }, authentication: { authenticated: true, twofactor: true } })
    const component = mount(<Provider store={store}><MemoryRouter><TimeoutWarning timeout="15" showWarning={true} /></MemoryRouter></Provider>)
    console.log(component.html())
    expect(component.find('.timeout-warning').length).toEqual(1)
    expect(component.find('.modal').length).toEqual(1)
  })
})
