import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import AuthenticatedNavigationToggle, { NavigationToggle } from './NavigationToggle'

describe('The navigation toggle component', () => {
  window.token = 'fake-token'

  it('can toggle', () => {
    let dispatched = 0
    const props = {
      dispatch: () => { dispatched++ },
      settings: {
        mobileNavigation: true
      }
    }
    const component = mount(<NavigationToggle {...props} />)
    component.find('.navigation-toggle').simulate('click')
    expect(dispatched).toEqual(1)
  })

  it('not visible when not mobile', () => {
    const props = {
      settings: {
        mobileNavigation: false
      }
    }
    const component = mount(<NavigationToggle {...props} />)
    expect(component.find('.navigation-override').length).toBe(0)
  })

  it('visible when authenticated', () => {
    const middlewares = [ thunk ]
    const mockStore = configureMockStore(middlewares)
    const store = mockStore({
      authentication: {
        authenticated: true
      },
      application: {
        Settings: {
          mobileNavigation: true
        }
      }
    })
    const component = mount(<Provider store={store}><AuthenticatedNavigationToggle /></Provider>)
    expect(component.find('.navigation-toggle').length).toBe(1)
  })

  it('hidden when not authenticated', () => {
    window.token = ''
    const middlewares = [ thunk ]
    const mockStore = configureMockStore(middlewares)
    const store = mockStore({
      authentication: {},
      application: {
        Settings: {
          mobileNavigation: true
        }
      }
    })
    const component = mount(<Provider store={store}><AuthenticatedNavigationToggle /></Provider>)
    expect(component.find('.navigation-toggle').length).toBe(0)
    window.token = 'fake-token'
  })
})
