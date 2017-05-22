import React from 'react'
import { mount } from 'enzyme'
import MaidenName from './MaidenName'

describe('The MaidenName component', () => {
  it('bubbles up error event', () => {
    let hit = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      help: 'Helpful error message',
      error: true,
      focus: false,
      valid: false,
      onError: (value, arr) => {
        hit++
        return arr
      },
      onChange: () => {}
    }
    const component = mount(<MaidenName name={expected.name} onError={expected.onError} onChange={expected.onChange} />)
    component.find('input').first().simulate('blur')
    expect(hit > 0).toEqual(true)
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
      handleChange: function (event) {
        changes++
      }
    }
    const component = mount(<MaidenName name={expected.name} onChange={expected.handleChange} />)
    component.find('input').first().simulate('change')
    expect(changes).toEqual(1)
  })
})
