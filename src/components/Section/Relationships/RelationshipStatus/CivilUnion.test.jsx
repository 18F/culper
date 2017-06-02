import React from 'react'
import { mount } from 'enzyme'
import CivilUnion from './CivilUnion'

describe('The civil union component', () => {
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
    component.find('.civil .first input').simulate('change')
    component.find('.birthdate .month input').simulate('change', { target: { value: '12' } })
    component.find('.birthplace .no input').simulate('change')
    component.find('.maiden-name .yes input').simulate('change')
    component.find('.foreign-born-documents input').first().simulate('click')
    component.find('.foreign-born-documents .other input').simulate('click')
    component.find('.foreign-born-documents textarea').simulate('change')
    component.find('.foreign-born-document-number input').simulate('change')
    component.find('.foreign-born-documents .month input').simulate('change', { target: { value: '12' } })
    component.find('.ssn .first input').simulate('change')
    component.find('.othername .first input').simulate('change')
    component.find('.othername .maiden-name .yes input').simulate('change')
    component.find('.othername .from .month input').simulate('change', { target: { value: '12' } })
    component.find('.othername input[name="OtherNameNotApplicable"]').simulate('change')
    component.find('.datesused .from .month input').simulate('change', { target: { value: '12' } })
    component.find('.entered .month input').simulate('change', { target: { value: '12' } })
    component.find('.address .mailing input').simulate('change')
    component.find('.phonetype .cell input').simulate('change')
    component.find('.email input').simulate('change')
    component.find('.separated .yes input').simulate('change')
    component.find('.divorced .yes input').simulate('change')
    component.find('.dateseparated .month input').simulate('change', { target: { value: '12' } })
    component.find('.address-separated .mailing input').simulate('change')
    component.find('.address-separated input[name="OtherNameNotApplicable"]').simulate('change')
    expect(updates).toBe(25)
  })

  it('renders current address', () => {
    let updates = 0
    const expected = {
      name: 'cohabitant',
      onUpdate: () => { updates++ },
      currentAddress: {
        address: '123 Some Rd',
        city: 'Arlington',
        state: 'VA'
      }
    }

    const component = mount(<CivilUnion {...expected} />)
    expect(component.find('.current-address').length).toEqual(1)
    component.find('.current-address input').simulate('change')
    expect(updates).toBe(3)
    component.find('.current-address input').simulate('change')
    expect(component.find('.current-address label.checked').length).toEqual(0)
  })
})
