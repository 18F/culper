import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Foreign from './Foreign'

describe('The military foreign component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <Foreign {...expected} />
        </Provider>
      )
  })

  it('no error on empty', () => {
    const expected = {
      name: 'military-foreign'
    }
    const component = createComponent(expected)
    expect(component.find('.branch').length).toBeGreaterThan(1)
    expect(component.find('.foreign-service').length).toEqual(0)
  })

  it('selecting no to military foreign does nothing', () => {
    const expected = {
      name: 'military-foreign',
      List: {
        items: [
          {
            Item: {
              Has: { value: 'No' }
            }
          }
        ]
      }
    }
    const component = createComponent(expected)
    expect(component.find('.foreign-service').length).toEqual(0)
  })

  it('selecting yes to military foreign displays the form', () => {
    const expected = {
      name: 'military-foreign',
      List: {
        items: [
          {
            Item: {
              Has: { value: 'Yes' }
            }
          }
        ]
      }
    }
    const component = createComponent(expected)
    expect(component.find('.foreign-service').length).toEqual(1)
  })
})
