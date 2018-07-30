import React from 'react'
import renderer from 'react-test-renderer'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import Section from './Section'
import { mount } from 'enzyme'

// give a fake GUID so the field IDs don't differ between snapshots
// https://github.com/facebook/jest/issues/936#issuecomment-404246102
jest.mock('../Form/ValidationElement/helpers', () =>
  Object.assign(require.requireActual('../Form/ValidationElement/helpers'), {
    newGuid: jest.fn().mockReturnValue('MOCK-GUID')
  })
)

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
    const component = renderer.create(
      <MemoryRouter>
        <Section />
      </MemoryRouter>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders the Section component at a particular subsection', () => {
    window.token = 'fake-token'
    const store = mockStore({
      authentication: { authenticated: true, token: 'fake-token' }
    })
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <Section section="identification" subsection="contacts" />
        </MemoryRouter>
      </Provider>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
