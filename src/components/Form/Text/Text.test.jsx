import React from 'react'
import { mount } from 'enzyme'
import Text from './Text'

describe('The text component', () => {
  it('renders appropriately with an error', () => {
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      type: 'text',
      error: false,
      focus: false,
      valid: false,
      readonly: false
    }

    const component = mount(<Text {...expected} />)
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
    const component = mount(<Text {...expected} />)
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
    const component = mount(<Text {...expected} />)
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('renders sane defaults and triggers on update', () => {
    let updates = 0
    const expected = {
      name: 'input-type-text',
      label: 'Text input label',
      type: 'text',
      error: false,
      focus: false,
      valid: false,
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<Text {...expected} />)
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
    component.find('input').simulate('change')
    expect(updates).toBeGreaterThan(0)
  })

  it('can apply a prefilter prior to storing the value', () => {
    const props = {
      prefilter: value => {
        if (!value.match(/^(\s*|\d+)$/)) {
          value = value.replace(/\D/g, '')
        }
        return value
      }
    }
    const component = mount(<Text {...props} />)
    component
      .find('input')
      .simulate('change', { target: { value: ' abc 0123 def ' } })
    expect(component.state('value')).toBe('0123')
  })
})
