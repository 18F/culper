import React from 'react'
import { i18n } from '../../../../config'
import {
  ValidationElement,
  Branch,
  Textarea,
  DateRange,
  Field,
  NotApplicable
} from '../../../Form'

export default class Sentence extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateDescription = this.updateDescription.bind(this)
    this.updateExceedsYear = this.updateExceedsYear.bind(this)
    this.updateIncarcerated = this.updateIncarcerated.bind(this)
    this.updateIncarcerationDates = this.updateIncarcerationDates.bind(this)
    this.updateProbationDates = this.updateProbationDates.bind(this)
    this.updateIncarcerationDatesNA = this.updateIncarcerationDatesNA.bind(this)
    this.updateProbationDatesNA = this.updateProbationDatesNA.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Description: this.props.Description,
      ExceedsYear: this.props.ExceedsYear,
      Incarcerated: this.props.Incarcerated,
      IncarcerationDates: this.props.IncarcerationDates,
      IncarcerationDatesNA: this.props.IncarcerationDatesNA,
      ProbationDates: this.props.ProbationDates,
      ProbationDatesNA: this.props.ProbationDatesNA,
      ...queue
    })
  }

  updateDescription(values) {
    this.update({
      Description: values
    })
  }

  updateExceedsYear(values) {
    this.update({
      ExceedsYear: values
    })
  }

  updateIncarcerated(values) {
    this.update({
      Incarcerated: values
    })
  }

  updateIncarcerationDates(values) {
    this.update({
      IncarcerationDates: values
    })
  }

  updateProbationDates(values) {
    this.update({
      ProbationDates: values
    })
  }

  updateIncarcerationDatesNA(values) {
    this.update({
      IncarcerationDatesNA: values
    })
  }

  updateProbationDatesNA(values) {
    this.update({
      ProbationDatesNA: values
    })
  }

  render() {
    return (
      <div className="sentence">
        <Field
          title={i18n.t('legal.police.heading.sentenceDescription')}
          titleSize="h4"
          adjustFor="labels"
          scrollIntoView={this.props.scrollIntoView}>
          <Textarea
            {...this.props.Description}
            className="description"
            name="description"
            onError={this.props.onError}
            required={this.props.required}
            onUpdate={this.updateDescription}
          />
        </Field>

        <Branch
          name="exceeding_year"
          label={i18n.t('legal.police.heading.exceedsYear')}
          labelSize="h4"
          className="exceeds-year"
          {...this.props.ExceedsYear}
          onError={this.props.onError}
          required={this.props.required}
          onUpdate={this.updateExceedsYear}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Branch
          name="incarcerated"
          label={i18n.t('legal.police.heading.incarcerated')}
          labelSize="h4"
          className="incarcerated"
          {...this.props.Incarcerated}
          onError={this.props.onError}
          required={this.props.required}
          onUpdate={this.updateIncarcerated}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Field
          title={i18n.t('legal.police.heading.incarcerationDates')}
          titleSize="h4"
          adjustFor="daterange"
          shrink={true}
          scrollIntoView={this.props.scrollIntoView}>
          <NotApplicable
            name="IncarcerationDatesNA"
            {...this.props.IncarcerationDatesNA}
            label={i18n.t('legal.police.label.notApplicable')}
            or={i18n.m('legal.police.para.or')}
            className="incarceration-dates-na"
            onError={this.props.onError}
            required={this.props.required}
            onUpdate={this.updateIncarcerationDatesNA}>
            <DateRange
              name="IncarcerationDates"
              className="incarceration-dates"
              {...this.props.IncarcerationDates}
              minDateEqualTo={true}
              onUpdate={this.updateIncarcerationDates}
              onError={this.props.onError}
              required={this.props.required}
            />
          </NotApplicable>
        </Field>

        <Field
          title={i18n.t('legal.police.heading.probationDates')}
          titleSize="h4"
          adjustFor="daterange"
          shrink={true}
          scrollIntoView={this.props.scrollIntoView}>
          <NotApplicable
            name="ProbationDatesNA"
            {...this.props.ProbationDatesNA}
            label={i18n.t('legal.police.label.notApplicable')}
            or={i18n.m('legal.police.para.or')}
            className="probation-dates-na"
            onError={this.props.onError}
            required={this.props.required}
            onUpdate={this.updateProbationDatesNA}>
            <DateRange
              name="ProbationDates"
              className="probation-dates"
              {...this.props.ProbationDates}
              minDateEqualTo={true}
              onUpdate={this.updateProbationDates}
              onError={this.props.onError}
              required={this.props.required}
            />
          </NotApplicable>
        </Field>
      </div>
    )
  }
}

Sentence.defaultProps = {
  Description: {},
  ExceedsYear: {},
  Incarcerated: {},
  IncarcerationDates: {},
  ProbationDates: {},
  IncarcerationDatesNA: { applicable: true },
  ProbationDatesNA: { applicable: true },
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
