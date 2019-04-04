import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { mount } from 'enzyme'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import AppWithForm from 'components/Main/AppWithForm'

describe('AppWithForm', () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  const store = mockStore({
    authentication: {
      authenticated: true,
      formType: 'SF86',
    },
    application: {
      Settings: {
        acceptedTerms: 'Yes',
      },
      Errors: {},
      Completed: {},
    },
    section: {},
  })

  const props = {
    example: 'MyProperty',
  }
  let component

  beforeEach(() => {
    window.token = 'fake-token'
    component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <AppWithForm {...props} />
        </MemoryRouter>
      </Provider>
    )
  })

  it('renders app with props', () => {
    expect(component.find('Connect(App)').length).toBe(1)
    expect(component.find('Connect(App)').props().example).toBe('MyProperty')
  })
  it('renders form with props', () => {
    expect(component.find('Form').length).toBe(1)
    expect(component.find('Form').props().example).toBe('MyProperty')
  })
  it('is wrapped with AuthenticatedView', () => {
    expect(component.find('Connect(RequiresAuth)').length).toBe(1)
  })
})
