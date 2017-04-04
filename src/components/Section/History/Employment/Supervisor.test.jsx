import React from 'react'
import { mount } from 'enzyme'
import Supervisor from './Supervisor'

describe('The employment supervisor component', () => {
  it('loads a supervisor component with supervisor name', () => {
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

    const component = mount(<Supervisor name="ac" onUpdate={expected.onUpdate} onBlur={expected.onBlur} onFocus={expected.onFocus} SupervisorName={'John Doe'} />)
    const selected = component.find({type: 'text', name: 'SupervisorName'})
    selected.simulate('change')
    selected.simulate('blur')
    selected.simulate('focus')
    expect(counter).toBe(1)
    expect(blur).toBe(1)
    expect(focus).toBe(1)
  })

  it('can toggle "I don\'t know" button', () => {
    let updates = 0
    const expected = {
      name: 'supervisor',
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<Supervisor {...expected} />)
    component.find({ type: 'checkbox', name: 'EmailNotApplicable' }).simulate('change')
    expect(updates).toEqual(1)
  })
})
