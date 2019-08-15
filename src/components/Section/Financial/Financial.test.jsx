import React from 'react'
import { MemoryRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'

import Financial, { FinancialSections } from 'components/Section/Financial'
import { testSnapshot } from 'components/test-helpers'

// give a fake GUID so the field IDs don't differ between snapshots
// https://github.com/facebook/jest/issues/936#issuecomment-404246102
jest.mock('../../Form/ValidationElement/helpers', () => (
  Object.assign(require.requireActual('../../Form/ValidationElement/helpers'), {
    newGuid: jest.fn().mockReturnValue('MOCK-GUID'),
  })
))

describe('The financial section', () => {
  const mockStore = configureMockStore()


  it('can review all subsections', () => {
    const store = mockStore({
      application: {
        Settings: {
          formType: 'SF86',
        },
      },
    })

    const component = mount(
      <MemoryRouter initialEntries={['/form/financial/review']}>
        <Provider store={store}>
          <Financial subsection="review" />
        </Provider>
      </MemoryRouter>
    )
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can go to each subsection', () => {
    const sections = [
      'gambling',
      'bankruptcy',
      'taxes',
      'card',
      'credit',
      'delinquent',
      'nonpayment',
    ]

    const store = mockStore({
      application: {
        Settings: {
          formType: 'SF86',
        },
      },
    })

    sections.forEach((section) => {
      const component = mount(
        <MemoryRouter initialEntries={[`/form/financial/${section}`]}>
          <Provider store={store}>
            <Financial subsection={section} />
          </Provider>
        </MemoryRouter>
      )
      expect(component.find('div').length).toBeGreaterThan(0)
    })
  })

  it('renders the FinancialSections component', () => {
    const store = mockStore({
      form: {},
      application: {
        Settings: {
          formType: 'SF86',
        },
      },
    })

    testSnapshot(
      <Provider store={store}>
        <FinancialSections />
      </Provider>
    )
  })
})
