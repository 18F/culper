import React from 'react'
import configureMockStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import Foreign from 'components/Section/Foreign/Foreign'
import { mount } from 'enzyme'


describe('The foreign section', () => {
  const mockStore = configureMockStore()

  it('renders without crashing', () => {
    const store = mockStore({})
    /* eslint-disable comma-dangle */
    mount(
      <Provider store={store}>
        <MemoryRouter>
          <Foreign subsection="review" />
        </MemoryRouter>
      </Provider>
    )
    /* eslint-disable comma-dangle */
  })
})
