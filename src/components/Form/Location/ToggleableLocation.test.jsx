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
    const props = {
      onUpdate: () => {
        updates++
      },
      country: { value: 'United States' },
      domesticFields: ['street', 'city', 'county', 'stateZipcode']
    }
    const component = mount(<ToggleableLocation {...props} />)
    component.find('.mailing input').simulate('change')
    component.find('.city input').simulate('change')
    component.find('.county input').simulate('change')
    component
      .find('.state input')
      .simulate('change', { target: { value: 'Virginia' } })
    component.find('.zipcode input').simulate('change')
    expect(updates).toBe(5)
  })

  it('Performs International updates', () => {
    let updates = 0
    const props = {
      onUpdate: () => {
        updates++
      },
      country: { value: '' },
      internationalFields: ['country', 'city']
    }
    const component = mount(<ToggleableLocation {...props} />)
    component.find('.city input').simulate('change')
    component
      .find('.country input')
      .simulate('change', { target: { value: 'Germany' } })
    expect(updates).toBe(2)
  })

  it('Render if US are required', () => {
    const props = {
      required: true,
      country: { value: 'United States' },
      domesticFields: [
        'country',
        'city',
        'county',
        'stateZipcode',
        'state',
        'what'
      ]
    }
    const component = mount(<ToggleableLocation {...props} />)
    expect(component.find('.usa-input-error').length).toBe(5)
  })

  it('Render if International fields are required', () => {
    const props = {
      required: true,
      country: { value: '' },
      internationalFields: ['city', 'country', 'what']
    }
    const component = mount(<ToggleableLocation {...props} />)
    expect(component.find('.usa-input-error').length).toBe(2)
  })
})
