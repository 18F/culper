import React from 'react'
import { mount } from 'enzyme'
import ClearanceLevel from './ClearanceLevel'

describe('The clearance level component', () => {
  it('renders without errors', () => {
    const component = mount(<ClearanceLevel />)
    expect(component.find('.investigative-clearance-levels').length).toBe(1)
  })

  it('captures level', () => {
    let level = ''
    const onUpdate = (values) => { level = values.Level }
    const component = mount(<ClearanceLevel Level={level} onUpdate={onUpdate} />)
    component.find('.clearance-level-q input').simulate('change')
    expect(level).toBe('Q')
  })

  it('requires explanation if "other" is selected', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<ClearanceLevel Level="Other" onUpdate={onUpdate} />)
    expect(component.find('.legal-investigations-history-clearance-explanation').length).toBe(1)
    component.find('.legal-investigations-history-clearance-explanation textarea').simulate('change')
    expect(updates).toBe(1)
  })
})
