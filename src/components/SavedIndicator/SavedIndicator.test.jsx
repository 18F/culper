import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import ConnectedSavedIndicator from 'components/SavedIndicator/SavedIndicator'
import i18n from 'util/i18n'

describe('The saved indicator component', () => {
  // Setup
  window.token = 'fake-token'
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  it('catches failed save', () => {
    const store = mockStore({
      authentication: {
        authenticated: true,
      },
      application: {
        Settings: {
          saveError: true,
        },
      },
    })
    const component = mount(
      <Provider store={store}>
        <ConnectedSavedIndicator />
      </Provider>
    )
    expect(component.find('strong').text()).toContain(
      i18n.t('saved.error.title')
    )
  })

  describe('when authenticated', () => {
    let createComponent

    beforeEach(() => {
      const store = mockStore({ authentication: { authenticated: true } })
      createComponent = (elapsed = 0) => mount(
        <Provider store={store}>
          <ConnectedSavedIndicator elapsed={elapsed} />
        </Provider>
      )
    })

    it('visible when authenticated', () => {
      const component = createComponent()
      expect(component.find('button').length).toEqual(1)
    })

    it('displays in seconds if under a minute', () => {
      const elapsed = 10 * 1000
      const component = createComponent(elapsed)
      expect(component.find('.time').text()).toContain('sec')
    })

    it('displays in minutes if under an hour', () => {
      const elapsed = 60 * 1000
      const component = createComponent(elapsed)
      expect(component.find('.time').text()).toContain('min')
    })

    it('displays in hours if under a day', () => {
      const elapsed = 60 * 60 * 1000
      const component = createComponent(elapsed)
      expect(component.find('.time').text()).toContain('hour')
    })

    it('displays in days if greater than 24 hours', () => {
      const elapsed = 24 * 60 * 60 * 1000
      const component = createComponent(elapsed)
      expect(component.find('.time').text()).toContain('day')
    })

    it('mouse in and out', () => {
      const component = createComponent()
      component.find('button').simulate('mouseenter')
      expect(component.find('SavedIndicator').getNode().state.hover).toBe(true)
      component.find('button').simulate('mouseleave')
      expect(component.find('SavedIndicator').getNode().state.hover).toBe(false)
    })
  })
})
