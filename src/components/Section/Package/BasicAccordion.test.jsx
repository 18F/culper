import React from 'react'
import { MemoryRouter } from 'react-router'
import { mount } from 'enzyme'
import BasicAccordion from './BasicAccordion'

describe('Basic accordion component', () => {
  it('can toggle', () => {
    const props = {
      items: [
        {
          valid: () => false,
          component: () => {
            return <div>test</div>
          },
          open: false,
          scrollIntoView: false
        }
      ]
    }
    const component = mount(<BasicAccordion {...props} />)
    component.find('.usa-accordion-button').simulate('click')
  })
})
