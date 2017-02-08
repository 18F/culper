import React from 'react'
import { mount } from 'enzyme'
import HairColor from './HairColor'

describe('The HairColor component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      value: ''
    }
    const component = mount(<HairColor name={expected.name} label={expected.label} value={expected.value} />)
    component.find('input[name="hair-bald"]').simulate('change')
    expect(component.find('input').length).toEqual(14)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })
})
