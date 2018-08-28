import React from 'react'
import { mount } from 'enzyme'
import County from './County'

describe('The County component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      className: 'input-focus',
      label: 'Text input focused',
      value: ''
    }
    const component = mount(<County {...expected} />)
    component.find('input').simulate('change')
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('bubbles up change event', () => {
    let updates = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      error: true,
      focus: false,
      valid: false,
      onUpdate: function(event) {
        updates++
      }
    }
    const component = mount(<County {...expected} />)
    component
      .find('input')
      .first()
      .simulate('change')
    expect(updates).toEqual(1)
  })
})
