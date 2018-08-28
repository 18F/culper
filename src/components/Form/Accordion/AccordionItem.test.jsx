import React from 'react'
import { mount } from 'enzyme'
import AccordionItem from './AccordionItem'
import Text from '../Text'

describe('The accordion item component', () => {
  it('can update', () => {
    let updates = 0
    const props = {
      onUpdate: () => updates++
    }
    const component = mount(
      <AccordionItem {...props}>
        <div>
          <Text name="Test" bind={true} />
        </div>
      </AccordionItem>
    )
    component.find('input').simulate('change')
    expect(updates).toBe(1)
  })
})
