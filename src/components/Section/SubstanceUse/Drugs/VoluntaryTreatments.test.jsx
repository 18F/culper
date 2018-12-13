import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import VoluntaryTreatments from './VoluntaryTreatments'

describe('The VoluntaryTreatments component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <VoluntaryTreatments {...expected} />
        </Provider>
      )
  })

  it('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.voluntary-treatments').length).toBe(1)
  })

  it('Performs update', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    expect(component.find('.voluntary-treatments').length).toBe(1)
    component.find('.treatment-voluntary .yes input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Performs updates to accordion', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const expected = {
      List: {
        items: [
          {
            VoluntaryTreatment: {
              TreatmentProvider: {
                value: 'Provider'
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
              TreatmentDates: {
                from: {
                  month: '1',
                  day: '1',
                  year: '2010'
                },
                to: {
                  month: '1',
                  day: '1',
                  year: '2012'
                }
              },
              TreatmentCompleted: 'Yes'
            }
          }
        ]
      },
      onUpdate: () => {
        updates++
      },
      TreatmentVoluntary: { value: 'Yes' }
    }
    const component = createComponent(expected)
    expect(component.find('.voluntary-treatments').length).toBe(1)
    component.find('.treatment-provider input').simulate('change')
    expect(updates).toBe(2)
  })
})
