import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import OtherNameItem from './OtherNameItem'

describe('The other names item component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <OtherNameItem {...expected} />
        </Provider>
      )
  })

  it('can update fields', () => {
    let updates = 0
    const props = {
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(props)
    component.find('.first input').simulate('change')
    component.find('.maiden-name .yes input').simulate('change')
    component.find('.datecontrol .from .day input').simulate('change')
    component.find('.reason textarea').simulate('change')
    expect(updates).toBeGreaterThan(0)
  })
})
