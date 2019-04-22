import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { mount } from 'enzyme'
import { Section } from 'components'

describe('The legal section', () => {
  const mockStore = configureMockStore()

  it('renders without crashing', () => {
    const store = mockStore({
      application: {
        Settings: {
          formType: 'SF86',
        },
      },
    })

    mount(
      <MemoryRouter>
        <Provider store={store}>
          <Section section="legal" subsection="intro" />
        </Provider>
      </MemoryRouter>
    )
  })
})
