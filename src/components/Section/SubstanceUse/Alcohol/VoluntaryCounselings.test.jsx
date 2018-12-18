import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import VoluntaryCounselings from './VoluntaryCounselings'
import { Location } from '../../../Form'

describe('The VoluntaryCounselings component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <VoluntaryCounselings {...expected} />
        </Provider>
      )
  })

  it('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.voluntary-counselings').length).toBe(1)
  })

  it('Updates branch', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    expect(component.find('.voluntary-counselings').length).toBe(1)
    component.find('.sought-treatment .no input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Updates item in accordion', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      SoughtTreatment: { value: 'Yes' },
      List: {
        branch: {
          value: 'No'
        },
        items: [
          {
            Item: {
              CounselingDates: {
                from: {
                  month: '1',
                  day: '1',
                  year: '2010'
                },
                to: {
                  month: '1',
                  day: '1',
                  year: '2012'
                },
                present: false
              },
              TreatmentProviderName: {
                value: 'The name'
              },
              TreatmentProviderAddress: {
                country: 'United States',
                street: '1234 Some Rd',
                city: 'Arlington',
                state: 'Virginia',
                zipcode: '22202',
                layout: Location.ADDRESS
              },
              TreatmentProviderTelephone: {
                noNumber: '',
                number: '7031112222',
                numberType: 'Home',
                timeOfDay: 'Both',
                extension: ''
              },
              CompletedTreatment: { value: 'Yes' }
            }
          }
        ]
      }
    }
    const component = createComponent(expected)
    component.find('input[name="TreatmentProviderName"]').simulate('change')
    expect(updates).toBe(2)
  })
})
