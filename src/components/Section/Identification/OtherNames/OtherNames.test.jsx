import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import OtherNames from './OtherNames'
import { mount } from 'enzyme'

describe('The other names section', () => {
  it('has no names initially', () => {
    const component = mount(<OtherNames />)
    expect(component.find('.first input').length).toEqual(0)
  })

  it('Renders form when yes is selected', () => {
    const props = {
      HasOtherNames: { value: 'Yes' },
      List: {
        items: [{ Item: {} }]
      }
    }
    const component = mount(<OtherNames {...props} />)
    expect(component.find('.details').length).toBeGreaterThan(0)
  })

  it('Does not render form when no is selected', () => {
    const props = {
      HasOtherNames: { value: 'No' }
    }
    const component = mount(<OtherNames {...props} />)
    expect(component.find('.details').length).toBe(0)
  })

  it('Adds a name when button is clicked then collapses', () => {
    const props = {
      HasOtherNames: { value: 'Yes' },
      List: {
        items: [{ Item: {} }]
      }
    }
    const component = mount(<OtherNames {...props} />)
    component.find('.addendum .branch .yes').simulate('click')
  })

  it('displays fields when "yes" is selected', () => {
    const props = {
      HasOtherNames: { value: 'Yes' },
      List: {
        items: [{ Item: {} }]
      }
    }
    const component = mount(<OtherNames {...props} />)
    expect(component.find('.first input').length).toEqual(1)
  })

  it('does not display any fields when "no" is selected', () => {
    const props = {
      HasOtherNames: { value: 'No' }
    }
    const component = mount(<OtherNames {...props} />)
    expect(component.find('.first input').length).toEqual(0)
  })

  it('updates branch', () => {
    let updates = 0
    const props = {
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<OtherNames {...props} />)
    component.find('.branch .yes input').simulate('change')
    expect(updates).toEqual(1)
  })
})
