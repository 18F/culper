import React from 'react'
import { mount } from 'enzyme'
import Weight from './Weight'

describe('The Weight component', () => {
  it('no error on empty', () => {
    let hits = 0

    const expected = {
      name: 'input-focus',
      label: 'Pounds',
      value: '10',
      onError: (value, arr) => {
        hits++
        return arr
      }
    }
    const component = mount(<Weight {...expected} />)

    component.find('input#pounds').simulate('change')
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input#pounds').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)

    component.find('input#pounds').simulate('focus')
    component.find('input#pounds').simulate('blur')
    expect(hits).toBeGreaterThan(0)
  })
})
