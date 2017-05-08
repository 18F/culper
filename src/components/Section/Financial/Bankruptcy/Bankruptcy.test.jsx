import React from 'react'
import { mount } from 'enzyme'
import Bankruptcy from './Bankruptcy'

describe('The Bankruptcy component', () => {
  it('Renders without errors', () => {
    const component = mount(<Bankruptcy />)
    expect(component.find('.bankruptcy').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const onUpdate = () => { updates++ }

    const component = mount(<Bankruptcy onUpdate={onUpdate} />)
    expect(component.find('.bankruptcy').length).toBe(1)
    component.find('.petition-type .block input').first().simulate('click')
    component.find('.courtnumber input[name="CourtNumber"]').simulate('change')
    component.find('.datefiled input[name="month"]').simulate('change', { target: { value: '1' } })
    component.find('.datedischarged input[name="month"]').simulate('change', { target: { value: '1' } })
    component.find('input[name="DischargeDateNotApplicable"]').simulate('change')
    component.find('.amount input[name="TotalAmount"]').simulate('change')
    component.find('.namedebt input[name="first"]').simulate('change')
    component.find('.courtinvolved input[name="CourtInvolved"]').simulate('change')
    component.find('input[name="TotalAmountEstimated"]').simulate('change')
    component.find('.address input[name="address"]').simulate('change')
    component.find('.has-discharge-explanation .yes input').simulate('change')
    expect(updates).toBe(11)
  })

  it('Performs update to having discharge explanation', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const dischargeExplanation = 'Yes'
    const component = mount(<Bankruptcy onUpdate={onUpdate} HasDischargeExplanation={dischargeExplanation}/>)
    expect(component.find('.bankruptcy').length).toBe(1)
    component.find('textarea[name="DischargeExplanation"]').simulate('change')
    expect(updates).toBe(1)
  })
})
