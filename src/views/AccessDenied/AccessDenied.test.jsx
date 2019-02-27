import React from 'react'
import configureMockStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import AccessDenied from '@views/AccessDenied/AccessDenied'
import { i18n } from '@config'

describe('The access denied view', () => {
  const mockStore = configureMockStore()

  it('is visible with context', () => {
    const store = mockStore({})
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <AccessDenied />
        </MemoryRouter>
      </Provider>
    )
    expect(component.find('.auth.denied').length).toEqual(1)
    expect(component.find('.auth.denied h2').text()).toEqual(
      i18n.t('login.denied.title')
    )
    expect(component.find('.auth.denied p').length).toEqual(2)
    expect(component.find('.auth.denied a.usa-button-primary').text()).toEqual(
      i18n.t('login.denied.button')
    )
  })
})
