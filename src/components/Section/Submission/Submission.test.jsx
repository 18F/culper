import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import Submission, { allSectionsValid } from './Submission'

const applicationState = {
  Identification: {},
  Completed: {
    identification: [
      { code: 'identification/name', section: 'identification', subsection: 'name', valid: false }
    ]
  }
}

describe('The Submission form component', () => {
  window.token = 'fake-token'
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('visible when authenticated', () => {
    window.token = 'fake-token'
    const store = mockStore({
      authentication: { authenticated: true, twofactor: true },
      application: applicationState
    })
    const component = mount(<Provider store={store}><Submission Application={applicationState} /></Provider>)
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('returns all valid sections', () => {
    const sections = [
      {
        title: 'Identification',
        url: 'identification',
        subsections: [
          {
            url: 'identification/name',
            name: 'Full name',
            complete: true
          }
        ]
      },
      {
        title: 'Foreign activities',
        url: 'foreign',
        subsections: [
          {
            url: 'foreign/passport',
            name: 'U.S. passport information',
            complete: true
          }
        ]
      }
    ]

    expect(allSectionsValid(sections)).toBe(true)
  })

  it('returns false for some invalid sections', () => {
    const sections = [
      {
        title: 'Identification',
        url: 'identification',
        subsections: [
          {
            url: 'identification/name',
            name: 'Full name',
            complete: true
          }
        ]
      },
      {
        title: 'Foreign activities',
        url: 'foreign',
        subsections: [
          {
            url: 'foreign/passport',
            name: 'U.S. passport information',
            complete: false
          }
        ]
      }
    ]

    expect(allSectionsValid(sections)).toBe(false)
  })
})

