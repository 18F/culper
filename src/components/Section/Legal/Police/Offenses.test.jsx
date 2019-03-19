import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Offenses } from './Offenses'
import Location from '../../../Form/Location'

describe('The Offenses record component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) => (
      mount(
        <Provider store={store}>
          <Offenses {...expected} />
        </Provider>
      )
    )
  })

  it('no error on empty', () => {
    const expected = {
      name: 'police-record',
    }
    const component = createComponent(expected)
    expect(component.find('.has-offenses').length).toEqual(1)
    expect(component.find('.accordion').length).toEqual(0)
  })

  it('Performs updates', () => {
    let updates = 0
    const expected = {
      name: 'police-record',
      onUpdate: () => {
        updates += 1
      },
    }
    const component = createComponent(expected)
    expect(component.find('.has-offenses').length).toEqual(1)
    component.find('.has-offenses .yes input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Performs updates to clear array', () => {
    let updates = 0
    const expected = {
      name: 'police-record',
      HasOffenses: { value: 'Yes' },
      onUpdate: () => {
        updates += 1
      },
      List: {
        items: [
          {
            Item: {
              Date: {
                day: '1',
                month: '1',
                year: '2016',
              },
              Description: {
                value: 'Description of the offense',
              },
              InvolvedViolence: { value: 'No' },
              InvolvedFirearms: { value: 'No' },
              InvolvedSubstances: { value: 'No' },
              Address: {
                country: 'United States',
                street: '1234 Some Rd',
                city: 'Arlington',
                state: 'Virginia',
                zipcode: '22202',
                layout: Location.ADDRESS,
              },
              WasCited: { value: 'No' },
            },
          },
        ],
      },
    }
    const component = createComponent(expected)
    component.find('.has-offenses .no input').simulate('change')
    expect(updates).toBe(2)
  })

  it('selecting all "no" nothing happens', () => {
    const expected = {
      name: 'police-record',
      HasOffenses: { value: 'Yes' },
      List: {
        items: [
          {
            Item: {
              Date: {
                day: '1',
                month: '1',
                year: '2016',
              },
              Description: {
                value: 'Description of the offense',
              },
              InvolvedViolence: { value: 'No' },
              InvolvedFirearms: { value: 'No' },
              InvolvedSubstances: { value: 'No' },
              Address: {
                country: 'United States',
                street: '1234 Some Rd',
                city: 'Arlington',
                state: 'Virginia',
                zipcode: '22202',
                layout: Location.ADDRESS,
              },
              WasCited: { value: 'No' },
            },
          },
        ],
      },
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toEqual(1)
  })

  it('renders with valid offense', () => {
    const expected = {
      name: 'police-record',
      HasOffenses: { value: 'No' },
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(0)
  })
})
