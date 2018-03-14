import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import TokenRefresh from './TokenRefresh'
import { i18n } from '../../config'

describe('The token refresh error view', () => {
  // Setup
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('is visible with context', () => {
    const store = mockStore({ authentication: {} })
    const component = mount(<Provider store={store}><MemoryRouter><TokenRefresh /></MemoryRouter></Provider>)
    expect(component.find('.auth.denied').length).toEqual(1)
    expect(component.find('.auth.denied h2').text()).toEqual(i18n.t('login.token.title'))
    expect(component.find('.auth.denied p').length).toEqual(1)
    expect(component.find('.auth.denied a.usa-button-primary').text()).toEqual(i18n.t('login.token.button'))
  })
})
