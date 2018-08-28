import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import ErrorList, { groupBy, inAccordion } from './ErrorList'

describe('The error list component', () => {
  // Setup
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

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
    expect(component.find('.error-list .field .title').length).toBe(1)
    expect(component.find('.error-list .field .error-messages').length).toBe(1)
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
