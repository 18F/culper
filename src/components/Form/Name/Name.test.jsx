import React from 'react'
import { mount } from 'enzyme'
import Name from './Name'

describe('The Name component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      value: ''
    }
    const component = mount(<Name {...expected} />)
    component.find('.last input').simulate('change')
    expect(component.find('div.hidden').length).toBeGreaterThan(0)
  })

  it('handles last name patterns', () => {
    const expected = [
      {
        name: 'applicant-name',
        last: 'X- Mc. O\'Leary',
        valid: true
      },
      {
        name: 'applicant-numbers',
        last: 'abc 123',
        valid: false
      }
    ]

    expected.forEach((ex) => {
      const component = mount(<Name {...ex} />)
      component.find('.last input').simulate('change')
      expect(component.find('div.hidden').length).toBeGreaterThan(0)
    })
  })

  it('handles maximum lengths', () => {
    const expected = [
      {
        name: 'applicant-long-first',
        first: 'aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeeeffffffffffgggggggggghhhhhhhhhhiiiiiiiiiijjjjjjjjjjkkkkkkkkkk',
        part: 'first',
        valid: false
      },
      {
        name: 'applicant-long-last',
        last: 'aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeeeffffffffffgggggggggghhhhhhhhhhiiiiiiiiiijjjjjjjjjjkkkkkkkkkk',
        part: 'last',
        valid: false
      },
      {
        name: 'applicant-long-middle',
        middle: 'aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeeeffffffffffgggggggggghhhhhhhhhhiiiiiiiiiijjjjjjjjjjkkkkkkkkkk',
        part: 'middle',
        valid: false
      },
      {
        name: 'applicant-firstInitialOnly',
        first: 'Doe',
        firstInitialOnly: true,
        part: 'firstInitialOnly',
        valid: false
      }
    ]

    expected.forEach((ex) => {
      const component = mount(<Name {...ex} />)
      component.find({ name: ex.part }).simulate('change')
      expect(component.find('.usa-input-error-label').length === component.find('span').length).toEqual(ex.valid)
    })
  })

  it('bubbles up validate event', () => {
    let validations = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      error: true,
      focus: false,
      valid: false,
      onError: (value, arr) => {
        validations++
        return arr
      }
    }
    const component = mount(<Name {...expected} />)
    component.find('input').first().simulate('change')
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
      onChange: function (event) {
        changes++
      }
    }
    const component = mount(<Name {...expected} />)
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
      onFocus: function (event) {
        foci++
      }
    }
    const component = mount(<Name {...expected} />)
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
      onBlur: function (event) {
        blurs++
      }
    }
    const component = mount(<Name {...expected} />)
    component.find('input').first().simulate('blur')
    expect(blurs).toEqual(1)
  })
})
