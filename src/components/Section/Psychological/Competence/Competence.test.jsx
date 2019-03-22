import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import { Competence } from './Competence'

describe('The Competence component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore({ application: { Errors: {}, Completed: {} } })
    createComponent = (expected = {}) => (
      mount(
        <Provider store={store}>
          <Competence {...expected} />
        </Provider>
      )
    )
  })

  it('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.competence').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const props = {
      IsIncompetent: { value: 'Yes' },
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
