import React from 'react'
import { mount } from 'enzyme'
import AdditionalActivity from './AdditionalActivity'

describe('The employment additional activity component', () => {
  it('renders default additional activity', () => {
    const component = mount(<AdditionalActivity name="activity" />)
    expect(component.find({type: 'radio', name: 'additionalActivity', value: 'Yes'}).hasClass('selected')).toBe(false)
    expect(component.find({type: 'radio', name: 'additionalActivity', value: 'No'}).hasClass('selected')).toBe(false)
  })

  it('toggles yes/no for additional activity', () => {
    let updates = 0
    let onUpdate = () => { updates++ }
    const component = mount(<AdditionalActivity name="activity" onUpdate={onUpdate} />)

    const selected = component.find({type: 'radio', name: 'additionalActivity', value: 'Yes'})
    selected.simulate('change')
    expect(component.find('.accordion').length).toBeGreaterThan(0)
    component.find({type: 'radio', name: 'additionalActivity', value: 'No'}).simulate('change')
    expect(component.find('.accordion').length).toBe(0)
    expect(updates).toBeGreaterThan(1)
  })

  it('loads data', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      items: [
        {
          Position: {
            name: 'Position',
            value: 'Dev'
          }
        }
      ],
      HasAdditionalActivity: 'Yes'
    }

    const component = mount(<AdditionalActivity {...expected} />)
    expect(component.find('.accordion').length).toBeGreaterThan(0)
    let position = component.find('input[name="Position"]')
    position.simulate('change')
    expect(updates).toBeGreaterThan(0)
  })
})
