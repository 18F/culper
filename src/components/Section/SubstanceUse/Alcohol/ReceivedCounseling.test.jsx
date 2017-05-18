import React from 'react'
import { mount } from 'enzyme'
import ReceivedCounseling from './ReceivedCounseling'

describe('The ReceivedCounseling component', () => {
  it('Renders without errors', () => {
    const component = mount(<ReceivedCounseling />)
    expect(component.find('.voluntary-counseling').length).toBe(1)
  })

  it('Renders with action taken marked as yes', () => {
    let updates = 0
    const expected = {
      onUpdate: () => { updates++ }
    }
    const component = mount(<ReceivedCounseling {...expected} />)
    expect(component.find('.voluntary-counseling').length).toBe(1)
    //component.find('.counseling-dates .datecontrol .year input').first().simulate('change', { target: { value: '2010' } })
    component.find('input[name="TreatmentProviderName"]').simulate('change')
    component.find('.provider-address input[name="address"]').simulate('change')
    component.find('input[name="AgencyName"]').simulate('change')
    component.find('.agency-address input[name="address"]').simulate('change')
    component.find('.completed-treatment .yes input').simulate('change')
    expect(updates).toBe(5)
  })

  it('Renders with treatment completed marked as no', () => {
    let updates = 0
    const expected = {
      onUpdate: () => { updates++ },
      CompletedTreatment: 'No'
    }
    const component = mount(<ReceivedCounseling {...expected} />)
    expect(component.find('.voluntary-counseling').length).toBe(1)
    component.find('textarea[name="NoCompletedTreatmentExplanation"]').simulate('change')
    expect(updates).toBe(1)
  })
})
