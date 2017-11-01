import React from 'react'
import { mount } from 'enzyme'
import Sticky from './Sticky'

describe('The sticky component', () => {
  it('can mount', () => {
    const component = mount(<Sticky><div></div></Sticky>)
    expect(component.find('.sticky .contents').length).toBe(1)
  })

  it('can display debug stats', () => {
    const props = {
      options: {
        log: '.test'
      }
    }
    const component = mount(<Sticky {...props}><div></div></Sticky>)
    expect(component.find('.sidebar-log').length).toBe(1)
  })

  it('can unmount', () => {
    const component = mount(<Sticky><div></div></Sticky>)
    // As far as I can tell there is no good way to check if an event listener
    // is registered. Chrome has `getEventListeners()` but is specific only to
    // DevTools.
    component.unmount()
  })
})
