import React from 'react'
import { mount } from 'enzyme'
import Address from './Address'

describe('The Address component', () => {
  it('Renders without errors', () => {
    const component = mount(<Address />)
    expect(component.find('.address').length).toBe(1)
  })

  it('Performs US updates', () => {
    let updates = 0
    const props = {
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<Address {...props} />)
    component.find('.street input').simulate('change')
    component.find('.street2 input').simulate('change')
    component.find('.city input').simulate('change')
    component
      .find('.state input')
      .simulate('change', { target: { value: 'Virginia' } })
    component.find('.zipcode input').simulate('change')
    expect(updates).toBe(5)
  })

  it('Performs APO/FPO updates', () => {
    let updates = 0
    const props = {
      country: { value: 'POSTOFFICE' },
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<Address {...props} />)
    component.find('.mailing input').simulate('change')
    component.find('.apofpo .apo input').simulate('change')
    component
      .find('.state input')
      .simulate('change', { target: { value: 'AA' } })
    component.find('.zipcode input').simulate('change')
    expect(updates).toBe(4)
  })

  it('Performs International updates', () => {
    let updates = 0
    const props = {
      country: { value: '' },
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<Address {...props} />)
    component.find('.mailing input').simulate('change')
    component.find('.city input').simulate('change')
    component
      .find('.country input')
      .simulate('change', { target: { value: 'Germany' } })
    expect(updates).toBe(3)
  })

  it('Performs address type update', () => {
    let updates = 0
    const props = {
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<Address {...props} />)
    component.find('.address-options .domestic input').simulate('change')
    component.find('.address-options .postoffice input').simulate('change')
    component.find('.address-options .international input').simulate('change')
    expect(updates).toBe(3)
  })

  it('Validates required', () => {
    const props = {
      required: true,
      country: { value: 'Germany' }
    }
    const component = mount(<Address {...props} />)
    expect(component.find('.usa-input-error').length).toBe(2)
  })

  it('Invalidates wrong zipcode for state', () => {
    const props = {
      state: 'VA',
      zipcode: '90210'
    }
    const component = mount(<Address {...props} />)
    expect(component.find('.zipcode .usa-input-error').length).toBe(1)
  })

  it('Validates correct zipcode for state', () => {
    const props = {
      state: 'CA',
      zipcode: '90210'
    }
    const component = mount(<Address {...props} />)
    expect(component.find('.zipcode .usa-input-error').length).toBe(0)
  })

  it('clears city switching from APO/FPO', () => {
    let city = 'APO'
    const props = {
      city: 'APO',
      country: { value: 'POSTOFFICE' },
      onUpdate: values => {
        city = values.city
      }
    }
    const component = mount(<Address {...props} />)
    component.find('.address-options .domestic input').simulate('change')
    expect(city).toBe('')
  })

  it('can hide APO/FPO option', () => {
    const props = {
      showPostOffice: false
    }
    const component = mount(<Address {...props} />)
    expect(component.find('.address-options .postoffice').length).toBe(1)
  })

  it('simulate blurring', () => {
    let blurred = 0
    const props = {
      onBlur: () => {
        blurred++
      }
    }
    const component = mount(<Address {...props} />)
    component.find('.street input').simulate('blur')
    component.find('.street2 input').simulate('blur')
    component.find('.city input').simulate('blur')
    component.find('.state input').simulate('blur')
    component.find('.zipcode input').simulate('blur')
    expect(blurred).toBe(5)
  })

  it('simulate focus', () => {
    let focused = 0
    const props = {
      onFocus: () => {
        focused++
      }
    }
    const component = mount(<Address {...props} />)
    component.find('.street input').simulate('focus')
    component.find('.street2 input').simulate('focus')
    component.find('.city input').simulate('focus')
    component.find('.state input').simulate('focus')
    component.find('.zipcode input').simulate('focus')
    expect(focused).toBe(5)
  })
})
