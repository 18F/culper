import React from 'react'
import { mount } from 'enzyme'
import FailureType from './FailureType'

describe('The failure type component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'taxes-failure'
    }
    const component = mount(<FailureType {...expected} />)
    expect(component.find('.option-list').length).toBe(1)
    expect(component.find('.failure-file').length).toBe(1)
    expect(component.find('.failure-pay').length).toBe(1)
    expect(component.find('.failure-both').length).toBe(1)
  })

  it('can change value', () => {
    let value = ''
    const expected = {
      name: 'taxes-failure',
      value: value,
      onUpdate: values => {
        value = values.value
      }
    }
    const component = mount(<FailureType {...expected} />)
    expect(value).toBe('')
    component.find('.failure-file input').simulate('change')
    expect(value).toBe('File')
  })
})
