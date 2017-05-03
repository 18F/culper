import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import Foreign from './Foreign'
import Passport from './Passport'
import { mount } from 'enzyme'

const applicationState = {
  Foreign: {}
}

const applicationState2 = {
  Foreign: {
    Passport: {}
  }
}

describe('The foreign section', () => {
  // Setup
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('hidden when not authenticated', () => {
    const store = mockStore({ authentication: [], application: applicationState })
    const component = mount(<Provider store={store}><Foreign /></Provider>)
    expect(component.find('div').length).toEqual(0)
  })

  it('visible when authenticated', () => {
    const store = mockStore({ authentication: { authenticated: true, twofactor: true, application: applicationState } })
    const component = mount(<Provider store={store}><Foreign /></Provider>)
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can review all subsections', () => {
    const store = mockStore({ authentication: { authenticated: true, twofactor: true } })
    const component = mount(<Provider store={store}><Foreign subsection="review" /></Provider>)
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can take the tour', () => {
    let dispatched = false
    const store = mockStore({
      authentication: { authenticated: true, twofactor: true },
      application: applicationState2
    })
    store.dispatch = () => { dispatched = true }
    const component = mount(<Provider store={store}><Foreign /></Provider>)
    component.find('.review-tour button').simulate('click')
    expect(dispatched).toBe(true)
  })

  it('can view full review', () => {
    let dispatched = false
    const store = mockStore({
      authentication: { authenticated: true, twofactor: true },
      application: applicationState2
    })
    store.dispatch = () => { dispatched = true }
    const component = mount(<Provider store={store}><Foreign /></Provider>)
    component.find('.review-full button').simulate('click')
    expect(dispatched).toBe(true)
  })

  it('can go to each subsection', () => {
    const store = mockStore({
      authentication: { authenticated: true, twofactor: true },
      application: applicationState
    })

    const tests = [
      {
        section: 'passport',
        action: (component) => { component.find('.branch .yes input').simulate('change') }
      },
      {
        section: 'contacts',
        action: (component) => { component.find('.branch .yes input').simulate('change') }
      },
      {
        section: 'business',
        action: (component) => { component.find('.branch .yes input').simulate('change') }
      },
      {
        section: 'business/advice',
        action: (component) => { component.find('.branch .yes input').simulate('change') }
      },
      {
        section: 'business/family',
        action: (component) => { component.find('.branch .yes input').simulate('change') }
      }
    ]

    tests.forEach((test) => {
      const component = mount(<Provider store={store}><Foreign subsection={test.section} /></Provider>)
      test.action(component)
      expect(component.find('div').length).toBeGreaterThan(0)
    })
  })

  it('can parse previous names', () => {
    const store = mockStore({
      authentication: { authenticated: true, twofactor: true },
      application: {
        Identification: {
          ApplicantName: {
            first: 'john',
            last: 'smith'
          },
          OtherNames: {
            List: [
              {
                first: 'johnathan',
                last: 'smith'
              }
            ]
          }
        }
      }
    })
    const component = mount(<Provider store={store}><Foreign subsection="passport" /></Provider>)
    expect(component.find(Passport).props().suggestedNames.length).toBe(2)
  })
})
