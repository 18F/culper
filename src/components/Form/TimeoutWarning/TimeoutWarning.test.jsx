import React from 'react'
import renderer from 'react-test-renderer'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import TimeoutWarning, { roundUp, minutes, seconds } from './TimeoutWarning'

describe('The timeout warning component', () => {
  // Setup
  window.token = 'fake-token'
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  it('not displayed if outside threshold', () => {
    const store = mockStore({
      application: { Settings: { lastRefresh: new Date() } },
      authentication: { authenticated: true }
    })
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <TimeoutWarning timeout="15" />
        </MemoryRouter>
      </Provider>
    )
    expect(component.find('.timeout-warning').length).toEqual(1)
    expect(component.find('.modal').length).toEqual(0)
  })

  it('displayed when inside threshold', () => {
    const now = new Date()
    let lastRefresh = new Date(now.setMinutes(now.getMinutes() - 14))
    const store = mockStore({
      application: { Settings: { lastRefresh: lastRefresh } },
      authentication: { authenticated: true }
    })
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <TimeoutWarning timeout="15" showWarning={true} />
        </MemoryRouter>
      </Provider>
    )
    expect(component.find('.timeout-warning').length).toEqual(1)
    expect(component.find('.modal').length).toEqual(1)
  })

  it('rounds up', () => {
    const tests = [
      {
        data: 1,
        expect: 1
      }
    ]
    tests.forEach(test => {
      expect(roundUp(test.data, 1)).toEqual(test.expect)
    })
  })

  it('convert ms to seconds', () => {
    const tests = [
      {
        data: 1000,
        expect: 1
      },
      {
        data: 2500,
        expect: 3
      }
    ]
    tests.forEach(test => {
      expect(seconds(test.data)).toEqual(test.expect)
    })
  })

  it('convert ms to minutes', () => {
    const tests = [
      {
        data: 2400,
        expect: 1
      }
    ]
    tests.forEach(test => {
      expect(minutes(test.data)).toEqual(test.expect)
    })
  })

  it('matches the snapshot', () => {
    const now = new Date()
    let lastRefresh = new Date(now.setMinutes(now.getMinutes() - 14))
    const store = mockStore({
      application: { Settings: { lastRefresh: lastRefresh } },
      authentication: { authenticated: true }
    })
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <TimeoutWarning timeout="15" showWarning={true} />
        </MemoryRouter>
      </Provider>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
