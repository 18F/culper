import React from 'react'
import { mount } from 'enzyme'
import EmploymentStatus from './EmploymentStatus'

describe('The employment status component', () => {
  it('selects an employment status', () => {
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

    const component = mount(<EmploymentStatus name="ac" onUpdate={expected.onUpdate} onBlur={expected.onBlur} onFocus={expected.onFocus} />)
    const selected = component.find({type: 'radio', name: 'employment_status', value: 'Fulltime'})
    selected.simulate('change')
    selected.simulate('blur')
    selected.simulate('focus')
    expect(selected.hasClass('selected')).toBe(true)
    expect(counter).toBe(1)
    expect(blur).toBe(1)
    expect(focus).toBe(1)
  })
})

