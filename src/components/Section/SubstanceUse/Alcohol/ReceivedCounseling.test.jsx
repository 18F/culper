import React from 'react'
import { mount } from 'enzyme'
import ReceivedCounseling from './ReceivedCounseling'

describe('The ReceivedCounseling component', () => {
  it('Renders without errors', () => {
    const component = mount(<ReceivedCounseling />)
    expect(component.find('.voluntary-counseling').length).toBe(0)
  })

  it('Renders with action taken marked as yes', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      UseSameAddress: { value: 'No' }
    }
    const component = mount(<ReceivedCounseling {...expected} />)
    component
      .find('.treatment-began-date .datecontrol .year input')
      .first()
      .simulate('change', { target: { value: '2010' } })
    component
      .find('.treatment-end-date .datecontrol .year input')
      .first()
      .simulate('change', { target: { value: '2010' } })
    component
      .find('input[name="PresentTreatmentEndDate"]')
      .simulate('change', { target: { checked: true } })
    component.find('input[name="TreatmentProviderName"]').simulate('change')
    component.find('.provider-address input[name="street"]').simulate('change')
    component.find('input[name="AgencyName"]').simulate('change')
    component.find('.agency-address input[name="street"]').simulate('change')
    component.find('.completed-treatment .yes input').simulate('change')
    expect(updates).toBe(9)
  })

  it('Renders with treatment completed marked as no', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      CompletedTreatment: { value: 'No' }
    }
    const component = mount(<ReceivedCounseling {...expected} />)
    component
      .find('textarea[name="NoCompletedTreatmentExplanation"]')
      .simulate('change')
    component.find('.use-same-address .yes input').simulate('change')
    expect(updates).toBe(2)
  })

  it('present returns todays date', () => {
    let checked = false
    const props = {
      PresentTreatmentEndDate: false,
      onUpdate: values => {
        checked = true
      }
    }

    const component = mount(<ReceivedCounseling {...props} />)
    component.find('.present-treatment-end-date input').simulate('change')
    expect(checked).toBe(true)
  })

  it('present can be unchecked', () => {
    let checked = true
    const props = {
      PresentTreatmentEndDate: true,
      onUpdate: values => {
        checked = false
      }
    }

    const component = mount(<ReceivedCounseling {...props} />)
    component.find('.present-treatment-end-date input').simulate('change')
    expect(checked).toBe(false)
  })
})
