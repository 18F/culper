import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import Relative from './Relative'
import Location from '../../../Form/Location'

describe('The relative component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <Relative {...expected} />
        </Provider>
      )
  })

  it('no error on empty', () => {
    const expected = {
      render: jest.fn(),
      name: 'relative'
    }

    const component = createComponent(expected)
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
    expect(component.find('.relative-documentnumber').length).toEqual(0)
    expect(component.find('.relative-documentexpiration').length).toEqual(0)
    expect(component.find('.relative-naturalized').length).toEqual(0)
    expect(component.find('.relative-abroad').length).toEqual(0)
    expect(component.find('.relative-derived').length).toEqual(0)
    expect(component.find('.relative-courtname').length).toEqual(0)
    expect(component.find('.relative-courtaddress').length).toEqual(0)
    expect(component.find('.relative-document').length).toEqual(0)
    expect(component.find('.relative-residence-documentnumber').length).toEqual(
      0
    )
    expect(component.find('.relative-document-other-comments ').length).toEqual(
      0
    )
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
      render: jest.fn(),
      name: 'relative',
      Relation: { value: 'Mother' },
      MaidenSameAsListed: { value: 'No' }
    }

    const component = createComponent(expected)
    component.find({ type: 'radio', value: 'Mother' }).simulate('change')
    component.find('.relative-maiden-diff .no input').simulate('change')
    expect(component.find('.relative-maidenname').length).toEqual(1)
  })

  it('display items specific to immediate relationships', () => {
    const expected = {
      render: jest.fn(),
      name: 'relative',
      Relation: { value: 'Father' }
    }

    const component = createComponent(expected)
    expect(component.find('.relative-alias').length).toEqual(1)
  })

  it('display address if not deceased', () => {
    const expected = {
      render: jest.fn(),
      name: 'relative',
      IsDeceased: { value: 'No' }
    }

    const component = createComponent(expected)
    component.find('.relative-deceased .no input').simulate('change')
    expect(component.find('.relative-address').length).toEqual(1)
  })

  it('display documentation information if relative requires citizenship documentation', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      render: jest.fn(),
      name: 'relative',
      Citizenship: { value: ['United States'] },
      CitizenshipDocumentation: { value: 'Other' },
      Birthplace: {
        domestic: 'No',
        city: 'Munich',
        country: { value: 'Germany' }
      },
      IsDeceased: { value: 'No' },
      Address: {
        street: '1234 Some Rd',
        city: 'Munich',
        country: { value: 'Germany' },
        layout: Location.ADDRESS
      }
    }

    const component = createComponent(expected)
    expect(component.find('.relative-abroad').length).toEqual(1)
    component.find('.derived-other input').simulate('change')
    component.find('.derived-other-explanation textarea').simulate('change')
    expect(updates).toBe(2)
  })

  it('display items if not deceased and not a citizen but lives in the U.S.', () => {
    const expected = {
      render: jest.fn(),
      name: 'relative',
      Citizenship: {
        value: ['Germany']
      },
      Birthplace: {
        city: 'Munich',
        country: { value: 'Germany' },
        layout: Location.BIRTHPLACE_WITHOUT_COUNTY
      },
      IsDeceased: { value: 'No' },
      Address: {
        country: { value: 'United States' }
      }
    }

    const component = createComponent(expected)
    expect(component.find('.relative-document').length).toEqual(1)
    expect(
      component.find('.relative-first-contact .datecontrol').length
    ).toEqual(1)
  })

  it('display items if not deceased and not a citizen and lives abroad', () => {
    const expected = {
      render: jest.fn(),
      name: 'relative',
      Citizenship: {
        value: ['Germany']
      },
      Birthplace: {
        city: 'Munich',
        country: { value: 'Germany' },
        layout: Location.BIRTHPLACE_WITHOUT_COUNTY
      },
      IsDeceased: { value: 'No' },
      Address: {
        country: { value: 'Germany' },
        layout: Location.ADDRESS
      }
    }

    const component = createComponent(expected)
    expect(
      component.find('.relative-first-contact .datecontrol').length
    ).toEqual(1)
  })

  it('display employer relationship if affiliated', () => {
    const expected = {
      render: jest.fn(),
      name: 'relative',
      Citizenship: {
        value: ['Germany']
      },
      Birthplace: {
        city: 'Munich',
        country: { value: 'Germany' },
        layout: Location.BIRTHPLACE_WITHOUT_COUNTY
      },
      IsDeceased: { value: 'No' },
      Address: {
        country: { value: 'Germany' },
        layout: Location.ADDRESS
      },
      HasAffiliation: { value: 'Yes' }
    }

    const component = createComponent(expected)
    expect(component.find('.relative-affiliation').length).toEqual(1)
    expect(component.find('.relative-employer-relationship').length).toEqual(1)
  })

  it('initial questions presented', () => {
    let updates = 0
    const expected = {
      render: jest.fn(),
      name: 'relative',
      Relation: { value: 'Mother' },
      Birthplace: { country: { value: 'Germany' } },
      IsDeceased: { value: 'No' },
      onUpdate: obj => {
        updates++
      }
    }
    const component = createComponent(expected)
    component.find('.relation-mother input').simulate('change')
    component
      .find('.relative-name .first input')
      .simulate('change', { target: { name: 'first', value: 'The name' } })
    component
      .find('.relative-birthdate .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.relative-birthdate .month input')
      .simulate('change', { target: { name: 'month', value: '1' } })
    component
      .find('.relative-birthdate .year input')
      .simulate('change', { target: { name: 'year', value: '2005' } })
    component.find('.relative-birthplace .no input').simulate('change')
    component
      .find('.relative-birthplace .city input')
      .simulate('change', { target: { name: 'city', value: 'Munich' } })
    component.find('.relative-citizenship input').simulate('change', {
      target: { name: 'country', value: 'United States' }
    })
    component.find('.relative-deceased .no input').simulate('change')
    expect(updates).toBe(7)
  })

  it('are you my mother?', () => {
    let updates = 0
    const expected = {
      render: jest.fn(),
      name: 'relative',
      Relation: { value: 'Mother' },
      Name: {
        first: 'Foo',
        firstInitialOnly: false,
        middle: 'J',
        middleInitialOnly: true,
        noMiddleName: false,
        last: 'Bar',
        lastInitialOnly: false,
        suffix: 'Jr'
      },
      Birthdate: {
        day: '1',
        month: '1',
        year: '2016',
        date: new Date('1/1/2016')
      },
      Birthplace: {
        domestic: 'Yes',
        city: 'Arlington',
        state: 'Virginia',
        country: { value: 'United States' }
      },
      Citizenship: { value: ['United States'] },
      IsDeceased: { value: 'No' },
      MaidenSameAsListed: { value: 'No' },
      onUpdate: obj => {
        updates++
      }
    }
    const component = createComponent(expected)
    component.find('.relative-maiden-diff .no input').simulate('change')
    expect(component.find('.relative-maidenname').length).toBeGreaterThan(0)
    component
      .find('.relative-maidenname .last input')
      .simulate('change', { target: { value: 'maidenname' } })
    expect(updates).toBe(2)
    component.find('.relative-alias .branch .yes input').simulate('change')
    expect(component.find('.alias-maiden').length).toBe(0)
  })

  it('is immediate relationships?', () => {
    let updates = 0
    const expected = {
      render: jest.fn(),
      name: 'relative',
      Relation: { value: 'Mother' },
      Name: {
        first: 'Foo',
        firstInitialOnly: false,
        middle: 'J',
        middleInitialOnly: true,
        noMiddleName: false,
        last: 'Bar',
        lastInitialOnly: false,
        suffix: 'Jr'
      },
      Birthdate: {
        day: '1',
        month: '1',
        year: '2016',
        date: new Date('1/1/2016')
      },
      Birthplace: {
        country: { value: 'United States' },
        city: 'Arlington',
        state: 'Virginia'
      },
      Citizenship: { value: ['United States'] },
      IsDeceased: { value: 'No' },
      Aliases: {
        items: [
          { Item: { Has: { value: 'Yes' }, MaidenName: { value: 'No' } } }
        ]
      },
      onUpdate: obj => {
        updates++
      }
    }
    const component = createComponent(expected)
    expect(component.find('.relative-alias .branch').length).toBeGreaterThan(0)
    component
      .find('.alias-name .first input')
      .simulate('change', { target: { name: 'first', value: 'The name' } })
    component
      .find('.alias-dates .datecontrol.from .month input')
      .simulate('change', { target: { name: 'month', value: '1' } })
    component
      .find('.alias-dates .datecontrol.from .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.alias-dates .datecontrol.from .year input')
      .simulate('change', { target: { name: 'year', value: '2001' } })
    component
      .find('.alias-dates .datecontrol.to .month input')
      .simulate('change', { target: { name: 'month', value: '1' } })
    component
      .find('.alias-dates .datecontrol.to .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.alias-dates .datecontrol.to .year input')
      .simulate('change', { target: { name: 'year', value: '2005' } })
    expect(updates).toBe(7)
  })

  it('is a citizen but lives abroad?', () => {
    let updates = 0
    const expected = {
      render: jest.fn(),
      name: 'relative',
      Relation: { value: 'Mother' },
      Name: {
        first: 'Foo',
        firstInitialOnly: false,
        middle: 'J',
        middleInitialOnly: true,
        noMiddleName: false,
        last: 'Bar',
        lastInitialOnly: false,
        suffix: 'Jr'
      },
      Birthdate: {
        day: '1',
        month: '1',
        year: '2016',
        date: new Date('1/1/2016')
      },
      Birthplace: {
        city: 'Munich',
        country: { value: 'Germany' },
        layout: Location.BIRTHPLACE_WITHOUT_COUNTY
      },
      Citizenship: { value: ['United States'] },
      IsDeceased: { value: 'No' },
      Address: {
        street: '1234 Some Rd',
        city: 'Munich',
        country: { value: 'Germany' },
        layout: Location.ADDRESS
      },
      onUpdate: obj => {
        updates++
      }
    }
    const component = createComponent(expected)
    component.find('.relative-abroad .abroad-fs input').simulate('change')
    component
      .find('.relative-naturalized .naturalized-alien input')
      .simulate('change')
    component.find('.relative-derived .derived-alien input').simulate('change')
    component
      .find('.relative-documentnumber input')
      .simulate('change', { target: { value: 'documentnumber' } })
    component
      .find('.relative-courtname input')
      .simulate('change', { target: { value: 'courtname' } })
    component
      .find('.relative-courtaddress .city input')
      .simulate('change', { target: { name: 'city', value: 'The city' } })
    expect(updates).toBe(6)
  })

  it('is not a citizen but lives in the United States?', () => {
    let updates = 0
    const expected = {
      render: jest.fn(),
      name: 'relative',
      Relation: { value: 'Mother' },
      Name: {
        first: 'Foo',
        firstInitialOnly: false,
        middle: 'J',
        middleInitialOnly: true,
        noMiddleName: false,
        last: 'Bar',
        lastInitialOnly: false,
        suffix: 'Jr'
      },
      Birthdate: {
        day: '1',
        month: '1',
        year: '2016',
        date: new Date('1/1/2016')
      },
      Birthplace: {
        layout: Location.BIRTHPLACE_WITHOUT_COUNTY,
        city: 'Arlington',
        state: 'Virginia',
        country: { value: 'United States' }
      },
      Citizenship: { value: ['Germany'] },
      IsDeceased: { value: 'No' },
      Address: {
        country: { value: 'United States' },
        address: '1234 Some Rd',
        city: 'Arlington',
        state: 'Virginia',
        zipcode: '22202'
      },
      Document: { value: 'Other' },
      onUpdate: obj => {
        updates++
      }
    }
    const component = createComponent(expected)
    expect(component.find('.relative-address').length).toBe(1)
    component
      .find('.relative-address .city input')
      .simulate('change', { target: { name: 'city', value: 'City name' } })
    expect(component.find('.relative-document').length).toBeGreaterThan(0)
    component
      .find('.relative-document .document-other input')
      .simulate('change')
    component
      .find('.relative-document-other-comments textarea')
      .simulate('change', { target: { value: 'explanation' } })
    component
      .find('.relative-residence-documentnumber input')
      .simulate('change', { target: { value: '00000000' } })
    component
      .find('.relative-expiration .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.relative-expiration .month input')
      .simulate('change', { target: { name: 'month', value: '1' } })
    component
      .find('.relative-expiration .year input')
      .simulate('change', { target: { name: 'year', value: '2005' } })
    expect(updates).toBe(7)
  })

  it('is not a citizen and lives outside the United States?', () => {
    let updates = 0
    const expected = {
      render: jest.fn(),
      name: 'relative',
      Relation: { value: 'Mother' },
      Name: {
        first: 'Foo',
        firstInitialOnly: false,
        middle: 'J',
        middleInitialOnly: true,
        noMiddleName: false,
        last: 'Bar',
        lastInitialOnly: false,
        suffix: 'Jr'
      },
      Birthdate: {
        day: '1',
        month: '1',
        year: '2016',
        date: new Date('1/1/2016')
      },
      Birthplace: {
        domestic: 'Yes',
        city: 'Arlington',
        state: 'Virginia',
        country: { value: 'United States' }
      },
      Citizenship: { value: ['Germany'] },
      IsDeceased: { value: 'No' },
      Address: {
        address: '1234 Some Rd',
        city: 'Munich',
        country: { value: 'Germany' }
      },
      Methods: { value: ['Telephone'] },
      Frequency: { value: 'Daily' },
      HasAffiliation: { value: 'Yes' },
      onUpdate: obj => {
        updates++
      }
    }
    const component = createComponent(expected)
    expect(component.find('.relative-first-contact').length).toBeGreaterThan(0)
    component
      .find('.relative-first-contact .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.relative-first-contact .month input')
      .simulate('change', { target: { name: 'month', value: '1' } })
    component
      .find('.relative-first-contact .year input')
      .simulate('change', { target: { name: 'year', value: '2005' } })
    component
      .find('.relative-last-contact .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.relative-last-contact .month input')
      .simulate('change', { target: { name: 'month', value: '1' } })
    component
      .find('.relative-last-contact .year input')
      .simulate('change', { target: { name: 'year', value: '2005' } })
    component
      .find('.relative-methods .methods-telephone input')
      .simulate('change')
    component
      .find('.relative-frequency .frequency-daily input')
      .simulate('change')
    component
      .find('.relative-employer input')
      .simulate('change', { target: { value: 'ACME' } })
    component
      .find('.relative-employer-address .city input')
      .simulate('change', { target: { name: 'city', value: 'The city' } })
    component.find('.relative-affiliation .yes input').simulate('change')
    component
      .find('.relative-employer-relationship textarea')
      .simulate('change', { target: { value: 'employer relationship' } })
    component
      .find({ type: 'checkbox', name: 'EmployerNotApplicable' })
      .simulate('change')
    component
      .find({ type: 'checkbox', name: 'EmployerAddressNotApplicable' })
      .simulate('change')
    component
      .find({ type: 'checkbox', name: 'EmployerRelationshipNotApplicable' })
      .simulate('change')
    expect(updates).toBe(15)
  })
})
