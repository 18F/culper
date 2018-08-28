import React from 'react'
import { mount } from 'enzyme'
import StickyAccordionSummary from './StickyAccordionSummary'

describe('The sticky accordion component', () => {
  it('Ensure content is not sticking', () => {
    const component = mount(
      <StickyAccordionSummary offset={5}>
        <div className="summary">Hello</div>
      </StickyAccordionSummary>
    )
    expect(component.state('stick')).toBe(false)
  })

  it('Ensure content sticks', () => {
    const component = mount(
      <StickyAccordionSummary
        offset={0}
        window={() => {
          return window
        }}>
        <div className="summary">Hello</div>
      </StickyAccordionSummary>
    )
    window.scroll(0, 4)
    expect(component.state('stick')).toBe(true)
  })

  it('Does not stick when below mobile breakpoint', () => {
    const win = { ...window }
    win.innerWidth = 10
    const component = mount(
      <StickyAccordionSummary
        offset={0}
        window={() => {
          return win
        }}>
        <div className="summary">Hello</div>
      </StickyAccordionSummary>
    )
    expect(component.state('stick')).toBe(false)
  })
})
