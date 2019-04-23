import React from 'react'
import configureMockStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import Foreign from 'components/Section/Foreign/Foreign'
import { mount } from 'enzyme'

describe('The foreign section', () => {
  const mockStore = configureMockStore()

  it('can review all subsections', () => {
    const store = mockStore({
      application: {
        Settings: {
          formType: 'SF86',
        },
      },
    })

    mount(
      <Provider store={store}>
        <MemoryRouter>
          <Foreign subsection="review" />
        </MemoryRouter>
      </Provider>
    )
  })
})
