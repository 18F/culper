import React from 'react'
import { mount } from 'enzyme'
import DrugUses from './DrugUses'

describe('The DrugUses component', () => {
  it('Renders without errors', () => {
    const component = mount(<DrugUses />)
    expect(component.find('.drug-uses').length).toBe(1)
  })

  it('Performs update', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<DrugUses onUpdate={onUpdate} />)
    expect(component.find('.drug-uses').length).toBe(1)
    component.find('.used-drugs .yes input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Performs updates to accordion', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const list = [
      {
        DrugUse: {}
      }
    ]
    const component = mount(<DrugUses onUpdate={onUpdate} UsedDrugs={'Yes'} List={list} />)
    expect(component.find('.drug-uses').length).toBe(1)
    component.find('.explanation textarea').simulate('change')
    expect(updates).toBe(2)
  })
})
