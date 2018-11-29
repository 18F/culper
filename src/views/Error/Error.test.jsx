import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import Error from './Error'
import { i18n } from '../../config'

describe('The Error view', () => {
  // Setup
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  it('is visible with context', () => {
    const store = mockStore({ authentication: {} })
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Error />
        </MemoryRouter>
      </Provider>
    )
    expect(component.find('.auth.error').length).toEqual(1)
    expect(component.find('.auth.error h3').text()).toEqual(
      i18n.t('application.loading.error.title')
    )
    expect(component.find('.auth.error p').text()).toEqual(
      i18n.t('application.loading.error.para')
    )
    expect(component.find('.auth.error a').text()).toEqual(
      i18n.t('application.loading.error.button')
    )
  })
})
