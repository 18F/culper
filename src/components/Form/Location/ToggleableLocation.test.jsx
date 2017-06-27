import React from 'react'
import { mount } from 'enzyme'
import ToggleableLocation from './ToggleableLocation'

describe('The ToggleableLocation component', () => {
  it('Renders without errors', () => {
    const component = mount(<ToggleableLocation />)
    expect(component.find('.toggleable-location').length).toBe(1)
  })

  it('Performs US updates', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const fields = ['street', 'city', 'county', 'stateZipcode']
    const component = mount(<ToggleableLocation onUpdate={onUpdate} country="United States" domesticFields={fields} />)
    component.find('.mailing input').simulate('change')
    component.find('.city input').simulate('change')
    component.find('.county input').simulate('change')
    component.find('.state input').simulate('change', { target: { value: 'Virginia' } })
    component.find('.zipcode input').simulate('change')
    expect(updates).toBe(5)
  })

  it('Performs International updates', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const fields = ['country', 'city']
    const component = mount(<ToggleableLocation onUpdate={onUpdate} country="" internationalFields={fields} />)
    component.find('.city input').simulate('change')
    component.find('.country input').simulate('change', { target: { value: 'Germany' } })
    expect(updates).toBe(2)
  })
})
