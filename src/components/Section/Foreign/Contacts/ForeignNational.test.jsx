
import React from 'react'
import { mount } from 'enzyme'
import ForeignNational from './ForeignNational'

describe('The foreign national component', () => {
  it('display explanation if we do not know the name', () => {
    const expected = {
      name: 'foreign-national',
      NameNotApplicable: { applicable: false }
    }
    const component = mount(<ForeignNational {...expected} />)
    expect(component.find('.name-explanation').length).toBe(1)
  })

  it('display explanation if we have methods of "other"', () => {
    const expected = {
      name: 'foreign-national',
      Methods: { values: ['Other'] }
    }
    const component = mount(<ForeignNational {...expected} />)
    expect(component.find('.methods-explanation').length).toBe(1)
  })

  it('display explanation if we have frequency of "other"', () => {
    const expected = {
      name: 'foreign-national',
      Frequency: { value: 'Other' }
    }
    const component = mount(<ForeignNational {...expected} />)
    expect(component.find('.frequency-explanation').length).toBe(1)
  })

  it('display explanation if we have relation of "other"', () => {
    const expected = {
      name: 'foreign-national',
      Relationship: { values: ['Other'] }
    }
    const component = mount(<ForeignNational {...expected} />)
    expect(component.find('.relationship-explanation').length).toBe(1)
    component.find('.relationship-obligation input').simulate('change')
    expect(component.find('.relationship-explanation').length).toBe(1)
  })

  it('display explanation if we have relation of "obligation"', () => {
    const expected = {
      name: 'foreign-national',
      Relationship: { values: ['Obligation'] }
    }
    const component = mount(<ForeignNational {...expected} />)
    expect(component.find('.relationship-explanation').length).toBe(1)
  })

  it('display affiliations if said to have some', () => {
    const expected = {
      name: 'foreign-national',
      HasAffiliations: { value: 'Yes' }
    }
    const component = mount(<ForeignNational {...expected} />)
    expect(component.find('.affiliations').length).toBe(1)
  })

  it('trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'foreign-national',
      NameNotApplicable: { applicable: false },
      Methods: { values: ['Other'] },
      Frequency: { value: 'Other' },
      Relationship: { values: ['Other'] },
      Aliases: {
        items: [{ Item: { Has: { value: 'No' } } }]
      },
      HasAffiliations: { value: 'Yes' },
      onUpdate: () => { updates++ }
    }
    const component = mount(<ForeignNational {...expected} />)
    component.find('.na-name .name .first input').simulate('change')
    component.find('.na-name.button input').simulate('change')
    component.find('.name-explanation textarea').simulate('change')
    component.find('.first-contact .day input').simulate('change')
    component.find('.last-contact .day input').simulate('change')
    component.find('.methods-other input').simulate('change')
    component.find('.methods-explanation textarea').simulate('change')
    component.find('.frequency-other input').simulate('change') // 9
    component.find('.frequency-explanation textarea').simulate('change')
    component.find('.relationship-other input').simulate('change')
    component.find('.relationship-explanation textarea').simulate('change') // 12
    component.find('.relationship-other input').simulate('change')
    component.find('.aliases .branch .no input').simulate('change')
    component.find('.citizenship input').simulate('change')
    component.find('.na-birthdate .day input').simulate('change')
    component.find('.na-birthdate.button input').simulate('change')
    component.find('.na-birthplace .city input').simulate('change')
    component.find('.na-birthplace.button input').simulate('change')
    component.find('.na-address .city input').simulate('change')
    component.find('.na-address.button input').simulate('change')
    component.find('.na-employer .employer input').simulate('change')
    component.find('.na-employer.button input').simulate('change')
    component.find('.na-employer-address .city input').simulate('change')
    component.find('.na-employer-address.button input').simulate('change')
    component.find('.has-affiliations .yes input').simulate('change')
    component.find('.affiliations textarea').simulate('change')
    expect(updates).toBe(25)
  })
})
