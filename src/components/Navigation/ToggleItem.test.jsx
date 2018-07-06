import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import ToggleItem from './ToggleItem'

describe("The ToggleItem component", () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  const mountSection = (section, initialPath = '/', state = {}) => {
    const store = mockStore(state)
    return mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialPath]}>
          <ToggleItem section={section} />
        </MemoryRouter>
      </Provider>
    )
  }

  it("renders a ToggleItem with subsections", () => {
    const section = {
      name: 'Foo',
      url: 'foo',
      subsections: [
        {
          name: 'Bar',
          url: 'bar'
        },
        {
          name: 'Baz',
          url: 'baz',
          subsections: [
            {
              name: 'Blip',
              url: 'blip'
            }
          ]
        }
      ]
    }

    const component = mountSection(section, '/form/foo/baz/blip')

    expect(component.find('a').length).toBe(4)
    expect(component.find('a[href="/form/foo"]').length).toBe(0)
    expect(component.find('a[href="/form/foo/bar"]').length).toBe(1)
    expect(component.find('a[href="/form/foo/baz"]').length).toBe(0)
    expect(component.find('a[href="/form/foo/baz/blip"]').length).toBe(1)

    expect(component.find('a.usa-current').length).toBe(3)
  })
})
