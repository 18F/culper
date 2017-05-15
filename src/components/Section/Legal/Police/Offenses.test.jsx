import React from 'react'
import { mount } from 'enzyme'
import Offenses from './Offenses'

describe('The Offenses record component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'police-record'
    }
    const component = mount(<Offenses {...expected} />)
    expect(component.find('.summons').length).toEqual(1)
    expect(component.find('.arrests').length).toEqual(1)
    expect(component.find('.charges').length).toEqual(1)
    expect(component.find('.probation').length).toEqual(1)
    expect(component.find('.trial').length).toEqual(1)
    expect(component.find('.accordion').length).toEqual(0)
  })

  it('selecting all "no" nothing happens', () => {
    const expected = {
      name: 'police-record',
      HasSummons: 'No',
      HasArrests: 'No',
      HasCharges: 'No',
      HasProbation: 'No',
      HasTrial: 'Yes',
      List: [
        {
          Item: {
            Date: {
              day: '1',
              month: '1',
              year: '2016',
              date: new Date('1/1/2016')
            },
            Description: {
              value: 'Description of the offense'
            },
            InvolvedViolence: 'No',
            InvolvedFirearms: 'No',
            InvolvedSubstances: 'No',
            Address: {
              addressType: 'United States',
              address: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202'
            },
            WasCited: 'No'
          }
        }
      ]
    }
    const component = mount(<Offenses {...expected} />)
    expect(component.find('.accordion').length).toEqual(1)
  })

  it('renders with valid offense', () => {
    const expected = {
      name: 'police-record',
      HasSummons: 'No',
      HasArrests: 'No',
      HasCharges: 'No',
      HasProbation: 'No',
      HasTrial: 'No'
    }
    const component = mount(<Offenses {...expected} />)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('clears', () => {
    let updates = 0
    const expected = {
      name: 'offense',
      HasSummons: 'Yes',
      HasArrests: 'No',
      HasCharges: 'No',
      HasProbation: 'No',
      HasTrial: 'No',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Offenses {...expected} />)
    component.find('.summons .no input').simulate('change')
    expect(updates).toBe(5)
    expect(component.find('.accordion').length).toBe(0)
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
      const component = mount(<Offenses {...expected} />)
      component.find(test.selector).simulate('change')
      expect(component.find('.accordion').length).toEqual(test.expect)
    })
  })
})
