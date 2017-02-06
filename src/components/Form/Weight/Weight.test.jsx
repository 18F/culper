import React from 'react'
import { mount } from 'enzyme'
import Weight from './Weight'

describe('The Weight component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      label: 'Pounds',
      value: 10
    }
    const component = mount(<Weight name={expected.name} label={expected.label} value={expected.value} />)
    component.find('input#pounds').simulate('change')
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input#pounds').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })
})
