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
    expect(component.find('.accordion').length).toEqual(0)
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
    expect(component.find('.accordion').length).toEqual(0)
  })


  it('selecting yes to having been issued a summons, citation, arrest, charge or trial displays offense', () => {
    const tests = [
      {
        selector: '.summons .yes input',
        expect: 1
      },
      {
        selector: '.arrests .yes input',
        expect: 1
      },
      {
        selector: '.charges .yes input',
        expect: 1
      },
      {
        selector: '.probation .yes input',
        expect: 1
      },
      {
        selector: '.trial .yes input',
        expect: 1
      }
    ]

    const expected = {
      name: 'police-record'
    }

    tests.forEach(test => {
      const component = mount(<Police {...expected} />)
      component.find(test.selector).simulate('change')
      expect(component.find('.accordion').length).toEqual(test.expect)
    })
  })
})
