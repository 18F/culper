import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import ActivitiesToOverthrowItem from './ActivitiesToOverthrowItem'

describe('The legal associations engaged in terrorism item component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <ActivitiesToOverthrowItem {...expected} />
        </Provider>
      )
  })

  it('can select "yes"', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    component
      .find('.legal-associations-activities-reasons textarea')
      .simulate('change')
    component
      .find('.legal-associations-activities-dates .from .year input')
      .simulate('change')
    expect(updates).toBe(2)
  })
})
