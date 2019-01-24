import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import ScoreCard from './ScoreCard'

describe('The score card component', () => {
  it('hidden when not authenticated', () => {
    window.token = ''
    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)
    const store = mockStore({ authentication: [] })
    const component = mount(
      <Provider store={store}>
        <ScoreCard />
      </Provider>
    )
    expect(component.find('div').length).toEqual(0)
    window.token = 'fake-token'
  })

  it('visible when authenticated', () => {
    window.token = 'fake-token'
    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)
    const store = mockStore({
      authentication: {
        authenticated: true
      },
      application: {
        Settings: {
          acceptedTerms: 'Yes'
        }
      },
      section: {}
    })
    const component = mount(
      <Provider store={store}>
        <ScoreCard />
      </Provider>
    )
    expect(component.find('div').length).toEqual(1)
  })
})
