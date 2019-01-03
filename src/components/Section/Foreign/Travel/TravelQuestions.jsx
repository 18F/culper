import React from 'react'
import { i18n } from '../../../../config'
import {
  ValidationElement,
  Branch,
  Show,
  Field,
  Textarea,
  Country,
  DateRange
} from '../../../Form'
import TravelDays from './TravelDays'
import TravelPurpose from './TravelPurpose'

export default class TravelQuestions extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateThreatenedExplanation = this.updateThreatenedExplanation.bind(
      this
    )
    this.updateThreatened = this.updateThreatened.bind(this)
    this.updateSensitiveExplanation = this.updateSensitiveExplanation.bind(this)
    this.updateSensitive = this.updateSensitive.bind(this)
    this.updateInterestExplanation = this.updateInterestExplanation.bind(this)
    this.updateInterest = this.updateInterest.bind(this)
    this.updateCounterExplanation = this.updateCounterExplanation.bind(this)
    this.updateCounter = this.updateCounter.bind(this)
    this.updateContactedExplanation = this.updateContactedExplanation.bind(this)
    this.updateContacted = this.updateContacted.bind(this)
    this.updateEncounterExplanation = this.updateEncounterExplanation.bind(this)
    this.updateEncounter = this.updateEncounter.bind(this)
    this.updateQuestionedExplanation = this.updateQuestionedExplanation.bind(
      this
    )
    this.updateQuestioned = this.updateQuestioned.bind(this)
    this.updatePurpose = this.updatePurpose.bind(this)
    this.updateDays = this.updateDays.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Dates: this.props.Dates,
      Country: this.props.Country,
      Days: this.props.Days,
      Purpose: this.props.Purpose,
      Questioned: this.props.Questioned,
      QuestionedExplanation: this.props.QuestionedExplanation,
      Encounter: this.props.Encounter,
      EncounterExplanation: this.props.EncounterExplanation,
      Contacted: this.props.Contacted,
      ContactedExplanation: this.props.ContactedExplanation,
      Counter: this.props.Counter,
      CounterExplanation: this.props.CounterExplanation,
      Interest: this.props.Interest,
      InterestExplanation: this.props.InterestExplanation,
      Sensitive: this.props.Sensitive,
      SensitiveExplanation: this.props.SensitiveExplanation,
      Threatened: this.props.Threatened,
      ThreatenedExplanation: this.props.ThreatenedExplanation,
      ...queue
    })
  }

  updateThreatenedExplanation(values) {
    this.update({
      ThreatenedExplanation: values
    })
  }

  updateThreatened(values) {
    this.update({
      Threatened: values
    })
  }

  updateSensitiveExplanation(values) {
    this.update({
      SensitiveExplanation: values
    })
  }

  updateSensitive(values) {
    this.update({
      Sensitive: values
    })
  }

  updateInterestExplanation(values) {
    this.update({
      InterestExplanation: values
    })
  }

  updateInterest(values) {
    this.update({
      Interest: values
    })
  }

  updateCounterExplanation(values) {
    this.update({
      CounterExplanation: values
    })
  }

  updateCounter(values) {
    this.update({
      Counter: values
    })
  }

  updateContactedExplanation(values) {
    this.update({
      ContactedExplanation: values
    })
  }

  updateContacted(values) {
    this.update({
      Contacted: values
    })
  }

  updateEncounterExplanation(values) {
    this.update({
      EncounterExplanation: values
    })
  }

  updateEncounter(values) {
    this.update({
      Encounter: values
    })
  }

  updateQuestionedExplanation(values) {
    this.update({
      QuestionedExplanation: values
    })
  }

  updateQuestioned(values) {
    this.update({
      Questioned: values
    })
  }

  updatePurpose(values) {
    this.update({
      Purpose: values
    })
  }

  updateDays(values) {
    this.update({
      Days: values
    })
  }

  updateDates(values) {
    this.update({
      Dates: values
    })
  }

  updateCountry(values) {
    this.update({
      Country: values
    })
  }

  render() {
    return (
      <div className="foreign-travel-questions">
        <Field
          title={i18n.t('foreign.travel.heading.country')}
          adjustFor="country"
          scrollIntoView={this.props.scrollIntoView}>
          <Country
            name="Country"
            {...this.props.Country}
            excludeUnitedStates={true}
            className="foreign-travel-country"
            onUpdate={this.updateCountry}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.travel.heading.dates')}
          help="foreign.travel.help.dates"
          adjustFor="daterange"
          scrollIntoView={this.props.scrollIntoView}>
          <DateRange
            name="Dates"
            {...this.props.Dates}
            className="foreign-travel-dates"
            minDateEqualTo={true}
            onUpdate={this.updateDates}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.travel.heading.days')}
          help="foreign.travel.help.days"
          adjustFor="p"
          scrollIntoView={this.props.scrollIntoView}>
          <TravelDays
            name="Days"
            className="foreign-travel-days"
            {...this.props.Days}
            onUpdate={this.updateDays}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Field>

        <Field
          title={i18n.t('foreign.travel.heading.purpose')}
          adjustFor="p"
          scrollIntoView={this.props.scrollIntoView}>
          {i18n.m('foreign.travel.para.checkall')}
          <TravelPurpose
            name="Purpose"
            className="foreign-travel-purpose"
            {...this.props.Purpose}
            onUpdate={this.updatePurpose}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Field>

        <Branch
          label={i18n.t('foreign.travel.heading.questioned')}
          labelSize="h4"
          name="has_foreign_travel_questioned"
          className={`foreign-travel-questioned ${
            (this.props.Questioned || {}).value === 'Yes'
              ? 'no-margin-bottom'
              : ''
          }`}
          {...this.props.Questioned}
          onUpdate={this.updateQuestioned}
          required={this.props.required}
          onError={this.props.onError}
          scrollIntoView={this.props.scrollIntoView}
        />
        <Show when={(this.props.Questioned || {}).value === 'Yes'}>
          <Field
            title={i18n.t('foreign.travel.heading.explanation')}
            titleSize="label"
            adjustFor="textarea"
            scrollIntoView={this.props.scrollIntoView}>
            <Textarea
              name="QuestionedExplanation"
              {...this.props.QuestionedExplanation}
              className="foreign-travel-questioned-explanation"
              onUpdate={this.updateQuestionedExplanation}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
        </Show>

        <Branch
          label={i18n.t('foreign.travel.heading.encounter')}
          labelSize="h4"
          name="has_foreign_travel_encounter"
          className={`foreign-travel-encounter ${
            this.props.Encounter.value === 'Yes' ? 'no-margin-bottom' : ''
          }`}
          {...this.props.Encounter}
          onUpdate={this.updateEncounter}
          required={this.props.required}
          onError={this.props.onError}
          scrollIntoView={this.props.scrollIntoView}
        />
        <Show when={(this.props.Encounter || {}).value === 'Yes'}>
          <Field
            title={i18n.t('foreign.travel.heading.explanation')}
            titleSize="label"
            adjustFor="textarea"
            scrollIntoView={this.props.scrollIntoView}>
            <Textarea
              name="EncounterExplanation"
              {...this.props.EncounterExplanation}
              className="foreign-travel-encounter-explanation"
              onUpdate={this.updateEncounterExplanation}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
        </Show>

        <Branch
          label={i18n.t('foreign.travel.heading.contacted')}
          labelSize="h4"
          name="has_foreign_travel_contacted"
          className={`foreign-travel-contacted ${
            this.props.Contacted.value === 'Yes' ? 'no-margin-bottom' : ''
          }`}
          {...this.props.Contacted}
          onUpdate={this.updateContacted}
          required={this.props.required}
          onError={this.props.onError}
          scrollIntoView={this.props.scrollIntoView}
        />
        <Show when={(this.props.Contacted || {}).value === 'Yes'}>
          <Field
            title={i18n.t('foreign.travel.heading.explanation')}
            titleSize="label"
            adjustFor="textarea"
            scrollIntoView={this.props.scrollIntoView}>
            <Textarea
              name="ContactedExplanation"
              {...this.props.ContactedExplanation}
              className="foreign-travel-contacted-explanation"
              onUpdate={this.updateContactedExplanation}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
        </Show>

        <Branch
          label={i18n.t('foreign.travel.heading.counter')}
          labelSize="h4"
          name="has_foreign_travel_counter"
          className={`foreign-travel-counter ${
            this.props.Counter.value === 'Yes' ? 'no-margin-bottom' : ''
          }`}
          {...this.props.Counter}
          onUpdate={this.updateCounter}
          required={this.props.required}
          onError={this.props.onError}
        />
        <Show when={(this.props.Counter || {}).value === 'Yes'}>
          <Field
            title={i18n.t('foreign.travel.heading.explanation')}
            titleSize="label"
            adjustFor="textarea">
            <Textarea
              name="CounterExplanation"
              {...this.props.CounterExplanation}
              className="foreign-travel-counter-explanation"
              onUpdate={this.updateCounterExplanation}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
        </Show>

        <Branch
          label={i18n.t('foreign.travel.heading.interest')}
          labelSize="h4"
          name="has_foreign_travel_interest"
          className={`foreign-travel-interest ${
            this.props.Interest.value === 'Yes' ? 'no-margin-bottom' : ''
          }`}
          {...this.props.Interest}
          onUpdate={this.updateInterest}
          required={this.props.required}
          onError={this.props.onError}
        />
        <Show when={(this.props.Interest || {}).value === 'Yes'}>
          <Field
            title={i18n.t('foreign.travel.heading.explanation')}
            titleSize="label"
            adjustFor="textarea">
            <Textarea
              name="InterestExplanation"
              {...this.props.InterestExplanation}
              className="foreign-travel-interest-explanation"
              onUpdate={this.updateInterestExplanation}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
        </Show>

        <Branch
          label={i18n.t('foreign.travel.heading.sensitive')}
          labelSize="h4"
          name="has_foreign_travel_sensitive"
          className={`foreign-travel-sensitive ${
            this.props.Sensitive.value === 'Yes' ? 'no-margin-bottom' : ''
          }`}
          {...this.props.Sensitive}
          onUpdate={this.updateSensitive}
          required={this.props.required}
          onError={this.props.onError}
        />
        <Show when={(this.props.Sensitive || {}).value === 'Yes'}>
          <Field
            title={i18n.t('foreign.travel.heading.explanation')}
            titleSize="label"
            adjustFor="textarea">
            <Textarea
              name="SensitiveExplanation"
              {...this.props.SensitiveExplanation}
              className="foreign-travel-sensitive-explanation"
              onUpdate={this.updateSensitiveExplanation}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
        </Show>

        <Branch
          label={i18n.t('foreign.travel.heading.threatened')}
          labelSize="h4"
          name="has_foreign_travel_threatened"
          className={`foreign-travel-threatened ${
            this.props.Threatened.value === 'Yes' ? 'no-margin-bottom' : ''
          }`}
          {...this.props.Threatened}
          onUpdate={this.updateThreatened}
          required={this.props.required}
          onError={this.props.onError}
        />
        <Show when={(this.props.Threatened || {}).value === 'Yes'}>
          <Field
            title={i18n.t('foreign.travel.heading.explanation')}
            titleSize="label"
            adjustFor="textarea">
            <Textarea
              name="ThreatenedExplanation"
              {...this.props.ThreatenedExplanation}
              className="foreign-travel-threatened-explanation"
              onUpdate={this.updateThreatenedExplanation}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
        </Show>
      </div>
    )
  }
}

TravelQuestions.defaultProps = {
  Dates: {},
  Country: {},
  Days: [],
  Purpose: [],
  Questioned: {},
  QuestionedExplanation: {},
  Encounter: {},
  EncounterExplanation: {},
  Contacted: {},
  ContactedExplanation: {},
  Counter: {},
  CounterExplanation: {},
  Interest: {},
  InterestExplanation: {},
  Sensitive: {},
  SensitiveExplanation: {},
  Threatened: {},
  ThreatenedExplanation: {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
