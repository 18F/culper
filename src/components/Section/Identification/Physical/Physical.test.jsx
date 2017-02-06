import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import Physical from './Physical'
import { mount } from 'enzyme'

describe('The physical attributes section', () => {
  // Setup
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('no error on first composition', () => {
    const component = mount(<Physical name="physical" />)
    expect(component.find('input#pounds').length).toEqual(1)
    expect(component.find('input#feet').length).toEqual(1)
    expect(component.find('input#inches').length).toEqual(1)
    expect(component.find('input#hair-bald').length).toEqual(1)
    expect(component.find('input[name="eye"]').length).toBeGreaterThan(0)
    expect(component.find('input[name="sex"]').length).toBeGreaterThan(0)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })
})
