import React from 'react'
import { mount } from 'enzyme'
import ApoFpoAddress from './ApoFpoAddress'

describe('The ApoFpoAddress component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      help: 'Helpful error message',
      value: ''
    }
    const component = mount(<ApoFpoAddress name={expected.name} label={expected.label} help={expected.help} value={expected.value} />)
    component.find('input#' + expected.name + '-address1').simulate('change')
    expect(component.find('span.hidden').length).toEqual(5)
  })
})
