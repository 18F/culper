import React from 'react'
import { i18n } from '../../../../config'
import { mount } from 'enzyme'
import TaxesItem from './TaxesItem'

describe('The taxes item component', () => {
  it('triggers updates when changing values', () => {
    let updates = 0
    const expected = {
      name: 'taxes',
      onUpdate: obj => {
        updates++
      }
    }
    const component = mount(<TaxesItem {...expected} />)
    component
      .find('.taxes-year .year input')
      .simulate('change', { target: { value: '2000' } })
    component
      .find('.taxes-reason textarea')
      .simulate('change', { target: { value: 'Reason for not filing' } })
    component
      .find('.taxes-agency input')
      .simulate('change', { target: { value: 'IRS' } })
    component
      .find('.taxes-taxtype input')
      .simulate('change', { target: { value: 'Income' } })
    component
      .find('.taxes-amount input[type="text"]')
      .simulate('change', { target: { value: '10000' } })
    component
      .find('.taxes-date .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.taxes-description textarea')
      .simulate('change', { target: { value: 'Description for not filing' } })
    component
      .find('.taxes-date-notapplicable .not-applicable .block label input')
      .simulate('change')
    expect(updates).toBe(8)
  })

  describe.only('handles tax dates', () => {

    function handleError(code, value, arr) {
      arr = arr.map(err => {
        return {
          code: `taxSatisfied.min`,
          valid: err.valid,
          uid: err.uid
        }
      })

      // Take the original and concatenate our new error values to it
      return this.props.onError(value, arr)
    }

    it('with good data', () => {
      const params = {
        Year: {
          day: "1",
          estimated: false,
          month: "1",
          name: "Year",
          year: "2000"
        },
        Date: {
          day: "1",
          estimated: false,
          month: "1",
          name: "Date",
          year: "2010"
        },
        valid: true
      }

      const component = mount(<TaxesItem {...params} />)
      const year = component.find('.taxes-year .year input')
      year.simulate('change', {target: { value: "2000" }})
      component.find('.taxes-date-notapplicable .month input')
      component.find('.taxes-date-notapplicable .year input')
      expect(component.find('.taxes-date-notapplicable .error-messages').children().length).toEqual(0)
    })
    it('with bad data', () => {
      const params = {
        Year: {
          day: "1",
          estimated: false,
          month: "1",
          name: "Year",
          year: "2000"
        },
        Date: {
          day: "1",
          estimated: false,
          month: "1",
          name: "Date",
          year: "1998"
        },
        onError: (code, value, arr) => handleError()(code, value, arr),
        valid: false
      }

      const component = mount(<TaxesItem {...params} />)
      // component.find('.taxes-year .year input').simulate('change')
      // component.find('.taxes-date-notapplicable .month input').simulate('change')
      // component.find('.taxes-date-notapplicable .year input').simulate('change')
      //
      // console.log(component.find('.taxes-year .year input').html())
      // console.log(component.find('.taxes-date-notapplicable .year input').html())
      //
      // console.log(component.find('.taxes-date-notapplicable .year input').html())
      // console.log(component.find('.messages.error-messages').map(x => x.html()))
      expect(component.find('.error-messages [data-i18n="error.taxesSatisfied.min"]').text()).toEqual(
        i18n.t('error.taxesSatisfied.min.title')
      )
      expect(component.find('.taxes-date-notapplicable .error-messages .usa-alert-body > p').text()).toEqual(
        i18n.t('error.taxesSatisfied.min.message')
      )
    })
  })

})
