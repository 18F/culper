import React from 'react'
import { MemoryRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import History from 'components/Section/History/History'
import { mount } from 'enzyme'

describe('The History section', () => {
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
      <MemoryRouter initialEntries={['/form/history/review']}>
        <Provider store={store}>
          <History subsection="review" />
        </Provider>
      </MemoryRouter>,
    )

    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can go to each subsection', () => {
    const sections = [
      '',
      'review',
      'residence',
      'employment',
      'education',
      'federal',
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
        <MemoryRouter initialEntries={[`/form/history/${section}`]}>
          <Provider store={store}>
            <History subsection={section} />
          </Provider>
        </MemoryRouter>,
      )

      expect(component.find('div').length).toBeGreaterThan(0)
    })
  })
})
