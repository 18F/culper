import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import History, { totalYears } from './History'
import { mount } from 'enzyme'

const applicationState = {
  History: {}
}

describe('The History section', () => {
  // Setup
  window.token = 'fake-token'
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  it('hidden when not authenticated', () => {
    window.token = ''
    const store = mockStore({
      authentication: [],
      application: applicationState
    })
    const component = mount(
      <Provider store={store}>
        <History />
      </Provider>
    )
    expect(component.find('div').length).toEqual(0)
    window.token = 'fake-token'
  })

  it('visible when authenticated', () => {
    const store = mockStore({
      authentication: { authenticated: true, application: applicationState }
    })
    const component = mount(
      <Provider store={store}>
        <History />
      </Provider>
    )
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can review all subsections', () => {
    const store = mockStore({ authentication: { authenticated: true } })
    const component = mount(
      <Provider store={store}>
        <History subsection="review" />
      </Provider>
    )
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can go to each subsection', () => {
    const sections = [
      '',
      'review',
      'residence',
      'employment',
      'education',
      'federal'
    ]
    const store = mockStore({ authentication: { authenticated: true } })

    sections.forEach(section => {
      const component = mount(
        <Provider store={store}>
          <History subsection={section} />
        </Provider>
      )
      expect(component.find('div').length).toBeGreaterThan(0)
    })
  })

  it('can count total years', () => {
    const tests = [
      {
        data: new Date('1/1/2010'),
        expect: 10
      },
      {
        data: new Date('1/1/2000'),
        expect: 2
      },
      {
        data: new Date('1/1/1980'),
        expect: 10
      }
    ]

    tests.forEach(test => {
      expect(totalYears(test.data)).toBe(test.expect)
    })
  })
})
