import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import NonCriminalCourtAction from './NonCriminalCourtAction'

describe('The NonCriminalCourtAction component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <NonCriminalCourtAction {...expected} />
        </Provider>
      )
  })

  it('no error on empty', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    expect(component.find('.non-criminal-court-action').length).toEqual(1)
    component.find('.civil-action-date .year input').simulate('change')
    component.find('.court-name input').simulate('change')
    component.find('.court-address .city input').simulate('change')
    component.find('.nature-of-action textarea').simulate('change')
    component.find('.results-of-action textarea').simulate('change')
    component.find('.principal-party-names textarea').simulate('change')
    expect(updates).toBe(6)
  })
})
