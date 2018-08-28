import React from 'react'
import { mount, sinon } from 'enzyme'
import StickyHeader from './StickyHeader'

describe('The sticky accordion component', () => {
  it('Ensure content is not sticking', () => {
    const component = mount(
      <StickyHeader offset={5}>
        <div>Hello</div>
      </StickyHeader>
    )
    expect(component.state('stick')).toBe(false)
  })

  it('Ensure content sticks', () => {
    const component = mount(
      <StickyHeader
        offset={0}
        window={() => {
          return window
        }}>
        <div>Hello</div>
      </StickyHeader>
    )
    window.scroll(0, 4)
    expect(component.state('stick')).toBe(true)
  })
})
