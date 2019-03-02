import React from 'react'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import AuthenticatedView from 'views/AuthenticatedView'

describe('AuthenticatedView', () => {
  it('hidden when not authenticated', () => {
    const SampleComponent = () => (<div className="child-component">Sample</div>)
    const AuthenticatedComponent = AuthenticatedView(SampleComponent)
    window.token = ''
    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)
    const store = mockStore({ authentication: [] })
    const component = mount(
      <Provider store={store}>
        <AuthenticatedComponent />
      </Provider>
    )
    expect(component.find('div.child-component').length).toBe(0)
    expect(component.find(SampleComponent).length).toBe(0)
  })

  it('visible when authenticated', () => {
    const SampleComponent = () => (<div className="child-component">Sample</div>)
    const AuthenticatedComponent = AuthenticatedView(SampleComponent)
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
        <AuthenticatedComponent />
      </Provider>
    )
    expect(component.find('div.child-component').length).toBe(1)
    expect(component.find(SampleComponent).length).toBe(1)
  })
})
