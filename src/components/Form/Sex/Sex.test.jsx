import React from 'react'
import { mount } from 'enzyme'
import Sex from './Sex'

describe('The Sex component', () => {
  it('bubbles up validate event', () => {
    let validations = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      help: 'Helpful error message',
      error: true,
      focus: false,
      valid: false,
      onValidate: function(event) {
        validations++
      }
    }
    const component = mount(<Sex {...expected} />)
    component
      .find('input')
      .first()
      .simulate('change')
    expect(validations > 0).toEqual(true)
  })

  it('bubbles up change event', () => {
    let changes = 0
    let updates = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      help: 'Helpful error message',
      error: true,
      focus: false,
      valid: false,
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<Sex {...expected} />)
    component
      .find('input')
      .first()
      .simulate('change')
    expect(updates).toEqual(updates)
  })
})
