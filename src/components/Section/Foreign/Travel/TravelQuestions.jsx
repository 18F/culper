import React from 'react'
import { i18n } from '../../../../config'
import { NameSummary, DateSummary } from '../../../Summary'
import { ForeignTravelValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion, Field,
         Textarea, Country, DateRange } from '../../../Form'
import TravelDays from './TravelDays'
import TravelPurpose from './TravelPurpose'

export default class TravelQuestions extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateThreatenedExplanation = this.updateThreatenedExplanation.bind(this)
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
    this.updateQuestionedExplanation = this.updateQuestionedExplanation.bind(this)
    this.updateQuestioned = this.updateQuestioned.bind(this)
    this.updatePurpose = this.updatePurpose.bind(this)
    this.updateDays = this.updateDays.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
  }

  update (queue) {
    if (this.props.onUpdate) {
      let obj = {
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
        ThreatenedExplanation: this.props.ThreatenedExplanation
      }

      for (const q of queue) {
        obj = { ...obj, [q.name]: q.value }
      }

      this.props.onUpdate(obj)
    }
  }

  updateThreatenedExplanation (values) {
    this.update([
      { name: 'ThreatenedExplanation', value: values }
    ])
  }

  updateThreatened (values) {
    this.update([
      { name: 'Threatened', value: values }
    ])
  }

  updateSensitiveExplanation (values) {
    this.update([
      { name: 'SensitiveExplanation', value: values }
    ])
  }

  updateSensitive (values) {
    this.update([
      { name: 'Sensitive', value: values }
    ])
  }

  updateInterestExplanation (values) {
    this.update([
      { name: 'InterestExplanation', value: values }
    ])
  }

  updateInterest (values) {
    this.update([
      { name: 'Interest', value: values }
    ])
  }

  updateCounterExplanation (values) {
    this.update([
      { name: 'CounterExplanation', value: values }
    ])
  }

  updateCounter (values) {
    this.update([
      { name: 'Counter', value: values }
    ])
  }

  updateContactedExplanation (values) {
    this.update([
      { name: 'ContactedExplanation', value: values }
    ])
  }

  updateContacted (values) {
    this.update([
      { name: 'Contacted', value: values }
    ])
  }

  updateEncounterExplanation (values) {
    this.update([
      { name: 'EncounterExplanation', value: values }
    ])
  }

  updateEncounter (values) {
    this.update([
      { name: 'Encounter', value: values }
    ])
  }

  updateQuestionedExplanation (values) {
    this.update([
      { name: 'QuestionedExplanation', value: values }
    ])
  }

  updateQuestioned (values) {
    this.update([
      { name: 'Questioned', value: values }
    ])
  }

  updatePurpose (values) {
    this.update([
      { name: 'Purpose', value: values }
    ])
  }

  updateDays (values) {
    this.update([
      { name: 'Days', value: values }
    ])
  }

  updateDates (values) {
    this.update([
      { name: 'Dates', value: values }
    ])
  }

  updateCountry (values) {
    this.update([
      { name: 'Country', value: values }
    ])
  }

  render () {
    return (
      <div className="foreign-travel-questions">
        <Field title={i18n.t('foreign.travel.heading.country')}
               help="foreign.travel.help.country"
               adjustFor="country">
          <Country name="Country"
                   {...this.props.Country}
                   className="foreign-travel-country"
                   onUpdate={this.updateCountry}
                   onValidate={this.props.onValidate}
                   />
        </Field>

        <Field title={i18n.t('foreign.travel.heading.dates')}
               help="foreign.travel.help.dates"
               adjustFor="daterange">
          <DateRange name="Dates"
                     {...this.props.Dates}
                     className="foreign-travel-dates"
                     onUpdate={this.updateDates}
                     onValidate={this.props.onValidate}
                     />
        </Field>

        <Field title={i18n.t('foreign.travel.heading.days')}
               help="foreign.travel.help.days"
               adjustFor="p">
          {i18n.m('foreign.travel.para.checkall')}
          <TravelDays name="Days"
                      className="foreign-travel-days"
                      value={this.props.Days}
                      onUpdate={this.updateDays}
                      onValidate={this.props.onValidate}
                      />
        </Field>

        <Field title={i18n.t('foreign.travel.heading.purpose')}
               help="foreign.travel.help.purpose"
               adjustFor="p">
          {i18n.m('foreign.travel.para.checkall')}
          <TravelPurpose name="Purpose"
                         className="foreign-travel-purpose"
                         value={this.props.Purpose}
                         onUpdate={this.updatePurpose}
                         onValidate={this.props.onValidate}
                         />
        </Field>

        <Branch label={i18n.t('foreign.travel.heading.questioned')}
                labelSize="h3"
                name="has_foreign_travel_questioned"
                className="foreign-travel-questioned"
                help="foreign.travel.help.questioned"
                value={this.props.Questioned}
                onUpdate={this.updateQuestioned}
                onValidate={this.props.onValidate}>
        </Branch>
        <Show when={this.props.Questioned === 'Yes'}>
          <Field title={i18n.t('foreign.travel.heading.explanation')}
                 titleSize="h4"
                 adjustFor="textarea">
            <Textarea name="QuestionedExplanation"
                      {...this.props.QuestionedExplanation}
                      className="foreign-travel-questioned-explanation"
                      onUpdate={this.updateQuestionedExplanation}
                      onValidate={this.props.onValidate}
                      />
          </Field>
        </Show>

        <Branch label={i18n.t('foreign.travel.heading.encounter')}
                labelSize="h3"
                name="has_foreign_travel_encounter"
                className="foreign-travel-encounter"
                help="foreign.travel.help.encounter"
                value={this.props.Encounter}
                onUpdate={this.updateEncounter}
                onValidate={this.props.onValidate}>
        </Branch>
        <Show when={this.props.Encounter === 'Yes'}>
          <Field title={i18n.t('foreign.travel.heading.explanation')}
                 titleSize="h4"
                 adjustFor="textarea">
            <Textarea name="EncounterExplanation"
                      {...this.props.EncounterExplanation}
                      className="foreign-travel-encounter-explanation"
                      onUpdate={this.updateEncounterExplanation}
                      onValidate={this.props.onValidate}
                      />
          </Field>
        </Show>

        <Branch label={i18n.t('foreign.travel.heading.contacted')}
                labelSize="h3"
                name="has_foreign_travel_contacted"
                className="foreign-travel-contacted"
                help="foreign.travel.help.contacted"
                value={this.props.Contacted}
                onUpdate={this.updateContacted}
                onValidate={this.props.onValidate}>
        </Branch>
        <Show when={this.props.Contacted === 'Yes'}>
          <Field title={i18n.t('foreign.travel.heading.explanation')}
                 titleSize="h4"
                 adjustFor="textarea">
            <Textarea name="ContactedExplanation"
                      {...this.props.ContactedExplanation}
                      className="foreign-travel-contacted-explanation"
                      onUpdate={this.updateContactedExplanation}
                      onValidate={this.props.onValidate}
                      />
          </Field>
        </Show>

        <Branch label={i18n.t('foreign.travel.heading.counter')}
                labelSize="h3"
                name="has_foreign_travel_counter"
                className="foreign-travel-counter"
                help="foreign.travel.help.counter"
                value={this.props.Counter}
                onUpdate={this.updateCounter}
                onValidate={this.props.onValidate}>
        </Branch>
        <Show when={this.props.Counter === 'Yes'}>
          <Field title={i18n.t('foreign.travel.heading.explanation')}
                 titleSize="h4"
                 adjustFor="textarea">
            <Textarea name="CounterExplanation"
                      {...this.props.CounterExplanation}
                      className="foreign-travel-counter-explanation"
                      onUpdate={this.updateCounterExplanation}
                      onValidate={this.props.onValidate}
                      />
          </Field>
        </Show>

        <Branch label={i18n.t('foreign.travel.heading.interest')}
                labelSize="h3"
                name="has_foreign_travel_interest"
                className="foreign-travel-interest"
                help="foreign.travel.help.interest"
                value={this.props.Interest}
                onUpdate={this.updateInterest}
                onValidate={this.props.onValidate}>
        </Branch>
        <Show when={this.props.Interest === 'Yes'}>
          <Field title={i18n.t('foreign.travel.heading.explanation')}
                 titleSize="h4"
                 adjustFor="textarea">
            <Textarea name="InterestExplanation"
                      {...this.props.InterestExplanation}
                      className="foreign-travel-interest-explanation"
                      onUpdate={this.updateInterestExplanation}
                      onValidate={this.props.onValidate}
                      />
          </Field>
        </Show>

        <Branch label={i18n.t('foreign.travel.heading.sensitive')}
                labelSize="h3"
                name="has_foreign_travel_sensitive"
                className="foreign-travel-sensitive"
                help="foreign.travel.help.sensitive"
                value={this.props.Sensitive}
                onUpdate={this.updateSensitive}
                onValidate={this.props.onValidate}>
        </Branch>
        <Show when={this.props.Sensitive === 'Yes'}>
          <Field title={i18n.t('foreign.travel.heading.explanation')}
                 titleSize="h4"
                 adjustFor="textarea">
            <Textarea name="SensitiveExplanation"
                      {...this.props.SensitiveExplanation}
                      className="foreign-travel-sensitive-explanation"
                      onUpdate={this.updateSensitiveExplanation}
                      onValidate={this.props.onValidate}
                      />
          </Field>
        </Show>

        <Branch label={i18n.t('foreign.travel.heading.threatened')}
                labelSize="h3"
                name="has_foreign_travel_threatened"
                className="foreign-travel-threatened"
                help="foreign.travel.help.threatened"
                value={this.props.Threatened}
                onUpdate={this.updateThreatened}
                onValidate={this.props.onValidate}>
        </Branch>
        <Show when={this.props.Threatened === 'Yes'}>
          <Field title={i18n.t('foreign.travel.heading.explanation')}
                 titleSize="h4"
                 adjustFor="textarea">
            <Textarea name="ThreatenedExplanation"
                      {...this.props.ThreatenedExplanation}
                      className="foreign-travel-threatened-explanation"
                      onUpdate={this.updateThreatenedExplanation}
                      onValidate={this.props.onValidate}
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
  Questioned: '',
  QuestionedExplanation: {},
  Encounter: '',
  EncounterExplanation: {},
  Contacted: '',
  ContactedExplanation: {},
  Counter: '',
  CounterExplanation: {},
  Interest: '',
  InterestExplanation: {},
  Sensitive: '',
  SensitiveExplanation: {},
  Threatened: '',
  ThreatenedExplanation: {}
}
