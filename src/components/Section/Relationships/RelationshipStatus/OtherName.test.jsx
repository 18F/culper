import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import OtherName from './OtherName'

describe('The other name componen (in Relationships)', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <OtherName {...expected} />
        </Provider>
      )
  })

  it('can update', () => {
    let updates = 0
    const props = {
      onUpdate: () => updates++
    }
    const component = createComponent(props)
    component.find('.name .first input').simulate('change')
    component.find('.maiden-name .yes input').simulate('change')
    component.find('.datesused .to .day input').simulate('change')
    expect(updates).toBe(3)
  })
})
