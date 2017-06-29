import React from 'react'
import { mount } from 'enzyme'
import Diagnoses from './Diagnoses'

describe('The Diagnoses component', () => {
  it('Renders without errors', () => {
    const component = mount(<Diagnoses />)
    expect(component.find('.diagnoses').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const props = {
      Diagnosed: 'Yes',
      DidNotConsult: 'Yes',
      InTreatment: 'Yes',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Diagnoses {...props} />)
    expect(updates).toBeGreaterThan(1)
  })
})
