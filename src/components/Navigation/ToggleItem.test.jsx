import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import ToggleItem from './ToggleItem'

describe('The ToggleItem component', () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  const defaultState = {
    application: { Errors: {}, Completed: {} },
  }

  const mountSection = (section, initialPath = '/', state = defaultState) => {
    const store = mockStore(state)
    return mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialPath]}>
          <ToggleItem section={section} />
        </MemoryRouter>
      </Provider>
    )
  }

  it('renders a ToggleItem with subsections', () => {
    const section = {
      label: 'Foo',
      path: 'foo',
      subsections: [
        {
          label: 'Bar',
          path: 'bar',
        },
        {
          label: 'Baz',
          path: 'baz',
          subsections: [
            {
              label: 'Blip',
              path: 'blip',
            },
          ],
        },
      ],
    }

    const component = mountSection(section, '/foo/baz/blip')

    expect(component.find('button').length).toBe(2)
    expect(component.find('a').length).toBe(2)

    expect(component.find('a[href="/foo"]').length).toBe(0)
    expect(component.find('a[href="/foo/bar"]').length).toBe(1)
    expect(component.find('a[href="/foo/baz"]').length).toBe(0)
    expect(component.find('a[href="/foo/baz/blip"]').length).toBe(1)
    expect(component.find('a[href="/foo/baz/blip"].usa-current').length).toBe(1)
  })
})
