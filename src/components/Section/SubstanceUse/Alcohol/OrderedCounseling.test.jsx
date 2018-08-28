import React from 'react'
import { mount } from 'enzyme'
import OrderedCounseling from './OrderedCounseling'

describe('The OrderedCounseling component', () => {
  it('Renders without errors', () => {
    const component = mount(<OrderedCounseling />)
    expect(component.find('.ordered-counseling').length).toBe(1)
  })

  it('Renders empty and starts populating', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<OrderedCounseling onUpdate={onUpdate} />)
    expect(component.find('.ordered-counseling').length).toBe(1)
    component.find('.seekers .seekers-employer input').simulate('change')
    component.find('.action-taken .yes input').simulate('change')
    expect(updates).toBe(2)
  })

  it('Renders with action taken marked as yes', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      ActionTaken: { value: 'Yes' }
    }
    const component = mount(<OrderedCounseling {...expected} />)
    expect(component.find('.ordered-counseling').length).toBe(1)
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

  it('Renders with action taken marked as yes and treatment completed marked as no', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      ActionTaken: { value: 'Yes' },
      CompletedTreatment: { value: 'No' }
    }
    const component = mount(<OrderedCounseling {...expected} />)
    expect(component.find('.ordered-counseling').length).toBe(1)
    component
      .find('textarea[name="NoCompletedTreatmentExplanation"]')
      .simulate('change')
    expect(updates).toBe(1)
  })

  it('Renders with action taken marked as no', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      ActionTaken: { value: 'No' },
      Seekers: { values: ['Employer'] }
    }
    const component = mount(<OrderedCounseling {...expected} />)
    expect(component.find('.ordered-counseling').length).toBe(1)
    component.find('.seekers .seekers-employer input').simulate('change')
    component
      .find('textarea[name="NoActionTakenExplanation"]')
      .simulate('change')
    expect(updates).toBe(2)
  })

  it('Renders with other seeker checked and updates other seeker explanation', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      ActionTaken: { value: 'No' },
      Seekers: { values: ['Other'] }
    }
    const component = mount(<OrderedCounseling {...expected} />)
    expect(component.find('.ordered-counseling').length).toBe(1)
    component.find('input[name="OtherSeeker"]').simulate('change')
    expect(updates).toBe(1)
  })
})
