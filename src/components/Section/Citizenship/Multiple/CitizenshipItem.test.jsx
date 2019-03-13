import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import CitizenshipItem from './CitizenshipItem'

describe('The citizenship item component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore({
      authentication: { formType: 'SF86' },
    })

    createComponent = (expected = {}) => (
      mount(
        <Provider store={store}>
          <CitizenshipItem {...expected} />
        </Provider>
      )
    )
  })

  it('display display question for current citizenship if NOT present', () => {
    const props = {
      Dates: {
        from: {},
        to: {},
        present: true,
      },
    }
    const component = createComponent(props)
    expect(component.find('.citizenship-current').length).toBe(0)
  })

  it('display display question for current citizenship if NOT present', () => {
    const props = {
      Dates: {
        from: {
          month: '1',
          day: '1',
          year: '2009',
        },
        to: {
          month: '1',
          day: '1',
          year: '2010',
        },
        present: false,
      },
    }
    const component = createComponent(props)
    expect(component.find('.citizenship-current').length).toBe(1)
  })

  it('can trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'citizenshipItem',
      Renounced: { value: 'Yes' },
      Dates: {
        from: {
          month: '1',
          day: '1',
          year: '2010',
        },
        to: {
          month: '1',
          day: '1',
          year: '2012',
        },
        present: false,
      },
      Current: { value: 'Yes' },
      onUpdate: () => {
        updates += 1
      },
    }
    const component = createComponent(expected)
    component.find('.citizenship-country .country input').simulate('change', {
      target: { name: 'Country', value: 'United States' },
    })
    component.find('.citizenship-dates .to .year input').simulate('change')
    component.find('.citizenship-how textarea').simulate('change')
    component.find('.citizenship-renounced .yes input').simulate('change')
    component
      .find('.citizenship-renounced-explanation textarea')
      .simulate('change')
    component.find('.citizenship-current .yes input').simulate('change')
    component
      .find('.citizenship-current-explanation textarea')
      .simulate('change')
    expect(updates).toBe(7)
  })
})
