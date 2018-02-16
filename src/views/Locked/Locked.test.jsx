import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import Locked from './Locked'
import { i18n } from '../../config'

describe('The locked view', () => {
  // Setup
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('is visible with context', () => {
    const store = mockStore({ authentication: {} })
    const component = mount(<Provider store={store}><MemoryRouter><Locked /></MemoryRouter></Provider>)
    expect(component.find('.auth.locked').length).toEqual(1)
    expect(component.find('.auth.locked h3').text()).toEqual(i18n.t('login.locked.title'))
    expect(component.find('.auth.locked p').text()).toEqual(i18n.t('login.locked.para'))
    expect(component.find('.auth.locked a').text()).toEqual(i18n.t('login.locked.button'))
  })
})
