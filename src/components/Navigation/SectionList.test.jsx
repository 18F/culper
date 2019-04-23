import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import SectionList from './SectionList'

describe('The SectionList component', () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  const mountSection = (sections) => {
    const store = mockStore({
      authentication: { authenticated: true },
      application: {
        Errors: {},
        Completed: {},
        Settings: {
          formType: 'SF86',
        },
      },
    })

    return mount(
      <Provider store={store}>
        <MemoryRouter>
          <SectionList sections={sections} />
        </MemoryRouter>
      </Provider>
    )
  }

  it('renders a link', () => {
    const sections = [
      {
        name: 'blah',
        path: 'blah',
        key: 'blah',
        label: 'Blah',
      },
    ]

    const component = mountSection(sections)
    expect(component.find('a').length).toBe(1)
  })
})
