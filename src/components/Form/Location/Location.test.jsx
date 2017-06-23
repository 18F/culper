import React from 'react'
import { mount } from 'enzyme'
import Location from './Location'

describe('The Address component', () => {
  it('Renders without errors', () => {
    const component = mount(<Location />)
    expect(component.find('.location').length).toBe(1)
  })

  //it('Renders all possible fields', () => {
    //let updates = 0

    //const layouts = [
      //{
        //layout: Location.BIRTHPLACE,
        //expected: ['.j
      //}
    //]

    //const onUpdate = () => { updates++ }
    //const component = mount(<Location onUpdate={onUpdate} />)
    //component.find('.mailing input').simulate('change')
    //component.find('.city input').simulate('change')
    //component.find('.state input').simulate('change', { target: { value: 'Virginia' } })
    //component.find('.zipcode input').simulate('change')
    //expect(updates).toBe(4)
  //})

  //it('Performs APO/FPO updates', () => {
    //let updates = 0
    //const onUpdate = () => { updates++ }
    //const component = mount(<Address onUpdate={onUpdate} country="POSTOFFICE" />)
    //component.find('.mailing input').simulate('change')
    //component.find('.apofpo .apo input').simulate('change')
    //component.find('.state input').simulate('change', { target: { value: 'AA' } })
    //component.find('.zipcode input').simulate('change')
    //expect(updates).toBe(4)
  //})

  //it('Performs International updates', () => {
    //let updates = 0
    //const onUpdate = () => { updates++ }
    //const component = mount(<Address onUpdate={onUpdate} country="" />)
    //component.find('.mailing input').simulate('change')
    //component.find('.city input').simulate('change')
    //component.find('.country input').simulate('change', { target: { value: 'Germany' } })
    //expect(updates).toBe(3)
  //})

  //it('Performs address type update', () => {
    //let updates = 0
    //const onUpdate = () => { updates++ }
    //const component = mount(<Address onUpdate={onUpdate} />)
    //component.find('.address-options .domestic input').simulate('change')
    //component.find('.address-options .postoffice input').simulate('change')
    //component.find('.address-options .international input').simulate('change')
    //expect(updates).toBe(3)
  //})
})
