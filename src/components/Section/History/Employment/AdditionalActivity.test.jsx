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
    expect(component.find('.has-additional').length).toBeGreaterThan(0)
    component.find({type: 'radio', name: 'additionalActivity', value: 'No'}).simulate('change')
    expect(component.find('.has-additional').length).toBe(0)
    expect(updates).toBe(2)
  })

  it('loads data', () => {
    let updates = 0
    let blur = 0
    let focus = 0

    let expected = {
      onUpdate: () => {
        updates++
      },
      onBlur: () => {
        blur++
      },
      onFocus: () => {
        focus++
      },
      list: [
        {
          Position: {
            name: 'Position',
            value: 'Dev'
          }
        }
      ],
      HasAdditionalActivity: 'Yes'
    }

    const component = mount(<AdditionalActivity name="activity" List={expected.list} onUpdate={expected.onUpdate} onFocus={expected.onFocus} onBlur={expected.onBlur} HasAdditionalActivity={expected.HasAdditionalActivity} />)
    expect(component.find('.has-additional').length).toBeGreaterThan(0)
    let position = component.find('input[name="Position"]')
    position.simulate('change')
    position.simulate('blur')
    position.simulate('focus')
    expect(updates).toBe(1)
    expect(blur).toBe(1)
    expect(focus).toBe(1)
  })
})

