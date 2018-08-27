import React from 'react'
import { mount } from 'enzyme'
import Benefit from './Benefit'

describe('The Benefit component', () => {
  it('Renders without errors', () => {
    const component = mount(<Benefit />)
    expect(component.find('.benefit').length).toBe(1)
  })

  it('Performs updates for base fields', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const interestTypes = { value: ['Yourself'] }
    const component = mount(
      <Benefit onUpdate={onUpdate} InterestTypes={interestTypes} />
    )
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

    const component = mount(<Benefit {...expected} />)
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

    const component = mount(<Benefit {...expected} />)
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

    const component = mount(<Benefit {...expected} />)
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

    const component = mount(<Benefit {...expected} />)
    expect(component.find('.continuing-benefit').length).toBe(1)
    component.find('.obligated .no input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Renders with other benefit and triggers update', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      BenefitFrequency: { value: 'Other' },
      OtherBenefit: {
        value: 'Other'
      }
    }

    const component = mount(<Benefit {...expected} />)
    component.find('textarea[name="OtherBenefit"]').simulate('change')
    expect(updates).toBe(1)
  })
})
