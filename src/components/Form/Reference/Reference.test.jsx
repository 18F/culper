import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import Reference from './Reference'

describe('The Reference component', () => {
  // Setup
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('no error on empty', () => {
    const store = mockStore({ authentication: [] })
    const expected = {
      name: 'reference'
    }
    const component = mount(<Provider store={store}><Reference name={expected.name} /></Provider>)
    component.find('input#last').simulate('change')
    expect(component.find('div.hidden').length).toBeGreaterThan(0)
  })

  it('displays text box when other is selected', () => {
    const store = mockStore({ authentication: [] })
    const expected = {
      name: 'reference',
      Relationship: 'Other'
    }
    const component = mount(<Provider store={store}><Reference {...expected} /></Provider>)
    expect(component.find('.relationship.hidden').length).toEqual(0)
  })

  it('displays text box when role value is other than any of the possible values', () => {
    const store = mockStore({ authentication: [] })
    const expected = {
      name: 'reference',
      Relationship: 'Complicated'
    }
    const component = mount(<Provider store={store}><Reference {...expected} /></Provider>)
    expect(component.find('.relationship.hidden').length).toEqual(0)
  })
})
