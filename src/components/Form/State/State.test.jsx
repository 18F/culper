import React from 'react'
import { mount } from 'enzyme'
import State from './State'

describe('The State component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      help: 'Helpful error message',
      value: ''
    }
    const component = mount(<State name={expected.name} label={expected.label} help={expected.help} value={expected.value} />)
    component.find('select#' + expected.name).simulate('change')
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('select#' + expected.name).length).toEqual(1)
    expect(component.find('span.hidden').length).toEqual(1)
  })
})
