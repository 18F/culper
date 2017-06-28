import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Field, Branch, Show, Country, DateRange, Textarea } from '../../../Form'
import { sendUpdate } from './Multiple'

export default class CitizenshipItem extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updateHow = this.updateHow.bind(this)
    this.updateRenounced = this.updateRenounced.bind(this)
    this.updateRenouncedExplanation = this.updateRenouncedExplanation.bind(this)
    this.updateCurrent = this.updateCurrent.bind(this)
    this.updateCurrentExplanation = this.updateCurrentExplanation.bind(this)
  }

  update (queue) {
    if (this.props.onUpdate) {
      let obj = {
        Country: this.props.Country,
        Dates: this.props.Dates,
        How: this.props.How,
        Renounced: this.props.Renounced,
        RenouncedExplanation: this.props.RenouncedExplanation,
        Current: this.props.Current,
        CurrentExplanation: this.props.CurrentExplanation
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

  updateHow (values) {
    this.update([
      { name: 'How', value: values }
    ])
  }

  updateRenounced (values) {
    this.update([
      { name: 'Renounced', value: values }
    ])
  }

  updateRenouncedExplanation (values) {
    this.update([
      { name: 'RenouncedExplanation', value: values }
    ])
  }

  updateCurrent (values) {
    this.update([
      { name: 'Current', value: values }
    ])
  }

  updateCurrentExplanation (values) {
    this.update([
      { name: 'CurrentExplanation', value: values }
    ])
  }

  render () {
    return (
      <div className="citizenship-item">
        <Field title={i18n.t('citizenship.multiple.heading.citizenship.country')}>
          <Country name="Country"
                   {...this.props.Country}
                   className="citizenship-country"
                   onUpdate={this.updateCountry}
                   onError={this.props.onError}
                   />
        </Field>

        <Field title={i18n.t('citizenship.multiple.heading.citizenship.dates')}
               help="citizenship.multiple.help.citizenship.dates"
               adjustFor="daterange">
          <DateRange name="Dates"
                     {...this.props.Dates}
                     className="citizenship-dates"
                     onUpdate={this.updateDates}
                     onError={this.props.onError}
                     />
        </Field>

        <Field title={i18n.t('citizenship.multiple.heading.citizenship.how')}>
          <Textarea name="How"
                    {...this.props.How}
                    className="citizenship-how"
                    onUpdate={this.updateHow}
                    onError={this.props.onError}
                    />
        </Field>

        <Branch name="Renounced"
                label={i18n.t('citizenship.multiple.heading.citizenship.renounced')}
                labelSize="h3"
                className="citizenship-renounced"
                value={this.props.Renounced}
                onUpdate={this.updateRenounced}
                onError={this.props.onError}
                />

        <Show when={this.props.Renounced === 'Yes'}>
          <Field title={i18n.t('citizenship.multiple.heading.citizenship.renouncedexplanation')}>
            <Textarea name="RenouncedExplanation"
                      {...this.props.RenouncedExplanation}
                      className="citizenship-renounced-explanation"
                      onUpdate={this.updateRenouncedExplanation}
                      onError={this.props.onError}
                      />
          </Field>
        </Show>

        <Branch name="Current"
                label={i18n.t('citizenship.multiple.heading.citizenship.current')}
                labelSize="h3"
                className="citizenship-current"
                value={this.props.Current}
                onUpdate={this.updateCurrent}
                onError={this.props.onError}
                />

        <Show when={this.props.Current === 'Yes'}>
          <Field title={i18n.t('citizenship.multiple.heading.citizenship.currentexplanation')}>
            <Textarea name="CurrentExplanation"
                      {...this.props.CurrentExplanation}
                      className="citizenship-current-explanation"
                      onUpdate={this.updateCurrentExplanation}
                      onError={this.props.onError}
                      />
          </Field>
        </Show>
      </div>
    )
  }
}

CitizenshipItem.defaultProps = {
  Country: {},
  Dates: {},
  How: {},
  Renounced: '',
  RenouncedExplanation: {},
  Current: '',
  CurrentExplanation: {},
  onError: (value, arr) => { return arr }
}
