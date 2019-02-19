import React from 'react'
import { mount } from 'enzyme'
import AuthenticatedNavigationToggle, {
  NavigationToggle
} from './NavigationToggle'

describe('The navigation toggle component', () => {
  it('can toggle', () => {
    let dispatched = 0
    const props = {
      dispatch: () => {
        dispatched++
      },
      settings: {
        mobileNavigation: true
      }
    }
    const component = mount(<NavigationToggle {...props} />)
    component.find('.navigation-toggle').simulate('click')
    expect(dispatched).toEqual(1)
  })

  it('not visible when not mobile', () => {
    const props = {
      settings: {
        mobileNavigation: false
      }
    }
    const component = mount(<NavigationToggle {...props} />)
    expect(component.find('.navigation-override').length).toBe(0)
  })
})
