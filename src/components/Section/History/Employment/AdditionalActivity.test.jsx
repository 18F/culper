import React from 'react'
import { mount } from 'enzyme'
import AdditionalActivity from './AdditionalActivity'

describe('The employment additional activity component', () => {
  it('renders default additional activity', () => {
    const component = mount(<AdditionalActivity name="activity" />)
    expect(component.find('.branch .yes').length).toBe(1)
    expect(component.find('.branch .no').length).toBe(1)
  })

  it('toggles yes/no for additional activity', () => {
    let updates = 0
    let onUpdate = () => { updates++ }
    const component = mount(<AdditionalActivity name="activity" onUpdate={onUpdate} />)

    component.find('.branch .yes input').at(0).simulate('change')
    expect(component.find({ type: 'text', name: 'Position' }).length).toBe(1)
    component.find('.branch .no input').at(0).simulate('change')
    expect(component.find({ type: 'text', name: 'Position' }).length).toBe(0)
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
          Has: 'Yes',
          Position: {
            name: 'Position',
            value: 'Dev'
          }
        }
      ],
      HasAdditionalActivity: 'Yes'
    }

    const component = mount(<AdditionalActivity {...expected} />)
    component.find('.branch .yes input').at(0).simulate('change')
    component.find({ type: 'text', name: 'Position' }).simulate('change')
    expect(updates).toBeGreaterThan(0)
  })
})
