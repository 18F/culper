import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import Print from './Print'

const applicationState = {
  Application: {}
}

describe('The print section', () => {
  // Setup
  window.token = 'fake-token'
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('visible when authenticated', () => {
    const store = mockStore({ authentication: { authenticated: true, twofactor: true, application: applicationState } })
    const component = mount(<Provider store={store}><Print /></Provider>)
    expect(component.find('.section-print-container').length).toBe(10)
  })

  it('launches print dialog', () => {
    let printed = false
    window.print = function () {
      printed = true
    }
    const store = mockStore({ authentication: { authenticated: true, twofactor: true, application: applicationState } })
    const component = mount(<Provider store={store}><Print /></Provider>)
    console.log(component.html())
    component.find('.print-btn').simulate('click')
    expect(printed).toBe(true)
  })
})
