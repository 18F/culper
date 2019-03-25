import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import { Consultation } from './Consultation'

describe('The Consultation component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore({ application: { Errors: {}, Completed: {} } })
    createComponent = (expected = {}) => (
      mount(
        <Provider store={store}>
          <Consultation {...expected} />
        </Provider>
      )
    )
  })

  it('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.consultation').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const props = {
      Consulted: { value: 'Yes' },
      List: {
        items: [{}],
      },
      onUpdate: () => {
        updates += 1
      },
    }
    const component = createComponent(props)
    updates = 0
    component.find('input[name="CourtName"]').simulate('change')
    expect(updates).toBe(1)
  })
})
