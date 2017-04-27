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
    component.find('textarea#DidNotFollowExplanation').simulate('change')
    component.find({type: 'radio', name: 'treatment', value: 'No'}).simulate('click')
    component.find('textarea#Explanation').simulate('change')

    component.find({type: 'radio', name: 'treatment', value: 'Yes'}).simulate('click')
    component.find('input#Condition').simulate('change')

    expect(updates).toBe(8)
  })

  it('Selects no to everything', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<ExistingConditions onUpdate={onUpdate} />)
    component.find('.hascondition .no input').simulate('change')
    component.find({type: 'radio', name: 'treatment', value: 'Decline'}).simulate('click')
    component.find('.didnotfollow .no input').simulate('change')
    component.find('div').first().simulate('blur')
    expect(updates).toBe(3)
  })
})
