import React from 'react'
import { mount } from 'enzyme'
import Street from './Street'

describe('The Street component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      className: 'input-focus',
      value: '',
      onFocus: () => {},
      onBlur: () => {}
    }
    const component = mount(<Street {...expected} />)
    component.find('input').simulate('change')
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('displays optional text', () => {
    const props = {
      label: 'Apt, suite, building, floor, etc.',
      optional: true
    }
    const component = mount(<Street {...props} />)
    expect(component.find('label').text()).toContain('(Optional)')
  })
})
