import React from 'react'
import { mount } from 'enzyme'
import OrderedTreatment from './OrderedTreatment'

describe('The OrderedTreatment component', () => {
  it('Renders without errors', () => {
    const component = mount(<OrderedTreatment />)
    expect(component.find('.drug-ordered-treatment').length).toBe(1)
  })

  it('Performs update of basic fields', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<OrderedTreatment onUpdate={onUpdate} />)
    expect(component.find('.drug-ordered-treatment').length).toBe(1)

    component.find('.ordered-by .employer input').simulate('change')
    component.find('.explanation textarea').simulate('change')
    component.find('.action-taken .yes input').simulate('change')
    expect(updates).toBe(3)
  })

  it('Performs update when action taken is marked yes', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<OrderedTreatment onUpdate={onUpdate} ActionTaken={{ value: 'Yes' }} />)

    component.find('.drug-type-ordered .cocaine input').simulate('change')
    component.find('.treatment-provider input').simulate('change')
    component.find('.treatment-provider-address .city input').simulate('change')
    component.find('.treatment-provider-telephone .telephone .number.three input').at(0).simulate('change')
    component.find('.treatment-dates .from .year input').simulate('change')
    component.find('.treatment-completed .yes input').simulate('change')
    expect(updates).toBe(6)
  })

  it('Performs update when action taken is marked yes and no treatment completed', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<OrderedTreatment onUpdate={onUpdate} ActionTaken={{ value: 'Yes' }} TreatmentCompleted={{ value: 'No' }} />)

    component.find('.no-treatment-explanation textarea').simulate('change')
    expect(updates).toBe(1)
  })

  it('Performs update when action taken is marked no', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<OrderedTreatment onUpdate={onUpdate} ActionTaken={{ value: 'No' }} />)

    component.find('.no-action-taken-explanation textarea').simulate('change')
    expect(updates).toBe(1)
  })

  it('Deselect ordered by', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const orderedBy = ['Employer']
    const component = mount(<OrderedTreatment onUpdate={onUpdate} ActionTaken={{ value: 'No' }} OrderedBy={orderedBy} />)

    component.find('.ordered-by .employer input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Select none', () => {
    let none = []
    const onUpdate = (selected) => {
      none = selected.OrderedBy
    }
    const orderedBy = ['Employer', 'Judge']
    const component = mount(<OrderedTreatment onUpdate={onUpdate} ActionTaken={{ value: 'No' }} OrderedBy={orderedBy} />)
    component.find('.ordered-by .none input').simulate('change')
    expect(none).toEqual({ values: ['None'] })
  })
})
