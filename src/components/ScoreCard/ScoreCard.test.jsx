import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import ScoreCard from './ScoreCard'
import { mount } from 'enzyme'

describe('The score card component', () => {
  // Setup
  window.token = 'fake-token'
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('hidden when not authenticated', () => {
    window.token = ''
    const store = mockStore({ authentication: [] })
    const component = mount(<Provider store={store}><ScoreCard /></Provider>)
    expect(component.find('div').length).toEqual(0)
    window.token = 'fake-token'
  })

  it('visible when authenticated', () => {
    const store = mockStore({ authentication: { authenticated: true, twofactor: true } })
    const component = mount(<Provider store={store}><ScoreCard /></Provider>)
    expect(component.find('div').length).toEqual(1)
  })
})
