import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import Benefit from './Benefit'
import ContinuingBenefit from './ContinuingBenefit'

describe('The Benefit component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <Benefit {...expected} />
        </Provider>
      )
  })

  it('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.benefit').length).toBe(1)
  })

  it('Performs updates for base fields', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      InterestTypes: {
        value: ['Yourself']
      }
    }
    const component = createComponent(expected)
    expect(component.find('.benefit').length).toBe(1)
    // Toggle
    component
      .find('.interest-types .yourself input')
      .first()
      .simulate('change')
    component
      .find('.interest-types .cohabitant input')
      .first()
      .simulate('change')
    component
      .find('.benefit-types input')
      .first()
      .simulate('change')
    component
      .find('.benefit-frequency input')
      .first()
      .simulate('change')

    expect(updates).toBe(4)
  })

  it('Renders with Onetime benefit and triggers update', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      BenefitFrequency: { value: 'OneTime' },
      OneTimeBenefit: {
        Received: {
          month: '1',
          day: '1',
          year: '2010'
        },
        Country: {
          value: 'Germany'
        },
        Value: {
          value: '2000'
        },
        Reason: {
          value: 'Foo'
        },
        Obligated: { value: 'Yes' },
        ObligatedExplanation: {
          value: 'Because'
        }
      }
    }

    const component = createComponent(expected)
    expect(component.find('.onetime-benefit').length).toBe(1)
    component.find('.obligated .no input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Renders with Future benefit and triggers update', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      BenefitFrequency: { value: 'Future' },
      FutureBenefit: {
        Obligated: { value: 'Yes' },
        ObligatedExplanation: {
          value: 'Because'
        }
      }
    }

    const component = createComponent(expected)
    expect(component.find('.future-benefit').length).toBe(1)
    component.find('.obligated .no input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Renders with Other Benefit Type and updates other explanation', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      BenefitType: { value: 'Other' }
    }

    const component = createComponent(expected)
    component.find('textarea[name="OtherBenefitType"]').simulate('change')
    expect(updates).toBe(1)
  })

  it('Renders with Continuing benefit and triggers update', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      BenefitFrequency: { value: 'Continuing' },
      ContinuingBenefit: {
        Obligated: { value: 'Yes' },
        ObligatedExplanation: {
          value: 'Because'
        }
      }
    }

    const component = createComponent(expected)
    expect(component.find('.continuing-benefit').length).toBe(1)
    component.find('.obligated .no input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Renders with proper fields for other benefit type', () => {
    const expected = {
      BenefitFrequency: { value: 'Other' },
      OtherBenefit: {
        value: 'Other'
      }
    }

    const component = createComponent(expected)
    expect(component.find(ContinuingBenefit).length).toBe(1)
  })
})
