import React from 'react'
import { mount } from 'enzyme'
import Relative from './Relative'

describe('The relative component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'relative'
    }

    const component = mount(<Relative {...expected} />)
    expect(component.find('.relative-relation').length).toEqual(1)
    expect(component.find('.relative-name').length).toEqual(1)
    expect(component.find('.relative-birthdate .datecontrol').length).toEqual(1)
    expect(component.find('.relative-birthplace').length).toEqual(1)
    expect(component.find('.relative-maidenname').length).toEqual(0)
    expect(component.find('.alias-name').length).toEqual(0)
    expect(component.find('.alias-maiden').length).toEqual(0)
    expect(component.find('.alias-dates').length).toEqual(0)
    expect(component.find('.relative-deceased').length).toEqual(1)
    expect(component.find('.relative-address').length).toEqual(0)
    expect(component.find('.relative-abroad').length).toEqual(0)
    expect(component.find('.relative-naturalized').length).toEqual(0)
    expect(component.find('.relative-derived').length).toEqual(0)
    expect(component.find('.relative-documentnumber').length).toEqual(0)
    expect(component.find('.relative-courtname').length).toEqual(0)
    expect(component.find('.relative-courtaddress').length).toEqual(0)
    expect(component.find('.relative-document').length).toEqual(0)
    expect(component.find('.relative-residence-documentnumber').length).toEqual(0)
    expect(component.find('.relative-expiration').length).toEqual(0)
    expect(component.find('.relative-first-contact').length).toEqual(0)
    expect(component.find('.relative-last-contact').length).toEqual(0)
    expect(component.find('.relative-methods').length).toEqual(0)
    expect(component.find('.relative-frequency').length).toEqual(0)
    expect(component.find('.relative-employer').length).toEqual(0)
    expect(component.find('.relative-employer-address').length).toEqual(0)
    expect(component.find('.relative-affiliation').length).toEqual(0)
    expect(component.find('.relative-employer-relationship').length).toEqual(0)
  })

  it('display maiden name if relationship is mother', () => {
    const expected = {
      name: 'relative'
    }

    const component = mount(<Relative {...expected} />)
    component.find({ type: 'checkbox', value: 'Mother' }).simulate('change')
    expect(component.find('.relative-maidenname').length).toEqual(1)
  })

  it('display items specific to immediate family', () => {
    const expected = {
      name: 'relative'
    }

    const component = mount(<Relative {...expected} />)
    component.find({ type: 'checkbox', value: 'Father' }).simulate('change')
    expect(component.find('.relative-alias').length).toEqual(1)
  })

  it('display address if not deceased', () => {
    const expected = {
      name: 'relative'
    }

    const component = mount(<Relative {...expected} />)
    component.find('.relative-deceased .no input').simulate('change')
    expect(component.find('.relative-address').length).toEqual(1)
  })

  it('display documentation information if relative requires citizenship documentation', () => {
    const expected = {
      name: 'relative',
      Citizenship: ['United States'],
      Birthplace: {
        addressType: 'International',
        address: '1234 Some Rd',
        city: 'Munich',
        country: 'Germany'
      },
      IsDeceased: 'No',
      Address: {
        addressType: 'International',
        address: '1234 Some Rd',
        city: 'Munich',
        country: 'Germany'
      }
    }

    const component = mount(<Relative {...expected} />)
    expect(component.find('.relative-abroad').length).toEqual(1)
  })

  it('display items if not deceased and not a citizen but lives in the U.S.', () => {
    const expected = {
      name: 'relative',
      Citizenship: ['Germany'],
      Birthplace: {
        addressType: 'International',
        address: '1234 Some Rd',
        city: 'Munich',
        country: 'Germany'
      },
      IsDeceased: 'No',
      Address: {
        addressType: 'United States'
      }
    }

    const component = mount(<Relative {...expected} />)
    expect(component.find('.relative-document').length).toEqual(1)
  })

  it('display items if not deceased and not a citizen and lives abroad', () => {
    const expected = {
      name: 'relative',
      Citizenship: ['Germany'],
      Birthplace: {
        addressType: 'International',
        address: '1234 Some Rd',
        city: 'Munich',
        country: 'Germany'
      },
      IsDeceased: 'No',
      Address: {
        addressType: 'International'
      }
    }

    const component = mount(<Relative {...expected} />)
    expect(component.find('.relative-first-contact .datecontrol').length).toEqual(1)
  })

  it('display employer relationship if affiliated', () => {
    const expected = {
      name: 'relative',
      Citizenship: ['Germany'],
      Birthplace: {
        addressType: 'International',
        address: '1234 Some Rd',
        city: 'Munich',
        country: 'Germany'
      },
      IsDeceased: 'No',
      Address: {
        addressType: 'International'
      },
      HasAffiliation: 'Yes'
    }

    const component = mount(<Relative {...expected} />)
    expect(component.find('.relative-affiliation').length).toEqual(1)
    expect(component.find('.relative-employer-relationship').length).toEqual(1)
  })

  it('trigger updates when changing values', () => {
    let updates = 0
    const expected = {
      name: 'relative',
      onUpdate: (obj) => {
        updates++
      }
    }
    const component = mount(<Relative {...expected} />)
    component.find('.relation-mother input').simulate('change')
    component.find('.relative-name .first input').simulate('change', { target: { name: 'first', value: 'The name' } })
    component.find('.relative-birthdate .day input').simulate('change', { target: { name: 'day', value: '1' } })
    component.find('.relative-birthdate .month input').simulate('change', { target: { name: 'month', value: '1' } })
    component.find('.relative-birthdate .year input').simulate('change', { target: { name: 'year', value: '2005' } })
    component.find('.relative-birthplace .international input').simulate('change')
    component.find('.relative-birthplace .country input#country').simulate('change', { target: { name: 'country', value: 'Germany' } })
    component.find('.relative-citizenship input#Citizenship').simulate('change', { target: { name: 'country', value: 'United States' } })
    component.find('.relative-deceased .no input').simulate('change')

    // Are you my mother?
    expect(component.find('.relative-maidenname').length).toBeGreaterThan(0)
    component.find('.relative-maidenname input').simulate('change', { target: { value: 'maidenname' } })

    // Is immediate family
    expect(component.find('.relative-alias .branch').length).toBeGreaterThan(0)
    component.find('.relative-alias .branch .yes input').simulate('change')
    component.find('.alias-name .first input').simulate('change', { target: { name: 'first', value: 'The name' } })
    component.find('.alias-maiden .yes input').simulate('change')
    component.find('.alias-dates .datecontrol.from .month input').simulate('change', { target: { name: 'month', value: '1' } })
    component.find('.alias-dates .datecontrol.from .day input').simulate('change', { target: { name: 'day', value: '1' } })
    component.find('.alias-dates .datecontrol.from .year input').simulate('change', { target: { name: 'year', value: '2001' } })
    component.find('.alias-dates .datecontrol.to .month input').simulate('change', { target: { name: 'month', value: '1' } })
    component.find('.alias-dates .datecontrol.to .day input').simulate('change', { target: { name: 'day', value: '1' } })
    component.find('.alias-dates .datecontrol.to .year input').simulate('change', { target: { name: 'year', value: '2005' } })

    // Is a citizen but lives abroad
    component.find('.relative-address .international input').simulate('change')
    component.find('.relative-address .country input#country').simulate('change', { target: { name: 'country', value: 'Germany' } })
    expect(component.find('.relative-abroad').length).toBeGreaterThan(0)
    component.find('.relative-abroad .abroad-fs input').simulate('change')
    component.find('.relative-naturalized .naturalized-alien input').simulate('change')
    component.find('.relative-derived .derived-alien input').simulate('change')
    component.find('.relative-documentnumber input').simulate('change', { target: { value: 'documentnumber' } })
    component.find('.relative-courtname input').simulate('change', { target: { value: 'courtname' } })
    component.find('.relative-courtaddress .city input').simulate('change', { target: { name: 'city', value: 'The city' } })

    // Is a not citizen and not deceased
    component.find('.relative-citizenship input#Citizenship').simulate('change', { target: { name: 'country', value: 'Germany' } })

    // Is not a citizen but lives in the United States
    component.find('.relative-address .domestic input').simulate('change')
    component.find('.relative-address .city input').simulate('change', { target: { name: 'city', value: 'City name' } })
    expect(component.find('.relative-document').length).toBeGreaterThan(0)
    component.find('.relative-document .document-employment input').simulate('change')
    component.find('.relative-residence-documentnumber input').simulate('change', { target: { value: '00000000' } })
    component.find('.relative-expiration .day input').simulate('change', { target: { name: 'day', value: '1' } })
    component.find('.relative-expiration .month input').simulate('change', { target: { name: 'month', value: '1' } })
    component.find('.relative-expiration .year input').simulate('change', { target: { name: 'year', value: '2005' } })

    // Is not a citizen and lives outside the United States
    component.find('.relative-address .international input').simulate('change')
    component.find('.relative-address .country input#country').simulate('change', { target: { name: 'country', value: 'Germany' } })
    expect(component.find('.relative-first-contact').length).toBeGreaterThan(0)
    component.find('.relative-first-contact .day input').simulate('change', { target: { name: 'day', value: '1' } })
    component.find('.relative-first-contact .month input').simulate('change', { target: { name: 'month', value: '1' } })
    component.find('.relative-first-contact .year input').simulate('change', { target: { name: 'year', value: '2005' } })
    component.find('.relative-last-contact .day input').simulate('change', { target: { name: 'day', value: '1' } })
    component.find('.relative-last-contact .month input').simulate('change', { target: { name: 'month', value: '1' } })
    component.find('.relative-last-contact .year input').simulate('change', { target: { name: 'year', value: '2005' } })
    component.find('.relative-methods .methods-telephone input').simulate('change')
    component.find('.relative-frequency .frequency-daily input').simulate('change')
    component.find('.relative-employer input').simulate('change', { target: { value: 'ACME' } })
    component.find('.relative-employer-address .city input').simulate('change', { target: { name: 'city', value: 'The city' } })
    component.find('.relative-affiliation .yes input').simulate('change')
    component.find('.relative-employer-relationship textarea').simulate('change', { target: { value: 'employer relationship' } })

    expect(updates).toBeGreaterThan(6)
  })
})
