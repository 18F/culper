import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import DateRange from './DateRange'

describe('The date range component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <DateRange {...expected} />
        </Provider>
      )
  })

  it('handles custom dateRangePrefix', () => {
    const result = []
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      help: 'Helpful error message',
      dateRangePrefix: 'customPrefix',
      error: true,
      focus: false,
      valid: false,
      present: true,
      onError: jest.fn(() => {
        return this
      }),
      from: {
        day: '1',
        month: '4',
        year: '2010'
      },
      to: {
        day: '1',
        month: '1',
        year: '2000'
      }
    }
    const component = createComponent(expected)
    expect(expected.onError.mock.calls[1][1][0].code).toContain('customPrefix')
    expect(component.find('.to.usa-input-error').length).toBe(1)
  })

  it('handles dates in reversed order', () => {
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      help: 'Helpful error message',
      error: true,
      focus: false,
      valid: false,
      present: true,
      from: {
        day: '1',
        month: '4',
        year: '2010'
      },
      to: {
        day: '1',
        month: '1',
        year: '2000'
      }
    }
    const component = createComponent(expected)
    expect(component.find('.to.usa-input-error').length).toBe(1)
  })

  it('loads data', () => {
    let updates = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      help: 'Helpful error message',
      error: true,
      focus: false,
      valid: false,
      onUpdate: () => {
        updates++
      },
      from: {
        day: '1',
        month: '1',
        year: '2000'
      },
      to: {
        day: '1',
        month: '4',
        year: '2010'
      },
      receiveProps: true
    }
    const component = createComponent(expected)
    component.find('.present input').simulate('change')
    expect(updates).toBeGreaterThan(0)
  })

  it('can receive props', () => {
    const expected = {
      receiveProps: true
    }
    const component = createComponent(expected)
    component.setProps({ to: { day: '1', month: '1', year: '2000' } })
  })

  it('can update date field', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    component
      .find('.to .day input')
      .simulate('change', { target: { value: '15' } })
    expect(updates).toBeGreaterThan(0)
  })

  it('can click on present', () => {
    let updates = 0
    const expected = {
      onUpdate: values => {
        if (values.to) {
          updates++
        }
      }
    }
    const component = createComponent(expected)
    component.find('.present input').simulate('change')
    expect(updates).toBeGreaterThan(0)
  })

  it('hides the present button', () => {
    const expected = {
      allowPresent: false
    }
    const component = createComponent(expected)
    expect(component.find('.present').length).toBe(0)
  })
})
