import React from 'react'
import { mount } from 'enzyme'
import Password from './Password'

describe('The Password component', () => {
  it('bubbles up error event', () => {
    let hits = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      help: 'Helpful error message',
      error: true,
      focus: false,
      valid: false,
      onError: (value, arr) => {
        hits++
        return arr
      }
    }
    const component = mount(
      <Password
        name={expected.name}
        value="mypassword"
        onError={expected.onError}
      />
    )
    component
      .find('input')
      .first()
      .simulate('blur')
    expect(hits > 0).toEqual(true)
  })

  it('bubbles up change event', () => {
    let changes = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      help: 'Helpful error message',
      error: true,
      focus: false,
      valid: false,
      handleChange: function(event) {
        changes++
      }
    }
    const component = mount(
      <Password name={expected.name} onChange={expected.handleChange} />
    )
    component
      .find('input')
      .first()
      .simulate('change')
    expect(changes).toEqual(1)
  })
})
