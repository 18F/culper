import React from 'react'
import { mount } from 'enzyme'
import Police from './Police'

describe('The Police record component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'police-record'
    }
    const component = mount(<Police {...expected} />)
    expect(component.find('.summons').length).toEqual(1)
    expect(component.find('.arrests').length).toEqual(1)
    expect(component.find('.charges').length).toEqual(1)
    expect(component.find('.probation').length).toEqual(1)
    expect(component.find('.trial').length).toEqual(1)
    expect(component.find('.collection').length).toEqual(0)
  })

  it('selecting all "no" nothing happens', () => {
    const expected = {
      name: 'police-record'
    }
    const component = mount(<Police {...expected} />)
    component.find('.summons .no input').simulate('change')
    component.find('.arrests .no input').simulate('change')
    component.find('.charges .no input').simulate('change')
    component.find('.probation .no input').simulate('change')
    component.find('.trial .no input').simulate('change')
    expect(component.find('.collection').length).toEqual(0)
  })

  it('selecting at least one "yes" displays the form', () => {
    const expected = {
      name: 'police-record'
    }
    const component = mount(<Police {...expected} />)
    component.find('.summons .no input').simulate('change')
    component.find('.arrests .no input').simulate('change')
    component.find('.charges .no input').simulate('change')
    component.find('.probation .no input').simulate('change')
    component.find('.trial .yes input').simulate('change')
    expect(component.find('.collection').length).toEqual(1)
  })
})
