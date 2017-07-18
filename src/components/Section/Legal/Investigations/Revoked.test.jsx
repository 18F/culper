import React from 'react'
import { mount } from 'enzyme'
import Revoked from './Revoked'

describe('The legal investigations revoked component', () => {
  it('renders without errors', () => {
    const component = mount(<Revoked />)
    expect(component.find('.investigations-revoked').length).toBe(1)
  })

  it('can select "yes"', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<Revoked onUpdate={onUpdate} />)
    component.find('.legal-investigations-revoked-has-revocations .yes input').simulate('change')
    expect(updates).toBe(1)
  })

  it('list displayed if "yes" is clicked', () => {
    const props = {
      HasRevocations: 'Yes'
    }
    const component = mount(<Revoked {...props} />)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('renders summary', () => {
    const props = {
      HasRevocations: 'Yes',
      List: [
        {
          Agency: {
            value: 'U.S. Department of Defense'
          },
          Date: {
            date: new Date('1/1/2010')
          }
        }
      ],
      ListBranch: ''
    }
    const component = mount(<Revoked {...props} />)
    const text = component.find('.accordion .summary .left').text()
    expect(text).toContain('U.S. Department of Defense')
    expect(text).toContain('1/2010')
  })
})
