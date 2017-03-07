import React from 'react'
import { mount } from 'enzyme'
import Federal from './Federal'

describe('The federal component', () => {
  it('selects yes and loads form', () => {
    const expected = {
      name: 'federal_service'
    }
    const component = mount(<Federal name={expected.name} />)
    component.find({type: 'radio', name: 'has_federalservice', value: 'Yes'}).simulate('change')
    expect(component.find('.collection').length).toBeGreaterThan(0)
    expect(component.find('.collection .daterange').length).toBeGreaterThan(0)
    expect(component.find('.collection .text').length).toBeGreaterThan(0)
    expect(component.find('.collection .address').length).toBeGreaterThan(0)
  })

  it('selects no', () => {
    const expected = {
      name: 'federal_service'
    }
    const component = mount(<Federal name={expected.name} />)
    component.find({type: 'radio', name: 'has_federalservice', value: 'No'}).simulate('change')
    expect(component.find('.collection').length).toBe(0)
  })

  it('recieves updates from children', () => {
    let updates = 0
    const expected = {
      name: 'federal_service',
      HasFederalService: 'Yes',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Federal {...expected} />)
    expect(component.find('.collection').length).toBe(1)
    component.find({type: 'text', name: 'Position'}).simulate('change')
    component.find({type: 'text', name: 'Name'}).simulate('change')
    component.find('.collection .datecontrol #day').first().simulate('change')
    component.find('.collection .mailing input').simulate('change')
    expect(updates).toEqual(4)
  })

  it('can display a summary', () => {
    const expected = {
      name: 'federal_service',
      HasFederalService: 'Yes',
      List: [
        {
          Name: 'Acme',
          Position: ' Chief Anvil Engineer',
          Dates: {
            from: new Date(2017, 1, 1),
            to: new Date(2017, 2, 1)
          }
        },
        {
          Name: 'Quills R Us',
          Position: 'I wrote stuff',
          Dates: {
            from: new Date(2017, 2, 1),
            to: new Date(2017, 3, 1)
          }
        }
      ]
    }
    const component = mount(<Federal {...expected} />)
    expect(component.find('.collection').length).toBe(1)
    expect(component.find('.collection .item').length).toBe(2)
    expect(component.find('.collection .index').length).toBe(2)
    expect(component.find('.collection .dates').length).toBe(2)
  })
})
