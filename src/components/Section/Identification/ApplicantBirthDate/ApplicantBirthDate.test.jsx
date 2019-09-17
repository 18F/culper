import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import ApplicantBirthDate from './ApplicantBirthDate'

describe('The applicant birth date component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <ApplicantBirthDate {...expected} />
        </Provider>
      )
  })

  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      onUpdate: () => {}
    }
    const component = createComponent(expected)
    component.find('.month input').simulate('change')
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('loads data', () => {
    let updates = 0
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      Date: {
        month: '01',
        day: '01',
        year: '2018'
      },
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    component.find('.month input').simulate('change')
    component.find('.day input').simulate('change')
    component.find('.year input').simulate('change')
    component.find('.age-warning input').simulate('change')
    expect(updates).toBe(4)
  })

  it('displays age confirmation when age is under 16', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      Date: {
        month: '01',
        day: '01',
        year: '2018'
      },
      onUpdate: () => {}
    }
    const component = createComponent(expected)
    expect(component.find('.age-warning').length).toBe(1)
  })

  it('it does not display age confirmation when age is over 15 under 101', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      Date: {
        month: '01',
        day: '01',
        year: '2000'
      },
      onUpdate: () => {}
    }
    const component = createComponent(expected)
    expect(component.find('.age-warning').length).toBe(0)
  })

  it('it displays age error when age is over 100', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      Date: {
        month: '01',
        day: '01',
        year: '0001'
      },
      onUpdate: () => {}
    }
    const component = createComponent(expected)
    expect(component.find('.usa-alert-heading').length).toBe(1)
  })
})
