import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import JobOffer from './JobOffer'

describe('The foreign business job offer component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <JobOffer {...expected} />
        </Provider>
      )
  })

  it('trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-employment',
      Address: { country: { value: 'United States' } },
      Accepted: { value: 'Yes' },
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    updates = 0
    component.find('.employment-name .first input').simulate('change')
    component.find('.employment-description textarea').simulate('change')
    component.find('.employment-date .day input').simulate('change')
    component.find('.employment-address .city input').simulate('change')
    component.find('.employment-accepted .yes input').simulate('change')
    component.find('.employment-explanation textarea').simulate('change')
    expect(updates).toBe(6)
  })
})
