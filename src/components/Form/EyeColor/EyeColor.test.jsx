import React from 'react'
import { mount } from 'enzyme'
import EyeColor from './EyeColor'

describe('The EyeColor component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'eye-color',
      label: 'Text input focused',
      value: ''
    }
    const component = mount(<EyeColor {...expected} />)
    component
      .find('.eye-colors input')
      .first()
      .simulate('change')
    expect(component.find('.eye-colors input').length).toEqual(10)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('updates value', () => {
    let updates = 0
    const expected = {
      name: 'eye-color',
      label: 'Text input focused',
      value: '',
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<EyeColor {...expected} />)
    component
      .find('.eye-colors input')
      .first()
      .simulate('change')
    expect(updates).toBeGreaterThan(0)
  })
})
