import React from 'react'
import { MemoryRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import SubstanceUse from 'components/Section/SubstanceUse'
import { SUBSTANCE_USE } from 'constants/sections'
import { SF86, reduceSubsections } from 'config/formTypes'

describe('The substance use section', () => {
  const mockStore = configureMockStore()

  it('can review all subsections', () => {
    const store = mockStore({
      authentication: {
        formType: 'SF86',
      },
    })
    const component = mount(
      <MemoryRouter>
        <Provider store={store}>
          <SubstanceUse subsection="review" />
        </Provider>
      </MemoryRouter>
    )
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can go to each subsection', () => {
    window.token = 'fake-token'

    const currentSection = SF86.find(s => (s.key === SUBSTANCE_USE))
    const subsections = reduceSubsections([currentSection])

    const store = mockStore({
      authentication: {
        formType: 'SF86',
      },
    })


    subsections.forEach((section) => {
      const component = mount(
        <MemoryRouter initialEntries={[section.fullPath]}>
          <Provider store={store}>
            <SubstanceUse subsection={section.path} />
          </Provider>
        </MemoryRouter>
      )

      expect(component.find('div').length).toBeGreaterThan(0)
    })
  })
})
