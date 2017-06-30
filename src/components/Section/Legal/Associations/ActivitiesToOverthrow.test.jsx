import React from 'react'
import { mount } from 'enzyme'
import ActivitiesToOverthrow from './ActivitiesToOverthrow'

describe('The legal associations activities component', () => {
  it('renders without errors', () => {
    const component = mount(<ActivitiesToOverthrow />)
    expect(component.find('.legal-associations-activities').length).toBe(1)
  })

  it('can select "yes"', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<ActivitiesToOverthrow onUpdate={onUpdate} />)
    component.find('.legal-associations-activities-has-activities .yes input').simulate('change')
    expect(updates).toBe(1)
  })

  it('list displayed if "yes" is clicked', () => {
    const props = {
      HasActivities: 'Yes'
    }
    const component = mount(<ActivitiesToOverthrow {...props} />)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('renders summary', () => {
    const props = {
      HasActivities: 'Yes',
      List: [
        {
          Dates: {
            from: { date: new Date('1/1/2010') },
            to: { date: new Date('1/1/2011') }
          },
          Reasons: {
            value: 'It was a tuesday'
          }
        }
      ],
      ListBranch: ''
    }
    const component = mount(<ActivitiesToOverthrow {...props} />)
    const text = component.find('.accordion .summary .left .content').text()
    expect(text).toContain('It was a tuesday')
    expect(text).toContain('1/2010 - 1/2011')
  })
})
