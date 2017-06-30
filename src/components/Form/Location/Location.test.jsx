import React from 'react'
import { mount } from 'enzyme'
import Location from './Location'

describe('The Address component', () => {
  it('Renders without errors', () => {
    const component = mount(<Location />)
    expect(component.find('.location').length).toBe(1)
  })

  it('Renders US Address', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<Location onUpdate={onUpdate} layout={Location.US_ADDRESS} />)
    component.find('.street input').simulate('change')
    component.find('.city input').simulate('change')
    component.find('.state input').simulate('change', { target: { value: 'Virginia' } })
    component.find('.zipcode input').simulate('change')
    expect(updates).toBe(4)
  })

  it('Renders Country Address', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<Location onUpdate={onUpdate} layout={Location.COUNTRY} country="" />)
    component.find('.country input').simulate('change', { target: { value: 'Germnay' } })
    expect(updates).toBe(1)
  })

  it('Renders modal with just geocode error', () => {
    const expected = {
      name: 'someaddress',
      street: '123 Some Rd',
      city: 'Arlington',
      state: 'VA',
      zipcode: '22202',
      country: 'United States',
      suggestions: true,
      layout: Location.ADDRESS,
      geocodeResult: {
        Error: 'error.geocode.partial',
        Suggestions: []
      }
    }

    const component = mount(<Location {...expected} />)
    expect(component.find('.suggestions.modal-content').length).toBe(1)
  })

  it('Renders modal with suggestion and selects it', () => {
    const expected = {
      name: 'someaddress',
      street: '123 Some Rd',
      city: 'Arlington',
      state: 'VA',
      zipcode: '22202',
      country: 'United States',
      suggestions: true,
      layout: Location.ADDRESS,
      geocodeResult: {
        Error: 'error.geocode.partial',
        Suggestions: [{
          Address: '123 Some Rd',
          City: 'Arlington',
          State: 'VA',
          Zipcode: '22201'
        }]
      }
    }

    const component = mount(<Location {...expected} />)
    expect(component.find('.suggestions.modal-content').length).toBe(1)
    component.find('.suggestion-btn').first().simulate('click')
    expect(component.find('.suggestions.modal-content').length).toBe(0)
  })

  it('Renders modal with suggestion but selects to use current address', () => {
    const expected = {
      name: 'someaddress',
      street: '123 Some Rd',
      city: 'Arlington',
      state: 'VA',
      zipcode: '22202',
      suggestions: true,
      geocodeResult: {
        Error: 'error.geocode.partial',
        Suggestions: [{
          Address: '123 Some Rd',
          City: 'Arlington',
          State: 'VA',
          Zipcode: '22201'
        }]
      }
    }

    const component = mount(<Location {...expected} />)
    expect(component.find('.suggestions.modal-content').length).toBe(1)
    component.find('.dismiss a').first().simulate('click')
    expect(component.find('.suggestions.modal-content').length).toBe(0)
  })
})
