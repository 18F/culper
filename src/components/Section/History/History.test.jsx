import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import History, { totalYears } from './History'
import Employment from './Employment'
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

  it('sets totalYears to proper value if applicant has less than 10 years of history', () => {
    const store = mockStore({
      authentication: { authenticated: true },
      application: {
        Identification: {
          ApplicantBirthDate: {
            Date: {
              month: `${new Date().getMonth() + 1}`,
              day: `${new Date().getDate()}`,
              year: `${new Date().getFullYear() - 18}`,
              estimated: false
            }
          }
        }
      }
    })

    const component = mount(
      <Provider store={store}>
        <History subsection="employment" />
      </Provider>
    )

    expect(component.find(Employment).props().totalYears).toEqual(2)
  })

  it('sets totalYears to proper value if applicant has more than 10 years of history', () => {
    const store = mockStore({
      authentication: { authenticated: true },
      application: {
        Identification: {
          ApplicantBirthDate: {
            Date: {
              month: `${new Date().getMonth() + 1}`,
              day: `${new Date().getDate()}`,
              year: `${new Date().getFullYear() - 30}`,
              estimated: false
            }
          }
        }
      }
    })

    const component = mount(
      <Provider store={store}>
        <History subsection="employment" />
      </Provider>
    )

    expect(component.find(Employment).props().totalYears).toEqual(10)
  })
})
