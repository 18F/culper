import React from 'react'
import { MemoryRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { SF86 } from 'constants/formTypes'

import Relationships from 'components/Section/Relationships/Relationships'

describe('The family and friends section', () => {
  const mockStore = configureMockStore()

  it('can review all subsections', () => {
    const store = mockStore({ authentication: { formType: SF86 }, application: {} })
    const component = mount(
      <MemoryRouter initialEntries={['/form/relationships/review']}>
        <Provider store={store}>
          <Relationships subsection="review" />
        </Provider>
      </MemoryRouter>
    )

    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can go to each subsection', () => {
    const sections = ['marital', 'friends', 'relatives', 'review']
    const store = mockStore({ authentication: { formType: SF86 }, application: {} })

    sections.forEach((section) => {
      const component = mount(
        <MemoryRouter initialEntries={[`/form/relationships/${section}`]}>
          <Provider store={store}>
            <Relationships subsection={section} />
          </Provider>
        </MemoryRouter>
      )

      expect(component.find('div').length).toBeGreaterThan(0)
    })
  })
})
