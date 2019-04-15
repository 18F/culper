import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import DrugInvolvement from './DrugInvolvement'

describe('The DrugInvolvement component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) => mount(
      <Provider store={store}>
        <DrugInvolvement {...expected} />
      </Provider>
    )
  })

  it('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.drug-involvement').length).toBe(1)
  })

  it('Performs update', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates += 1
      },
      requireDrugWhileSafety: true,
      requireDrugWithClearance: true,
      requireDrugInFuture: true,
    }
    const component = createComponent(expected)
    expect(component.find('.drug-involvement').length).toBe(1)
    component.find('.drug-type-involvement .cocaine input').simulate('change')
    component.find('.first-involvement .year input').simulate('change')
    component.find('.recent-involvement .year input').simulate('change')
    component.find('.nature-of-involvement textarea').simulate('change')
    component.find('.reasons textarea').simulate('change')
    component.find('.involvement-while-employed .yes input').simulate('change')
    component.find('.involvement-with-clearance .yes input').simulate('change')
    component.find('.involvement-in-future .yes input').simulate('change')
    expect(updates).toBe(8)
  })

  it('Performs update', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates += 1
      },
      InvolvementInFuture: { value: 'Yes' },
      requireDrugWhileSafety: true,
      requireDrugWithClearance: true,
      requireDrugInFuture: true,
    }
    const component = createComponent(expected)
    expect(component.find('.drug-involvement').length).toBe(1)
    component.find('.explanation textarea').simulate('change')
    expect(updates).toBe(1)
  })
})
