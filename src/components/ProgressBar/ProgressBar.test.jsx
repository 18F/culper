import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import ProgressBar from './ProgressBar'

describe('The progress bar component', () => {
  // Setup
  window.token = 'fake-token'
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('hidden when not authenticated', () => {
    window.token = ''
    const store = mockStore({ authentication: [] })
    const component = mount(<Provider store={store}><ProgressBar /></Provider>)
    expect(component.find('div').length).toEqual(0)
    window.token = 'fake-token'
  })

  it('visible when authenticated', () => {
    const store = mockStore({ authentication: { authenticated: true } })
    const component = mount(<Provider store={store}><ProgressBar /></Provider>)
    expect(component.find('div').length).toEqual(2)
    expect(component.find('#progress-bar').props().style.width).toBe('0%')
  })

  it('increments counter', () => {
    const application = {
      Completed: {
        citizenship: [
          { section: 'citizenship', subsection: 'status', valid: true },
          { section: 'citizenship', subsection: 'multiple', valid: true },
          { section: 'citizenship', subsection: 'passports', valid: true }
        ]
      }
    }

    const store = mockStore({
      application: application,
      section: {
        section: 'psychological',
        subsection: 'competence'
      },
      authentication: {
        authenticated: true
      }
    })

    const component = mount(<Provider store={store}><ProgressBar /></Provider>)
    expect(component.find('div').length).toEqual(2)
    expect(component.find('#progress-bar').props().style.width).not.toBe('0%')
  })
})
