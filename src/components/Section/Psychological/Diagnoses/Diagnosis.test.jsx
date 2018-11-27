import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Diagnosis from './Diagnosis'

describe('The Diagnosis component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <Diagnosis {...expected} />
        </Provider>
      )
  })

  it('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.diagnosis').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    component.find('.diagnosis-condition-psychotic input').simulate('change')
    component
      .find('.datecontrol .year input')
      .first()
      .simulate('change', { target: { value: '2010' } })
    component.find('.person .treatment input[name="Name"]').simulate('change')
    component.find('.facility .treatment input[name="Name"]').simulate('change')
    component.find('.effective .yes input').simulate('change')
    expect(updates).toBe(5)
  })

  it('Performs updates and shows explanation', () => {
    let updates = 0
    const props = {
      Effective: {
        value: 'No'
      },
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(props)
    component.find('textarea').simulate('change')
    expect(updates).toBe(1)
  })
})
