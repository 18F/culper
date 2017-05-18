import React from 'react'
import { mount } from 'enzyme'
import Travel from './Travel'

describe('The foreign travel component', () => {
  it('display nothing when "no" is clicked', () => {
    const expected = {
      name: 'foreign-travel',
      HasForeignTravelOutside: 'No'
    }
    const component = mount(<Travel {...expected} />)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('display content when "yes" is clicked', () => {
    const expected = {
      name: 'foreign-travel',
      HasForeignTravelOutside: 'Yes',
      HasForeignTravelOfficial: 'No'
    }
    const component = mount(<Travel {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('handle validations', () => {
    let validated = false
    const expected = {
      name: 'foreign-travel',
      HasForeignTravelOutside: 'Yes',
      onValidate: () => { validated = true }
    }
    const component = mount(<Travel {...expected} />)
    component.find('.branch .yes input').at(1).simulate('change')
    component.find('.branch .yes input').at(1).simulate('blur')
    expect(validated).toBe(true)
  })

  it('trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'foreign-travel',
      HasForeignTravelOutside: 'Yes',
      HasForeignTravelOfficial: 'No',
      List: [
        {
          Item: {
            Dates: {},
            Country: {},
            Days: [],
            Purpose: [],
            Questioned: 'Yes',
            QuestionedExplanation: {},
            Encounter: 'Yes',
            EncounterExplanation: {},
            Contacted: 'Yes',
            ContactedExplanation: {},
            Counter: 'Yes',
            CounterExplanation: {},
            Interest: 'Yes',
            InterestExplanation: {},
            Sensitive: 'Yes',
            SensitiveExplanation: {},
            Threatened: 'Yes',
            ThreatenedExplanation: {}
          }
        }
      ],
      ListBranch: '',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Travel {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
    component.find('.foreign-travel-country input').simulate('change')
    component.find('.foreign-travel-dates .to .day input').simulate('change')
    component.find('.foreign-travel-days .days-1-5 input').simulate('change')
    component.find('.foreign-travel-purpose .purpose-business input').simulate('change')
    component.find('.foreign-travel-questioned .yes input').simulate('change')
    component.find('.foreign-travel-questioned-explanation textarea').simulate('change')
    component.find('.foreign-travel-encounter .yes input').simulate('change')
    component.find('.foreign-travel-encounter-explanation textarea').simulate('change')
    component.find('.foreign-travel-contacted .yes input').simulate('change')
    component.find('.foreign-travel-contacted-explanation textarea').simulate('change')
    component.find('.foreign-travel-counter .yes input').simulate('change')
    component.find('.foreign-travel-counter-explanation textarea').simulate('change')
    component.find('.foreign-travel-interest .yes input').simulate('change')
    component.find('.foreign-travel-interest-explanation textarea').simulate('change')
    component.find('.foreign-travel-sensitive .yes input').simulate('change')
    component.find('.foreign-travel-sensitive-explanation textarea').simulate('change')
    component.find('.foreign-travel-threatened .yes input').simulate('change')
    component.find('.foreign-travel-threatened-explanation textarea').simulate('change')
    expect(updates).toBe(18)
  })
})
