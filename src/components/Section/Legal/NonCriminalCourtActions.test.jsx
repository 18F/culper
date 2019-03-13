import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { NonCriminalCourtActions } from './NonCriminalCourtActions'
import { Location } from '../../Form'

describe('The NonCriminalCourtActions component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) => (
      mount(
        <Provider store={store}>
          <NonCriminalCourtActions {...expected} />
        </Provider>
      )
    )
  })

  it('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.non-criminal-court-actions').length).toBe(1)
  })

  it('Updates branch', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates += 1
      },
    }
    const component = createComponent(expected)
    expect(component.find('.non-criminal-court-actions').length).toBe(1)
    component.find('.has-court-actions .no input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Updates item in accordion', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates += 1
      },
      HasCourtActions: { value: 'Yes' },
      List: {
        branch: {
          value: 'No',
        },
        items: [
          {
            Item: {
              CivilActionDate: {
                day: '1',
                month: '1',
                year: '2016',
              },
              CourtName: {
                value: 'The name',
              },
              CourtAddress: {
                country: 'United States',
                street: '1234 Some Rd',
                city: 'Arlington',
                state: 'Virginia',
                zipcode: '22202',
                layout: Location.ADDRESS,
              },
              NatureOfAction: {
                value: 'Nature of action',
              },
              ResultsOfAction: {
                value: 'Results of action',
              },
              PrincipalPartyNames: {
                value: 'John Doe',
              },
            },
          },
        ],
      },
    }
    const component = createComponent(expected)
    component.find('.court-name input').simulate('change')
    expect(updates).toBe(2)
  })
})
