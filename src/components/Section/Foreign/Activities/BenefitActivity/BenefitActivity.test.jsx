import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { BenefitActivity } from './BenefitActivity'

describe('The BenefitActivity component', () => {
  it('Renders without errors', () => {
    const component = mount(<BenefitActivity />)
    expect(component.find('.benefit-activity').length).toBe(1)
  })

  it('Selects if has benefit', () => {
    let updates = 0
    const onUpdate = () => {
      updates += 1
    }
    const component = mount(<BenefitActivity onUpdate={onUpdate} />)
    component.find('.has-benefits .yes input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Renders populated benefit activity and performs update', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates += 1
      },
      HasBenefits: { value: 'Yes' },
      List: {
        items: [
          {
            Item: {
              InterestTypes: {
                values: ['Yourself'],
              },
              BenefitType: 'Educational',
              BenefitFrequency: 'OneTime',
              OneTimeBenefit: {
                Received: {
                  month: '1',
                  day: '1',
                  year: '2010',
                },
                Country: {
                  value: 'Germany',
                },
                Value: {
                  value: '2000',
                },
                Reason: {
                  value: 'Foo',
                },
                Obligated: { value: 'Yes' },
                ObligatedExplanation: {
                  value: 'Because',
                },
              },
            },
          },
        ],
      },
    }

    const component = mount(<BenefitActivity {...expected} />)
    expect(component.find('.benefit-activity').length).toBe(1)
    component
      .find('.benefit-frequency input')
      .first()
      .simulate('change')
    expect(updates).toBe(2)
  })

  it('Renders summary based on benefit', () => {
    const tests = [
      {
        expected: 'Yourself - Cambodia',
        HasBenefits: { value: 'Yes' },
        List: {
          items: [
            {
              Item: {
                InterestTypes: {
                  values: ['Yourself'],
                },
                BenefitFrequency: { value: 'OneTime' },
                OneTimeBenefit: {
                  Received: {
                    month: '1',
                    day: '1',
                    year: '2010',
                  },
                  Country: {
                    value: 'Cambodia',
                  },
                },
              },
            },
          ],
        },
      },
      {
        expected: 'Yourself - Germany',
        HasBenefits: { value: 'Yes' },
        List: {
          items: [
            {
              Item: {
                InterestTypes: {
                  values: ['Yourself'],
                },
                BenefitFrequency: { value: 'Future' },
                FutureBenefit: {
                  Received: {
                    month: '1',
                    day: '1',
                    year: '2010',
                  },
                  Country: {
                    value: 'Germany',
                  },
                },
              },
            },
          ],
        },
      },
      {
        expected: 'Yourself',
        HasBenefits: { value: 'Yes' },
        List: {
          items: [
            {
              Item: {
                InterestTypes: {
                  values: ['Yourself'],
                },
                BenefitFrequency: { value: 'Continuing' },
                ContinuingBenefit: {
                  Received: {
                    month: '1',
                    day: '1',
                    year: '2010',
                  },
                },
              },
            },
          ],
        },
      },
    ]

    const mockStore = configureMockStore()
    tests.forEach((test) => {
      const store = mockStore(test)
      const component = mount(
        <Provider store={store}>
          <BenefitActivity {...test} />
        </Provider>
      )
      expect(component.find('.context').text()).toContain(test.expected)
    })
  })
})
