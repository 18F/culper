import React from 'react'
import { mount } from 'enzyme'
import Street from './Street'

describe('The Street component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      value: '',
      onFocus: () => {},
      onBlur: () => {}
    }
    const component = mount(<Street name={expected.name} label={expected.label} value={expected.value} onFocus={expected.onFocus} onBlur={expected.onBlur} />)
    component.find('textarea#' + expected.name).simulate('change')
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('textarea#' + expected.name).length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })
})
