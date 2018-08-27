import React from 'react'
import { mount } from 'enzyme'
import FutureBenefit from './FutureBenefit'

describe('The FutureBenefit component', () => {
  it('Renders without errors', () => {
    const component = mount(<FutureBenefit />)
    expect(component.find('.future-benefit').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }

    const component = mount(<FutureBenefit onUpdate={onUpdate} />)
    expect(component.find('.future-benefit').length).toBe(1)
    component
      .find('.begin input[name="month"]')
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
    expect(updates).toBe(7)
  })

  it('Performs an obligatedExplanation update', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const obligated = { value: 'Yes' }
    const component = mount(
      <FutureBenefit onUpdate={onUpdate} Obligated={obligated} />
    )
    expect(component.find('.future-benefit').length).toBe(1)
    component
      .find('.explanation textarea[name="Explanation"]')
      .simulate('change')
    expect(updates).toBe(1)
  })

  it('Performs an other frequency update', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const frequency = { value: 'Other' }
    const component = mount(
      <FutureBenefit onUpdate={onUpdate} Frequency={frequency} />
    )
    expect(component.find('.future-benefit').length).toBe(1)
    component.find('textarea[name="OtherFrequency"]').simulate('change')
    expect(updates).toBe(1)
  })
})
