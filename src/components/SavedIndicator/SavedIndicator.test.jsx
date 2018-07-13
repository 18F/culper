import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import SavedIndicator from './SavedIndicator'

describe('The saved indicator component', () => {
  // Setup
  window.token = 'fake-token'
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('hidden when not authenticated', () => {
    window.token = ''
    const store = mockStore({ authentication: [] })
    const component = mount(<Provider store={store}><SavedIndicator /></Provider>)
    expect(component.find('button').length).toEqual(0)
    window.token = 'fake-token'
  })

  it('visible when authenticated', () => {
    const store = mockStore({ authentication: { authenticated: true } })
    const component = mount(<Provider store={store}><SavedIndicator /></Provider>)
    expect(component.find('button').length).toEqual(1)
  })

  it('displays in seconds if under a minute', () => {
    const elapsed = 10 * 1000
    const store = mockStore({ authentication: { authenticated: true } })
    const component = mount(<Provider store={store}><SavedIndicator elapsed={elapsed} /></Provider>)
    expect(component.find('.time').text()).toContain('sec')
  })

  it('displays in minutes if under an hour', () => {
    const elapsed = 60 * 1000
    const store = mockStore({ authentication: { authenticated: true } })
    const component = mount(<Provider store={store}><SavedIndicator elapsed={elapsed} /></Provider>)
    expect(component.find('.time').text()).toContain('min')
  })

  it('displays in hours if under a day', () => {
    const elapsed = 60 * 60 * 1000
    const store = mockStore({ authentication: { authenticated: true } })
    const component = mount(<Provider store={store}><SavedIndicator elapsed={elapsed} /></Provider>)
    expect(component.find('.time').text()).toContain('hour')
  })

  it('displays in days if greater than 24 hours', () => {
    const elapsed = 24 * 60 * 60 * 1000
    const store = mockStore({ authentication: { authenticated: true } })
    const component = mount(<Provider store={store}><SavedIndicator elapsed={elapsed} /></Provider>)
    expect(component.find('.time').text()).toContain('day')
  })

  it('triggers save', () => {
    const elapsed = 24 * 60 * 60 * 1000
    const store = mockStore({ authentication: { authenticated: true } })
    const component = mount(<Provider store={store}><SavedIndicator elapsed={elapsed} /></Provider>)
    component.find('button').simulate('click')
  })

  it('mouse in and out', () => {
    const store = mockStore({ authentication: { authenticated: true } })
    const component = mount(<Provider store={store}><SavedIndicator interval={1} /></Provider>)
    component.find('button').simulate('mouseenter')
    expect(component.find('SavedIndicator').getNode().state.hover).toBe(true)
    component.find('button').simulate('mouseleave')
    expect(component.find('SavedIndicator').getNode().state.hover).toBe(false)
  })
})
