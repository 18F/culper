import React from 'react'
import { mount } from 'enzyme'
import Selective from './Selective'

describe('The selective service component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'selective'
    }
    const component = mount(<Selective {...expected} />)
    expect(component.find('input[type="radio"]').length).toEqual(2)
    expect(component.find('.selected').length).toEqual(0)
  })

  it('selects no on born after and nothing more', () => {
    const expected = {
      name: 'selective',
      WasBornAfter: { value: 'No' }
    }
    const component = mount(<Selective {...expected} />)
    component.find('.born .no input').simulate('change')
    expect(component.find('.registered .yes input').length).toEqual(0)
  })

  it('selects yes on born after and asks if registered', () => {
    const expected = {
      name: 'selective',
      WasBornAfter: { value: 'Yes' }
    }
    const component = mount(<Selective {...expected} />)
    component.find('.born .yes input').simulate('change')
    expect(component.find('.registered .yes input').length).toEqual(1)
  })

  it('selects no on registered and is presented with explanation', () => {
    const expected = {
      name: 'selective',
      WasBornAfter: { value: 'Yes' },
      HasRegistered: { value: 'No' }
    }
    const component = mount(<Selective {...expected} />)
    component.find('.born .yes input').simulate('change')
    component.find('.registered .no input').simulate('change')
    component.find('.explanation textarea').simulate('change')
    expect(component.find('.explanation').length).toBe(1)
    expect(component.find('.registration-number').length).toBe(0)
  })

  it('selects yes on registered and is presented with registration number', () => {
    const expected = {
      name: 'selective',
      WasBornAfter: { value: 'Yes' },
      HasRegistered: { value: 'Yes' }
    }
    const component = mount(<Selective {...expected} />)
    component.find('.born .yes input').simulate('change')
    component.find('.registered .yes input').simulate('change')
    component.find('.registration-number input').simulate('change')
    expect(component.find('.explanation').length).toBe(0)
    expect(component.find('.registration-number').length).toBe(2)
  })
})
