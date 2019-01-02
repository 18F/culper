import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import Financial, { FinancialSections } from './Financial'
import { mount } from 'enzyme'
import { testSnapshot } from '../../test-helpers'

const applicationState = {
  Financial: {}
}

// give a fake GUID so the field IDs don't differ between snapshots
// https://github.com/facebook/jest/issues/936#issuecomment-404246102
jest.mock('../../Form/ValidationElement/helpers', () =>
  Object.assign(require.requireActual('../../Form/ValidationElement/helpers'), {
    newGuid: jest.fn().mockReturnValue('MOCK-GUID')
  })
)

describe('The financial section', () => {
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
        <Financial />
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
        <Financial />
      </Provider>
    )
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can review all subsections', () => {
    const store = mockStore({ authentication: { authenticated: true } })
    const component = mount(
      <Provider store={store}>
        <Financial subsection="review" />
      </Provider>
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
      'nonpayment'
    ]
    const store = mockStore({ authentication: { authenticated: true } })

    sections.forEach(section => {
      const component = mount(
        <Provider store={store}>
          <Financial subsection={section} />
        </Provider>
      )
      expect(component.find('div').length).toBeGreaterThan(0)
    })
  })

  it('renders the FinancialSections component', () => {
    testSnapshot(<FinancialSections />)
  })
})
