import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import SectionLink from './SectionLink'

describe("The SectionLink component", () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  const mountSection = (section, initialPath = '/', state = {}) => {
    const store = mockStore(state)
    return mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialPath]}>
          <SectionLink section={section} />
        </MemoryRouter>
      </Provider>
    )
  }

  it("renders a basic SectionLink", () => {
    const section = {
      name: 'Foo',
      url: 'foo'
    }
    const component = mountSection(section)
    expect(component.find('a').length).toBe(1)
    expect(component.find('.fa-angle-down').length).toBe(0)
  })

  it("shows the section as 'active' when at the path", () => {
    const section = {
      name: 'Foo',
      url: 'foo'
    }
    const component = mountSection(section, '/form/foo')
    expect(component.find('a.usa-current').length).toBe(1)
  })

  it("doesn't show the section as 'active' when not at the path", () => {
    const section = {
      name: 'Foo',
      url: 'foo'
    }
    const component = mountSection(section, '/form/bar')
    expect(component.find('a.usa-current').length).toBe(0)
  })

  it("shows errors", () => {
    const section = {
      name: 'Foreign activity',
      url: 'foreign'
    }
    const state = {
      application: {
        Errors: {
          foreign: [
            { section: 'foreign', subsection: 'activities/direct', valid: false, code: 'date.month.notfound' }
          ]
        }
      }
    }

    const component = mountSection(section, '/form/foreign', state)
    expect(component.find('.has-errors').length).toBe(1)
  })
})
