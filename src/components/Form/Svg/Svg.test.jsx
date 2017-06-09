import React from 'react'
import { mount } from 'enzyme'
import Svg from './Svg'

describe('The Svg component', () => {
  it('can render pixie dust', () => {
    const expected = {
      src: '/img/eye.svg'
    }
    const component = mount(<Svg src={expected.src} />)
    expect(component.find('svg').length).toEqual(1)
    expect(component.find('img').length).toEqual(0)
  })

  it('can render img', () => {
    const expected = {
      src: '/img/eye-multicolor.svg'
    }
    const component = mount(<Svg src={expected.src} />)
    expect(component.find('svg').length).toEqual(0)
    expect(component.find('img').length).toEqual(1)
  })
})
