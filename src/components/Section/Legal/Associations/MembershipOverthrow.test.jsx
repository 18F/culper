import React from 'react'
import { mount } from 'enzyme'
import MembershipOverthrow from './MembershipOverthrow'

describe('The legal associations overthrow component', () => {
  it('renders without errors', () => {
    const component = mount(<MembershipOverthrow />)
    expect(component.find('.legal-associations-overthrow').length).toBe(1)
  })

  it('can select "yes"', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<MembershipOverthrow onUpdate={onUpdate} />)
    component
      .find('.legal-associations-overthrow-has-overthrow .yes input')
      .simulate('change')
    expect(updates).toBe(1)
  })

  it('list displayed if "yes" is clicked', () => {
    const props = {
      HasOverthrow: { value: 'Yes' }
    }
    const component = mount(<MembershipOverthrow {...props} />)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('renders summary', () => {
    const props = {
      HasOverthrow: { value: 'Yes' },
      List: {
        items: [
          {
            Item: {
              Dates: {
                from: {
                  date: new Date('1/1/2010'),
                  month: '1',
                  day: '1',
                  year: '2010'
                },
                to: {
                  date: new Date('1/1/2011'),
                  month: '1',
                  day: '1',
                  year: '2011'
                }
              },
              Organization: {
                value: 'Donut Brigade'
              }
            }
          }
        ]
      }
    }
    const component = mount(<MembershipOverthrow {...props} />)
    const text = component.find('.accordion .summary .left').text()
    expect(text).toContain('Donut Brigade')
    expect(text).toContain('1/2010 - 1/2011')
  })
})
