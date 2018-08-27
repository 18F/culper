import React from 'react'
import { mount } from 'enzyme'
import TravelQuestions from './TravelQuestions'

describe('The travel questions component', () => {
  it('can trigger updates', () => {
    let updates = 0
    const expected = {
      Questioned: { value: 'Yes' },
      Encounter: { value: 'Yes' },
      Contacted: { value: 'Yes' },
      Counter: { value: 'Yes' },
      Interest: { value: 'Yes' },
      Sensitive: { value: 'Yes' },
      Threatened: { value: 'Yes' },
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<TravelQuestions {...expected} />)
    component
      .find('.foreign-travel-country input')
      .simulate('change', {
        target: { name: 'country', value: 'United States' }
      })
    component.find('.foreign-travel-dates .from .day input').simulate('change')
    component.find('.foreign-travel-days .days-1-5 input').simulate('change')
    component
      .find('.foreign-travel-purpose .purpose-business input')
      .simulate('change')
    component.find('.foreign-travel-questioned .yes input').simulate('change')
    component
      .find('.foreign-travel-questioned-explanation textarea')
      .simulate('change')
    component.find('.foreign-travel-encounter .yes input').simulate('change')
    component
      .find('.foreign-travel-encounter-explanation textarea')
      .simulate('change')
    component.find('.foreign-travel-contacted .yes input').simulate('change')
    component
      .find('.foreign-travel-contacted-explanation textarea')
      .simulate('change')
    component.find('.foreign-travel-counter .yes input').simulate('change')
    component
      .find('.foreign-travel-counter-explanation textarea')
      .simulate('change')
    component.find('.foreign-travel-interest .yes input').simulate('change')
    component
      .find('.foreign-travel-interest-explanation textarea')
      .simulate('change')
    component.find('.foreign-travel-sensitive .yes input').simulate('change')
    component
      .find('.foreign-travel-sensitive-explanation textarea')
      .simulate('change')
    component.find('.foreign-travel-threatened .yes input').simulate('change')
    component
      .find('.foreign-travel-threatened-explanation textarea')
      .simulate('change')
    expect(updates).toBe(18)
  })
})
