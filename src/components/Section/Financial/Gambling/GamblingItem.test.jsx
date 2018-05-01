import React from 'react'
import { mount } from 'enzyme'
import GamblingItem from './GamblingItem'

describe('The GamblingItem component', () => {
  it('Renders without errors', () => {
    const component = mount(<GamblingItem />)
    expect(component.find('.gambling-item').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const onUpdate = () => { updates++ }

    const component = mount(<GamblingItem onUpdate={onUpdate} />)
    component.find('.dates .from input[name="month"]').simulate('change', { target: { value: '1' } })
    component.find('.losses input').simulate('change')
    component.find('.description textarea').simulate('change')
    component.find('.actions textarea').simulate('change')
    expect(updates).toBe(4)
  })

  it('defaults behave as expected', () => {
    expect(GamblingItem.defaultProps.onError(0, [])).toEqual([])
    expect(GamblingItem.defaultProps.onUpdate()).toBe(undefined)
  })
})
