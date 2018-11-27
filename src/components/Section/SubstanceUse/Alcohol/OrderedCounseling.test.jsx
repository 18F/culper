import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import OrderedCounseling from './OrderedCounseling'

describe('The OrderedCounseling component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <OrderedCounseling {...expected} />
        </Provider>
      )
  })

  it('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.ordered-counseling').length).toBe(1)
  })

  it('Renders empty and starts populating', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    expect(component.find('.ordered-counseling').length).toBe(1)
    component.find('.seekers .seekers-employer input').simulate('change')
    component.find('.action-taken .yes input').simulate('change')
    expect(updates).toBe(2)
  })

  it('Renders with action taken marked as yes', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      ActionTaken: { value: 'Yes' }
    }
    const component = createComponent(expected)
    expect(component.find('.ordered-counseling').length).toBe(1)
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

  it('Renders with action taken marked as yes and treatment completed marked as no', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      ActionTaken: { value: 'Yes' },
      CompletedTreatment: { value: 'No' }
    }
    const component = createComponent(expected)
    expect(component.find('.ordered-counseling').length).toBe(1)
    component
      .find('textarea[name="NoCompletedTreatmentExplanation"]')
      .simulate('change')
    expect(updates).toBe(1)
  })

  it('Renders with action taken marked as no', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      ActionTaken: { value: 'No' },
      Seekers: { values: ['Employer'] }
    }
    const component = createComponent(expected)
    expect(component.find('.ordered-counseling').length).toBe(1)
    component.find('.seekers .seekers-employer input').simulate('change')
    component
      .find('textarea[name="NoActionTakenExplanation"]')
      .simulate('change')
    expect(updates).toBe(2)
  })

  it('Renders with other seeker checked and updates other seeker explanation', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      ActionTaken: { value: 'No' },
      Seekers: { values: ['Other'] }
    }
    const component = createComponent(expected)
    expect(component.find('.ordered-counseling').length).toBe(1)
    component.find('input[name="OtherSeeker"]').simulate('change')
    expect(updates).toBe(1)
  })
})
