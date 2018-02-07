import React from 'react'
import { mount } from 'enzyme'
import DrugType from './DrugType'

describe('The DrugType component', () => {
  it('Renders without errors', () => {
    const component = mount(<DrugType />)
    expect(component.find('.drug-type').length).toBe(1)
  })

  it('Performs update', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<DrugType onUpdate={onUpdate} />)
    expect(component.find('.drug-type').length).toBe(1)
    component.find('.cocaine input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Performs update of other drug type', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<DrugType onUpdate={onUpdate} value="Other" />)
    expect(component.find('.drug-type').length).toBe(1)
    expect(component.find('.drug-type-other').length).toBe(1)
    component.find('.drug-type-other textarea[name="DrugTypeOther"]').simulate('change')
    expect(updates).toBe(1)
  })
})
