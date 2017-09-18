import React from 'react'
import { mount } from 'enzyme'
import History from './History'

describe('The legal investigations history component', () => {
  it('renders without errors', () => {
    const component = mount(<History />)
    expect(component.find('.investigations-history').length).toBe(1)
  })

  it('can select "yes"', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<History onUpdate={onUpdate} />)
    component.find('.legal-investigations-history-has-history .yes input').simulate('change')
    expect(updates).toBe(1)
  })

  it('list displayed if "yes" is clicked', () => {
    const props = {
      HasHistory: 'Yes'
    }
    const component = mount(<History {...props} />)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('renders summary', () => {
    const props = {
      HasHistory: 'Yes',
      List: [
        {
          Item: {
            Agency: {
              Agency: 'U.S. Department of Defense'
            },
            Granted: {
              date: new Date('1/1/2010')
            }
          }
        }
      ],
      ListBranch: ''
    }
    const component = mount(<History {...props} />)
    const text = component.find('.accordion .summary .left').text()
    expect(text).toContain('U.S. Department of Defense')
    expect(text).toContain('1/2010')
  })
})
