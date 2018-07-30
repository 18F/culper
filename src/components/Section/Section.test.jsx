import React from 'react'
import renderer from 'react-test-renderer'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import Section from './Section'
import { mount } from 'enzyme'

describe('The section component', () => {
  const mockStore = configureMockStore()

  it('is visible', () => {
    const component = mount(
      <MemoryRouter>
        <Section />
      </MemoryRouter>
    )
    expect(component.find('div').length > 0).toBe(true)
  })

  it('renders the Section component', () => {
    window.token = 'fake-token'
    const store = mockStore({
      authentication: { authenticated: true, token: 'fake-token' }
    })
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <Section section="identification" />
        </MemoryRouter>
      </Provider>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
