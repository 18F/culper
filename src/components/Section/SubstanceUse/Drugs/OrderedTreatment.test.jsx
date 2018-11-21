import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import OrderedTreatment from './OrderedTreatment'

describe('The OrderedTreatment component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <OrderedTreatment {...expected} />
        </Provider>
      )
  })

  it('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.drug-ordered-treatment').length).toBe(1)
  })

  it('Performs update of basic fields', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    expect(component.find('.drug-ordered-treatment').length).toBe(1)

    component.find('.ordered-by .employer input').simulate('change')
    component.find('.explanation textarea').simulate('change')
    component.find('.action-taken .yes input').simulate('change')
    expect(updates).toBe(3)
  })

  it('Performs update when action taken is marked yes', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      ActionTaken: {
        value: 'Yes'
      }
    }
    const component = createComponent(expected)

    component.find('.drug-type-ordered .cocaine input').simulate('change')
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

  it('Performs update when action taken is marked yes and no treatment completed', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      ActionTaken: {
        value: 'Yes'
      },
      TreatmentCompleted: {
        value: 'No'
      }
    }
    const component = createComponent(expected)

    component.find('.no-treatment-explanation textarea').simulate('change')
    expect(updates).toBe(1)
  })

  it('Performs update when action taken is marked no', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      ActionTaken: {
        value: 'No'
      }
    }
    const component = createComponent(expected)

    component.find('.no-action-taken-explanation textarea').simulate('change')
    expect(updates).toBe(1)
  })

  it('Deselect ordered by', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      ActionTaken: {
        value: 'No'
      },
      OrderedBy: ['Employer']
    }
    const component = createComponent(expected)

    component.find('.ordered-by .employer input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Select none', () => {
    let none = []
    const expected = {
      onUpdate: selected => {
        none = selected.OrderedBy
      },
      ActionTaken: {
        value: 'No'
      },
      OrderedBy: ['Employer', 'Judge']
    }
    const component = createComponent(expected)
    component.find('.ordered-by .none input').simulate('change')
    expect(none).toEqual({ values: ['None'] })
  })
})
