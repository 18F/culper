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
    expect(component.find('.suffix-other').length).toBe(0)
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
      expect(component.find('.suffix-other').length).toBe(0)
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

  it('does updates', () => {
    let updates = 0
    const expected = {
      name: 'name',
      suffix: 'Other',
      onUpdate: () => { updates++ }
    }

    const component = mount(<Name {...expected} />)
    component.find('.first input').simulate('change')
    component.find('.first-initial-only input').simulate('change')
    component.find('.middle input').simulate('change')
    component.find('.middle-initial-only input').simulate('change')
    component.find('.middle-none input').simulate('change')
    component.find('.last input').simulate('change')
    component.find('.last-initial-only input').simulate('change')
    component.find('.suffix-more input').simulate('change')
    component.find('.suffix-other input').simulate('change')
    expect(updates).toBe(9)
  })

  it('error if single letter without initial only', () => {
    const tests = [
      {
        props: {
          first: 'a',
          firstInitialOnly: false,
          middle: 'def',
          middleInitialOnly: false,
          last: 'abc',
          lastInitialOnly: false
        },
        expected: 1
      },
      {
        props: {
          first: 'abc',
          firstInitialOnly: false,
          middle: 'a',
          middleInitialOnly: false,
          last: 'abc',
          lastInitialOnly: false
        },
        expected: 1
      },
      {
        props: {
          first: 'abc',
          firstInitialOnly: false,
          middle: 'abc',
          middleInitialOnly: false,
          last: 'a',
          lastInitialOnly: false
        },
        expected: 1
      },
      {
        props: {
          first: 'a',
          firstInitialOnly: true,
          middle: 'def',
          middleInitialOnly: false,
          last: 'abc',
          lastInitialOnly: false
        },
        expected: 0
      },
      {
        props: {
          first: 'abc',
          firstInitialOnly: false,
          middle: 'a',
          middleInitialOnly: true,
          last: 'abc',
          lastInitialOnly: false
        },
        expected: 0
      },
      {
        props: {
          first: 'abc',
          firstInitialOnly: false,
          middle: 'abc',
          middleInitialOnly: false,
          last: 'a',
          lastInitialOnly: true
        },
        expected: 0
      }
    ]

    tests.forEach(test => {
      const component = mount(<Name {...test.props} />)
      expect(component.find('.usa-input-error-label').length).toEqual(test.expected)
    })
  })

  it('handles no middle name requirements', () => {
    const expected = [
      {
        name: 'applicant-middle',
        first: 'John',
        middle: '',
        noMiddleName: false,
        last: 'Doe',
        required: true,
        errors: 1
      },
      {
        name: 'applicant-middle',
        first: 'John',
        middle: '',
        noMiddleName: true,
        last: 'Doe',
        required: true,
        errors: 0
      },
      {
        name: 'applicant-middle',
        first: 'John',
        middle: 'Smith',
        last: 'Doe',
        required: true,
        errors: 0
      }
    ]

    expected.forEach((ex) => {
      const component = mount(<Name {...ex} />)
      component.find({ name: 'middle' }).simulate('change')
      expect(component.find('.usa-input-error-label').length).toEqual(ex.errors)
    })
  })
})
