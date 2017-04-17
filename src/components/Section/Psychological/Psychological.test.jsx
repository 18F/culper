import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import Psychological from './Psychological'

const applicationState = {
  Psychological: {}
}

describe('The legal section', () => {
  // Setup
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('hidden when not authenticated', () => {
    const store = mockStore({ authentication: [], application: applicationState })
    const component = mount(<Provider store={store}><Psychological /></Provider>)
    expect(component.find('div').length).toEqual(0)
  })

  it('visible when authenticated', () => {
    const store = mockStore({ authentication: { authenticated: true, twofactor: true, application: applicationState } })
    const component = mount(<Provider store={store}><Psychological /></Provider>)
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can review all subsections', () => {
    const store = mockStore({ authentication: { authenticated: true, twofactor: true } })
    const component = mount(<Provider store={store}><Psychological subsection="review" /></Provider>)
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can update review section', () => {
    const store = mockStore({ authentication: { authenticated: true, twofactor: true } })
    const component = mount(<Provider store={store}><Psychological subsection="review" /></Provider>)
    expect(component.find('div').length).toBeGreaterThan(0)
    component.find('.competence .yes input').simulate('change')
    expect(component.find('.competence .accordion').length).toBe(1)
  })

  it('can complete section', () => {
    const appState = {
      Psychological: {
        Competence: {
          IsIncompetent: 'No'
        },
        Consultation: {
          Consulted: 'No'
        },
        Diagnoses: {
          Diagnosed: 'No'
        },
        Hospitalization: {
          Hospitalized: 'No'
        }
      }
    }
    const store = mockStore({ application: appState, authentication: { authenticated: true, twofactor: true } })
    const component = mount(<Provider store={store}><Psychological subsection="review" /></Provider>)
    expect(component.find('div').length).toBeGreaterThan(0)
    component.find('.competence .no input').simulate('change')
    component.find('.competence .no input').simulate('blur')
    expect(component.find('.competence .accordion').length).toBe(0)

    component.find('.consultation .no input').simulate('change')
    component.find('.consultation .no input').simulate('blur')
    expect(component.find('.consultation .accordion').length).toBe(0)

    component.find('.hospitalizations .no input').simulate('change')
    component.find('.hospitalizations .no input').simulate('blur')
    expect(component.find('.hospitalizations .accordion').length).toBe(0)

    component.find('.diagnosed .yes input').simulate('change')
    component.find('.diagnosed .yes input').simulate('blur')
    component.find('.didnotconsult .no input').simulate('change')
    component.find('.didnotconsult .no input').simulate('blur')
    component.find('.intreatment .no input').simulate('change')
    component.find('.intreatment .no input').simulate('blur')
    expect(component.find('.diagnoses .accordion').length).toBe(1)

    component.find('.diagnosed .no input').simulate('change')
    component.find('.diagnosed .no input').simulate('blur')
    expect(component.find('.diagnoses .accordion').length).toBe(0)

    component.find('.hascondition .no input').simulate('change')
    component.find('.hascondition .no input').simulate('blur')
    component.find({name: 'treatment', value: 'Decline'}).simulate('change')
    component.find({name: 'treatment', value: 'Decline'}).simulate('blur')
    expect(component.find('.existingconditions .accordion').length).toBe(0)

    component.find('.didnotfollow .no input').simulate('change')
    component.find('.didnotfollow .no input').simulate('blur')
    expect(component.find('textarea#DidNotFollowExplanation').length).toBe(0)
  })
})
