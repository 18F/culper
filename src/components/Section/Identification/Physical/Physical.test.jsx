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
    expect(component.find('.pounds input').length).toEqual(1)
    expect(component.find('.feet input').length).toEqual(1)
    expect(component.find('.inches input').length).toEqual(1)
    expect(component.find('input[name="hair-bald"]').length).toEqual(1)
    expect(component.find('input[name="eye"]').length).toBeGreaterThan(0)
    expect(component.find('input[name="sex"]').length).toBeGreaterThan(0)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('loads data into physical section', () => {
    let updates = 0
    let data = {
      Comments: 'Hello',
      EyeColor: 'Black',
      HairColor: [
        'Bald'
      ],
      Height: {
        feet: 5,
        inches: 10
      },
      Sex: 'male',
      Weight: 180,
      onUpdate: () => { updates++ }
    }
    const component = mount(<Physical name="physical" {...data} />)
    component.find('.pounds input').simulate('change')
    component.find('.feet input').simulate('change')
    component.find('.inches input').simulate('change')
    component.find('input[name="hair-bald"]').simulate('change')
    component.find('input[name="eye"]').first().simulate('change')
    component.find('input[name="sex"]').first().simulate('change')
    expect(updates).toBeGreaterThan(0)
  })
})
