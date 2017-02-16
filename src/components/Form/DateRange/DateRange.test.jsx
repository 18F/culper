import React from 'react'
import { mount } from 'enzyme'
import DateRange from './DateRange'

describe('The date range component', () => {
  // it('renders appropriately without an error', () => {
  //   const component = mount(<DateRange />)
  //   expect(component.find('select#fromMonth').length).toEqual(1)

  //   expect(component.find('input#fromYear').length).toEqual(1)
  //   expect(component.find('select#fromMonth').length).toEqual(1)
  //   expect(component.find('input#fromEstimated').length).toEqual(1)

  //   expect(component.find('input#toYear').length).toEqual(1)
  //   expect(component.find('select#toMonth').length).toEqual(1)
  //   expect(component.find('input#toEstimated').length).toEqual(1)
  // })

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
      onUpdate: function (event) {
        changes++
      }
    }
    const component = mount(<DateRange name={expected.name} onUpdate={expected.onUpdate} />)
    component.find('input').first().simulate('change')
    expect(changes).toEqual(1)
  })
})
