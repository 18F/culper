import React from 'react'
import { i18n } from '../../../../config'
import Sentence from './Sentence'
import { ValidationElement, Branch, Show, Address, DateControl, Textarea, Text, RadioGroup, Radio, Help, HelpIcon } from '../../../Form'

/**
 * Convenience function to send updates along their merry way
 */
const sendUpdate = (fn, name, props) => {
  if (fn) {
    fn({
      name: name,
      ...props
    })
  }
}

export default class OtherOffense extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      Date: props.Date,
      Description: props.Description,
      InvolvedViolence: props.InvolvedViolence,
      InvolvedFirearms: props.InvolvedFirearms,
      InvolvedSubstances: props.InvolvedSubstances,
      CourtName: props.CourtName,
      CourtAddress: props.CourtAddress,
      CourtCharge: props.CourtCharge,
      CourtOutcome: props.CourtOutcome,
      CourtDate: props.CourtDate,
      WasSentenced: props.WasSentenced,
      Sentence: props.Sentence,
      AwaitingTrial: props.AwaitingTrial,
      AwaitingTrialExplanation: props.AwaitingTrialExplanation
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateDate = this.updateDate.bind(this)
    this.updateDescription = this.updateDescription.bind(this)
    this.updateInvolvedViolence = this.updateInvolvedViolence.bind(this)
    this.updateInvolvedFirearms = this.updateInvolvedFirearms.bind(this)
    this.updateInvolvedSubstances = this.updateInvolvedSubstances.bind(this)
    this.updateCourtName = this.updateCourtName.bind(this)
    this.updateCourtAddress = this.updateCourtAddress.bind(this)
    this.updateCourtType = this.updateCourtType.bind(this)
    this.updateCourtCharge = this.updateCourtCharge.bind(this)
    this.updateCourtOutcome = this.updateCourtOutcome.bind(this)
    this.updateCourtDate = this.updateCourtDate.bind(this)
    this.updateWasSentenced = this.updateWasSentenced.bind(this)
    this.updateSentence = this.updateSentence.bind(this)
    this.updateAwaitingTrial = this.updateAwaitingTrial.bind(this)
    this.updateAwaitingTrialExplanation = this.updateAwaitingTrialExplanation.bind(this)
  }

  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)
    })
  }

  updateDate (values) {
    this.onUpdate('Date', values)
  }

  updateDescription (values) {
    this.onUpdate('Description', values)
  }

  updateInvolvedViolence (value, event) {
    this.onUpdate('InvolvedViolence', value)
  }

  updateInvolvedFirearms (value, event) {
    this.onUpdate('InvolvedFirearms', value)
  }

  updateInvolvedSubstances (value, event) {
    this.onUpdate('InvolvedSubstances', value)
  }

  updateCourtName (value) {
    this.onUpdate('CourtName', value)
  }

  updateCourtAddress (value) {
    this.onUpdate('CourtAddress', value)
  }

  updateCourtType (event) {
    this.onUpdate('CourtType', event.target.value)
  }

  updateCourtCharge (value) {
    this.onUpdate('CourtCharge', value)
  }

  updateCourtOutcome (value) {
    this.onUpdate('CourtOutcome', value)
  }

  updateCourtDate (value) {
    this.onUpdate('CourtDate', value)
  }

  updateWasSentenced (value, event) {
    this.onUpdate('WasSentenced', value)
  }

  updateSentence (value, event) {
    this.onUpdate('Sentence', value)
  }

  updateAwaitingTrial (values) {
    this.onUpdate('AwaitingTrial', values)
  }

  updateAwaitingTrialExplanation (values) {
    this.onUpdate('AwaitingTrialExplanation', values)
  }

  render () {
    return (
      <div className="offense">
        <h3>{i18n.t('legal.police.heading.date')}</h3>
        <div className="eapp-field-wrap">
          <Help id="legal.police.help.date">
            <DateControl name="Date"
                         {...this.state.Date}
                         className="offense-date"
                         onUpdate={this.updateDate}
                         onValidate={this.props.onValidate}
                         />
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t('legal.police.heading.description')}</h3>
        <div className="eapp-field-wrap no-label">
          <Help id="legal.police.help.description">
            <Textarea name="Description"
                      {...this.state.Description}
                      className="offense-description"
                      onUpdate={this.updateDescription}
                      onValidate={this.props.onValidate}
                      />
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t('legal.police.heading.involvement')}</h3>
        <Branch name="involved_violence"
                className="eapp-field-wrap no-label offense-violence"
                value={this.state.InvolvedViolence}
                help="legal.police.help.violence"
                onUpdate={this.updateInvolvedViolence}
                onValidate={this.props.onValidate}>
          {i18n.m('legal.police.label.violence')}
        </Branch>

        <Branch name="involved_firearms"
                className="eapp-field-wrap no-label offense-firearms"
                value={this.state.InvolvedFirearms}
                help="legal.police.help.firearms"
                onUpdate={this.updateInvolvedFirearms}
                onValidate={this.props.onValidate}>
          {i18n.m('legal.police.label.firearms')}
        </Branch>

        <Branch name="involved_substances"
                className="eapp-field-wrap no-label offense-substances"
                value={this.state.InvolvedSubstances}
                help="legal.police.help.substances"
                onUpdate={this.updateInvolvedSubstances}
                onValidate={this.props.onValidate}>
          {i18n.m('legal.police.label.substances')}
        </Branch>

        <h2>{i18n.t('legal.police.heading.courtinfo')}</h2>
        <h3>{i18n.t('legal.police.heading.courtname')}</h3>
        <div className="eapp-field-wrap">
          <Help id="legal.police.help.courtname">
            <Text name="CourtName"
              {...this.state.CourtName}
              label={i18n.t('legal.police.label.courtname')}
              className="offense-courtname"
              onUpdate={this.updateCourtName}
              onValidate={this.props.onValidate}
            />
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t('legal.police.heading.courtaddress')}</h3>
        <div className="eapp-field-wrap">
          <Help id="legal.police.help.courtaddress">
            <Address name="CourtAddress"
              {...this.state.CourtAddress}
              label={i18n.t('legal.police.label.address')}
              className="offense-courtaddress"
              onUpdate={this.updateCourtAddress}
              onValidate={this.props.onValidate}
            />
            <HelpIcon className="address-help-icon" />
          </Help>
        </div>

        <h3>{i18n.t('legal.police.heading.chargedetails')}</h3>
        {i18n.m('legal.police.para.chargedetails')}

        <h4>{i18n.t('legal.police.heading.courttype')}</h4>
        <div className="eapp-field-wrap no-label">
          <Help id="legal.police.help.courttype">
            <RadioGroup className="offense-courttype option-list"
              selectedValue={this.state.CourtType}>
              <Radio name="charge-felony"
                className="charge-felony"
                label={i18n.t('legal.police.label.felony')}
                value="Felony"
                onChange={this.updateCourtType}
                onValidate={this.props.onValidate}
              />
              <Radio name="charge-misdemeanor"
                className="charge-misdemeanor"
                label={i18n.t('legal.police.label.misdemeanor')}
                value="Misdemeanor"
                onChange={this.updateCourtType}
                onValidate={this.props.onValidate}
              />
              <Radio name="charge-other"
                className="charge-other"
                label={i18n.t('legal.police.label.other')}
                value="Other"
                onChange={this.updateCourtType}
                onValidate={this.props.onValidate}
              />
            </RadioGroup>
            <HelpIcon />
          </Help>
        </div>

        <div className="eapp-field-wrap">
          <Help id="legal.police.help.courtcharge">
            <Text name="CourtCharge"
              {...this.state.CourtCharge}
              label={i18n.t('legal.police.label.courtcharge')}
              className="offense-courtcharge"
              onUpdate={this.updateCourtCharge}
              onValidate={this.props.onValidate}
            />
            <HelpIcon />
          </Help>
        </div>

        <div className="eapp-field-wrap">
          <Help id="legal.police.help.courtoutcome">
            <Text name="CourtOutcome"
              {...this.state.CourtOutcome}
              label={i18n.t('legal.police.label.courtoutcome')}
              className="offense-courtoutcome"
              onUpdate={this.updateCourtOutcome}
              onValidate={this.props.onValidate}
            />
            <HelpIcon />
          </Help>
        </div>

        <h4>{i18n.t('legal.police.heading.courtdate')}</h4>
        <div className="eapp-field-wrap">
          <Help id="legal.police.help.courtdate">
            <DateControl name="CourtDate"
              {...this.state.CourtDate}
              hideDay={true}
              className="offense-courtdate"
              onUpdate={this.updateCourtDate}
              onValidate={this.props.onValidate}
            />
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t('legal.police.heading.otherOffenseSentenced')}</h3>
        <Branch name="was_sentenced"
          className="eapp-field-wrap no-label offense-sentenced"
          value={this.state.WasSentenced}
          help="legal.police.help.sentenced"
          onUpdate={this.updateWasSentenced}
          onValidate={this.props.onValidate}>
        </Branch>

        <Show when={this.state.WasSentenced === 'Yes'}>
          <Sentence name="Sentence"
            {...this.state.Sentence}
            onValidate={this.props.onValidate}
            onUpdate={this.updateSentence}
          />
        </Show>
        <Show when={this.state.WasSentenced === 'No'}>
          <div>
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
            <div className="eapp-field-wrap">
              <Textarea
                label={i18n.t('legal.police.heading.awaitingTrialExplanation')}
                className="awaiting-trial-explanation"
                {...this.state.AwaitingTrialExplanation}
                name="awaiting_trial_explanation"
                onValidate={this.props.onValidate}
                onUpdate={this.updateAwaitingTrialExplanation} />
            </div>
          </div>
        </Show>
      </div>
    )
  }
}
