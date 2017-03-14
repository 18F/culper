import React from 'react'
import { mount } from 'enzyme'
import Telephone from './Telephone'

describe('The Telephone component', () => {
  it('renders DSN fields', () => {
    const component = mount(<Telephone name="phone" type="DSN" />)
    expect(component.find('a.domestic-number').length).toEqual(1)
    expect(component.find('a.international-number').length).toEqual(1)
    expect(component.find('input[name="dsn_first"]').length).toEqual(1)
    expect(component.find('input[name="dsn_second"]').length).toEqual(1)
  })

  it('renders international fields', () => {
    const component = mount(<Telephone name="phone" type="International" />)
    expect(component.find('a.domestic-number').length).toEqual(1)
    expect(component.find('a.dsn-number').length).toEqual(1)
    expect(component.find('input[name="int_first"]').length).toEqual(1)
    expect(component.find('input[name="int_second"]').length).toEqual(1)
  })

  it('populates domestic fields using number', () => {
    const component = mount(<Telephone name="phone" type="Domestic" number="7031234567" />)
    expect(component.find('input[name="domestic_first"]').length).toEqual(1)
    expect(component.find('input[name="domestic_first"]').props().value).toEqual('703')
    expect(component.find('input[name="domestic_second"]').props().value).toEqual('123')
    expect(component.find('input[name="domestic_third"]').props().value).toEqual('4567')
  })

  it('populates dsn fields using number', () => {
    const component = mount(<Telephone name="phone" type="DSN" number="1234567" />)
    expect(component.find('input[name="dsn_first"]').length).toEqual(1)
    expect(component.find('input[name="dsn_first"]').props().value).toEqual('123')
    expect(component.find('input[name="dsn_second"]').props().value).toEqual('4567')
  })

  it('bubbles up validate event', () => {
    let validations = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      error: true,
      focus: false,
      valid: false,
      handleValidation: function (event) {
        validations++
      }
    }
    const component = mount(<Telephone name={expected.name} onValidate={expected.handleValidation} />)
    component.find('input').first().simulate('blur')
    expect(validations > 0).toEqual(true)
  })

  it('bubbles up change event', () => {
    let changes = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      error: true,
      focus: false,
      valid: false,
      handleChange: function (event) {
        changes++
      }
    }
    const component = mount(<Telephone name={expected.name} onUpdate={expected.handleChange} />)
    component.find('input').first().simulate('change')
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
      handleFocus: function (event) {
        foci++
      }
    }
    const component = mount(<Telephone name={expected.name} onFocus={expected.handleFocus} />)
    component.find('input').first().simulate('focus')
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
      handleBlur: function (event) {
        blurs++
      }
    }
    const component = mount(<Telephone name={expected.name} onBlur={expected.handleBlur} />)
    component.find('input').first().simulate('blur')
    expect(blurs).toEqual(1)
  })

  it('allows deselecting phone number type', () => {
    let numberType = ''
    const expected = {
      name: 'telephone-component',
      numberType: 'Work',
      onUpdate: (values) => {
        numberType = values.numberType
      }
    }
    const component = mount(<Telephone {...expected} />)
    expect(numberType).toBe('')
    component.find('.phonetype-option.work input').simulate('click')
    expect(numberType).toBe('')
  })

  it('handles updates to field values', () => {
    let updated = 0
    const expected = {
      name: 'telephone-component',
      onUpdate: (values) => {
        updated++
      }
    }
    const component = mount(<Telephone {...expected} />)
    component.find('a.dsn-number').simulate('click')
    component.find('a.domestic-number').simulate('click')
    component.find({ type: 'text', name: 'domestic_first' }).simulate('change', { target: { value: '111' } })
    component.find({ type: 'text', name: 'domestic_second' }).simulate('change', { target: { value: '222' } })
    component.find({ type: 'text', name: 'domestic_third' }).simulate('change', { target: { value: '3333' } })
    component.find({ type: 'text', name: 'domestic_extension' }).simulate('change', { target: { value: '4444' } })
    component.find({ type: 'radio', name: 'nonumber' }).simulate('change')
    component.find('.time.day input').simulate('change')
    component.find('.phonetype-option.work input').simulate('change')
    expect(updated).toBeGreaterThan(8)
  })
})
