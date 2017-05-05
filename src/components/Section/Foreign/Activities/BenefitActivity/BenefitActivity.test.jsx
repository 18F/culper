import React from 'react'
import { mount } from 'enzyme'
import BenefitActivity from './BenefitActivity'

describe('The BenefitActivity component', () => {
  it('Renders without errors', () => {
    const component = mount(<BenefitActivity />)
    expect(component.find('.benefit-activity').length).toBe(1)
  })

  it('Selects if has benefit', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<BenefitActivity onUpdate={onUpdate} />)
    component.find('.has-benefits .yes input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Renders populated benefit activity and performs update', () => {
    let updates = 0
    const expected = {
      onUpdate: () => { updates++ },
      HasBenefits: 'Yes',
      List: [
        {
          Benefit: {
            BenefitFrequency: 'OneTime',
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
              Obligated: 'Yes',
              ObligatedExplanation: {
                value: 'Because'
              }
            }
          }
        }
      ]
    }

    const component = mount(<BenefitActivity {...expected} />)
    expect(component.find('.benefit-activity').length).toBe(1)
    component.find('.benefit-frequency input').first().simulate('change')

    expect(updates).toBe(2)
  })
})
