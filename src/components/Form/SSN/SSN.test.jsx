import React from 'react'
import { mount } from 'enzyme'
import SSN from './SSN'

describe('The SSN component', () => {
  it('no error on empty', () => {
    let blurs = 0
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      value: '',
      handleBlur: function(event) {
        blurs++
      }
    }
    const component = mount(
      <SSN
        name={expected.name}
        label={expected.label}
        value={expected.value}
        onBlur={expected.handleBlur}
      />
    )
    component
      .find({ type: 'text', name: 'first' })
      .simulate('keydown', { keyCode: 48, target: { value: '111' } })
    expect(component.find('.usa-input-error-label').length).toEqual(0)
    expect(blurs).toEqual(0)
  })

  it('handles updates', () => {
    let updated = false
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      error: true,
      focus: false,
      valid: false,
      onUpdate: queue => {
        updated = true
      }
    }
    const component = mount(<SSN {...expected} />)
    component.find('.first input').simulate('change')
    component.find('.middle input').simulate('change')
    component.find('.last input').simulate('change')
    component.find('.not-applicable input').simulate('change')
    expect(updated).toEqual(true)
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
      <SSN name={expected.name} onFocus={expected.handleFocus} />
    )
    component
      .find('input')
      .first()
      .simulate('focus')
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
      <SSN name={expected.name} onBlur={expected.handleBlur} />
    )
    component
      .find('input')
      .first()
      .simulate('blur')
    expect(blurs).toEqual(1)
  })

  it('loads with first, middle and last values', () => {
    const component = mount(
      <SSN name={'ssn'} first="111" middle="00" last="0101" />
    )
    component.find('.first input').hasClass('usa-input-success')
    component.find('.middle input').hasClass('usa-input-success')
    component.find('.last input').hasClass('usa-input-success')
  })

  it('loads with value and signals success', () => {
    const component = mount(<SSN name={'ssn'} value="111001234" />)
    component.find('.first input').hasClass('usa-input-success')
    component.find('.middle input').hasClass('usa-input-success')
    component.find('.last input').hasClass('usa-input-success')

    component.find('.first input').simulate('change')
    component.find('.middle input').simulate('change')
    component.find('.last input').simulate('change')
  })

  it('loads with invalid values and signals error', () => {
    const component = mount(<SSN name={'ssn'} first="abc" />)
    component.find('.first input').simulate('change')
  })

  it('loads value that is an incorrect length', () => {
    const component = mount(<SSN name="ssn" first="123" middle="4" last="" />)
    expect(
      component.find({ type: 'text', name: 'first', value: '123' }).length
    ).toBe(1)
    expect(
      component.find({ type: 'text', name: 'middle', value: '4' }).length
    ).toBe(1)
    expect(
      component.find({ type: 'text', name: 'last', value: '' }).length
    ).toBe(1)
  })

  it('disallows use of clipboard', () => {
    const component = mount(<SSN name="ssn" />)
    component
      .find({ type: 'text', name: 'first' })
      .simulate('paste', { target: { value: '111' } })
    expect(
      component.find({ type: 'text', name: 'first', value: '111' }).length
    ).toBe(0)
    expect(
      component.find({ type: 'text', name: 'first', value: '' }).length
    ).toBe(1)
  })

  it('can autotab forward', () => {
    let tabbed = false
    const expected = {
      name: 'ssn',
      tab: () => {
        tabbed = true
      }
    }
    const component = mount(<SSN {...expected} />)

    tabbed = false
    component
      .find('.first input')
      .simulate('keydown', { keyCode: 8, target: { value: '' } })
    expect(tabbed).toBe(false)

    tabbed = false
    component
      .find('.first input')
      .simulate('keydown', { keyCode: 48, target: { value: '123' } })
    expect(tabbed).toBe(true)

    tabbed = false
    component
      .find('.middle input')
      .simulate('keydown', { keyCode: 8, target: { value: '1' } })
    expect(tabbed).toBe(false)

    tabbed = false
    component
      .find('.middle input')
      .simulate('keydown', { keyCode: 48, target: { value: '12' } })
    expect(tabbed).toBe(true)
  })

  it('can autotab backward', () => {
    let tabbed = false
    const expected = {
      name: 'ssn',
      tab: () => {
        tabbed = true
      }
    }
    const component = mount(<SSN {...expected} />)

    tabbed = false
    component
      .find('.last input')
      .simulate('keydown', { keyCode: 48, target: { value: '1234' } })
    expect(tabbed).toBe(false)

    tabbed = false
    component
      .find('.last input')
      .simulate('keydown', { keyCode: 8, target: { value: '' } })
    expect(tabbed).toBe(true)

    tabbed = false
    component
      .find('.middle input')
      .simulate('keydown', { keyCode: 48, target: { value: '1' } })
    expect(tabbed).toBe(false)

    tabbed = false
    component
      .find('.middle input')
      .simulate('keydown', { keyCode: 8, target: { value: '' } })
    expect(tabbed).toBe(true)
  })

  it('tests for invalid values', () => {
    const tests = [
      // Legacy system checks
      { valid: false, props: { first: '123', middle: '45', last: '6789' } },
      { valid: false, props: { first: '999', middle: '99', last: '9999' } },

      // Checks using randomization
      { valid: false, props: { first: '000', middle: '00', last: '0000' } },
      { valid: false, props: { first: '666', middle: '00', last: '0000' } },
      { valid: false, props: { first: '900', middle: '00', last: '0000' } },
      { valid: false, props: { first: '950', middle: '00', last: '0000' } },
      { valid: false, props: { first: '999', middle: '00', last: '0000' } },
      { valid: true, props: { first: '123', middle: '99', last: '9999' } },
      { valid: true, props: { first: '555', middle: '55', last: '5555' } },

      // Empty value(s) should not diplay an error
      { valid: true, props: { first: '', second: '', third: '' } }
    ]

    const fn = SSN.errors.find(x => x.code === 'invalid').func
    tests.forEach(t => {
      expect(fn(null, t.props)).toBe(t.valid)
    })
  })
})
