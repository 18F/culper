import React from 'react'
import { mount } from 'enzyme'
import ApoFpo from './ApoFpo'

describe('The ApoFpo component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      value: ''
    }
    const component = mount(<ApoFpo name={expected.name} label={expected.label} value={expected.value} />)
    component.find('input').simulate('change')
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('handles defaults', () => {
    expect(ApoFpo.defaultProps.tabBack()).toEqual(undefined)
    expect(ApoFpo.defaultProps.tabNext()).toEqual(undefined)
    expect(ApoFpo.defaultProps.onUpdate()).toEqual(undefined)
    expect(ApoFpo.defaultProps.onError(null, [])).toEqual([])
  })
})
