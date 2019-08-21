import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import ConnectedPackageComments from './index'

describe('The Package Comments subsection', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore({
      application: { Settings: { formType: 'SF86' } },
    })
    createComponent = (expected = {}) => (
      mount(
        <Provider store={store}>
          <MemoryRouter>
            <ConnectedPackageComments {...expected} />
          </MemoryRouter>
        </Provider>
      )
    )
  })
  it('renders without crashing', () => {
    createComponent()
  })
})
