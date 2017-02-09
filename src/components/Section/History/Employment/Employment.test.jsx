import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import Employment from './Employment'

describe('The employment component', () => {
  // Setup
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('no error on empty', () => {
    const store = mockStore({ authentication: [] })
    const expected = {
      name: 'employment'
    }
    const component = mount(<Provider store={store}><Employment name={expected.name} /></Provider>)
    expect(component.find('button.add').length).toEqual(1)
  })
})
