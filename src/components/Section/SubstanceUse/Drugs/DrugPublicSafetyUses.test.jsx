import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { DrugPublicSafetyUses } from './DrugPublicSafetyUses'

describe('The DrugPublicSafetyUses component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) => (
      mount(
        <Provider store={store}>
          <DrugPublicSafetyUses {...expected} />
        </Provider>
      )
    )
  })

  it('Renders without errors', () => {
    const component = mount(<DrugPublicSafetyUses />)
    expect(component.find('.drug-public-safety-uses').length).toBe(1)
  })

  it('Performs update', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates += 1
      },
    }
    const component = createComponent(expected)
    expect(component.find('.drug-public-safety-uses').length).toBe(1)
    component.find('.used-drugs .yes input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Performs updates to accordion', () => {
    let updates = 0
    const expected = {
      List: {
        items: [
          {
            DrugPublicSafetyUse: {
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
              Description: {
                value: 'Foo',
              },
              EstimatedUse: {
                value: 'Foo',
              },
            },
          },
        ],
      },
      onUpdate: () => {
        updates += 1
      },
      UsedDrugs: { value: 'Yes' },
    }
    const component = createComponent(expected)
    expect(component.find('.drug-public-safety-uses').length).toBe(1)
    component
      .find('.description textarea')
      .first()
      .simulate('change')
    expect(updates).toBe(2)
  })
})
