import React from 'react'
import { mount } from 'enzyme'
import Comments from './Comments'

describe('The comments component', () => {
  it('textarea hidden if no value', () => {
    const component = mount(
      <Comments name="comments" label="Optional comments" value="" />
    )
    expect(component.find('textarea').length).toEqual(0)
  })

  it('textarea visible if given a value', () => {
    const component = mount(
      <Comments name="comments" label="Optional comments" value="test" />
    )
    expect(component.find('textarea').length).toEqual(1)
  })

  it('textarea can toggle', () => {
    const component = mount(
      <Comments name="comments" label="Optional comments" value="" />
    )
    expect(component.find('textarea').length).toEqual(0)
    component.find('a').simulate('click')
    expect(component.find('textarea').length).toEqual(1)
  })
})
