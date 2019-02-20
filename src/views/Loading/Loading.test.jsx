import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { api } from '@services'
import Loading from '@views/Loading/Loading'

describe('The data loading view', () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  it('is visible with context', () => {
    const mock = new MockAdapter(api.proxy)
    mock.onGet('/me/form').reply(200, {})

    const store = mockStore({ authentication: { authenticated: true } })
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Loading />
        </MemoryRouter>
      </Provider>
    )
    expect(component.find('.loading').length).toEqual(1)
    expect(component.find('.spinner').length).toEqual(1)
  })
})
