import React from 'react'
import { mount } from 'enzyme'
import Generic from './Generic'

describe('The generic component', () => {
  it('renders appropriately with an error', () => {
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      type: 'text',
      maxlength: '2',
      value: 'asinetaeirsnteansti'
    }
    const component = mount(<Generic {...expected} />)
    expect(component.find('label.usa-input-error-label').text()).toEqual(expected.label)
    expect(component.find('input').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(1)
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
    const component = mount(<Generic {...expected} />)
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input').length).toEqual(1)
    expect(component.find('input').hasClass('usa-input-focus')).toEqual(true)
  })

  it('renders appropriately with validity checks', () => {
    const expected = {
      name: 'input-success',
      label: 'Text input success',
      type: 'text',
      value: 'test',
      error: false,
      focus: false,
      valid: true
    }
    const component = mount(<Generic {...expected} />)
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input').length).toEqual(1)
    expect(component.find('input').hasClass('usa-input-success')).toEqual(true)
  })

  it('renders sane defaults', () => {
    const expected = {
      name: 'input-type-text',
      label: 'Text input label',
      type: 'text',
      error: false,
      focus: false,
      valid: false
    }
    const component = mount(<Generic {...expected} />)
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input').length).toEqual(1)
  })

  it('can autotab forward', () => {
    let tabbed = false
    const expected = {
      name: 'input-type-text',
      maxlength: '1',
      tabNext: () => { tabbed = true }
    }
    const component = mount(<Generic {...expected} />)
    component.find('input').simulate('keydown', { keyCode: 8, target: { value: '' } })
    expect(tabbed).toBe(false)
    component.find('input').simulate('keydown', { keyCode: 48, target: { value: '1' } })
    expect(tabbed).toBe(true)
  })

  it('can autotab backward', () => {
    let tabbed = false
    const expected = {
      name: 'input-type-text',
      maxlength: '1',
      tabBack: () => { tabbed = true }
    }
    const component = mount(<Generic {...expected} />)
    component.find('input').simulate('keydown', { keyCode: 48, target: { value: '1' } })
    expect(tabbed).toBe(false)
    component.find('input').simulate('keydown', { keyCode: 8, target: { value: '' } })
    expect(tabbed).toBe(true)
  })

  it('trims whitespace for validation', () => {
    let persisted = false
    const expected = {
      name: 'input-type-text',
      maxlength: '2',
      value: ' 12  '
    }
    const component = mount(<Generic {...expected} />)
    component.find('input').simulate('blur', { persist: () => { persisted = true }, target: { name: expected.name } })
    expect(persisted).toBe(true)
    expect(component.find('input').hasClass('usa-input-success')).toEqual(true)
  })
})
