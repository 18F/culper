import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import OtherNamesUsed from './OtherNamesUsed'
import { mount } from 'enzyme'

describe('The other names used section', () => {
  // Setup
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('hidden when not authenticated', () => {
    const store = mockStore({ authentication: [] })
    const component = mount(<Provider store={store}><OtherNamesUsed /></Provider>)
    expect(component.find('div').length).toEqual(0)
  })

  it('visible when authenticated', () => {
    const store = mockStore({ authentication: { authenticated: true, twofactor: true } })
    const component = mount(<Provider store={store}><OtherNamesUsed /></Provider>)
    expect(component.find('div').length).toEqual(10)
  })
})
