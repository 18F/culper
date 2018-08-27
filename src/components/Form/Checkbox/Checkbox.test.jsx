import React from 'react'
import { mount } from 'enzyme'
import Checkbox from './Checkbox'

describe('The checkbox component', () => {
  // it('renders appropriately with an error', () => {
  //   const expected = {
  //     name: 'input-error',
  //     label: 'Text input error',
  //     error: true,
  //     focus: false,
  //     valid: false
  //   }
  //   const component = mount(<Checkbox name={expected.name} label={expected.label} error={expected.error} focus={expected.focus} valid={expected.valid} />)
  //   expect(component.find('label.usa-input-error-label').text()).toEqual(expected.label)
  //   expect(component.find('input[name="' + expected.name + '"]').length).toEqual(1)
  //   expect(component.find('.usa-input-error-label').length).toEqual(1)
  // })

  it('renders appropriately with focus', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      error: false,
      focus: true,
      valid: false
    }
    const component = mount(
      <Checkbox
        name={expected.name}
        label={expected.label}
        error={expected.error}
        focus={expected.focus}
        valid={expected.valid}
      />
    )
    expect(component.find('label').text()).toEqual(expected.label)
    expect(
      component.find('input[name="' + expected.name + '"]').length
    ).toEqual(1)
    expect(
      component
        .find('input[name="' + expected.name + '"]')
        .hasClass('usa-input-focus')
    ).toEqual(false)
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
    const component = mount(
      <Checkbox
        name={expected.name}
        label={expected.label}
        error={expected.error}
        focus={expected.focus}
        valid={expected.valid}
      />
    )
    expect(component.find('label').text()).toEqual(expected.label)
    expect(
      component.find('input[name="' + expected.name + '"]').length
    ).toEqual(1)
    expect(
      component
        .find('input[name="' + expected.name + '"]')
        .hasClass('usa-input-success')
    ).toEqual(true)
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
    const component = mount(
      <Checkbox
        name={expected.name}
        label={expected.label}
        error={expected.error}
        focus={expected.focus}
        valid={expected.valid}
      />
    )
    expect(component.find('label').text()).toEqual(expected.label)
    expect(
      component.find('input[name="' + expected.name + '"]').length
    ).toEqual(1)
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
      onUpdate: function(values) {
        changes++
      }
    }
    const component = mount(<Checkbox {...expected} />)
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
      handleFocus: function(event) {
        foci++
      }
    }
    const component = mount(
      <Checkbox name={expected.name} onFocus={expected.handleFocus} />
    )
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
      handleBlur: function(event) {
        blurs++
      }
    }
    const component = mount(
      <Checkbox name={expected.name} onBlur={expected.handleBlur} />
    )
    component.find('input').simulate('blur')
    expect(blurs).toEqual(1)
  })
})
