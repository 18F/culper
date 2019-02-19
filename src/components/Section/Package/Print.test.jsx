import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { api } from '@services'
import Print from '@components/Section/Package/Print'
import { testSnapshot } from '@components/test-helpers'

const applicationState = {
  Application: {}
}

// give a fake GUID so the field IDs don't differ between snapshots
// https://github.com/facebook/jest/issues/936#issuecomment-404246102
jest.mock('../../Form/ValidationElement/helpers', () =>
  Object.assign(require.requireActual('../../Form/ValidationElement/helpers'), {
    newGuid: jest.fn().mockReturnValue('MOCK-GUID')
  })
)

describe('The print section', () => {
  const mockStore = configureMockStore()

  beforeEach(() => {
    const mock = new MockAdapter(api.proxy)
    mock.onGet('/me/attachment').reply(200, {})
  })

  it('visible when authenticated', () => {
    const store = mockStore({
      application: applicationState
    })
    const component = mount(
      <Provider store={store}>
        <Print subsection="intro" />
      </Provider>
    )
    expect(component.find('.section-print-container').length).toBe(10)
  })

  it('launches print dialog', () => {
    let printed = false
    window.print = function() {
      printed = true
    }
    const store = mockStore({
      application: applicationState
    })
    const component = mount(
      <Provider store={store}>
        <Print subsection="intro" />
      </Provider>
    )
    component.find('.print-btn').simulate('click')
    expect(printed).toBe(true)
  })

  it('renders properly', () => {
    const store = mockStore({
      application: applicationState
    })
    testSnapshot(
      <Provider store={store}>
        <Print subsection="intro" />
      </Provider>
    )
  })
})
