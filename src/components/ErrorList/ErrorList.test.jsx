import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import ErrorList, { groupBy, inAccordion } from 'components/ErrorList/ErrorList'

describe('The error list component', () => {
  const mockStore = configureMockStore()

  it('renders nothing if no errors are present', () => {
    const store = mockStore({})
    const component = mount(
      <Provider store={store}>
        <ErrorList />
      </Provider>
    )
    expect(component.find('.error-list').length).toBe(0)
  })

  it('renders list of errors', () => {
    const errorMessages = () => {
      return {
        'My section title': [
          { id: '1', title: 'My section title', message: 'My field title' }
        ]
      }
    }
    const store = mockStore({})
    const component = mount(
      <Provider store={store}>
        <ErrorList errorMessages={errorMessages} />
      </Provider>
    )
    expect(component.find('.error-list').length).toBe(1)
    expect(component.find('.error-list .usa-alert-error .usa-alert-heading').length).toBe(1)
    expect(component.find('.error-list .usa-alert-error').length).toBe(1)
  })

  it('groups stuff', () => {
    const getter = function() {
      return 'foo'
    }
    expect(groupBy([], getter)).toEqual({})
    expect(groupBy([{ name: 'Doe' }], getter)).toEqual({
      foo: [
        {
          name: 'Doe'
        }
      ]
    })
  })

  it('checks if element is within accordion', () => {
    expect(inAccordion(null)).toEqual(false)
  })
})
