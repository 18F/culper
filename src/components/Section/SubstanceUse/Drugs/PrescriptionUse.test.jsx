import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import PrescriptionUse from './PrescriptionUse'

describe('The PrescriptionUse component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) => mount(
      <Provider store={store}>
        <PrescriptionUse {...expected} />
      </Provider>
    )
  })

  it('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.prescription-use').length).toBe(1)
  })

  it('Performs update', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates += 1
      },
      requireDrugWhileSafety: true,
      requireDrugWithClearance: true,
    }
    const component = createComponent(expected)
    expect(component.find('.prescription-use').length).toBe(1)
    component.find('.involvement-dates .from .year input').simulate('change')
    component.find('.prescription-name input').simulate('change')
    component.find('.reason textarea').simulate('change')
    component.find('.use-while-employed .yes input').simulate('change')
    component.find('.use-with-clearance .yes input').simulate('change')
    expect(updates).toBe(5)
  })
})
