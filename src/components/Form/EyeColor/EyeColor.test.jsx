import React from 'react'
import { mount } from 'enzyme'
import EyeColor from './EyeColor'

describe('The EyeColor component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      help: 'Helpful error message',
      value: ''
    }
    const component = mount(<EyeColor name={expected.name} label={expected.label} help={expected.help} value={expected.value} />)
    component.find('input[name="eye-color"]').first().simulate('change')
    expect(component.find('input[name="eye-color"]').length).toEqual(10)
    expect(component.find('div.hidden').length).toEqual(10)
  })
})
