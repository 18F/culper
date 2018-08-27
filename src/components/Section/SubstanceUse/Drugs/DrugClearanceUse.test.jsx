import React from 'react'
import { mount } from 'enzyme'
import DrugClearanceUse from './DrugClearanceUse'

describe('The DrugClearanceUse component', () => {
  it('Renders without errors', () => {
    const component = mount(<DrugClearanceUse />)
    expect(component.find('.drug-clearance-use').length).toBe(1)
  })

  it('Performs update', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<DrugClearanceUse onUpdate={onUpdate} />)
    expect(component.find('.drug-clearance-use').length).toBe(1)
    component.find('.involvement-dates .from .year input').simulate('change')
    component.find('.description textarea').simulate('change')
    component.find('.estimated-use input').simulate('change')
    expect(updates).toBe(3)
  })
})
