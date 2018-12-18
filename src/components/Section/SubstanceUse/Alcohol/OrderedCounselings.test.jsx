import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import OrderedCounselings from './OrderedCounselings'
import { Location } from '../../../Form'

describe('The OrderedCounselings component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <OrderedCounselings {...expected} />
        </Provider>
      )
  })

  it('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.ordered-counselings').length).toBe(1)
  })

  it('Updates branch', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    expect(component.find('.ordered-counselings').length).toBe(1)
    component.find('.has-been-ordered .no input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Updates item in accordion', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      HasBeenOrdered: { value: 'Yes' },
      List: {
        branch: {
          value: 'No'
        },
        items: [
          {
            Item: {
              ActionTaken: { value: 'Yes' },
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
    component.find('.seekers .seekers-employer input').simulate('change')
    expect(updates).toBe(2)
  })

  it('Summary accordion text for seeker options', () => {
    const expected = {
      HasBeenOrdered: { value: 'Yes' },
      List: {
        branch: {
          value: 'No'
        },
        items: [
          {
            Item: {
              Seekers: {
                values: [
                  'Employer',
                  'MedicalProfessional',
                  'MentalHealthProfessional',
                  'CourtOfficial',
                  'NotOrdered',
                  'Other'
                ]
              }
            }
          }
        ]
      }
    }
    const component = createComponent(expected)
    const text = component.find('.item').text()
    let options = [
      'Employer',
      'Medical professional',
      'Court official',
      'Not ordered',
      'Other'
    ]
    options.forEach(o => {
      expect(text.indexOf(o)).toBeGreaterThan(-1)
    })
  })
})
