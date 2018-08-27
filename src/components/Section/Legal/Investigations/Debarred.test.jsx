import React from 'react'
import { mount } from 'enzyme'
import Debarred from './Debarred'

describe('The legal investigations debarred component', () => {
  it('renders without errors', () => {
    const component = mount(<Debarred />)
    expect(component.find('.investigations-debarred').length).toBe(1)
  })

  it('can select "yes"', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<Debarred onUpdate={onUpdate} />)
    component
      .find('.legal-investigations-debarred-has-debarment .yes input')
      .simulate('change')
    expect(updates).toBe(1)
  })

  it('list displayed if "yes" is clicked', () => {
    const props = {
      HasDebarment: { value: 'Yes' }
    }
    const component = mount(<Debarred {...props} />)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('renders summary', () => {
    const props = {
      HasDebarment: { value: 'Yes' },
      List: {
        items: [
          {
            Item: {
              Agency: {
                value: 'U.S. Department of Defense'
              },
              Date: {
                date: new Date('1/1/2010'),
                month: '1',
                day: '1',
                year: '2010'
              }
            }
          }
        ]
      }
    }
    const component = mount(<Debarred {...props} />)
    const text = component.find('.accordion .summary .left').text()
    expect(text).toContain('U.S. Department of Defense')
    expect(text).toContain('1/2010')
  })
})
