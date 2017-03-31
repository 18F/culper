import React from 'react'
import { i18n } from '../../../../config'
import { PoliceValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Textarea, DateRange, Help, HelpIcon, NotApplicable } from '../../../Form'
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
      IncarcerationDatesNA: props.IncarcerationDatesNA,
      ProbationDatesNA: props.ProbationDatesNA
    }
    this.updateDescription = this.updateDescription.bind(this)
    this.updateExceedsYear = this.updateExceedsYear.bind(this)
    this.updateIncarcerated = this.updateIncarcerated.bind(this)
    this.updateIncarcerationDates = this.updateIncarcerationDates.bind(this)
    this.updateProbationDates = this.updateProbationDates.bind(this)
    this.updateIncarcerationDatesNA = this.updateIncarcerationDatesNA.bind(this)
    this.updateProbationDatesNA = this.updateProbationDatesNA.bind(this)
  }

  update (name, values) {
    this.setState({ [name]: values }, () => {
      this.props.onUpdate({
        Description: this.state.Description,
        ExceedsYear: this.state.ExceedsYear,
        Incarcerated: this.state.Incarcerated,
        IncarcerationDates: this.state.IncarcerationDates,
        IncarcerationDatesNA: this.state.IncarcerationDatesNA,
        ProbationDates: this.state.ProbationDates
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

  updateIncarcerationDatesNA (values) {
    this.update('IncarcerationDatesNA', values)
  }

  updateProbationDatesNA (values) {
    this.update('ProbationDatesNA', values)
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
            <NotApplicable name="IncarcerationDatesNA"
              {...this.state.IncarcerationDatesNA}
              label={i18n.t('legal.police.label.notApplicable')}
              or={i18n.t('legal.police.label.or')}
              onUpdate={this.updateIncarcerationDatesNA}>
              <DateRange name="IncarcerationDates"
                className="incarceration-dates"
                {...this.state.IncarcerationDates}
                onUpdate={this.updateIncarcerationDates}
                onValidate={this.props.onValidate}
              />
            </NotApplicable>
            <HelpIcon />
          </Help>
        </div>

        <h4>{i18n.t('legal.police.heading.probationDates')}</h4>
        <div className="eapp-field-wrap">
          <Help id="legal.police.help.probationDates">
            <NotApplicable name="ProbationDatesNA"
              {...this.state.ProbationDatesNA}
              label={i18n.t('legal.police.label.notApplicable')}
              or={i18n.t('legal.police.label.or')}
              onUpdate={this.updateProbationDatesNA}>
              <DateRange name="ProbationDates"
                className="probation-dates"
                {...this.state.ProbationDates}
                onUpdate={this.updateProbationDates}
                onValidate={this.props.onValidate}
              />
            </NotApplicable>
            <HelpIcon />
          </Help>
        </div>
      </div>
    )
  }
}
