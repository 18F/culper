import React from 'react'
import { mount } from 'enzyme'
import OneTimeBenefit from './OneTimeBenefit'

describe('The OneTimeBenefit component', () => {
  it('Renders without errors', () => {
    const component = mount(<OneTimeBenefit />)
    expect(component.find('.onetime-benefit').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }

    const component = mount(<OneTimeBenefit onUpdate={onUpdate} />)
    expect(component.find('.onetime-benefit').length).toBe(1)
    component
      .find('.received input[name="month"]')
      .simulate('change', { target: { value: '1' } })
    component
      .find('input[name="Country"]')
      .simulate('change', { target: { value: 'Germany' } })
    component.find('input[name="Value"]').simulate('change')
    component.find('input[name="ValueEstimated"]').simulate('change')
    component.find('textarea[name="Reason"]').simulate('change')
    component.find('.obligated .yes input').simulate('change')

    expect(updates).toBe(6)
  })

  it('Performs an obligatedExplanation update', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const obligated = { value: 'Yes' }
    const component = mount(
      <OneTimeBenefit onUpdate={onUpdate} Obligated={obligated} />
    )
    expect(component.find('.onetime-benefit').length).toBe(1)
    component
      .find('.explanation textarea[name="Explanation"]')
      .simulate('change')
    expect(updates).toBe(1)
  })
})
