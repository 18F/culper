import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'

import { SF86, reviewSections } from 'config/formTypes'

import Navigation from './Navigation'
import { testSnapshot } from '../test-helpers'

describe('Navigation component', () => {
  window.token = 'fake-token'
  const mockStore = configureMockStore()

  it('renders correctly', () => {
    const store = mockStore({
      authentication: { authenticated: true },
      application: {
        Errors: {},
        Completed: {},
        Settings: {
          formType: 'SF86',
        },
        Citizenship: {},
        Financial: {},
        Foreign: {},
        History: {},
        Identification: {},
        Legal: {},
        Military: {},
        Package: {},
        Psychological: {},
        Relationships: {},
        Substance: {},
      },
    })

    const formSections = SF86.concat(reviewSections)

    testSnapshot(
      <MemoryRouter>
        <Provider store={store}>
          <Navigation sections={formSections} />
        </Provider>
      </MemoryRouter>
    )
  })
})
