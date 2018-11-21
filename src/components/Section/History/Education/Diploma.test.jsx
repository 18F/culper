import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { DiplomaItem } from './Diploma'

describe('The diploma component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <DiplomaItem {...expected} />
        </Provider>
      )
  })

  it('no error on empty', () => {
    const expected = {
      name: 'diploma'
    }
    const component = createComponent(expected)
    expect(component.find('.diploma').length).toEqual(1)
  })

  it('display textbox if "Other" is selected', () => {
    const expected = {
      name: 'diploma',
      Diploma: { value: 'Other' }
    }
    const component = createComponent(expected)
    expect(component.find('.other').length).toEqual(1)
  })

  it('not display textbox if "Other" is not selected', () => {
    const expected = {
      name: 'diploma',
      Diploma: { value: 'Doctorate' }
    }
    const component = createComponent(expected)
    expect(component.find('.other').length).toEqual(0)
  })

  it('can trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'diploma',
      Diploma: { value: 'Other' },
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    component.find('.diploma-highschool input').simulate('change')
    component.find('.diploma-other input').simulate('change')
    component
      .find('.other input')
      .simulate('change', { target: { name: 'DiplomaOther', value: 'Other' } })
    component
      .find('.date-awarded .month input')
      .simulate('change', { target: { name: 'month', value: '1' } })
    component
      .find('.date-awarded .year input')
      .simulate('change', { target: { name: 'year', value: '2010' } })
    expect(updates).toEqual(5)
  })
})
