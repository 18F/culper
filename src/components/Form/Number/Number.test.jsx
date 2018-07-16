import React from 'react'
import { mount } from 'enzyme'
import Number from './Number'

describe('The number component', () => {
  it('default value is not numeric displays as empty', () => {
    const expected = {
      name: 'input-type-text',
      value: 'four score and seven years'
    }
    const component = mount(<Number {...expected} />)
    expect(component.find({ type: 'text', value: '' }).length).toEqual(1)
  })

  it('validates minimum value', () => {
    const expected = {
      name: 'input-type-text',
      value: '1',
      min: '10'
    }
    const component = mount(<Number {...expected} />)
    component.find('input').simulate('blur')
    expect(component.find('.usa-input-error').length).toEqual(1)
  })

  it('validates maximum value', () => {
    const expected = {
      name: 'input-type-text',
      value: '100',
      max: '10'
    }
    const component = mount(<Number {...expected} />)
    component.find('input').simulate('blur')
    expect(component.find('.usa-input-error').length).toEqual(1)
  })

  it('skips local validation if already false', () => {
    const expected = {
      name: 'input-type-text',
      value: '100',
      maxlength: '1'
    }
    const component = mount(<Number {...expected} />)
    component.find('input').simulate('blur')
    expect(component.find('.usa-input-error').length).toEqual(1)
  })

  it('only allows numerical values', () => {
    const expected = {
      name: 'input-type-text',
      value: '100',
      maxlength: '4'
    }
    const component = mount(<Number {...expected} />)
    component.find('input').simulate('change', { target: { value: '100a' } })
    expect(component.find({ type: 'text', value: expected.value }).length).toEqual(1)
  })
})
