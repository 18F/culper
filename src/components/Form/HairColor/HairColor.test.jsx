import React from 'react'
import { mount } from 'enzyme'
import HairColor from './HairColor'

describe('The HairColor component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      help: 'Helpful error message',
      value: ''
    }
    const component = mount(<HairColor name={expected.name} label={expected.label} help={expected.help} value={expected.value} />)
    component.find('input#hair-bald').simulate('change')
    expect(component.find('input').length).toEqual(14)
    expect(component.find('span.hidden').length).toEqual(14)
  })
})
