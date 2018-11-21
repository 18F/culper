import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import DrugClearanceUse from './DrugClearanceUse'

describe('The DrugClearanceUse component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <DrugClearanceUse {...expected} />
        </Provider>
      )
  })

  it('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.drug-clearance-use').length).toBe(1)
  })

  it('Performs update', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    expect(component.find('.drug-clearance-use').length).toBe(1)
    component.find('.involvement-dates .from .year input').simulate('change')
    component.find('.description textarea').simulate('change')
    component.find('.estimated-use input').simulate('change')
    expect(updates).toBe(3)
  })
})
