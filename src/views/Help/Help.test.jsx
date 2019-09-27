import React from 'react'
import { shallow } from 'enzyme'

import Help from './Help'

describe('The Help view component', () => {
  const mockHistory = { push: () => {} }
  const component = shallow(<Help history={mockHistory} />)

  it('renders without errors', () => {
    expect(component.exists()).toBe(true)
  })

  it('renders a link back to the home page', () => {
    const link = component.find('Link')
    expect(link.exists()).toBe(true)
    expect(link.prop('to')).toEqual('/')
  })
})
