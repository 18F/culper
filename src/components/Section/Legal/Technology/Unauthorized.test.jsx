import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Unauthorized } from './Unauthorized'

describe('The legal technology unauthorized access component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) => (
      mount(
        <Provider store={store}>
          <Unauthorized {...expected} />
        </Provider>
      )
    )
  })

  it('renders without errors', () => {
    const component = createComponent()
    expect(component.find('.legal-technology-unauthorized').length).toBe(1)
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
      .find('.legal-technology-unauthorized-has-unauthorized .yes input')
      .simulate('change')
    expect(updates).toBe(1)
  })

  it('list displayed if "yes" is clicked', () => {
    const props = {
      HasUnauthorized: { value: 'Yes' },
    }
    const component = createComponent(props)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('renders summary', () => {
    const props = {
      HasUnauthorized: { value: 'Yes' },
      List: {
        items: [
          {
            Item: {
              Date: {
                month: '1',
                day: '1',
                year: '2010',
              },
              Incident: {
                value: 'Looked over the shoulder',
              },
            },
          },
        ],
      },
    }
    const component = createComponent(props)
    const text = component.find('.accordion .summary .left').text()
    expect(text).toContain('Looked over the shoulder')
    expect(text).toContain('1/2010')
  })
})
