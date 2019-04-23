import React from 'react'
import { MemoryRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import Citizenship from 'components/Section/Citizenship'

describe('The citizenship section', () => {
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
      <MemoryRouter>
        <Provider store={store}>
          <Citizenship subsection="review" />
        </Provider>
      </MemoryRouter>
    )
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can go to each subsection', () => {
    const sections = ['status', 'multiple']
    const store = mockStore({
      application: {
        Settings: {
          formType: 'SF86',
        },
      },
    })

    sections.forEach((section) => {
      const component = mount(
        <MemoryRouter>
          <Provider store={store}>
            <Citizenship subsection={section} />
          </Provider>
        </MemoryRouter>
      )
      expect(component.find('div').length).toBeGreaterThan(0)
    })
  })
})
