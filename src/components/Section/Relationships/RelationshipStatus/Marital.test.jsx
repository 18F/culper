import React from 'react'
import { mount } from 'enzyme'
import Marital from './Marital'

describe('The relationship status component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'relatives'
    }

    const component = mount(<Marital {...expected} />)
    expect(component.find('.marital').length).toEqual(1)
  })

  //it('performs updates', () => {
    //let updates = 0
    //const expected = {
      //name: 'relatives',
      //onUpdate: () => { updates++ }
    //}

    //const component = mount(<Marital {...expected} />)
    //expect(component.find('.relationship-status').length).toEqual(1)
    //component.find('.status-options .never input').simulate('change')

    //component.find('input#first').simulate('change')
    //component.find('input#month').first().simulate('change', { target: { value: '1' } })
    //component.find('.birthplace .no input').simulate('change')
    //expect(updates).toBe(3)
  //})
})
