import React from 'react'
import { mount } from 'enzyme'
import DrugPublicSafetyUse from './DrugPublicSafetyUse'

describe('The DrugPublicSafetyUse component', () => {
  it('Renders without errors', () => {
    const component = mount(<DrugPublicSafetyUse />)
    expect(component.find('.drug-public-safety-use').length).toBe(1)
  })

  it('Performs update', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<DrugPublicSafetyUse onUpdate={onUpdate} />)
    expect(component.find('.drug-public-safety-use').length).toBe(1)
    component.find('.involvement-dates .from .year input').simulate('change')
    component.find('.description textarea').simulate('change')
    component.find('.estimated-use input').simulate('change')
    expect(updates).toBe(3)
  })
})
