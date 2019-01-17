import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import DrugUse from './DrugUse'

describe('The DrugUse component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore({
      authentication: {
        formType: '86'
      }
    })
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <DrugUse {...expected} />
        </Provider>
      )
  })

  it('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.drug-use').length).toBe(1)
  })

  it('Performs update', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      formType: '86'
    }
    const component = createComponent(expected)
    expect(component.find('.drug-use').length).toBe(1)
    component.find('.drug-type-use .cocaine input').simulate('change')
    component.find('.first-use .year input').simulate('change')
    component.find('.recent-use .year input').simulate('change')
    component.find('.nature-of-use textarea').simulate('change')
    component.find('.use-while-employed .yes input').simulate('change')
    component.find('.use-with-clearance .yes input').simulate('change')
    component.find('.use-in-future .yes input').simulate('change')
    component.find('.explanation textarea').simulate('change')
    expect(updates).toBe(8)
  })
})
