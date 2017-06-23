import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Field, Branch, Show, Country, DateRange, Textarea } from '../../../Form'
import { sendUpdate } from './Multiple'

export default class CitizenshipItem extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      Country: props.Country,
      Dates: props.Dates,
      How: props.How,
      Renounced: props.Renounced,
      RenouncedExplanation: props.RenouncedExplanation,
      Current: props.Current,
      CurrentExplanation: props.CurrentExplanation
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updateHow = this.updateHow.bind(this)
    this.updateRenounced = this.updateRenounced.bind(this)
    this.updateRenouncedExplanation = this.updateRenouncedExplanation.bind(this)
    this.updateCurrent = this.updateCurrent.bind(this)
    this.updateCurrentExplanation = this.updateCurrentExplanation.bind(this)
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

  updateHow (values) {
    this.onUpdate('How', values)
  }

  updateRenounced (values) {
    this.onUpdate('Renounced', values)
  }

  updateRenouncedExplanation (values) {
    this.onUpdate('RenouncedExplanation', values)
  }

  updateCurrent (values) {
    this.onUpdate('Current', values)
  }

  updateCurrentExplanation (values) {
    this.onUpdate('CurrentExplanation', values)
  }

  render () {
    return (
      <div className="citizenship-item">
        <Field title={i18n.t('citizenship.multiple.heading.citizenship.country')}>
          <Country name="Country"
                   {...this.state.Country}
                   className="citizenship-country"
                   onUpdate={this.updateCountry}
                   onError={this.props.onError}
                   />
        </Field>

        <Field title={i18n.t('citizenship.multiple.heading.citizenship.dates')}
               help="citizenship.multiple.help.citizenship.dates"
               adjustFor="daterange">
          <DateRange name="Dates"
                     {...this.state.Dates}
                     className="citizenship-dates"
                     onUpdate={this.updateDates}
                     onError={this.props.onError}
                     />
        </Field>

        <Field title={i18n.t('citizenship.multiple.heading.citizenship.how')}>
          <Textarea name="How"
                    {...this.state.How}
                    className="citizenship-how"
                    onUpdate={this.updateHow}
                    onError={this.props.onError}
                    />
        </Field>

        <Branch name="Renounced"
                label={i18n.t('citizenship.multiple.heading.citizenship.renounced')}
                labelSize="h3"
                className="citizenship-renounced"
                value={this.state.Renounced}
                onUpdate={this.updateRenounced}
                onError={this.props.onError}
                />

        <Show when={this.state.Renounced === 'Yes'}>
          <Field title={i18n.t('citizenship.multiple.heading.citizenship.renouncedexplanation')}>
            <Textarea name="RenouncedExplanation"
                      {...this.state.RenouncedExplanation}
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
                value={this.state.Current}
                onUpdate={this.updateCurrent}
                onError={this.props.onError}
                />

        <Show when={this.state.Current === 'Yes'}>
          <Field title={i18n.t('citizenship.multiple.heading.citizenship.currentexplanation')}>
            <Textarea name="CurrentExplanation"
                      {...this.state.CurrentExplanation}
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
