import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Hospitalization from './Hospitalization'

describe('The Hospitalization component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <Hospitalization {...expected} />
        </Provider>
      )
  })

  it('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.hospitalization').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    expect(component.find('.hospitalization').length).toBe(1)
    expect(component.find('input[name="Explanation"]').length).toBe(0)
    component
      .find('.datecontrol .year input')
      .first()
      .simulate('change', { target: { value: '2010' } })
    component.find('input[name="Facility"]').simulate('change')
    component.find('input[name="street"]').simulate('change')
    component.find({ type: 'radio', value: 'Voluntary' }).simulate('change')
    expect(updates).toBe(4)
  })

  it('Performs updates with explanation', () => {
    let updates = 0
    const admission = { value: 'Voluntary' }
    const expected = {
      onUpdate: () => {
        updates++
      },
      Admission: { value: 'Voluntary' }
    }
    const component = createComponent(expected)
    expect(component.find('.hospitalization').length).toBe(1)
    expect(component.find('textarea[name="Explanation"]').length).toBe(1)
    component.find('textarea').simulate('change')
    expect(updates).toBe(1)
  })

  it('Loads data', () => {
    let updates = 0
    const expected = {
      Facility: {
        value: 'Place 1'
      },
      FacilityAddress: {
        country: 'United States',
        street: '1234 Some Rd',
        city: 'Arlington',
        state: 'Virginia',
        zipcode: '22202'
      },
      TreatmentDate: {
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
      Admission: 'Voluntary',
      Explanation: {
        value: 'Because I can'
      },
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    expect(component.find('.hospitalization').length).toBe(1)
    component.find('textarea').simulate('change')
    expect(updates).toBe(1)
  })
})
