import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import VoluntaryCounseling from './VoluntaryCounseling'

describe('The VoluntaryCounseling component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <VoluntaryCounseling {...expected} />
        </Provider>
      )
  })

  it('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.voluntary-counseling').length).toBe(1)
  })

  it('Renders with action taken marked as yes', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    expect(component.find('.voluntary-counseling').length).toBe(1)
    component.find('.provider-address input[name="street"]').simulate('change')
    component
      .find('.counseling-dates .datecontrol .year input')
      .first()
      .simulate('change', { target: { value: '2010' } })
    component.find('input[name="TreatmentProviderName"]').simulate('change')
    component
      .find('input[name="domestic_first"]')
      .simulate('change', { target: { value: '111' } })
    component.find('.completed-treatment .yes input').simulate('change')
    expect(updates).toBe(5)
  })

  it('Renders with treatment completed marked as no', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      CompletedTreatment: { value: 'No' }
    }
    const component = createComponent(expected)
    expect(component.find('.voluntary-counseling').length).toBe(1)
    component
      .find('textarea[name="NoCompletedTreatmentExplanation"]')
      .simulate('change')
    expect(updates).toBe(1)
  })
})
