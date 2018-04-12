import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, DateRange, Currency, Field, Textarea } from '../../../Form'

export default class GamblingItem extends ValidationElement {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updateLosses = this.updateLosses.bind(this)
    this.updateDescription = this.updateDescription.bind(this)
    this.updateActions = this.updateActions.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Dates: this.props.Dates,
      Losses: this.props.Losses,
      Description: this.props.Description,
      Actions: this.props.Actions,
      ...queue
    })
  }

  updateDates (values) {
    this.update({
      Dates: values
    })
  }

  updateLosses (values) {
    this.update({
      Losses: values
    })
  }

  updateDescription (values) {
    this.update({
      Description: values
    })
  }

  updateActions (values) {
    this.update({
      Actions: values
    })
  }

  render () {
    return (
      <div className="gambling-item">
        <Field title={i18n.t('financial.gambling.heading.dates')}
               scrollIntoView={this.props.scrollIntoView}
               adjustFor="daterange">
          <DateRange name="Dates"
                     {...this.props.Dates}
                     className="dates"
                     label={i18n.t('financial.gambling.label.dates')}
                     onUpdate={this.updateDates}
                     onError={this.props.onError}
                     required={this.props.required}
                     />
        </Field>

        <Field title={i18n.t('financial.gambling.heading.losses')}
               scrollIntoView={this.props.scrollIntoView}>
          <Currency name="Losses"
                    {...this.props.Losses}
                    className="losses"
                    min="1"
                    onUpdate={this.updateLosses}
                    onError={this.props.onError}
                    required={this.props.required}
                    />
        </Field>

        <Field title={i18n.t('financial.gambling.heading.description')}
               scrollIntoView={this.props.scrollIntoView}
               help="financial.gambling.help.description">
          <Textarea name="Description"
                    {...this.props.Description}
                    className="description"
                    onUpdate={this.updateDescription}
                    onError={this.props.onError}
                    required={this.props.required}
                    />
        </Field>

        <Field title={i18n.t('financial.gambling.heading.actions')}
               scrollIntoView={this.props.scrollIntoView}
               help="financial.gambling.help.actions">
          <Textarea name="Actions"
                    {...this.props.Actions}
                    className="actions"
                    onUpdate={this.updateActions}
                    onError={this.props.onError}
                    required={this.props.required}
                    />
        </Field>
      </div>
    )
  }
}

GamblingItem.defaultProps = {
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  required: false
}
