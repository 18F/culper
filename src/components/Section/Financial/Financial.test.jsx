import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Financial, { FinancialSections } from '@components/Section/Financial'
import { mount } from 'enzyme'
import { testSnapshot } from '@components/test-helpers'

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
  const mockStore = configureMockStore()


  it('can review all subsections', () => {
    const store = mockStore({})
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
    const store = mockStore({})

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
