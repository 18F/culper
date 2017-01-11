import React from 'react'
import { mount } from 'enzyme'
import Help from './Help'

describe('The Help component', () => {
  it('renders with default state closed', () => {
    const component = mount(<Help id="identification.name.last.help" />)
    expect(component.find('div.message').length).toEqual(0)
  })

  it('renders with message when active', () => {
    const component = mount(<Help id="identification.name.last.help" />)
    component.find('a.toggle').simulate('click')
    expect(component.find('div.message').length).toEqual(1)
    expect(component.find('div.message').text().length).toBeGreaterThan(0)
  })

  it('can toggle', () => {
    const component = mount(<Help id="identification.name.last.help" />)
    component.find('a.toggle').simulate('click')
    expect(component.find('div.message').length).toEqual(1)
    component.find('a.toggle').simulate('click')
    expect(component.find('div.message').length).toEqual(0)
  })

  it('does not error when given an invalid identification', () => {
    const component = mount(<Help id="this.should.not.exist" />)
    component.find('a.toggle').simulate('click')
    expect(component.find('div.message').length).toEqual(1)
    expect(component.find('div.message').text()).toEqual('en.this.should.not.existClose info Block')
  })
})
