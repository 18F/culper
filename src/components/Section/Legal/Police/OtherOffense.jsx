import React from 'react'

import i18n from 'util/i18n'
import ChargeValidator from 'validators/charge'

import {
  ValidationElement,
  Branch,
  Show,
  Accordion,
  Location,
  DateControl,
  Textarea,
  Text,
  Field,
} from 'components/Form'
import { Summary, DateSummary } from 'components/Summary'

import Sentence from './Sentence'
import Charge from './Charge'

export default class OtherOffense extends ValidationElement {
  update = (queue) => {
    this.props.onUpdate({
      Date: this.props.Date,
      Description: this.props.Description,
      InvolvedViolence: this.props.InvolvedViolence,
      InvolvedFirearms: this.props.InvolvedFirearms,
      InvolvedSubstances: this.props.InvolvedSubstances,
      CourtName: this.props.CourtName,
      CourtAddress: this.props.CourtAddress,
      Charges: this.props.Charges,
      WasSentenced: this.props.WasSentenced,
      Sentence: this.props.Sentence,
      AwaitingTrial: this.props.AwaitingTrial,
      AwaitingTrialExplanation: this.props.AwaitingTrialExplanation,
      ...queue,
    })
  }

  updateDate = (values) => {
    this.update({
      Date: values,
    })
  }

  updateDescription = (values) => {
    this.update({
      Description: values,
    })
  }

  updateInvolvedViolence = (values) => {
    this.update({
      InvolvedViolence: values,
    })
  }

  updateInvolvedFirearms = (values) => {
    this.update({
      InvolvedFirearms: values,
    })
  }

  updateInvolvedSubstances = (values) => {
    this.update({
      InvolvedSubstances: values,
    })
  }

  updateCourtName = (value) => {
    this.update({
      CourtName: value,
    })
  }

  updateCourtAddress = (value) => {
    this.update({
      CourtAddress: value,
    })
  }

  updateCharges = (values) => {
    this.update({
      Charges: values,
    })
  }

  updateWasSentenced = (values) => {
    this.update({
      WasSentenced: values,
    })
  }

  updateSentence = (values) => {
    this.update({
      Sentence: values,
    })
  }

  updateAwaitingTrial = (values) => {
    this.update({
      AwaitingTrial: values,
    })
  }

  updateAwaitingTrialExplanation = (values) => {
    this.update({
      AwaitingTrialExplanation: values,
    })
  }

  summary = (item, index) => {
    const itemProperties = (item || {}).Item || {}
    const charge = itemProperties.CourtCharge
      && itemProperties.CourtCharge.value
    const date = DateSummary(itemProperties.CourtDate)

    return Summary({
      type: i18n.t('legal.police.collection.summary.item'),
      index,
      left: charge,
      right: date,
      placeholder: i18n.t('legal.police.collection.summary.unknown'),
    })
  }

  render() {
    return (
      <div className="offense">
        <Field
          title={i18n.t('legal.police.heading.date')}
          help="legal.police.help.date"
          adjustFor="labels"
          shrink
          scrollIntoView={this.props.scrollIntoView}
        >
          <DateControl
            name="Date"
            {...this.props.Date}
            className="offense-date"
            minDateEqualTo
            onUpdate={this.updateDate}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('legal.police.heading.description')}
          help="legal.police.help.description"
          scrollIntoView={this.props.scrollIntoView}
        >
          <Textarea
            name="Description"
            {...this.props.Description}
            className="offense-description"
            onUpdate={this.updateDescription}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Branch
          name="involved_violence"
          label={i18n.t('legal.police.heading.involvement')}
          labelSize="h4"
          className="offense-violence no-margin-bottom"
          {...this.props.InvolvedViolence}
          onUpdate={this.updateInvolvedViolence}
          required={this.props.required}
          onError={this.props.onError}
          scrollIntoView={this.props.scrollIntoView}
        >
          {i18n.m('legal.police.label.violence')}
        </Branch>

        <Branch
          name="involved_firearms"
          className="offense-firearms no-margin-bottom"
          {...this.props.InvolvedFirearms}
          onUpdate={this.updateInvolvedFirearms}
          required={this.props.required}
          onError={this.props.onError}
          scrollIntoView={this.props.scrollIntoView}
        >
          {i18n.m('legal.police.label.firearms')}
        </Branch>

        <Branch
          name="involved_substances"
          className="offense-substances"
          {...this.props.InvolvedSubstances}
          onUpdate={this.updateInvolvedSubstances}
          required={this.props.required}
          onError={this.props.onError}
          scrollIntoView={this.props.scrollIntoView}
        >
          {i18n.m('legal.police.label.substances')}
        </Branch>

        <Field
          title={i18n.t('legal.police.heading.courtname')}
          adjustFor="labels"
          scrollIntoView={this.props.scrollIntoView}
        >
          <Text
            name="CourtName"
            {...this.props.CourtName}
            label={i18n.t('legal.police.label.courtname')}
            className="offense-courtname"
            onUpdate={this.updateCourtName}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('legal.police.heading.courtaddress')}
          optional
          help="legal.police.help.courtaddress"
          adjustFor="address"
          shrink
          scrollIntoView={this.props.scrollIntoView}
        >
          <Location
            name="CourtAddress"
            {...this.props.CourtAddress}
            label={i18n.t('legal.police.label.address')}
            className="offense-courtaddress"
            layout={Location.OFFENSE}
            geocode
            addressBooks={this.props.addressBooks}
            addressBook="Court"
            dispatch={this.props.dispatch}
            onUpdate={this.updateCourtAddress}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <div style={{ marginBottom: '8rem' }}>
          <Field
            title={i18n.t('legal.police.heading.chargedetails')}
            titleSize="h3"
            className="no-margin-bottom"
          >
            {i18n.m('legal.police.para.chargedetails')}
          </Field>

          <Accordion
            className="offense-charges"
            {...this.props.Charges}
            defaultState={this.props.defaultState}
            onUpdate={this.updateCharges}
            onError={this.props.onError}
            validator={ChargeValidator}
            summary={this.summary}
            description={i18n.t('legal.police.collection.summary.title')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <Charge
              name="Item"
              bind
              dispatch={this.props.dispatch}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Accordion>
        </div>

        <Branch
          name="was_sentenced"
          label={i18n.t('legal.police.heading.otherOffenseSentenced')}
          labelSize="h4"
          className="offense-sentenced"
          {...this.props.WasSentenced}
          onUpdate={this.updateWasSentenced}
          required={this.props.required}
          onError={this.props.onError}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={(this.props.WasSentenced || {}).value === 'Yes'}>
          <div>
            <Sentence
              name="Sentence"
              {...this.props.Sentence}
              onError={this.props.onError}
              required={this.props.required}
              onUpdate={this.updateSentence}
              scrollIntoView={this.props.scrollIntoView}
              requireLegalOffenseSentenced
              requireLegalOffenseIncarcerated
            />
          </div>
        </Show>
        <Show when={(this.props.WasSentenced || {}).value === 'No'}>
          <div>
            <Branch
              name="awaiting_trial"
              label={i18n.t('legal.police.heading.awaitingTrial')}
              labelSize="h4"
              className="awaiting-trial no-margin-bottom"
              {...this.props.AwaitingTrial}
              onError={this.props.onError}
              required={this.props.required}
              onUpdate={this.updateAwaitingTrial}
              scrollIntoView={this.props.scrollIntoView}
            />
            <Field
              title={i18n.t('legal.police.heading.awaitingTrialExplanation')}
              titleSize="label"
              scrollIntoView={this.props.scrollIntoView}
            >
              <Textarea
                className="awaiting-trial-explanation"
                {...this.props.AwaitingTrialExplanation}
                name="awaiting_trial_explanation"
                onError={this.props.onError}
                required={this.props.required}
                onUpdate={this.updateAwaitingTrialExplanation}
              />
            </Field>
          </div>
        </Show>
      </div>
    )
  }
}

OtherOffense.defaultProps = {
  InvolvedViolence: {},
  InvolvedFirearms: {},
  InvolvedSubstances: {},
  Charges: { items: [] },
  WasSentenced: {},
  addressBooks: {},
  dispatch: () => {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
}
