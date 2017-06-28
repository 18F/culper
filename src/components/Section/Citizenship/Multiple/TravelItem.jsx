import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Field, Country, DateRange } from '../../../Form'

export default class TravelItem extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateDates = this.updateDates.bind(this)
  }

  update (queue) {
    if (this.props.onUpdate) {
      let obj = {
        Country: this.props.Country,
        Dates: this.props.Dates
      }

      for (const q of queue) {
        obj = { ...obj, [q.name]: q.value }
      }

      this.props.onUpdate(obj)
    }
  }

  updateCountry (values) {
    this.update([
      { name: 'Country', value: values }
    ])
  }

  updateDates (values) {
    this.update([
      { name: 'Dates', value: values }
    ])
  }

  render () {
    return (
      <div className="citizenship-item">
        <Field title={i18n.t('citizenship.multiple.heading.travel.country')}>
          <Country name="Country"
                   {...this.props.Country}
                   onUpdate={this.updateCountry}
                   onError={this.props.onError}
                   />
        </Field>

        <Field title={i18n.t('citizenship.multiple.heading.travel.dates')}
               help="citizenship.multiple.help.travel.dates"
               adjustFor="daterange">
          <DateRange name="Dates"
                     {...this.props.Dates}
                     onUpdate={this.updateDates}
                     onError={this.props.onError}
                     />
        </Field>
      </div>
    )
  }
}

TravelItem.defaultProps = {
  Country: {},
  Dates: {},
  onError: (value, arr) => { return arr }
}
