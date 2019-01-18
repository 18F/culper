import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import ForeignService from './ForeignService'

describe('The foreign service component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <ForeignService {...expected} />
        </Provider>
      )
  })

  it('no error on empty', () => {
    const expected = {
      name: 'foreign-service'
    }
    const component = createComponent(expected)
    expect(
      component.find('.foreign-service .organization-military label').length
    ).toEqual(1)
    expect(component.find('.foreign-service-name input').length).toEqual(1)
    expect(
      component.find('.foreign-service-dates .datecontrol.from .month input')
        .length
    ).toEqual(1)
    expect(component.find('.foreign-service-country input').length).toEqual(1)
    expect(component.find('.foreign-service-rank input').length).toEqual(1)
    expect(component.find('.foreign-service-division input').length).toEqual(1)
    expect(
      component.find('.foreign-service-circumstances textarea').length
    ).toEqual(1)
    expect(component.find('.foreign-service-left textarea').length).toEqual(1)
  })

  it('trigger updates when changing values', () => {
    let updates = 0
    const expected = {
      name: 'foreign-service',
      onUpdate: () => {
        updates++
      },
      formType: '86'
    }
    const component = createComponent(expected)
    component
      .find('.foreign-service .organization-military label')
      .simulate('change')
    component
      .find('.foreign-service-name input')
      .simulate('change', { target: { value: 'The name' } })
    component
      .find('.foreign-service-dates .datecontrol.from .month input')
      .simulate('change', { target: { name: 'month', value: '1' } })
    component
      .find('.foreign-service-dates .datecontrol.from .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.foreign-service-dates .datecontrol.from .year input')
      .simulate('change', { target: { name: 'year', value: '2001' } })
    component
      .find('.foreign-service-dates .datecontrol.to .month input')
      .simulate('change', { target: { name: 'month', value: '1' } })
    component
      .find('.foreign-service-dates .datecontrol.to .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.foreign-service-dates .datecontrol.to .year input')
      .simulate('change', { target: { name: 'year', value: '2005' } })
    component
      .find('.foreign-service-country input')
      .simulate('change', { target: { value: 'The country' } })
    component
      .find('.foreign-service-rank input')
      .simulate('change', { target: { value: 'The rank' } })
    component
      .find('.foreign-service-division input')
      .simulate('change', { target: { value: 'The division' } })
    component
      .find('.foreign-service-circumstances textarea')
      .simulate('change', { target: { value: 'The circumstances' } })
    component
      .find('.foreign-service-left textarea')
      .simulate('change', { target: { value: 'The reasons to leave' } })
    component
      .find('.foreign-service .maintainscontact .yes input')
      .simulate('change')
    component
      .find('.foreign-service .maintainscontact .no input')
      .simulate('change')
    expect(updates).toBeGreaterThan(8)
  })

  it('can display summary with values', () => {
    const tests = [
      {
        props: {
          name: 'foreign-service',
          MaintainsContact: { value: 'Yes' },
          List: {
            items: [
              {
                Item: {
                  Name: null,
                  Dates: {
                    from: {
                      day: '1',
                      month: '1',
                      year: '2015'
                    },
                    to: {
                      day: '1',
                      month: '1',
                      year: '2016'
                    }
                  }
                }
              }
            ]
          }
        },
        expected: '1/2015 - 1/2016'
      }
    ]

    for (const test of tests) {
      const component = createComponent(test.props)
      expect(component.find('.dates').text()).toBe(test.expected)
    }
  })
})
