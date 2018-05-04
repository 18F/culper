import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import AuthenticatedIntroduction, { Introduction } from './Introduction'

describe('The Introduction component', () => {
  window.token = 'fake-token'

  it('logout if "No" is selected', () => {
    let dispatched = 0
    const props = {
      dispatch: () => { dispatched++ }
    }
    const component = mount(<Introduction {...props} />)
    expect(component.find('.branch .no').length).toBe(1)
    component.find('.branch .no input').simulate('change')
    expect(dispatched).toBe(2)
  })

  it('dispatch fired on "Yes"', () => {
    let dispatched = 0
    const props = {
      dispatch: () => { dispatched++ }
    }
    const component = mount(<Introduction {...props} />)
    expect(component.find('.branch .yes').length).toBe(1)
    component.find('.branch .yes input').simulate('change')
    expect(dispatched).toBe(1)
  })

  it('display on authentication', () => {
    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)
    const store = mockStore({
      authentication: {
        authenticated: true,
        twofactor: true
      },
      application: {
        Settings: {
          acceptedTerms: { value: '' }
        }
      }
    })
    const component = mount(<Provider store={store}><AuthenticatedIntroduction /></Provider>)
    expect(component.find('.introduction-modal').length).toBe(1)
  })

  it('hidden if previously accepted', () => {
    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)
    const store = mockStore({
      authentication: {
        authenticated: true,
        twofactor: true
      },
      application: {
        Settings: {
          acceptedTerms: { value: 'Yes' }
        }
      }
    })
    const component = mount(<Provider store={store}><AuthenticatedIntroduction /></Provider>)
    expect(component.find('.introduction-modal').length).toBe(1)
    expect(component.find('.modal').length).toBe(0)
  })

  it('hidden if not authenticated', () => {
    window.token = ''
    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)
    const store = mockStore({
      authentication: {},
      application: {
        Settings: {
          acceptedTerms: { value: '' }
        }
      }
    })
    const component = mount(<Provider store={store}><AuthenticatedIntroduction /></Provider>)
    expect(component.find('.introduction-modal').length).toBe(0)
    window.token = 'fake-token'
  })

  it('handles defaults', () => {
    expect(Introduction.defaultProps.dispatch()).toEqual(undefined)
    expect(Introduction.defaultProps.onDismiss()).toEqual(undefined)
  })
})
