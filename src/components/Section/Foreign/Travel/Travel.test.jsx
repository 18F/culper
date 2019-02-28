import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { Travel } from './Travel'

describe('The foreign travel component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <Travel {...expected} />
        </Provider>
      )
  })

  it('display nothing when "no" is clicked', () => {
    const expected = {
      name: 'foreign-travel',
      HasForeignTravelOutside: { value: 'No' },
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('display content when "yes" is clicked', () => {
    const expected = {
      name: 'foreign-travel',
      HasForeignTravelOutside: { value: 'Yes' },
      HasForeignTravelOfficial: { value: 'No' },
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('handle validations', () => {
    let validated = false
    const expected = {
      name: 'foreign-travel',
      HasForeignTravelOutside: { value: 'Yes' },
      onError: (value, arr) => {
        validated = true
        return arr
      },
    }
    const component = createComponent(expected)
    component
      .find('.branch .yes input')
      .at(1)
      .simulate('change')
    component
      .find('.branch .yes input')
      .at(1)
      .simulate('blur')
    expect(validated).toBe(true)
  })

  it('trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'foreign-travel',
      HasForeignTravelOutside: { value: 'Yes' },
      HasForeignTravelOfficial: { value: 'No' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Dates: {},
              Country: {},
              Days: { values: [] },
              Purpose: { values: [] },
              Questioned: { value: 'Yes' },
              QuestionedExplanation: {},
              Encounter: { value: 'Yes' },
              EncounterExplanation: {},
              Contacted: { value: 'Yes' },
              ContactedExplanation: {},
              Counter: { value: 'Yes' },
              CounterExplanation: {},
              Interest: { value: 'Yes' },
              InterestExplanation: {},
              Sensitive: { value: 'Yes' },
              SensitiveExplanation: {},
              Threatened: { value: 'Yes' },
              ThreatenedExplanation: {},
            },
          },
        ],
      },
      onUpdate: () => {
        updates += 1
      },
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(1)
    component.find('.foreign-travel-country input').simulate('change')
    component.find('.foreign-travel-dates .to .day input').simulate('change')
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

  it('deselect values', () => {
    let updates = 0
    const expected = {
      name: 'foreign-travel',
      HasForeignTravelOutside: { value: 'Yes' },
      HasForeignTravelOfficial: { value: 'No' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Dates: {},
              Days: { values: ['1-5'] },
            },
          },
        ],
      },
      onUpdate: () => {
        updates += 1
      },
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(1)
    component.find('.foreign-travel-days .days-1-5 input').simulate('change')
    expect(updates).toBe(2)
  })
})
