import React from 'react'
import { mount } from 'enzyme'
import ExistingConditions from './ExistingConditions'

describe('The ExistingConditions component', () => {
  it('Renders without errors', () => {
    const component = mount(<ExistingConditions />)
    expect(component.find('.existingconditions').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const props = {
      HasCondition: { value: 'Yes' },
      ReceivedTreatment: { value: 'No' },
      DidNotFollow: { value: 'Yes' },
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<ExistingConditions {...props} />)
    component.find('.hascondition .yes input').simulate('change')
    component.find('.didnotfollow .yes input').simulate('change')
    component
      .find('.existing-condition-didnotfollow-explanation textarea')
      .simulate('change')
    component.find('.treatment-list .no input').simulate('change')
    component
      .find('.existing-condition-explanation textarea')
      .simulate('change')
    component.find('.treatment.yes input').simulate('change')
    expect(updates).toBe(6)
  })

  it('updates with recv treatments', () => {
    let updates = 0
    const props = {
      HasCondition: { value: 'Yes' },
      ReceivedTreatment: { value: 'Yes' },
      TreatmentList: [{}],
      DidNotFollow: { value: 'Yes' },
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<ExistingConditions {...props} />)
    component.find('.hascondition .yes input').simulate('change')
    component.find('.didnotfollow .yes input').simulate('change')
    component
      .find('.existing-condition-didnotfollow-explanation textarea')
      .simulate('change')
    component.find('.treatment-list .no input').simulate('change')
    component.find('.treatment.yes input').simulate('change')
    expect(updates).toBe(6)
  })

  it('Selects no to everything', () => {
    const props = {
      HasCondition: { value: 'No' },
      ReceivedTreatment: { value: 'No' },
      DidNotFollow: { value: 'No' }
    }
    const component = mount(<ExistingConditions {...props} />)
    expect(
      component.find('.existing-condition-explanation textarea').length
    ).toBe(0)
    expect(component.find('.accordion').length).toBe(0)
    expect(
      component.find('.existing-condition-didnotfollow-explanation textarea')
        .length
    ).toBe(0)
  })

  it('Does not ask to identify existing conditions', () => {
    const props = {
      HasCondition: { value: 'Yes' },
      ReceivedTreatment: { value: 'Yes' },
      DidNotFollow: { value: 'No' },
      prefix: { value: 'existingConditions.diagnosis' }
    }
    const component = mount(<ExistingConditions {...props} />)
    expect(component.find('.diagnosis-condition').length).toBe(0)
  })
})
