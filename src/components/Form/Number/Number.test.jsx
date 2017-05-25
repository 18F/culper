import React from 'react'
import { mount } from 'enzyme'
import Number, { trimLeadingZero } from './Number'

describe('The number component', () => {
  it('renders appropriately with an error', () => {
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      type: 'text',
      error: false,
      focus: false,
      valid: false
    }
    const component = mount(<Number {...expected} />)
    component.find('input').simulate('blur')
    expect(component.find('input').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('renders appropriately with focus', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      type: 'text',
      error: false,
      focus: true,
      valid: false
    }
    const component = mount(<Number {...expected} />)
    component.find('input').simulate('focus')
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input').length).toEqual(1)
    expect(component.find('input').hasClass('usa-input-focus')).toEqual(true)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('renders appropriately with validity checks', () => {
    const expected = {
      name: 'input-success',
      label: 'Text input success',
      type: 'text',
      error: false,
      focus: false,
      valid: true
    }
    const component = mount(<Number {...expected} />)
    component.find('input').simulate('blur')
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('renders sane defaults', () => {
    let updates = 0
    const expected = {
      name: 'input-type-text',
      label: 'Text input label',
      type: 'text',
      error: false,
      focus: false,
      valid: false,
      onUpdate: () => { updates++ }
    }
    const component = mount(<Number {...expected} />)
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
    component.find('input').simulate('change', { target: { value: '1' } })
    expect(updates).toBeGreaterThan(0)
  })

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
    expect(component.find('label').hasClass('usa-input-error-label')).toEqual(true)
  })

  it('validates maximum value', () => {
    const expected = {
      name: 'input-type-text',
      value: '100',
      max: '10'
    }
    const component = mount(<Number {...expected} />)
    component.find('input').simulate('blur')
    expect(component.find('label').hasClass('usa-input-error-label')).toEqual(true)
  })

  it('skips local validation if already false', () => {
    const expected = {
      name: 'input-type-text',
      value: '100',
      maxlength: '1'
    }
    const component = mount(<Number {...expected} />)
    component.find('input').simulate('blur')
    expect(component.find('label').hasClass('usa-input-error-label')).toEqual(true)
  })

  it('only allows numerical values', () => {
    const expected = {
      name: 'input-type-text',
      value: '100',
      maxlength: '1'
    }
    const component = mount(<Number {...expected} />)
    component.find('input').simulate('change', { target: { value: '100a' } })
    expect(component.find({ type: 'text', value: expected.value }).length).toEqual(1)
  })

  it('trims zeroes appropriately', () => {
    const tests = [
      { given: '0', expected: '0' },
      { given: '', expected: '' },
      { given: '100', expected: '100' },
      { given: '010', expected: '10' }
    ]

    tests.forEach(test => {
      expect(trimLeadingZero(test.given)).toBe(test.expected)
    })
  })
})
