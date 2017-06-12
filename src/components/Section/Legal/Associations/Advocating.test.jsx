import React from 'react'
import { mount } from 'enzyme'
import Advocating from './Advocating'

describe('The legal associations advocating component', () => {
  it('renders without errors', () => {
    const component = mount(<Advocating />)
    expect(component.find('.legal-associations-advocating').length).toBe(1)
  })

  it('can select "yes"', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<Advocating onUpdate={onUpdate} />)
    component.find('.legal-associations-advocating-has-advocated .yes input').simulate('click')
    expect(updates).toBe(1)
  })

  it('list displayed if "yes" is clicked', () => {
    const props = {
      HasAdvocated: 'Yes'
    }
    const component = mount(<Advocating {...props} />)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('renders summary', () => {
    const props = {
      HasAdvocated: 'Yes',
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
    const component = mount(<Advocating {...props} />)
    const text = component.find('.accordion .summary .left .content').text()
    expect(text).toContain('It was a tuesday')
    expect(text).toContain('1/2010 - 1/2011')
  })
})
