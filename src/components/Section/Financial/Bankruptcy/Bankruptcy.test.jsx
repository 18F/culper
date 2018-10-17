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
    const onUpdate = () => {
      updates++
    }

    const component = mount(<Bankruptcy onUpdate={onUpdate} />)
    expect(component.find('.bankruptcy').length).toBe(1)
    component
      .find('.petition-chapters .block input')
      .first()
      .simulate('change')
    component.find('.courtnumber input[name="CourtNumber"]').simulate('change')
    component
      .find('.datefiled input[name="month"]')
      .simulate('change', { target: { value: '1' } })
    component
      .find('.datedischarged input[name="month"]')
      .simulate('change', { target: { value: '1' } })
    component
      .find('input[name="DischargeDateNotApplicable"]')
      .simulate('change')
    component.find('.amount input[name="TotalAmount"]').simulate('change')
    component.find('.namedebt input[name="first"]').simulate('change')
    component
      .find('.courtinvolved input[name="CourtInvolved"]')
      .simulate('change')
    component.find('input[name="TotalAmountEstimated"]').simulate('change')
    component.find('.address input[name="street"]').simulate('change')
    component.find('.has-discharge-explanation .yes input').simulate('change')
    expect(updates).toBe(11)
  })

  it('Performs update to having discharge explanation', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const dischargeExplanation = { value: 'Yes' }
    const component = mount(
      <Bankruptcy
        onUpdate={onUpdate}
        HasDischargeExplanation={dischargeExplanation}
      />
    )
    expect(component.find('.bankruptcy').length).toBe(1)
    component.find('textarea[name="DischargeExplanation"]').simulate('change')
    expect(updates).toBe(1)
  })

  it('Performs update with chapter 13 selected', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const petitionType = { value: 'Chapter13' }
    const component = mount(
      <Bankruptcy onUpdate={onUpdate} PetitionType={petitionType} />
    )
    component.find('input[name="chapter13Trustee"]').simulate('change')
    component.find('.trustee-address input[name="street"]').simulate('change')
    expect(updates).toBe(2)
  })
})
