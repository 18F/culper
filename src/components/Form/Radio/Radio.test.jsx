import React from 'react'
import { mount } from 'enzyme'
import Radio from './Radio'

describe('The radio component', () => {
  it('renders appropriately with focus', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      error: false,
      focus: true,
      valid: false
    }
    const component = mount(<Radio {...expected} />)
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input').length).toEqual(1)
    expect(component.find('input').hasClass('usa-input-focus')).toEqual(true)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('renders appropriately with validity checks', () => {
    const expected = {
      name: 'input-success',
      label: 'Text input success',
      error: false,
      focus: false,
      valid: true
    }
    const component = mount(<Radio {...expected} />)
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('renders sane defaults', () => {
    const expected = {
      name: 'input-type-text',
      label: 'Text input label',
      error: false,
      focus: false,
      valid: false
    }
    const component = mount(<Radio {...expected} />)
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('bubbles up change event', () => {
    let changes = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      error: true,
      focus: false,
      valid: false,
      onUpdate: function(event) {
        changes++
      }
    }
    const component = mount(<Radio {...expected} />)
    component.find('input').simulate('change')
    expect(changes).toEqual(1)
  })

  it('bubbles up focus event', () => {
    let foci = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      error: true,
      focus: false,
      valid: false,
      onFocus: function(event) {
        foci++
      }
    }
    const component = mount(<Radio {...expected} />)
    component.find('input').simulate('focus')
    expect(foci).toEqual(1)
  })

  it('bubbles up blur event', () => {
    let blurs = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      error: true,
      focus: false,
      valid: false,
      onBlur: function(event) {
        blurs++
      }
    }
    const component = mount(<Radio {...expected} />)
    component.find('input').simulate('blur')
    expect(blurs).toEqual(1)
  })

  it('can toggle checked state', () => {
    let checked = 0
    const onUpdate = values => {
      checked++
    }
    const component = mount(
      <Radio name="toggle" value="foo" checked="true" onUpdate={onUpdate} />
    )
    expect(component.find('.checked').length).toEqual(1)
    component.find('input').simulate('change')
    expect(checked).toBe(1)
    component.find('input').simulate('change')
    expect(checked).toBe(2)
  })
})
