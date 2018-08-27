import React from 'react'
import { mount } from 'enzyme'
import TerroristOrganization from './TerroristOrganization'

describe('The legal associations terrorist organizations component', () => {
  it('renders without errors', () => {
    const component = mount(<TerroristOrganization />)
    expect(component.find('.legal-associations-terrorist').length).toBe(1)
  })

  it('can select "yes"', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<TerroristOrganization onUpdate={onUpdate} />)
    component
      .find('.legal-associations-terrorist-has-terrorist .yes input')
      .simulate('change')
    expect(updates).toBe(1)
  })

  it('list displayed if "yes" is clicked', () => {
    const props = {
      HasTerrorist: { value: 'Yes' }
    }
    const component = mount(<TerroristOrganization {...props} />)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('renders summary', () => {
    const props = {
      HasTerrorist: { value: 'Yes' },
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
    const component = mount(<TerroristOrganization {...props} />)
    const text = component.find('.accordion .summary .left').text()
    expect(text).toContain('Donut Brigade')
    expect(text).toContain('1/2010 - 1/2011')
  })
})
