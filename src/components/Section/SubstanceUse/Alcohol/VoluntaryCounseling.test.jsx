import React from 'react'
import { mount } from 'enzyme'
import VoluntaryCounseling from './VoluntaryCounseling'

describe('The VoluntaryCounseling component', () => {
  it('Renders without errors', () => {
    const component = mount(<VoluntaryCounseling />)
    expect(component.find('.voluntary-counseling').length).toBe(1)
  })

  it('Renders with action taken marked as yes', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<VoluntaryCounseling {...expected} />)
    expect(component.find('.voluntary-counseling').length).toBe(1)
    component.find('.provider-address input[name="address"]').simulate('change')
    component
      .find('.counseling-dates .datecontrol .year input')
      .first()
      .simulate('change', { target: { value: '2010' } })
    component.find('input[name="TreatmentProviderName"]').simulate('change')
    component
      .find('input[name="domestic_first"]')
      .simulate('change', { target: { value: '111' } })
    component.find('.completed-treatment .yes input').simulate('change')
    expect(updates).toBe(5)
  })

  it('Renders with treatment completed marked as no', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      CompletedTreatment: { value: 'No' }
    }
    const component = mount(<VoluntaryCounseling {...expected} />)
    expect(component.find('.voluntary-counseling').length).toBe(1)
    component
      .find('textarea[name="NoCompletedTreatmentExplanation"]')
      .simulate('change')
    expect(updates).toBe(1)
  })
})
