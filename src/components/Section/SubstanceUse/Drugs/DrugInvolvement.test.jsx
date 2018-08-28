import React from 'react'
import { mount } from 'enzyme'
import DrugInvolvement from './DrugInvolvement'

describe('The DrugInvolvement component', () => {
  it('Renders without errors', () => {
    const component = mount(<DrugInvolvement />)
    expect(component.find('.drug-involvement').length).toBe(1)
  })

  it('Performs update', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<DrugInvolvement onUpdate={onUpdate} />)
    expect(component.find('.drug-involvement').length).toBe(1)
    component.find('.drug-type-involvement .cocaine input').simulate('change')
    component.find('.first-involvement .year input').simulate('change')
    component.find('.recent-involvement .year input').simulate('change')
    component.find('.nature-of-involvement textarea').simulate('change')
    component.find('.reasons textarea').simulate('change')
    component.find('.involvement-while-employed .yes input').simulate('change')
    component.find('.involvement-with-clearance .yes input').simulate('change')
    component.find('.involvement-in-future .yes input').simulate('change')
    expect(updates).toBe(8)
  })

  it('Performs update', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(
      <DrugInvolvement
        onUpdate={onUpdate}
        InvolvementInFuture={{ value: 'Yes' }}
      />
    )
    expect(component.find('.drug-involvement').length).toBe(1)
    component.find('.explanation textarea').simulate('change')
    expect(updates).toBe(1)
  })
})
