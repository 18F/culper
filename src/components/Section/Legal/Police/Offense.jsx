import React from 'react'

import i18n from 'util/i18n'

import {
  ValidationElement,
  Branch,
  Show,
  Location,
  DateControl,
  Textarea,
  Text,
  RadioGroup,
  Radio,
  Field,
} from 'components/Form'

import Sentence from './Sentence'

export default class Offense extends ValidationElement {
  update = (queue) => {
    this.props.onUpdate({
      Date: this.props.Date,
      Description: this.props.Description,
      InvolvedViolence: this.props.InvolvedViolence,
      InvolvedFirearms: this.props.InvolvedFirearms,
      InvolvedSubstances: this.props.InvolvedSubstances,
      Address: this.props.Address,
      WasCited: this.props.WasCited,
      CitedBy: this.props.CitedBy,
      AgencyAddress: this.props.AgencyAddress,
      WasCharged: this.props.WasCharged,
      Explanation: this.props.Explanation,
      CourtName: this.props.CourtName,
      CourtAddress: this.props.CourtAddress,
      CourtCharge: this.props.CourtCharge,
      CourtOutcome: this.props.CourtOutcome,
      CourtDate: this.props.CourtDate,
      ChargeType: this.props.ChargeType,
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

  updateAddress = (value) => {
    this.update({
      Address: value,
    })
  }

  updateWasCited = (values) => {
    this.update({
      WasCited: values,
    })
  }

  updateCitedBy = (values) => {
    this.update({
      CitedBy: values,
    })
  }

  updateAgencyAddress = (value) => {
    this.update({
      AgencyAddress: value,
    })
  }

  updateWasCharged = (values) => {
    this.update({
      WasCharged: values,
    })
  }

  updateExplanation = (values) => {
    this.update({
      Explanation: values,
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

  updateChargeType = (value) => {
    this.update({
      ChargeType: value,
    })
  }

  updateCourtCharge = (value) => {
    this.update({
      CourtCharge: value,
    })
  }

  updateCourtOutcome = (value) => {
    this.update({
      CourtOutcome: value,
    })
  }

  updateCourtDate = (value) => {
    this.update({
      CourtDate: value,
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

  render() {
    const {
      requireLegalOffenseInvolvements,
      requireLegalOffenseSentenced,
      requireLegalOffenseIncarcerated,
    } = this.props

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

        {requireLegalOffenseInvolvements && (
          <span>
            <Branch
              name="involved_violence"
              label={i18n.t('legal.police.heading.involvement')}
              labelSize="h4"
              adjustFor="p"
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
              adjustFor="p"
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
              adjustFor="p"
              className="offense-substances"
              {...this.props.InvolvedSubstances}
              onUpdate={this.updateInvolvedSubstances}
              required={this.props.required}
              onError={this.props.onError}
              scrollIntoView={this.props.scrollIntoView}
            >
              {i18n.m('legal.police.label.substances')}
            </Branch>
          </span>
        )}

        <Field
          title={i18n.t('legal.police.heading.address')}
          optional
          adjustFor="address"
          shrink
          scrollIntoView={this.props.scrollIntoView}
        >
          <Location
            name="Address"
            {...this.props.Address}
            className="offense-address"
            label={i18n.t('legal.police.label.address')}
            layout={Location.OFFENSE}
            dispatch={this.props.dispatch}
            onUpdate={this.updateAddress}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Branch
          name="was_cited"
          label={i18n.t('legal.police.heading.cited')}
          labelSize="h4"
          adjustFor="p"
          className="offense-cited"
          {...this.props.WasCited}
          onUpdate={this.updateWasCited}
          required={this.props.required}
          onError={this.props.onError}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={(this.props.WasCited || {}).value === 'Yes'}>
          <div>
            <Field
              title={i18n.t('legal.police.heading.citedagency')}
              titleSize="h4"
              optional
              className="no-margin-bottom"
            />
            <Field
              title={i18n.t('legal.police.heading.citedby')}
              titleSize="label"
              scrollIntoView={this.props.scrollIntoView}
            >
              <Text
                name="CitedBy"
                {...this.props.CitedBy}
                className="offense-citedby"
                onUpdate={this.updateCitedBy}
                onError={this.props.onError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t('legal.police.heading.agencyaddress')}
              optional
              help="legal.police.help.agencyaddress"
              adjustFor="address"
              shrink
              scrollIntoView={this.props.scrollIntoView}
            >
              <Location
                name="AgencyAddress"
                {...this.props.AgencyAddress}
                className="offense-agencyaddress"
                label={i18n.t('legal.police.label.address')}
                layout={Location.OFFENSE}
                dispatch={this.props.dispatch}
                onUpdate={this.updateAgencyAddress}
                onError={this.props.onError}
                required={this.props.required}
              />
            </Field>

            <Branch
              name="was_charged"
              label={i18n.t('legal.police.heading.charged')}
              labelSize="h4"
              className="offense-charged"
              {...this.props.WasCharged}
              onUpdate={this.updateWasCharged}
              required={this.props.required}
              onError={this.props.onError}
              scrollIntoView={this.props.scrollIntoView}
            />
          </div>
        </Show>

        <Show when={(this.props.WasCharged || {}).value === 'No'}>
          <Field
            title={i18n.t('legal.police.label.explanation')}
            titleSize="label"
            scrollIntoView={this.props.scrollIntoView}
          >
            <Textarea
              name="Explanation"
              {...this.props.Explanation}
              className="offense-explanation"
              onUpdate={this.updateExplanation}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
        </Show>

        <Show when={(this.props.WasCharged || {}).value === 'Yes'}>
          <div>
            <Field
              title={i18n.t('legal.police.heading.courtname')}
              adjustFor="labels"
              scrollIntoView={this.props.scrollIntoView}
            >
              <Text
                name="CourtName"
                {...this.props.CourtName}
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
                geocode
                layout={Location.OFFENSE}
                addressBooks={this.props.addressBooks}
                addressBook="Court"
                dispatch={this.props.dispatch}
                onUpdate={this.updateCourtAddress}
                onError={this.props.onError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t('legal.police.heading.chargedetails')}
              titleSize="h4"
              optional
              className="no-margin-bottom"
            >
              {i18n.m('legal.police.para.chargedetails')}
            </Field>

            <Field
              title={i18n.t('legal.police.heading.chargeType')}
              titleSize="label"
              adjustFor="buttons"
              shrink
              scrollIntoView={this.props.scrollIntoView}
            >
              <RadioGroup
                className="offense-chargetype option-list"
                onError={this.props.onError}
                required={this.props.required}
                selectedValue={(this.props.ChargeType || {}).value}
              >
                <Radio
                  name="charge-felony"
                  className="charge-felony"
                  label={i18n.t('legal.police.label.felony')}
                  value="Felony"
                  onUpdate={this.updateChargeType}
                  onError={this.props.onError}
                />
                <Radio
                  name="charge-misdemeanor"
                  className="charge-misdemeanor"
                  label={i18n.t('legal.police.label.misdemeanor')}
                  value="Misdemeanor"
                  onUpdate={this.updateChargeType}
                  onError={this.props.onError}
                />
                <Radio
                  name="charge-other"
                  className="charge-other"
                  label={i18n.t('legal.police.label.other')}
                  value="Other"
                  onUpdate={this.updateChargeType}
                  onError={this.props.onError}
                />
              </RadioGroup>

              <Text
                name="CourtCharge"
                {...this.props.CourtCharge}
                label={i18n.t('legal.police.label.courtcharge')}
                className="offense-courtcharge"
                onUpdate={this.updateCourtCharge}
                onError={this.props.onError}
                required={this.props.required}
              />
              <Text
                name="CourtOutcome"
                {...this.props.CourtOutcome}
                label={i18n.t('legal.police.label.courtoutcome')}
                className="offense-courtoutcome"
                onUpdate={this.updateCourtOutcome}
                onError={this.props.onError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t('legal.police.heading.courtdate')}
              help="legal.police.help.courtdate"
              adjustFor="labels"
              shrink
              scrollIntoView={this.props.scrollIntoView}
            >
              <DateControl
                name="CourtDate"
                {...this.props.CourtDate}
                hideDay
                className="offense-courtdate"
                minDateEqualTo
                onUpdate={this.updateCourtDate}
                onError={this.props.onError}
                required={this.props.required}
              />
            </Field>

            <Branch
              name="was_sentenced"
              label={i18n.t('legal.police.heading.sentenced')}
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
                  requireLegalOffenseSentenced={requireLegalOffenseSentenced}
                  requireLegalOffenseIncarcerated={requireLegalOffenseIncarcerated}
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
                  title={i18n.t(
                    'legal.police.heading.awaitingTrialExplanation'
                  )}
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
        </Show>
      </div>
    )
  }
}

Offense.defaultProps = {
  Date: {},
  Description: {},
  InvolvedViolence: {},
  InvolvedFirearms: {},
  InvolvedSubstances: {},
  Address: {},
  WasCited: {},
  CitedBy: {},
  AgencyAddress: {},
  WasCharged: {},
  Explanation: {},
  CourtName: {},
  CourtAddress: {},
  ChargeType: '',
  CourtCharge: {},
  CourtOutcome: {},
  CourtDate: {},
  WasSentenced: {},
  Sentence: {},
  AwaitingTrial: {},
  AwaitingTrialExplanation: {},
  addressBooks: {},
  dispatch: () => {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
}
