import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Multiple } from './Multiple'

describe('The multiple component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <Multiple {...expected} />
        </Provider>
      )
  })

  it('no error on empty', () => {
    const expected = {
      name: 'multiple'
    }
    const component = createComponent(expected)
    expect(component.find('.branch').length).toBeGreaterThan(0)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('displays accordion for citizenships', () => {
    const expected = {
      name: 'multiple',
      HasMultiple: { value: 'Yes' }
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('can trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'multiple',
      HasMultiple: { value: 'Yes' },
      List: { items: [{}] },
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    updates = 0
    component.find('.has-multiple .yes input').simulate('change')
    expect(updates).toBe(1)
  })

  it('displays custome summary', () => {
    const props = {
      HasMultiple: { value: 'Yes' },
      List: {
        branch: {},
        items: [
          {
            Item: {
              Dates: {
                from: {
                  month: '1',
                  day: '1',
                  year: '2000'
                },
                to: {
                  month: '4',
                  day: '1',
                  year: '2010'
                }
              },
              Country: {
                value: ['United States']
              }
            }
          }
        ]
      }
    }
    const component = createComponent(props)
    expect(component.find('.summary .left .context').text()).toBe(
      'United States'
    )
    expect(component.find('.summary .left .dates').text()).toBe(
      '1/2000 - 4/2010'
    )
  })
})
