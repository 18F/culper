import React from 'react'
import { mount } from 'enzyme'
import DateRange from './DateRange'

describe('The date range component', () => {
  it('bubbles up validate event', () => {
    let validations = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      help: 'Helpful error message',
      error: true,
      focus: false,
      valid: false,
      handleValidation: function (event) {
        validations++
      }
    }
    const component = mount(<DateRange name={expected.name} onValidate={expected.handleValidation} />)
    component.find('input').first().simulate('blur')
    expect(validations > 0).toEqual(true)
  })

  it('bubbles up change event', () => {
    let changes = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      help: 'Helpful error message',
      error: true,
      focus: false,
      valid: false,
      handleChange: function (event) {
        changes++
      }
    }
    const component = mount(<DateRange name={expected.name} onChange={expected.handleChange} />)
    component.find('input').first().simulate('change')
    expect(changes).toEqual(1)
  })

  it('loads data', () => {
    let changes = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      help: 'Helpful error message',
      error: true,
      focus: false,
      valid: false,
      handleChange: function (event) {
        changes++
      },
      from: new Date('1/1/2000'),
      to: new Date('4/1/2010')
    }
    const component = mount(<DateRange name={expected.name} onChange={expected.handleChange} from={expected.from} to={expected.to} />)
    component.find('input[name="present"]').simulate('change')
    component.find('input[name="month"]').first().simulate('change')
    component.find('input[name="day"]').first().simulate('change')
    component.find('input[name="year"]').first().simulate('change')
    expect(changes).toEqual(4)
  })
})
