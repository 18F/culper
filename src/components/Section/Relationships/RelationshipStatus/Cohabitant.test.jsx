import React from 'react'
import { mount } from 'enzyme'
import Cohabitant from './Cohabitant'

describe('The cohabitant component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'cohabitant'
    }

    const component = mount(<Cohabitant {...expected} />)
    expect(component.find('.cohabitant').length).toEqual(1)
  })

  it('updates values', () => {
    let updates = 0
    const expected = {
      name: 'cohabitant',
      onUpdate: () => { updates++ }
    }

    const component = mount(<Cohabitant {...expected} />)
    expect(component.find('.cohabitant').length).toEqual(1)
    component.find('.cohabitant-name input#first').simulate('change')
    component.find('.birthdate input#month').simulate('change', { target: { value: '12' } })
    component.find('.birthplace .yes input').simulate('change')
    component.find('.maiden-name .yes input').simulate('change')
    component.find('.foreign-born-documents input').first().simulate('click')
    component.find('.foreign-born-documents .other input').simulate('click')
    component.find('.foreign-born-documents textarea#otherExplanation').simulate('change')
    component.find('.foreign-born-documents input#documentNumber').simulate('change')
    component.find('.foreign-born-documents input#month').simulate('change', { target: { value: '12' } })
    component.find('.ssn input#first').simulate('change')
    component.find('.othername input#first').simulate('change')
    component.find('.othername .maiden-name .yes input').simulate('change')
    component.find('.othername .from input#month').simulate('change', { target: { value: '12' } })
    component.find('.othername input[name="OtherNameNotApplicable"]').simulate('change')
    component.find('.cohabitation-began input#month').simulate('change', { target: { value: '12' } })
    expect(updates).toBe(15)
  })
})
