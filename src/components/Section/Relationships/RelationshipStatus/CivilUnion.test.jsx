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
      Separated: { value: 'Yes' },
      Divorced: { value: 'Yes' },
      BirthPlace: { country: { value: 'Germany' } },
      AddressSeparated: { country: { value: 'United States' } },
      ForeignBornDocument: { DocumentType: { value: 'Other' } },
      onUpdate: () => {
        updates++
      }
    }

    const component = mount(<CivilUnion {...expected} />)
    expect(component.find('.civil-union').length).toEqual(1)
    updates = 0
    component.find('.civil .name .first input').simulate('change')
    component
      .find('.birthdate .month input')
      .simulate('change', { target: { value: '12' } })
    component.find('.birthplace .city input').simulate('change')
    component
      .find('.foreign-born-documents input')
      .first()
      .simulate('change')
    component.find('.foreign-born-documents .other input').simulate('change')
    component.find('.foreign-born-documents textarea').simulate('change')
    component.find('.foreign-born-document-number input').simulate('change')
    component
      .find('.foreign-born-documents .month input')
      .simulate('change', { target: { value: '12' } })
    component.find('.ssn .first input').simulate('change')
    component.find('.othername .no input').simulate('change')
    component
      .find('.entered .month input')
      .simulate('change', { target: { value: '12' } })
    component.find('.civilunion-location .yes input').simulate('change')
    component.find('.address .mailing input').simulate('change')
    component.find('.email input').simulate('change')
    component.find('.separated .yes input').simulate('change')
    component.find('.divorced .yes input').simulate('change')
    component
      .find('.dateseparated .month input')
      .simulate('change', { target: { value: '12' } })
    component.find('.address-separated .city input').simulate('change')
    component
      .find('.address-separated input[name="AddressSeparatedNotApplicable"]')
      .simulate('change')
    expect(updates).toBe(19)
  })

  it('renders current address', () => {
    let updates = 0
    const expected = {
      name: 'cohabitant',
      onUpdate: () => {
        updates++
      },
      currentAddress: {
        address: '123 Some Rd',
        city: 'Arlington',
        state: 'VA',
        country: 'United States'
      }
    }

    const component = mount(<CivilUnion {...expected} />)
    expect(component.find('.current-address.button').length).toEqual(1)
    component.find('.current-address.button input').simulate('change')
    expect(updates).toBe(1)
    component.find('.current-address.button input').simulate('change')
    expect(
      component.find('.current-address.button label.checked').length
    ).toEqual(0)
  })

  it('should not ask for foreign born documentation if from the United States', () => {
    const expected = {
      BirthPlace: { country: 'United States' }
    }
    const component = mount(<CivilUnion {...expected} />)
    expect(component.find('.foreign-born-documents').length).toEqual(0)
  })

  it('should ask for foreign born documentation if not from the United States', () => {
    const expected = {
      BirthPlace: { country: 'Canada' }
    }
    const component = mount(<CivilUnion {...expected} />)
    expect(component.find('.foreign-born-documents').length).toEqual(1)
  })
})
