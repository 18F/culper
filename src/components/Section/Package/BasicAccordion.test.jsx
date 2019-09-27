import React from 'react'
import { mount } from 'enzyme'
import BasicAccordion, { BasicAccordionItem } from './BasicAccordion'

describe('Basic accordion component', () => {
  const onClick = jest.fn()

  const props = {
    items: [
      {
        title: 'item-uuid',
        valid: () => false,
        component: () => <div>test</div>,
        open: false,
        scrollIntoView: false,
        onClick,
      },
    ],
  }

  const component = mount(<BasicAccordion {...props} />)

  it('renders a BasicAccordionItem for each item', () => {
    expect(component.find(BasicAccordionItem).length).toEqual(1)
  })

  it('handles toggle', () => {
    component.find('.usa-accordion-button').simulate('click')
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

describe('BasicAccordionItem', () => {
  it('renders without errors', () => {
    const component = mount(<BasicAccordionItem />)
    expect(component.exists()).toBe(true)
  })
})
