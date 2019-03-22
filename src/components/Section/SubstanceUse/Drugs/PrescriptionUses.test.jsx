import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { PrescriptionUses } from './PrescriptionUses'

describe('The PrescriptionUses component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) => (
      mount(
        <Provider store={store}>
          <PrescriptionUses {...expected} />
        </Provider>
      )
    )
  })

  it('Renders without errors', () => {
    const component = mount(<PrescriptionUses />)
    expect(component.find('.prescription-uses').length).toBe(1)
  })

  it('Performs update', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates += 1
      },
    }
    const component = createComponent(expected)
    expect(component.find('.prescription-uses').length).toBe(1)
    component.find('.misused .yes input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Performs updates to accordion', () => {
    let updates = 0
    const expected = {
      List: {
        items: [
          {
            DrugPrescriptionUse: {
              InvolvementDates: {
                from: {
                  month: '1',
                  day: '1',
                  year: '2010',
                },
                to: {
                  month: '1',
                  day: '1',
                  year: '2012',
                },
              },
              PrescriptionName: {
                value: 'Foo',
              },
              Reason: {
                value: 'The reason',
              },
              UseWhileEmployed: 'Yes',
              UseWithClearance: 'Yes',
            },
          },
        ],
      },
      onUpdate: () => {
        updates += 1
      },
      MisusedDrugs: { value: 'Yes' },
    }
    const component = createComponent(expected)
    expect(component.find('.prescription-uses').length).toBe(1)
    component
      .find('.reason textarea')
      .first()
      .simulate('change')
    expect(updates).toBe(2)
  })
})
