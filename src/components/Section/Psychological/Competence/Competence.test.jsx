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
    const onUpdate = () => { updates++ }
    const component = mount(<Competence onUpdate={onUpdate} />)
    component.find('.competence .yes input').simulate('change')
    component.find('input[name="CourtName"]').simulate('change')
    expect(updates).toBe(5)
  })
})
