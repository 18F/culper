import React from 'react'
import { mount } from 'enzyme'
import ContinuingBenefit from './ContinuingBenefit'

describe('The ContinuingBenefit component', () => {
  it('Renders without errors', () => {
    const component = mount(<ContinuingBenefit />)
    expect(component.find('.continuing-benefit').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }

    const component = mount(<ContinuingBenefit onUpdate={onUpdate} />)
    expect(component.find('.continuing-benefit').length).toBe(1)
    component
      .find('.began input[name="month"]')
      .simulate('change', { target: { value: '1' } })
    component
      .find('.end input[name="month"]')
      .simulate('change', { target: { value: '1' } })
    component
      .find('.frequency input')
      .first()
      .simulate('change')
    component
      .find('input[name="Country"]')
      .simulate('change', { target: { value: 'Germany' } })
    component.find('input[name="Value"]').simulate('change')
    component.find('input[name="ValueEstimated"]').simulate('change')
    component.find('textarea[name="Reason"]').simulate('change')
    component.find('.obligated .yes input').simulate('change')
    expect(updates).toBe(8)
  })

  it('Performs an other frequency update', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const frequency = { value: 'Other' }
    const component = mount(
      <ContinuingBenefit onUpdate={onUpdate} Frequency={frequency} />
    )
    expect(component.find('.continuing-benefit').length).toBe(1)
    component.find('textarea[name="OtherFrequency"]').simulate('change')
    expect(updates).toBe(1)
  })

  it('Performs an obligatedExplanation update', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const obligated = { value: 'Yes' }
    const component = mount(
      <ContinuingBenefit onUpdate={onUpdate} Obligated={obligated} />
    )
    expect(component.find('.continuing-benefit').length).toBe(1)
    component
      .find('.explanation textarea[name="Explanation"]')
      .simulate('change')
    expect(updates).toBe(1)
  })
})
