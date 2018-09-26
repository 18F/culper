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
      SSN: {},
      BirthPlace: { country: { value: 'Germany' } },
      ForeignBornDocument: { DocumentType: { value: 'Other' } },
      OtherNameMaiden: { value: 'Yes' },
      onUpdate: () => {
        updates++
      }
    }

    const component = mount(<Cohabitant {...expected} />)
    expect(component.find('.cohabitant').length).toEqual(1)
    component.find('.cohabitant-name .first input').simulate('change')
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
    component.find('.cohabitant-othernames .yes input').simulate('change')
    component
      .find('.cohabitation-began .month input')
      .simulate('change', { target: { value: '12' } })
    expect(updates).toBe(11)
  })

  it('shows suggestion and marks as not spouse', () => {
    const expected = {
      name: 'cohabitant',
      onUpdate: () => {},
      SameSpouse: true,
      spouse: {
        first: 'Foo',
        middle: 'FB',
        last: 'Far'
      },
      Name: {
        first: 'Foo',
        middle: 'FB',
        last: 'Far'
      },
      SSN: {}
    }

    const component = mount(<Cohabitant {...expected} />)
    component
      .find('.cohabitant-name .first input')
      .simulate('change', { target: { value: 'Foo' } })
    expect(component.find('.spouse-suggestion').length).toBe(1)
    component.find('.cohabitant-name .first input').simulate('blur')
    expect(component.find('.spouse-suggestion .suggestion-btn').length).toBe(1)
    component.find('.spouse-suggestion .suggestion-btn').simulate('click')
  })

  it('shows suggestion and closes', () => {
    const expected = {
      name: 'cohabitant',
      onUpdate: () => {},
      SameSpouse: true,
      spouse: {
        first: 'Foo',
        middle: 'FB',
        last: 'Far'
      },
      Name: {
        first: 'Foo',
        firstInitialOnly: false,
        middle: 'FB',
        middleInitialOnly: false,
        noMiddleName: false,
        last: 'Bar',
        lastInitialOnly: false,
        suffix: ''
      },
      SSN: {}
    }

    const component = mount(<Cohabitant {...expected} />)
    component
      .find('.cohabitant-name .first input')
      .simulate('change', { target: { value: 'Foo' } })
    expect(component.find('.spouse-suggestion').length).toBe(1)
    component.find('.cohabitant-name .first input').simulate('blur')
    expect(component.find('.spouse-suggestion .suggestion-btn').length).toBe(1)
    component.find('.spouse-suggestion a').simulate('click')
  })

  it('should not ask for foreign born documentation if from the United States', () => {
    const expected = {
      BirthPlace: { country: 'United States' }
    }
    const component = mount(<Cohabitant {...expected} />)
    expect(component.find('.foreign-born-documents').length).toEqual(0)
  })

  it('should ask for foreign born documentation if not from the United States', () => {
    const expected = {
      BirthPlace: { country: 'Canada' }
    }
    const component = mount(<Cohabitant {...expected} />)
    expect(component.find('.foreign-born-documents').length).toEqual(1)
  })
})
