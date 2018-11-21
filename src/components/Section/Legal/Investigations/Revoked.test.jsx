import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Revoked from './Revoked'

describe('The legal investigations revoked component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <Revoked {...expected} />
        </Provider>
      )
  })

  it('renders without errors', () => {
    const component = createComponent()
    expect(component.find('.investigations-revoked').length).toBe(1)
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
      .find('.legal-investigations-revoked-has-revocations .yes input')
      .simulate('change')
    expect(updates).toBe(1)
  })

  it('list displayed if "yes" is clicked', () => {
    const props = {
      HasRevocations: { value: 'Yes' }
    }
    const component = createComponent(props)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('renders summary', () => {
    const props = {
      HasRevocations: { value: 'Yes' },
      List: {
        items: [
          {
            Item: {
              Agency: {
                value: 'U.S. Department of Defense'
              },
              Date: {
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
