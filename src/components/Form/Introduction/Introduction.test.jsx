import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import ConnectedIntroduction, { Introduction } from './Introduction'
import { testSnapshot } from '../../test-helpers'

describe('The Introduction component', () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  it('logout if "No" is selected', () => {
    let dispatched = 0
    const props = {
      dispatch: () => {
        dispatched++
      },
      auth: {
        formType: '86'
      }
    }
    const component = mount(<Introduction {...props} />)
    expect(component.find('.branch .no').length).toBe(1)
    component.find('.branch .no input').simulate('change')
    expect(dispatched).toBe(2)
  })

  it('dispatch fired on "Yes"', () => {
    let dispatched = 0
    const props = {
      dispatch: () => {
        dispatched++
      },
      auth: {
        formType: '86'
      }
    }
    const component = mount(<Introduction {...props} />)
    expect(component.find('.branch .yes').length).toBe(1)
    component.find('.branch .yes input').simulate('change')
    expect(dispatched).toBe(1)
  })

  it("displays when terms aren't accepted", () => {
    const store = mockStore({
      authentication: {
        formType: '86'
      }
    })
    const component = mount(
      <Provider store={store}>
        <ConnectedIntroduction />
      </Provider>
    )
    expect(component.find('.introduction-modal').length).toBe(1)
  })

  it('hidden if previously accepted', () => {
    const store = mockStore({
      application: {
        Settings: {
          acceptedTerms: { value: 'Yes' }
        }
      },
      authentication: {
        formType: '86'
      }
    })
    const component = mount(
      <Provider store={store}>
        <ConnectedIntroduction />
      </Provider>
    )
    expect(component.find('.introduction-modal').length).toBe(1)
    expect(component.find('.modal').length).toBe(0)
  })

  it('handles defaults', () => {
    expect(Introduction.defaultProps.dispatch()).toEqual(undefined)
    expect(Introduction.defaultProps.onDismiss()).toEqual(undefined)
  })

  it('renders properly', () => {
    const store = mockStore({
      authentication: {
        formType: '86'
      }
    })
    testSnapshot(
      <Provider store={store}>
        <ConnectedIntroduction forceOpen={true} />
      </Provider>
    )
  })
})
