import React from 'react'
import { mount } from 'enzyme'
import DateRange from './DateRange'

describe('The date range component', () => {
  it('bubbles up validate event', () => {
    let updates = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      help: 'Helpful error message',
      error: true,
      focus: false,
      valid: false,
      onUpdate: () => { updates++ }
    }
    const component = mount(<DateRange {...expected} />)
    component.find('.day input').first().simulate('change', { target: { name: 'day', value: '1' } })
    expect(updates).toBeGreaterThan(0)
  })

  it('bubbles up change event', () => {
    let updates = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      help: 'Helpful error message',
      error: true,
      focus: false,
      valid: false,
      onUpdate: () => { updates++ }
    }
    const component = mount(<DateRange {...expected} />)
    component.find('.day input').first().simulate('change')
    expect(updates).toBeGreaterThan(0)
  })

  it('handles dates in reversed order', () => {
    let updates = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      help: 'Helpful error message',
      error: true,
      focus: false,
      valid: false,
      onUpdate: () => { updates++ },
      present: true,
      from: {
        date: new Date('4/1/2010')
      },
      to: {
        date: new Date('1/1/2000')
      }
    }
    const component = mount(<DateRange {...expected} />)
    component.find('input[name="present"]').simulate('change')
    expect(updates).toBeGreaterThan(0)
    expect(component.find('.to.usa-input-error').length).toBe(1)
  })

  it('loads data', () => {
    let updates = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      help: 'Helpful error message',
      error: true,
      focus: false,
      valid: false,
      onUpdate: () => { updates++ },
      from: {
        date: new Date('1/1/2000')
      },
      to: {
        date: new Date('4/1/2010')
      },
      receiveProps: true
    }
    const component = mount(<DateRange {...expected} />)
    component.find({ type: 'checkbox', value: 'present' }).simulate('change')
    component.setProps({value: '1-1-2010'})
    expect(updates).toBeGreaterThan(0)
  })
})
