import React from 'react'
import { mount } from 'enzyme'
import Address, { handleGeocodeResponse } from './Address'
import { api } from '../../../services/api'
import MockAdapter from 'axios-mock-adapter'

describe('The Address component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      value: ''
    }
    const component = mount(<Address name={expected.name} label={expected.label} value={expected.value} />)
    component.find('input[name="address"]').simulate('change')
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('bubbles up validate event', () => {
    let validations = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      error: true,
      focus: false,
      valid: false,
      handleValidation: function (event) {
        validations++
      }
    }
    const component = mount(<Address name={expected.name} onValidate={expected.handleValidation} />)
    component.find('input').first().simulate('change')
    expect(validations > 0).toEqual(true)
  })

  it('bubbles up change event', () => {
    let changes = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      error: true,
      focus: false,
      valid: false,
      handleChange: function (event) {
        changes++
      }
    }
    const component = mount(<Address name={expected.name} onChange={expected.handleChange} />)
    component.find('input#address').first().simulate('change')
    expect(changes).toEqual(1)
  })

  it('bubbles up focus event', () => {
    let foci = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      error: true,
      focus: false,
      valid: false,
      handleFocus: function (event) {
        foci++
      }
    }
    const component = mount(<Address name={expected.name} onFocus={expected.handleFocus} />)
    component.find('input').first().simulate('focus')
    expect(foci).toEqual(1)
  })

  it('bubbles up blur event', () => {
    let blurs = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      error: true,
      focus: false,
      valid: false,
      handleBlur: function (event) {
        blurs++
      }
    }
    const component = mount(<Address name={expected.name} onBlur={expected.handleBlur} />)
    component.find('input').first().simulate('blur')
    expect(blurs).toEqual(1)
  })

  it('Renders United States Address', () => {
    let blurs = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      error: true,
      focus: false,
      valid: false,
      handleBlur: function (event) {
        blurs++
      }
    }
    const component = mount(<Address name={expected.name} onBlur={expected.handleBlur} />)
    component.find({ type: 'radio', name: 'addressType', value: 'United States' }).simulate('change')
    component.find({ type: 'radio', name: 'addressType', value: 'APOFPO' }).simulate('change')
    component.find({ type: 'radio', name: 'addressType', value: 'International' }).simulate('change')
  })

  it('Renders exact match geocoded information', () => {
    const expected = {
      name: 'someaddress',
      address: '123 Some Rd',
      city: 'Arlington',
      state: 'VA',
      zipcode: '22202'
    }

    const component = mount(<Address {...expected} />)
    expect(component.find('.suggestions .modal-content').length).toBe(0)
  })

  it('Renders modal with suggestion and selects it', () => {
    const expected = {
      name: 'someaddress',
      address: '123 Some Rd',
      city: 'Arlington',
      state: 'VA',
      zipcode: '22202',
      suggestions: [{
        Address: '123 Some Rd',
        City: 'Arlington',
        State: 'VA',
        Zipcode: '22201'
      }]
    }

    const component = mount(<Address {...expected} />)
    expect(component.find('.suggestions .modal-content').length).toBe(1)
    component.find('.suggestion-btn').first().simulate('click')
    expect(component.find('.suggestions .modal-content').length).toBe(0)
  })

  it('Renders modal with suggestion but selects to use current address', () => {
    const expected = {
      name: 'someaddress',
      address: '123 Some Rd',
      city: 'Arlington',
      state: 'VA',
      zipcode: '22202',
      suggestions: [{
        Address: '123 Some Rd',
        City: 'Arlington',
        State: 'VA',
        Zipcode: '22201'
      }]
    }

    const component = mount(<Address {...expected} />)
    expect(component.find('.suggestions .modal-content').length).toBe(1)
    component.find('.dismiss a').first().simulate('click')
    expect(component.find('.suggestions .modal-content').length).toBe(0)
  })

  it('Renders with address, simulates change to initiate geocode', () => {
    api.setToken('my-token')
    const mock = new MockAdapter(api.proxySecured)
    mock.onPost('/validate/address').reply(200, {
      Errors: [{
        Error: 'error.geocode.partial',
        Fieldname: 'Address',
        Suggestions: [{
          Address: '123 Some Rd',
          City: 'Arlington',
          State: 'VA',
          Zipcode: '22202'
        }]
      }]
    })

    let updates = 0
    const expected = {
      name: 'someaddress',
      address: '123 Some Road',
      city: 'Arlington',
      state: 'VA',
      zipcode: '22202',
      suggestions: [],
      onUpdate: () => {
        updates++
      }
    }

    const component = mount(<Address {...expected} />)
    expect(component.find('.suggestions .modal-content').length).toBe(0)
    component.find('input#address').simulate('change')
    component.find('input#address').simulate('blur')
    expect(updates).toBe(1)
  })

  it('Renders with address, simulates change to initiate geocode', () => {
    api.setToken('my-token')
    const mock = new MockAdapter(api.proxySecured)
    mock.onPost('/validate/address').reply(200, {
      Errors: [{
        Error: 'error.geocode.partial',
        Fieldname: 'Address',
        Suggestions: []
      }]
    })

    const expected = {
      name: 'someaddress',
      address: '123 Some Road',
      city: 'Arlingto',
      state: 'VA',
      zipcode: '22202',
      suggestions: []
    }

    const component = mount(<Address {...expected} />)
    expect(component.find('.suggestions .modal-content').length).toBe(0)
    component.find('input#address').simulate('change')
    component.find('input#address').simulate('blur')
    expect(component.find('.suggestions .modal-content').length).toBe(0)
  })

  it('handles geocoded response', () => {
    const tests = [
      {
        response: {
          Errors: null
        },
        expected: {
          complexStatus: true,
          suggestions: [],
          codes: []
        }
      },
      {
        response: {
          Errors: [
            {
              Suggestions: [],
              Fieldname: 'Address',
              Error: null
            }
          ]
        },
        expected: {
          complexStatus: false,
          suggestions: [],
          geocodeErrorCode: null,
          geocodeError: true
        }
      },
      {
        response: {
          Errors: [
            {
              Suggestions: [{
                Address: '123 Some Rd',
                City: 'Arlington',
                State: 'VA',
                Zipcode: '22202'
              }],
              Fieldname: 'Address',
              Error: null
            }
          ]
        },
        expected: {
          complexStatus: false,
          suggestions: [{
            Address: '123 Some Rd',
            City: 'Arlington',
            State: 'VA',
            Zipcode: '22202'
          }],
          geocodeErrorCode: null,
          geocodeError: true
        }
      }
    ]

    tests.forEach(test => {
      expect(handleGeocodeResponse(test.response)).toEqual(test.expected)
    })
  })
})
