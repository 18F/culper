import React from 'react'
import { mount } from 'enzyme'
import DrugUse from './DrugUse'

describe('The DrugUse component', () => {
  it('Renders without errors', () => {
    const component = mount(<DrugUse />)
    expect(component.find('.drug-use').length).toBe(1)
  })

  it('Performs update', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<DrugUse onUpdate={onUpdate} />)
    expect(component.find('.drug-use').length).toBe(1)
    component.find('.drug-type-use .cocaine input').simulate('change')
    component.find('.first-use .year input').simulate('change')
    component.find('.recent-use .year input').simulate('change')
    component.find('.nature-of-use textarea').simulate('change')
    component.find('.use-while-employed .yes input').simulate('change')
    component.find('.use-with-clearance .yes input').simulate('change')
    component.find('.use-in-future .yes input').simulate('change')
    component.find('.explanation textarea').simulate('change')
    expect(updates).toBe(8)
  })
})
