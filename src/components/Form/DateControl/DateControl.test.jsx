import React from 'react'
import { mount, shallow } from 'enzyme'
import DateControl from './DateControl'

describe('The date component', () => {
  const children = 4

  it('renders appropriately with an error', () => {
    const expected = {
      name: 'input-error',
      label: 'DateControl input error',
      disabled: false,
      error: true,
      focus: false,
      valid: false
    }
    const component = mount(<DateControl {...expected} />)
    expect(component.find('input#day').length).toEqual(1)
  })

  it('renders appropriately with focus', () => {
    const expected = {
      name: 'input-focus',
      label: 'DateControl input focused',
      error: false,
      focus: true,
      valid: false
    }
    const component = mount(<DateControl {...expected} />)
    component.find('input#day').simulate('focus')
    expect(component.find('label').length).toEqual(children)
    expect(component.find('input#day').length).toEqual(1)
    expect(component.find('input#day').hasClass('usa-input-focus')).toEqual(true)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('renders appropriately with validity checks', () => {
    const expected = {
      name: 'input-success',
      label: 'DateControl input success',
      value: '1-28-2016'
    }
    const component = mount(<DateControl {...expected} />)

    // For validation
    component.find('input#day').simulate('focus')
    component.find('input#day').simulate('blur')

    expect(component.find('label').length).toEqual(children)
    expect(component.find('input#day').length).toEqual(1)
    expect(component.find('input#day').nodes[0].value).toEqual('28')
    expect(component.find('input#day').hasClass('usa-input-success')).toEqual(true)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('renders sane defaults', () => {
    const expected = {
      name: 'input-type-text',
      label: 'DateControl input label',
      error: false,
      focus: false,
      valid: false
    }
    const component = mount(<DateControl {...expected} />)
    expect(component.find('label').length).toEqual(children)
    expect(component.find('input#day').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('renders with valid date', () => {
    const expected = {
      name: 'input-type-text',
      label: 'DateControl input label',
      value: '01-28-2016',
      error: false,
      focus: false,
      valid: false
    }
    const component = mount(<DateControl {...expected} />)
    expect(component.find('label').length).toEqual(children)
    expect(component.find('input#day').length).toEqual(1)
    expect(component.find('input#month').nodes[0].value).toEqual('1')
    expect(component.find('input#day').nodes[0].value).toEqual('28')
    expect(component.find('input#year').nodes[0].value).toEqual('2016')
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('renders with invalid date', () => {
    const expected = {
      name: 'input-type-text',
      label: 'DateControl input label',
      value: '1-42-2016',
      error: false,
      focus: false,
      valid: false
    }
    const component = mount(<DateControl {...expected} />)
    expect(component.find('label').length).toEqual(children)
    expect(component.find('input#day').length).toEqual(1)
    expect(component.find('input#month').nodes[0].value).toEqual('')
    expect(component.find('input#day').nodes[0].value).toEqual('')
    expect(component.find('input#year').nodes[0].value).toEqual('')
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('renders with undefined date', () => {
    const expected = {
      name: 'input-type-text',
      label: 'DateControl input label',
      error: false,
      focus: false,
      valid: false
    }
    const component = mount(<DateControl {...expected} />)
    expect(component.find('label').length).toEqual(children)
    expect(component.find('input#day').length).toEqual(1)
    expect(component.find('input#month').nodes[0].value).toEqual('')
    expect(component.find('input#day').nodes[0].value).toEqual('')
    expect(component.find('input#year').nodes[0].value).toEqual('')
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('renders with date as random input', () => {
    const expected = {
      name: 'input-type-text',
      label: 'DateControl input label',
      value: 'the quick brown fox...',
      error: false,
      focus: false,
      valid: false
    }
    const component = mount(<DateControl {...expected} />)
    expect(component.find('label').length).toEqual(children)
    expect(component.find('input#day').length).toEqual(1)
    expect(component.find('input#month').nodes[0].value).toEqual('')
    expect(component.find('input#day').nodes[0].value).toEqual('')
    expect(component.find('input#year').nodes[0].value).toEqual('')
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })
})
