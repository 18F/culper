import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import Passport from './Passport'

describe('The passport component', () => {
  // Setup
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('no error on empty', () => {
    const store = mockStore({ authentication: [] })
    const expected = {
      name: 'passport'
    }
    const component = mount(<Provider store={store}><Passport name={expected.name} /></Provider>)
    expect(component.find('input[name="has_passport"]').length).toEqual(2)
    expect(component.find('input#first').length).toEqual(0)
    expect(component.find('input#number').length).toEqual(0)
    expect(component.find('input#month').length).toEqual(0)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('display passport field if "Yes" is selected', () => {
    const store = mockStore({ authentication: [] })
    const expected = {
      name: 'passport'
    }
    const component = mount(<Provider store={store}><Passport name={expected.name} HasPassport="Yes" /></Provider>)
    expect(component.find('input[name="has_passport"]').length).toEqual(2)
    expect(component.find('input#number').length).toEqual(1)
    expect(component.find('input#month').length).toEqual(2)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('display no passport information if "No" is selected', () => {
    const store = mockStore({ authentication: [] })
    const expected = {
      name: 'passport'
    }
    const component = mount(<Provider store={store}><Passport name={expected.name} HasPassport="No" /></Provider>)
    expect(component.find('input[name="has_passport"]').length).toEqual(2)
    expect(component.find('input#first').length).toEqual(0)
    expect(component.find('input#number').length).toEqual(0)
    expect(component.find('input#month').length).toEqual(0)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })
})
