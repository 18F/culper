import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import DrugInvolvements from './DrugInvolvements'

describe('The DrugInvolvements component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <DrugInvolvements {...expected} />
        </Provider>
      )
  })

  it('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.drug-involvements').length).toBe(1)
  })

  it('Performs update', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    expect(component.find('.drug-involvements').length).toBe(1)
    component.find('.involved .yes input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Performs updates to accordion', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      Involved: { value: 'Yes' },
      List: {
        items: [
          {
            DrugInvolvement: {
              DrugType: {
                DrugType: 'Cocaine',
                DrugTypeOther: null
              },
              FirstInvolvement: {
                day: '1',
                month: '1',
                year: '2016'
              },
              RecentInvolvement: {
                day: '1',
                month: '1',
                year: '2016'
              },
              NatureOfInvolvement: {
                value: 'Some involvement'
              },
              Reasons: {
                value: 'Some reason'
              },
              InvolvementWhileEmployed: { value: 'Yes' },
              InvolvementWithClearance: { value: 'Yes' },
              InvolvementInFuture: { value: 'No' }
            }
          },
          {
            DrugInvolvement: {
              DrugType: {
                DrugType: 'Cocaine',
                DrugTypeOther: null
              },
              FirstInvolvement: {
                day: '1',
                month: '1',
                year: '2016'
              },
              NatureOfInvolvement: {
                value: 'Some involvement'
              },
              Reasons: {
                value: 'Some reason'
              },
              InvolvementWhileEmployed: { value: 'Yes' },
              InvolvementWithClearance: { value: 'Yes' },
              InvolvementInFuture: { value: 'No' }
            }
          }
        ]
      }
    }
    const component = createComponent(expected)
    expect(component.find('.drug-involvements').length).toBe(1)
    component
      .find('.reasons textarea')
      .first()
      .simulate('change')
    expect(updates).toBe(2)
  })
})
