import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import Military from './Military'
import { mount } from 'enzyme'

const applicationState = {
  Military: {}
}

describe('The military section', () => {
  // Setup
  window.token = 'fake-token'
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('hidden when not authenticated', () => {
    window.token = ''
    const store = mockStore({ authentication: [], application: applicationState })
    const component = mount(<Provider store={store}><Military /></Provider>)
    expect(component.find('div').length).toEqual(0)
    window.token = 'fake-token'
  })

  it('visible when authenticated', () => {
    const store = mockStore({ authentication: { authenticated: true }, application: applicationState })
    const component = mount(<Provider store={store}><Military /></Provider>)
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can review all subsections', () => {
    const store = mockStore({ authentication: { authenticated: true } })
    const component = mount(<Provider store={store}><Military subsection="review" /></Provider>)
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can go to each subsection', () => {
    const sections = ['selective', 'history', 'disciplinary', 'foreign', 'review']
    const store = mockStore({
      authentication: { authenticated: true },
      application: { Military: {} }
    })

    const tests = [
      {
        section: 'selective',
        action: (component) => { component.find('.selective .branch .yes input').simulate('change') }
      },
      {
        section: 'history',
        action: (component) => { component.find('.military-history .branch .yes input').simulate('change') }
      },
      {
        section: 'disciplinary',
        action: (component) => { component.find('.disciplinary .branch .yes input').simulate('change') }
      },
      {
        section: 'foreign',
        action: (component) => { component.find('.foreign .branch .yes input').simulate('change') }
      }
    ]

    tests.forEach((test) => {
      const component = mount(<Provider store={store}><Military section="military" subsection={test.section} /></Provider>)
      test.action(component)
      expect(component.find('div').length).toBeGreaterThan(0)
    })
  })

  it('hides selective service if age is before December 31st, 1959', () => {
    const modifiedState = {
      Identification: { ApplicantBirthDate: { Date: { date: new Date(1900, 1, 1) } } },
      Military: {}
    }
    const store = mockStore({ authentication: { authenticated: true }, application: modifiedState })
    const component = mount(<Provider store={store}><Military subsection="intro" /></Provider>)
    expect(component.find('.actions.next .text .label').text()).not.toBe('Selective service record')
  })

  it('displays selective service if age is after December 31st, 1959', () => {
    const modifiedState = {
      Identification: { ApplicantBirthDate: { Date: { date: new Date(1980, 1, 1) } } },
      Military: {}
    }
    const store = mockStore({ authentication: { authenticated: true }, application: modifiedState })
    const component = mount(<Provider store={store}><Military subsection="intro" /></Provider>)
    expect(component.find('.actions.next .text .label').text()).toBe('Selective service record')
  })

  it('hides disciplinary procedures if no valid military history', () => {
    const modifiedState = {
      Military: { History: { HasServed: { value: 'No' } } }
    }
    const store = mockStore({ authentication: { authenticated: true }, application: modifiedState })
    const component = mount(<Provider store={store}><Military subsection="history" /></Provider>)
    expect(component.find('.actions.next .text .label').text()).not.toBe('Disciplinary procedures')
  })

  it('displays disciplinary procedures if military history is "Yes"', () => {
    const modifiedState = {
      Military: { History: { HasServed: { value: 'Yes' } } }
    }
    const store = mockStore({ authentication: { authenticated: true }, application: modifiedState })
    const component = mount(<Provider store={store}><Military subsection="history" /></Provider>)
    expect(component.find('.actions.next .text .label').text()).toBe('Disciplinary procedures')
  })
})
