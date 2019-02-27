import React from 'react'
import configureMockStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import TokenRefresh from '@views/TokenRefresh/TokenRefresh'
import { i18n } from '@config'

describe('The token refresh error view', () => {
  // Setup
  const mockStore = configureMockStore()

  it('is visible with context', () => {
    const lastSaved = new Date(2000, 1, 2, 16, 9, 10, 0)
    const store = mockStore({
      application: { Settings: { saved: lastSaved } },
    })
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <TokenRefresh />
        </MemoryRouter>
      </Provider>
    )
    expect(component.find('.auth.denied').length).toEqual(1)
    expect(component.find('.auth.denied h2').text()).toEqual(
      i18n.t('login.token.title')
    )
    expect(component.find('.auth.denied strong').text()).toEqual(
      i18n
        .t('login.token.saved')
        .replace('{time}', lastSaved.toLocaleTimeString())
    )
    expect(component.find('.auth.denied p').length).toEqual(1)
    expect(component.find('.auth.denied a.usa-button-primary').text()).toEqual(
      i18n.t('login.token.button')
    )
  })
})
