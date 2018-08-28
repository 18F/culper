import React from 'react'
import { mount } from 'enzyme'
import Competence from './Competence'

describe('The Competence component', () => {
  it('Renders without errors', () => {
    const component = mount(<Competence />)
    expect(component.find('.competence').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const props = {
      IsIncompetent: { value: 'Yes' },
      List: {
        items: [{}]
      },
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<Competence {...props} />)
    updates = 0
    component.find('input[name="CourtName"]').simulate('change')
    expect(updates).toBe(1)
  })
})
