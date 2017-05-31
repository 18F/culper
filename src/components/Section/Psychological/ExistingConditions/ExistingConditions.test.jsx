import React from 'react'
import { mount } from 'enzyme'
import ExistingConditions from './ExistingConditions'

describe('The ExistingConditions component', () => {
  it('Renders without errors', () => {
    const component = mount(<ExistingConditions />)
    expect(component.find('.existingconditions').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<ExistingConditions onUpdate={onUpdate} />)
    component.find('.hascondition .yes input').simulate('change')
    component.find('.didnotfollow .yes input').simulate('change')
    component.find('.existing-condition-didnotfollow-explanation textarea').simulate('change')
    component.find('.treatment-list .no input').simulate('change')
    component.find('.existing-condition-explanation textarea').simulate('change')
    component.find({type: 'radio', name: 'treatment', value: 'Yes'}).simulate('change')
    component.find('.diagnosis-condition input').simulate('change')

    expect(updates).toBe(10)
  })

  it('Selects no to everything', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<ExistingConditions onUpdate={onUpdate} />)
    component.find('.hascondition .no input').simulate('change')
    component.find({type: 'radio', name: 'treatment', value: 'Decline'}).simulate('change')
    component.find('.didnotfollow .no input').simulate('change')
    expect(updates).toBe(3)
  })
})
