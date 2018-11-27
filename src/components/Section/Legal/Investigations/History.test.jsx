import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import History from './History'

describe('The legal investigations history component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <History {...expected} />
        </Provider>
      )
  })

  it('renders without errors', () => {
    const component = createComponent()
    expect(component.find('.investigations-history').length).toBe(1)
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
      .find('.legal-investigations-history-has-history .yes input')
      .simulate('change')
    expect(updates).toBe(1)
  })

  it('list displayed if "yes" is clicked', () => {
    const props = {
      HasHistory: { value: 'Yes' }
    }
    const component = createComponent(props)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('renders summary', () => {
    const props = {
      HasHistory: { value: 'Yes' },
      List: {
        items: [
          {
            Item: {
              Agency: {
                Agency: 'U.S. Department of Defense'
              },
              Granted: {
                date: new Date('1/1/2010'),
                month: '1',
                day: '1',
                year: '2010'
              }
            }
          }
        ]
      }
    }
    const component = createComponent(props)
    const text = component.find('.accordion .summary .left').text()
    expect(text).toContain('U.S. Department of Defense')
    expect(text).toContain('1/2010')
  })
})
