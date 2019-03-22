import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import { Diagnoses } from './Diagnoses'

describe('The Diagnoses component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore({ application: { Errors: {}, Completed: {} } })
    createComponent = (expected = {}) => (
      mount(
        <Provider store={store}>
          <Diagnoses {...expected} />
        </Provider>
      )
    )
  })

  it('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.diagnoses').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const props = {
      Diagnosed: { value: 'Yes' },
      DidNotConsult: { value: 'Yes' },
      InTreatment: { value: 'Yes' },
      DiagnosisList: { items: [{}], branch: {} },
      TreatmentList: { items: [{}], branch: {} },
      onUpdate: () => {
        updates += 1
      },
    }
    const component = createComponent(props)
    component.find('input[name="Name"]').first().simulate('change')
    expect(updates).toBeGreaterThan(1)
  })
})
