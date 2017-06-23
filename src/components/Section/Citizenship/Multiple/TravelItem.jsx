import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Field, Country, DateRange } from '../../../Form'
import { sendUpdate } from './Multiple'

export default class TravelItem extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      Country: props.Country,
      Dates: props.Dates
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateDates = this.updateDates.bind(this)
  }

  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)
    })
  }

  updateCountry (values) {
    this.onUpdate('Country', values)
  }

  updateDates (values) {
    this.onUpdate('Dates', values)
  }

  render () {
    return (
      <div className="citizenship-item">
        <Field title={i18n.t('citizenship.multiple.heading.travel.country')}>
          <Country name="Country"
                   {...this.state.Country}
                   onUpdate={this.updateCountry}
                   onError={this.props.onError}
                   />
        </Field>

        <Field title={i18n.t('citizenship.multiple.heading.travel.dates')}
               help="citizenship.multiple.help.travel.dates"
               adjustFor="daterange">
          <DateRange name="Dates"
                     {...this.state.Dates}
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
