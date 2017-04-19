import React from 'react'
import { mount } from 'enzyme'
import CivilUnion from './CivilUnion'

describe('The cohabitant component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'cohabitant'
    }

    const component = mount(<CivilUnion {...expected} />)
    expect(component.find('.civil-union').length).toEqual(1)
  })

  it('updates values', () => {
    let updates = 0
    const expected = {
      name: 'cohabitant',
      onUpdate: () => { updates++ }
    }

    const component = mount(<CivilUnion {...expected} />)
    expect(component.find('.civil-union').length).toEqual(1)
    component.find('.civil input#first').simulate('change')
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
    component.find('.datesused .from input#month').simulate('change', { target: { value: '12' } })
    component.find('.entered input#month').simulate('change', { target: { value: '12' } })
    component.find('.address input#address').simulate('change')
    component.find('.phonetype .cell input').simulate('change')
    component.find('.email input').simulate('change')
    component.find('.separated .yes input').simulate('change')
    component.find('.divorced .yes input').simulate('change')
    component.find('.dateseparated input#month').simulate('change', { target: { value: '12' } })
    component.find('.address-separated input#address').simulate('change')
    component.find('.address-separated input[name="OtherNameNotApplicable"]').simulate('change')
    expect(updates).toBe(25)
  })
})
