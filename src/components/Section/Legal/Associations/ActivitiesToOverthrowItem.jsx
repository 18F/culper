import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Field, DateRange, Textarea } from '../../../Form'

export default class ActivitiesToOverthrowItem extends ValidationElement {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateReasons = this.updateReasons.bind(this)
    this.updateDates = this.updateDates.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Reasons: this.props.Reasons,
      Dates: this.props.Dates,
      ...queue
    })
  }

  updateReasons (values) {
    this.update({
      Reasons: values
    })
  }

  updateDates (values) {
    this.update({
      Dates: values
    })
  }

  render () {
    return (
      <div>
        <Field title={i18n.t('legal.associations.activities.heading.reasons')}
               adjustFor="textarea"
               scrollIntoView={this.props.scrollIntoView}>
          <Textarea name="Reasons"
                    {...this.props.Reasons}
                    onUpdate={this.updateReasons}
                    onError={this.props.onError}
                    className="legal-associations-activities-reasons"
                    required={this.props.required}
                    />
        </Field>

        <Field title={i18n.t('legal.associations.activities.heading.dates')}
               help="legal.associations.activities.help.dates"
               adjustFor="daterange"
               scrollIntoView={this.props.scrollIntoView}>
          <DateRange name="Dates"
                     {...this.props.Dates}
                     onUpdate={this.updateDates}
                     onError={this.props.onError}
                     className="legal-associations-activities-dates"
                     required={this.props.required}
                     />
        </Field>
      </div>
    )
  }
}

ActivitiesToOverthrowItem.defaultProps = {
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
