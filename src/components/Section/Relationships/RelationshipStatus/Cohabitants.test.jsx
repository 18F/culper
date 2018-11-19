import React from 'react'
import { mount } from 'enzyme'
import Cohabitants from './Cohabitants'
import { i18n } from '../../../../config'

describe('The cohabitants component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'cohabitant'
    }

    const component = mount(<Cohabitants {...expected} />)
    expect(component.find('.cohabitants').length).toEqual(1)
  })

  it('performs updates ', () => {
    let updates = 0
    const expected = {
      name: 'cohabitants',
      HasCohabitant: { value: 'Yes' },
      CohabitantList: [
        {
          Cohabitant: {
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
        }
      ],
      onUpdate: () => {
        updates++
      }
    }

    const component = mount(<Cohabitants {...expected} />)
    expect(component.find('.cohabitants').length).toEqual(1)
    updates = 0
    component.find('.has-cohabitant .yes input').simulate('change')
    expect(updates).toBe(1)
  })

  describe('handles cohanbitant dates', () => {
    it('with good data', () => {
      const props = {
        name: "marital",
        HasCohabitant: {
            value: 'Yes'
          },
        applicantBirthdate: {
          estimated: false,
          day: "1",
          month: "1",
          name: "birthdate",
          year: "1970",
          date: new Date("1970", "1", "1")
        },
        CohabitantList: {
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
              CohabitationBegan: {
                estimated: false,
                day: "1",
                month: "1",
                name: "cohabitationBegan",
                year: "1990",
                date: new Date("1990", "1", "1")
              },
          },
          open: true
        }]
      },
        valid: true
      }

      const component =  mount(<Cohabitants {...props} />)
      expect(component.find('.error-messages [data-i18n="error.cohabitant.min"]').children().length).toEqual(0)
    })
    it('with bad data', () => {
      const props = {
        name: "marital",
        HasCohabitant: {
            value: 'Yes'
          },
        applicantBirthdate: {
          estimated: false,
          day: "1",
          month: "1",
          name: "birthdate",
          year: "1970",
          date: new Date("1970", "1", "1")
        },
        CohabitantList: {
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
              CohabitationBegan: {
                estimated: false,
                day: "1",
                month: "1",
                name: "cohabitationBegan",
                year: "1960",
                date: new Date("1960", "1", "1")
              },
          },
          open: true
        }]
      },
        valid: false
      }

      const component =  mount(<Cohabitants {...props} />)
      expect(component.find('.error-messages [data-i18n="error.cohabitant.min"]').text()).toEqual(
        `${i18n.t('error.cohabitant.min.title')}${i18n.t('error.cohabitant.min.message')}`
      )
    })
  })


})
