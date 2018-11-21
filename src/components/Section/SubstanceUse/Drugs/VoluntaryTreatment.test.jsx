import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import VoluntaryTreatment from './VoluntaryTreatment'

describe('The VoluntaryTreatment component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <VoluntaryTreatment {...expected} />
        </Provider>
      )
  })

  it('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.drug-voluntary-treatment').length).toBe(1)
  })

  it('Performs update', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)

    component.find('.drug-type-voluntary .cocaine input').simulate('change')
    component.find('.treatment-provider input').simulate('change')
    component.find('.treatment-provider-address .city input').simulate('change')
    component
      .find('.treatment-provider-telephone .telephone .number.three input')
      .at(0)
      .simulate('change')
    component.find('.treatment-dates .from .year input').simulate('change')
    component.find('.treatment-completed .yes input').simulate('change')
    expect(updates).toBe(6)
  })

  it('Performs update when no treatment completed', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      TreatmentCompleted: { value: 'No' }
    }
    const component = createComponent(expected)

    component.find('.no-treatment-explanation textarea').simulate('change')
    expect(updates).toBe(1)
  })
})
