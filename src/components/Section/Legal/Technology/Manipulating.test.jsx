import React from 'react'
import { mount } from 'enzyme'
import Manipulating from './Manipulating'

describe('The legal technology manipulating access component', () => {
  it('renders without errors', () => {
    const component = mount(<Manipulating />)
    expect(component.find('.legal-technology-manipulating').length).toBe(1)
  })

  it('can select "yes"', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<Manipulating onUpdate={onUpdate} />)
    component
      .find('.legal-technology-manipulating-has-manipulating .yes input')
      .simulate('change')
    expect(updates).toBe(1)
  })

  it('list displayed if "yes" is clicked', () => {
    const props = {
      HasManipulating: { value: 'Yes' }
    }
    const component = mount(<Manipulating {...props} />)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('renders summary', () => {
    const props = {
      HasManipulating: { value: 'Yes' },
      List: {
        items: [
          {
            Item: {
              Date: {
                date: new Date('1/1/2010'),
                month: '1',
                day: '1',
                year: '2010'
              },
              Incident: {
                value: 'Looked over the shoulder'
              }
            }
          }
        ]
      }
    }
    const component = mount(<Manipulating {...props} />)
    const text = component.find('.accordion .summary .left').text()
    expect(text).toContain('Looked over the shoulder')
    expect(text).toContain('1/2010')
  })
})
