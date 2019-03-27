import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { DrugUses } from './DrugUses'

describe('The DrugUses component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) => (
      mount(
        <Provider store={store}>
          <DrugUses {...expected} />
        </Provider>
      )
    )
  })

  it('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.drug-uses').length).toBe(1)
  })

  it('Performs update', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates += 1
      },
    }
    const component = createComponent(expected)
    expect(component.find('.drug-uses').length).toBe(1)
    component.find('.used-drugs .yes input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Performs updates to accordion', () => {
    let updates = 0
    const expected = {
      List: {
        items: [
          {
            DrugUse: {
              DrugType: {
                DrugType: 'Cocaine',
                DrugTypeOther: null,
              },
              FirstUse: {
                day: '1',
                month: '1',
                year: '2016',
              },
              RecentUse: {
                day: '1',
                month: '1',
                year: '2016',
              },
              NatureOfUse: {
                value: 'Some use',
              },
              UseWhileEmployed: 'Yes',
              UseWithClearance: 'Yes',
              UseInFuture: 'No',
              Explanation: {
                value: 'Foo',
              },
            },
          },
          {
            DrugUse: {
              DrugType: {
                DrugType: 'Other',
                DrugTypeOther: 'Zombie',
              },
              NatureOfUse: {
                value: 'Some use',
              },
              UseWhileEmployed: 'Yes',
              UseWithClearance: 'Yes',
              UseInFuture: 'No',
              Explanation: {
                value: 'Foo',
              },
            },
          },
          {
            DrugUse: {},
          },
        ],
      },
      UsedDrugs: { value: 'Yes' },
      onUpdate: () => {
        updates += 1
      },
    }
    const component = createComponent(expected)
    expect(component.find('.drug-uses').length).toBe(1)
    component
      .find('.explanation textarea')
      .first()
      .simulate('change')
    expect(updates).toBe(2)
  })
})
