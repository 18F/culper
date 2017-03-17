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
    expect(component.find('.accordion').length).toBeGreaterThan(0)
    expect(component.find('.accordion .daterange').length).toBeGreaterThan(0)
    expect(component.find('.accordion .text').length).toBeGreaterThan(0)
    expect(component.find('.accordion .address').length).toBeGreaterThan(0)
  })

  it('selects no', () => {
    const expected = {
      name: 'federal_service'
    }
    const component = mount(<Federal name={expected.name} />)
    component.find({type: 'radio', name: 'has_federalservice', value: 'No'}).simulate('change')
    expect(component.find('.accordion').length).toBe(0)
  })

  it('recieves updates from children', () => {
    let updates = 0
    const expected = {
      name: 'federal_service',
      HasFederalService: 'Yes',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Federal {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
    component.find({type: 'text', name: 'Position'}).simulate('change')
    component.find({type: 'text', name: 'Name'}).simulate('change')
    component.find('.accordion .datecontrol #day').first().simulate('change')
    component.find('.accordion .mailing input').simulate('change')
    expect(updates).toBeGreaterThan(3)
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
    expect(component.find('.accordion').length).toBe(1)
    expect(component.find('.accordion .item').length).toBe(2)
    expect(component.find('.accordion .index').length).toBe(2)
    expect(component.find('.accordion .dates').length).toBe(2)
  })
})
