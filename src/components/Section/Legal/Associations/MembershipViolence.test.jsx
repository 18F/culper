import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { MembershipViolence } from './MembershipViolence'

describe('The legal associations violence component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) => (
      mount(
        <Provider store={store}>
          <MembershipViolence {...expected} />
        </Provider>
      )
    )
  })

  it('renders without errors', () => {
    const component = createComponent()
    expect(component.find('.legal-associations-violence').length).toBe(1)
  })

  it('can select "yes"', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates += 1
      },
    }
    const component = createComponent(expected)
    component
      .find('.legal-associations-violence-has-violence .yes input')
      .simulate('change')
    expect(updates).toBe(1)
  })

  it('list displayed if "yes" is clicked', () => {
    const props = {
      HasViolence: { value: 'Yes' },
    }
    const component = createComponent(props)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('renders summary', () => {
    const props = {
      HasViolence: { value: 'Yes' },
      List: {
        items: [
          {
            Item: {
              Dates: {
                from: {
                  month: '1',
                  day: '1',
                  year: '2010',
                },
                to: {
                  month: '1',
                  day: '1',
                  year: '2011',
                },
              },
              Organization: {
                value: 'Donut Brigade',
              },
            },
          },
        ],
      },
    }
    const component = createComponent(props)
    const text = component.find('.accordion .summary .left').text()
    expect(text).toContain('Donut Brigade')
    expect(text).toContain('1/2010 - 1/2011')
  })
})
