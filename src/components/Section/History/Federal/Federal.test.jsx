import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import ConnectedFederal from './Federal'

describe('The federal component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore({
      application: {
        Settings: {
          formType: 'SF86',
        },
      },
    })

    createComponent = (expected = {}) => mount(
      <Provider store={store}>
        <ConnectedFederal {...expected} />
      </Provider>,
    )
  })

  it('selects yes and loads form', () => {
    const expected = {
      name: 'federal_service',
      HasFederalService: { value: 'Yes' },
      List: { items: [{}] },
    }

    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBeGreaterThan(0)
    expect(component.find('.accordion .daterange').length).toBeGreaterThan(0)
    expect(component.find('.accordion input').length).toBeGreaterThan(0)
    expect(component.find('.accordion .address').length).toBeGreaterThan(0)
  })

  it('selects no', () => {
    const expected = {
      name: 'federal_service',
      HasFederalService: { value: 'No' },
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('recieves updates from children', () => {
    let updates = 0
    const expected = {
      name: 'federal_service',
      HasFederalService: { value: 'Yes' },
      List: { items: [{}] },
      onUpdate: () => { updates += 1 },
    }

    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(1)
    component.find({ type: 'text', name: 'Position' }).simulate('change')
    component.find({ type: 'text', name: 'Name' }).simulate('change')
    component
      .find('.accordion .datecontrol .day input')
      .first()
      .simulate('change')
    component.find('.accordion .mailing input').simulate('change')
    expect(updates).toBeGreaterThan(3)
  })

  it('can display a summary', () => {
    const expected = {
      name: 'federal_service',
      HasFederalService: { value: 'Yes' },
      List: {
        items: [
          {
            Item: {
              Name: {
                value: 'Acme',
              },
              Position: {
                value: ' Chief Anvil Engineer',
              },
              Dates: {
                from: {
                  year: '2017',
                  month: '1',
                  day: '1',
                },
                to: {
                  year: '2017',
                  month: '2',
                  day: '1',
                },
              },
            },
          },
          {
            Item: {
              Name: {
                value: 'Quills R Us',
              },
              Position: {
                value: 'I wrote stuff',
              },
              Dates: {
                from: {
                  year: '2017',
                  month: '2',
                  day: '1',
                },
                to: {
                  year: '2017',
                  month: '3',
                  day: '1',
                },
              },
            },
          },
        ],
      },
    }

    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(1)
    expect(component.find('.accordion .item').length).toBe(2)
    expect(component.find('.accordion .index').length).toBe(2)
    expect(component.find('.accordion .dates').length).toBe(2)
  })
})
