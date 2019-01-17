import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import SectionList from './SectionList'
import * as validators from '../../validators/index'

describe('The SectionList component', () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  const mountSection = sections => {
    const store = mockStore({ authentication: { authenticated: true } })
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
        url: 'blah'
      }
    ]

    const component = mountSection(sections)
    console.log(component.debug())
    expect(component.find('a').length).toBe(1)
  })

  it('doesnt show a link with hidden true', () => {
    const sections = [
      {
        name: 'blah',
        url: 'blah',
        hidden: true
      }
    ]

    const component = mountSection(sections)
    console.log(component.debug())
    expect(component.find('a').length).toBe(0)
  })

  it('doesnt show a link with hiddenFunc true', () => {
    const sections = [
      {
        name: 'blah',
        url: 'blah',
        hiddenFunc: () => {
          return true
        }
      }
    ]

    const component = mountSection(sections)
    expect(component.find('a').length).toBe(0)
  })
})
