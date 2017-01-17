import React from 'react'
import { mount } from 'enzyme'
import Collection from './Collection'

describe('The Collection component', () => {
  it('has no items with minimum equal to zero', () => {
    const component = mount(<Collection minimum="0"><div className="hello">hello</div></Collection>)
    expect(component.find('div.hello').length).toEqual(0)
  })

  it('has one items with minimum equal to one', () => {
    const component = mount(<Collection minimum="1"><div className="hello">hello</div></Collection>)
    expect(component.find('div.hello').length).toEqual(1)
  })

  it('can append an item', () => {
    const component = mount(<Collection minimum="0"><div className="hello">hello</div></Collection>)
    expect(component.find('div.hello').length).toEqual(0)
    component.find('button.add').simulate('click')
    expect(component.find('div.hello').length).toEqual(1)
  })
})
