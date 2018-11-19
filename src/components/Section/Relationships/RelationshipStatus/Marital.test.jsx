import React from 'react'
import { mount } from 'enzyme'
import Marital from './Marital'
import { i18n } from '../../../../config'

describe('The relationship status component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'relatives'
    }

    const component = mount(<Marital {...expected} />)
    expect(component.find('.marital').length).toEqual(1)
  })

  it('performs updates', () => {
    let updates = 0
    const expected = {
      name: 'relatives',
      Status: { value: 'Married' },
      onUpdate: () => {
        updates++
      }
    }

    const component = mount(<Marital {...expected} />)
    expect(component.find('.marital').length).toEqual(1)
    component.find('.status-options input[value="Married"]').simulate('change')
    component.find('.civil-union .civil .first input').simulate('change')
    component
      .find('.status-options input[value="NeverMarried"]')
      .simulate('change')
    expect(updates).toBe(3)
  })

  it('shows divorce stuff', () => {
    let updates = 0
    const expected = {
      name: 'relatives',
      Status: { value: 'Divorced' },
      DivorcedList: {
        branch: {
          value: 'Yes'
        },
        items: [
          {
            Divorce: {
              Status: { value: 'Divorced' },
              BirthPlace: { country: 'United States' },
              Deceased: { value: 'Yes' }
            }
          }
        ]
      },
      onUpdate: () => {
        updates++
      }
    }

    const component = mount(<Marital {...expected} />)
    expect(component.find('.marital').length).toEqual(1)
    component.find('.status-options input[value="Divorced"]').simulate('change')
    expect(updates).toBe(2)
    expect(component.find('.accordion').length).toBe(1)
  })

  describe('handles civil union dates', () => {
    it('with good data', () => {
      const props = {
        name: "marital",
        Status: {
            checked: true,
            value: 'Married'
          },
        applicantBirthdate: {
          estimated: false,
          day: "1",
          month: "1",
          name: "birthdate",
          year: "1970",
          date: new Date("1970", "1", "1")
        },
        CivilUnion: {
              Birthdate: {
                estimated: false,
                day: "1",
                month: "1",
                name: "birthdate",
                year: "1980",
                date: new Date("1980", "1", "1")
              },
              EnteredCivilUnion: {
                estimated: false,
                day: "1",
                month: "1",
                name: "enteredCivilUnion",
                year: "1990",
                date: new Date("1990", "1", "1")
              },
            },
        valid: true
      }

      const component =  mount(<Marital {...props} />)
      expect(component.find('.error-messages [data-i18n="error.civilUnion.min"]').children().length).toEqual(0)
    })
    it('with bad data', () => {
      const props = {
        name: "marital",
        Status: {
            checked: true,
            value: 'Married'
          },
        applicantBirthdate: {
          estimated: false,
          day: "1",
          month: "1",
          name: "birthdate",
          year: "1970",
          date: new Date("1970", "1", "1")
        },
        CivilUnion: {
              Birthdate: {
                estimated: false,
                day: "1",
                month: "1",
                name: "birthdate",
                year: "1980",
                date: new Date("1980", "1", "1")
              },
              EnteredCivilUnion: {
                estimated: false,
                day: "1",
                month: "1",
                name: "enteredCivilUnion",
                year: "1960",
                date: new Date("1960", "1", "1")
              },
            },
        valid: false
      }

      const component =  mount(<Marital {...props} />)
      expect(component.find('.error-messages [data-i18n="error.civilUnion.min"]').text()).toEqual(
        `${i18n.t('error.civilUnion.min.title')}${i18n.t('error.civilUnion.min.message')}`
      )
    })
  })

  describe('handles divorce dates', () => {
    it('with good data', () => {
      const props = {
        name: "marital",
        Status: {
            checked: true,
            value: 'Divorced'
          },
        applicantBirthdate: {
          estimated: false,
          day: "1",
          month: "1",
          name: "birthdate",
          year: "1970",
          date: new Date("1970", "1", "1")
        },
        DivorcedList: {
          items: [{
            Item: {
              Birthdate: {
                estimated: false,
                day: "1",
                month: "1",
                name: "birthdate",
                year: "1980",
                date: new Date("1980", "1", "1")
              },
              Recognized: {
                estimated: false,
                day: "1",
                month: "1",
                name: "Recognized",
                year: "1990",
                date: new Date("1990", "1", "1")
              },
              DateDivorced: {
                estimated: false,
                day: "1",
                month: "1",
                name: "DateDivorced",
                year: "2000",
                date: new Date("2000", "1", "1")
              },
            },
          open: true
        }],
      },
        valid: true
      }

      const component =  mount(<Marital {...props} />)
      expect(component.find('.error-messages [data-i18n="error.divorceDate.min"]').children().length).toEqual(0)
    })
    it('with bad data', () => {
      const props = {
        name: "marital",
        Status: {
            checked: true,
            value: 'Divorced'
          },
        applicantBirthdate: {
          estimated: false,
          day: "1",
          month: "1",
          name: "birthdate",
          year: "1970",
          date: new Date("1970", "1", "1")
        },
        DivorcedList: {
          items: [{
            Item: {
              Birthdate: {
                estimated: false,
                day: "1",
                month: "1",
                name: "birthdate",
                year: "1980",
                date: new Date("1980", "1", "1")
              },
              Recognized: {
                estimated: false,
                day: "1",
                month: "1",
                name: "Recognized",
                year: "1990",
                date: new Date("1990", "1", "1")
              },
              DateDivorced: {
                estimated: false,
                day: "1",
                month: "1",
                name: "DateDivorced",
                year: "1950",
                date: new Date("1950", "1", "1")
              },
            },
          open: true
        }],
      },
        valid: false
      }

      const component =  mount(<Marital {...props} />)
      expect(component.find('.error-messages [data-i18n="error.divorceDate.min"]').text()).toEqual(
        `${i18n.t('error.divorceDate.min.title')}${i18n.t('error.divorceDate.min.message')}`
      )
    })
  })

})
