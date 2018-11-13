import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Field, Country, DateRange } from '../../../Form'

export default class TravelItem extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateDates = this.updateDates.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Country: this.props.Country,
      Dates: this.props.Dates,
      ...queue
    })
  }

  updateCountry(values) {
    this.update({
      Country: values
    })
  }

  updateDates(values) {
    this.update({
      Dates: values
    })
  }

  render() {
    return (
      <div className="citizenship-item">
        <Field
          title={i18n.t('citizenship.multiple.heading.travel.country')}
          scrollIntoView={this.props.scrollIntoView}>
          <Country
            name="Country"
            className="travel-item-country"
            {...this.props.Country}
            onUpdate={this.updateCountry}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('citizenship.multiple.heading.travel.dates')}
          help="citizenship.multiple.help.travel.dates"
          adjustFor="daterange"
          scrollIntoView={this.props.scrollIntoView}>
          <DateRange
            name="Dates"
            className="travel-item-dates"
            {...this.props.Dates}
            minDateEqualTo={true}
            onUpdate={this.updateDates}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>
      </div>
    )
  }
}

TravelItem.defaultProps = {
  Country: {},
  Dates: {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
