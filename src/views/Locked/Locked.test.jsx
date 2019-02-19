import React from 'react'
import configureMockStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import Locked from '@views/Locked/Locked'
import { i18n } from '@config'

describe('The locked view', () => {
  const mockStore = configureMockStore()

  it('is visible with context', () => {
    const store = mockStore({})
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Locked />
        </MemoryRouter>
      </Provider>
    )
    expect(component.find('.auth.locked').length).toEqual(1)
    expect(component.find('.auth.locked h3').text()).toEqual(
      i18n.t('login.locked.title')
    )
    expect(component.find('.auth.locked p').text()).toEqual(
      i18n.t('login.locked.para')
    )
    expect(component.find('.auth.locked a').text()).toEqual(
      i18n.t('login.locked.button')
    )
  })
})
