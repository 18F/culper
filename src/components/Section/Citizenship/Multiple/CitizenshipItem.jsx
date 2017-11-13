import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Field, Branch, Show, Country, DateRange, Textarea } from '../../../Form'

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
    this.props.onUpdate({
      Country: this.props.Country,
      Dates: this.props.Dates,
      How: this.props.How,
      Renounced: this.props.Renounced,
      RenouncedExplanation: this.props.RenouncedExplanation,
      Current: this.props.Current,
      CurrentExplanation: this.props.CurrentExplanation,
      ...queue
    })
  }

  updateCountry (values) {
    this.update({
      Country: values
    })
  }

  updateDates (values) {
    this.update({
      Dates: values
    })
  }

  updateHow (values) {
    this.update({
      How: values
    })
  }

  updateRenounced (values) {
    this.update({
      Renounced: values
    })
  }

  updateRenouncedExplanation (values) {
    this.update({
      RenouncedExplanation: values
    })
  }

  updateCurrent (values) {
    this.update({
      Current: values
    })
  }

  updateCurrentExplanation (values) {
    this.update({
      CurrentExplanation: values
    })
  }

  render () {
    const d = this.props.Dates || {}
    const to = d.to || {}
    const from = d.from || {}
    const showCurrentQuestion = to.date && from.date && !d.present

    return (
      <div className="citizenship-item">
        <Field title={i18n.t('citizenship.multiple.heading.citizenship.country')}
               scrollIntoView={this.props.scrollIntoView}>
          <Country name="Country"
                   {...this.props.Country}
                   className="citizenship-country"
                   onUpdate={this.updateCountry}
                   onError={this.props.onError}
                   required={this.props.required}
                   />
        </Field>

        <Field title={i18n.t('citizenship.multiple.heading.citizenship.period')}
               titleSize="h2"
               optional={true}
               className="period no-margin-bottom"
               />

        <Field title={i18n.t('citizenship.multiple.heading.citizenship.dates')}
               help="citizenship.multiple.help.citizenship.dates"
               adjustFor="daterange"
               scrollIntoView={this.props.scrollIntoView}>
          <DateRange name="Dates"
                     {...this.props.Dates}
                     className="citizenship-dates"
                     onUpdate={this.updateDates}
                     onError={this.props.onError}
                     required={this.props.required}
                     />
        </Field>

        <Field title={i18n.t('citizenship.multiple.heading.citizenship.how')}
               scrollIntoView={this.props.scrollIntoView}>
          <Textarea name="How"
                    {...this.props.How}
                    className="citizenship-how"
                    onUpdate={this.updateHow}
                    onError={this.props.onError}
                    required={this.props.required}
                    />
        </Field>

        <Branch name="Renounced"
                label={i18n.t('citizenship.multiple.heading.citizenship.renounced')}
                labelSize="h3"
                className="citizenship-renounced no-margin-bottom"
                {...this.props.Renounced}
                onUpdate={this.updateRenounced}
                onError={this.props.onError}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                />

        <Field title={i18n.t('citizenship.multiple.heading.citizenship.renouncedexplanation')}
               titleSize="label"
               scrollIntoView={this.props.scrollIntoView}>
          <Textarea name="RenouncedExplanation"
                    {...this.props.RenouncedExplanation}
                    className="citizenship-renounced-explanation"
                    onUpdate={this.updateRenouncedExplanation}
                    onError={this.props.onError}
                    required={this.props.required}
                    />
        </Field>

        <Show when={showCurrentQuestion}>
          <div>
            <Branch name="Current"
                    label={i18n.t('citizenship.multiple.heading.citizenship.current')}
                    labelSize="h3"
                    className="citizenship-current no-margin-bottom"
                    {...this.props.Current}
                    onUpdate={this.updateCurrent}
                    onError={this.props.onError}
                    required={this.props.required}
                    scrollIntoView={this.props.scrollIntoView}
                    />

            <Field title={i18n.t('citizenship.multiple.heading.citizenship.currentexplanation')}
                   titleSize="label"
                   scrollIntoView={this.props.scrollIntoView}>
              <Textarea name="CurrentExplanation"
                        {...this.props.CurrentExplanation}
                        className="citizenship-current-explanation"
                        onUpdate={this.updateCurrentExplanation}
                        onError={this.props.onError}
                        required={this.props.required}
                        />
            </Field>
          </div>
        </Show>
      </div>
    )
  }
}

CitizenshipItem.defaultProps = {
  Country: {},
  Dates: {},
  How: {},
  Renounced: {},
  RenouncedExplanation: {},
  Current: {},
  CurrentExplanation: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
