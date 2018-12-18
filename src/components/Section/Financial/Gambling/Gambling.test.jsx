import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Gambling from './Gambling'
import Accordion from '../../../Form/Accordion'

let gamblingData = {
  branch: {},
  items: [
    {
      Actions: {
        name: 'Actions',
        value: 'No actions'
      },
      Dates: {
        from: {
          month: `${new Date().getMonth() + 1}`,
          day: `${new Date().getDate()}`,
          year: `${new Date().getFullYear()}`
        },
        name: 'Dates',
        present: null,
        title: 'Date Range',
        to: {
          month: `${new Date().getMonth() + 1}`,
          day: `${new Date().getDate()}`,
          year: `${new Date().getFullYear()}`
        }
      },
      Description: {
        name: 'Description',
        value: 'Hello'
      },
      Losses: {
        name: 'Losses',
        value: '1000'
      }
    }
  ]
}

describe('The gambling component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <Gambling {...expected} />
        </Provider>
      )
  })

  it('no error on empty', () => {
    const expected = {
      name: 'gambling'
    }
    const component = createComponent(expected)
    expect(component.find('input[type="radio"]').length).toEqual(2)
    expect(component.find('.selected').length).toEqual(0)
    expect(component.find('button.add').length).toEqual(0)
  })

  it('selects yes and loads form', () => {
    const expected = {
      name: 'gambling',
      HasGamblingDebt: { value: 'Yes' },
      List: { branch: {}, items: [{}] }
    }
    const component = createComponent(expected)
    expect(component.find('.details').length).toBeGreaterThan(0)
  })

  it('selects no', () => {
    const expected = {
      name: 'gambling'
    }
    const component = createComponent(expected)
    component.find('.has-gambling-debt .no input').simulate('change')
    expect(component.find('.details').length).toBe(0)
  })

  it('load data and add another gambling debt', () => {
    let update = 0
    const expected = {
      name: 'gambling',
      List: gamblingData,
      HasGamblingDebt: { value: 'Yes' },
      onUpdate: () => {
        update++
      }
    }
    const component = createComponent(expected)
    update = 0
    component.find('.addendum .yes input').simulate('change')
    expect(update).toBe(1)
  })

  it('displays fields when "yes" is selected', () => {
    const expected = {
      HasGamblingDebt: { value: 'Yes' },
      List: { branch: {}, items: [{}] }
    }
    const component = createComponent(expected)
    expect(component.find('.losses').length).toEqual(1)
  })

  it('does not display any fields when "no" is selected', () => {
    const expected = {
      HasGamblingDebt: { value: 'No' },
      List: { branch: {}, items: [{}] }
    }
    const component = createComponent(expected)
    expect(component.find('.losses').length).toEqual(0)
  })

  it('can make fancy numbers', () => {
    const tests = [
      {
        HasGamblingDebt: { value: 'Yes' },
        List: {
          branch: {},
          items: [
            {
              Item: {
                Losses: {
                  name: 'Losses',
                  value: '1000'
                }
              }
            }
          ]
        },
        expected: '$1,000'
      },
      {
        HasGamblingDebt: { value: 'Yes' },
        List: {
          branch: {},
          items: [
            {
              Item: {
                Losses: {
                  name: 'Losses',
                  value: '10000'
                }
              }
            }
          ]
        },
        expected: '$10,000'
      }
    ]

    tests.forEach(test => {
      const component = createComponent(test)
      expect(component.find('.summary .left .context').text()).toBe(
        test.expected
      )
    })
  })
})
