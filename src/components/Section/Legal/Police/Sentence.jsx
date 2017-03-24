import React from 'react'
import { i18n } from '../../../../config'
import { PoliceValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Textarea, DateRange, Help, HelpIcon } from '../../../Form'
import { dateSummary } from '../../History/summaries'
import Offense from './Offense'

export default class Sentence extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      Description: props.Description,
      ExceedsYear: props.ExceedsYear,
      Incarcerated: props.Incarcerated,
      IncarcerationDates: props.IncarcerationDates,
      ProbationDates: props.ProbationDates,
      AwaitingTrial: props.AwaitingTrial,
      AwaitingTrialExplanation: props.AwaitingTrialExplanation
    }
    this.updateDescription = this.updateDescription.bind(this)
    this.updateExceedsYear = this.updateExceedsYear.bind(this)
    this.updateIncarcerated = this.updateIncarcerated.bind(this)
    this.updateIncarcerationDates = this.updateIncarcerationDates.bind(this)
    this.updateProbationDates = this.updateProbationDates.bind(this)
    this.updateAwaitingTrial = this.updateAwaitingTrial.bind(this)
    this.updateAwaitingTrialExplanation = this.updateAwaitingTrialExplanation.bind(this)
  }

  update (name, values) {
    this.setState({ [name]: values }, () => {
      this.props.onUpdate({
        Description: this.state.Description,
        ExceedsYear: this.state.ExceedsYear,
        Incarcerated: this.state.Incarcerated,
        IncarcerationDates: this.state.IncarcerationDates,
        ProbationDates: this.state.ProbationDates,
        AwaitingTrial: this.state.AwaitingTrial,
        AwaitingTrialExplanation: this.state.AwaitingTrialExplanation
      })
    })
  }

  updateDescription (values) {
    this.update('Description', values)
  }

  updateExceedsYear (values) {
    this.update('ExceedsYear', values)
  }

  updateIncarcerated (values) {
    this.update('Incarcerated', values)
  }

  updateIncarcerationDates (values) {
    this.update('IncarcerationDates', values)
  }

  updateProbationDates (values) {
    this.update('ProbationDates', values)
  }

  updateAwaitingTrial (values) {
    this.update('AwaitingTrial', values)
  }

  updateAwaitingTrialExplanation (values) {
    this.update('AwaitingTrialExplanation', values)
  }

  render () {
    return (
      <div className="sentence">
        <div className="eapp-field-wrap">
          <Help id="legal.police.help.sentenceDescription">
            <Textarea
              {...this.state.Description}
              className="description"
              name="description"
              label={i18n.t('legal.police.heading.sentenceDescription')}
              onValidate={this.props.onValidate}
              onUpdate={this.updateDescription} />
            <HelpIcon />
          </Help>
        </div>

        <Branch name="exceeding_year"
          className="eapp-field-wrap no-label exceeds-year"
          value={this.state.ExceedsYear}
          help="legal.police.help.sentenceDescription"
          onValidate={this.props.onValidate}
          onUpdate={this.updateExceedsYear}>
          <div>
            {i18n.t('legal.police.heading.exceedsYear')}
          </div>
        </Branch>

        <Branch name="incarcerated"
          className="eapp-field-wrap no-label incarcerated"
          value={this.state.Incarcerated}
          help="legal.police.help.exceedsYear"
          onValidate={this.props.onValidate}
          onUpdate={this.updateIncarcerated}>
          <div>
            {i18n.m('legal.police.heading.incarcerated')}
          </div>
        </Branch>

        <h4>{i18n.t('legal.police.heading.incarcerationDates')}</h4>
        <div className="eapp-field-wrap">
          <Help id="legal.police.help.incarcerationDates">
            <DateRange name="IncarcerationDates"
              className="incarceration-dates"
              {...this.state.IncarcerationDates}
              onUpdate={this.updateIncarcerationDates}
              onValidate={this.props.onValidate}
            />
            <HelpIcon />
          </Help>
        </div>

        <h4>{i18n.t('legal.police.heading.probationDates')}</h4>
        <div className="eapp-field-wrap">
          <Help id="legal.police.help.probationDates">
            <DateRange name="ProbationDates"
              className="probation-dates"
              {...this.state.ProbationDates}
              onUpdate={this.updateProbationDates}
              onValidate={this.props.onValidate}
            />
            <HelpIcon />
          </Help>
        </div>

        <Branch name="awaiting_trial"
          className="eapp-field-wrap no-label awaiting-trial"
          value={this.state.AwaitingTrial}
          help="legal.police.help.awaitingTrial"
          onValidate={this.props.onValidate}
          onUpdate={this.updateAwaitingTrial}>
          <div>
            {i18n.t('legal.police.heading.awaitingTrial')}
          </div>
        </Branch>

        <Show when={this.state.AwaitingTrial === 'Yes'}>
          <div className="eapp-field-wrap">
            <Textarea
              label={i18n.t('legal.police.heading.awaitingTrialExplanation')}
              className="awaiting-trial-explanation"
              {...this.state.AwaitingTrialExplanation}
              name="awaiting_trial_explanation"
              onValidate={this.props.onValidate}
              onUpdate={this.updateAwaitingTrialExplanation} />
          </div>
        </Show>
      </div>
    )
  }
}
