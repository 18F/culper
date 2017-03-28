import React from 'react'
import { mount } from 'enzyme'
import EmploymentActivity from './EmploymentActivity'

describe('The employment activity component', () => {
  it('selects an employment activity', () => {
    let counter = 0
    let blur = 0
    let focus = 0
    let expected = {
      onUpdate: () => {
        counter++
      },
      onBlur: () => {
        blur++
      },
      onFocus: () => {
        focus++
      }
    }

    const component = mount(<EmploymentActivity name="ac" onUpdate={expected.onUpdate} onBlur={expected.onBlur} onFocus={expected.onFocus} />)
    const selected = component.find({type: 'radio', value: 'ActiveMilitary'})
    selected.simulate('change')
    selected.simulate('blur')
    selected.simulate('focus')
    expect(selected.hasClass('selected')).toBe(true)
    expect(counter).toBe(1)
    expect(blur).toBe(1)
    expect(focus).toBe(1)

    component.find({type: 'radio', value: 'Other'}).simulate('change')
    component.find('textarea').simulate('change', { target: { value: 'Hello' } })
    expect(counter).toBe(3)
  })
})

