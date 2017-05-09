import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Show, DateControl, Currency, Field,
         Text, Textarea, Name, Address, Checkbox, NotApplicable, RadioGroup, Radio } from '../../../Form'

export default class Bankruptcy extends ValidationElement {
  constructor (props) {
    super(props)
    this.updatePetitionType = this.updatePetitionType.bind(this)
    this.updateCourtNumber = this.updateCourtNumber.bind(this)
    this.updateDateFiled = this.updateDateFiled.bind(this)
    this.updateDateDischarged = this.updateDateDischarged.bind(this)
    this.updateDischargeDateNotApplicable = this.updateDischargeDateNotApplicable.bind(this)
    this.updateTotalAmount = this.updateTotalAmount.bind(this)
    this.updateTotalAmountEstimated = this.updateTotalAmountEstimated.bind(this)
    this.updateNameDebt = this.updateNameDebt.bind(this)
    this.updateCourtInvolved = this.updateCourtInvolved.bind(this)
    this.updateCourtAddress = this.updateCourtAddress.bind(this)
    this.updateHasDischargeExplanation = this.updateHasDischargeExplanation.bind(this)
    this.updateDischargeExplanation = this.updateDischargeExplanation.bind(this)
    this.updateTrustee = this.updateTrustee.bind(this)
    this.updateTrusteeAddress = this.updateTrusteeAddress.bind(this)
  }

  update (field, values) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        PetitionType: this.props.PetitionType,
        CourtNumber: this.props.CourtNumber,
        DateFiled: this.props.DateFiled,
        DischargeDateNotApplicable: this.props.DischargeDateNotApplicable,
        DateDischarged: this.props.DateDischarged,
        TotalAmount: this.props.TotalAmount,
        TotalAmountEstimated: this.props.TotalAmountEstimated,
        NameDebt: this.props.NameDebt,
        CourtInvolved: this.props.CourtInvolved,
        CourtAddress: this.props.CourtAddress,
        Trustee: this.props.Trustee,
        TrusteeAddress: this.props.TrusteeAddress,
        HasDischargeExplanation: this.props.HasDischargeExplanation,
        DischargeExplanation: this.props.DischargeExplanation,
        [field]: values
      })
    }
  }

  updatePetitionType (radio) {
    this.update('PetitionType', radio.value)
  }

  updateCourtNumber (values) {
    this.update('CourtNumber', values)
  }

  updateDateFiled (values) {
    this.update('DateFiled', values)
  }

  updateDateDischarged (values) {
    this.update('DateDischarged', values)
  }

  updateDischargeDateNotApplicable (values) {
    this.update('DischargeDateNotApplicable', values)
  }

  updateTotalAmount (values) {
    this.update('TotalAmount', values)
  }

  updateTotalAmountEstimated (values) {
    this.update('TotalAmountEstimated', values)
  }

  updateNameDebt (values) {
    this.update('NameDebt', values)
  }

  updateCourtInvolved (values) {
    this.update('CourtInvolved', values)
  }

  updateCourtAddress (values) {
    this.update('CourtAddress', values)
  }

  updateHasDischargeExplanation (values) {
    this.update('HasDischargeExplanation', values)
  }

  updateDischargeExplanation (values) {
    this.update('DischargeExplanation', values)
  }

  updateTrustee (values) {
    this.update('Trustee', values)
  }

  updateTrusteeAddress (values) {
    this.update('TrusteeAddress', values)
  }

  render () {
    return (
      <div className="bankruptcy">
        <h3>{i18n.t('financial.bankruptcy.heading.petitionType')}</h3>
        <Field help="financial.bankruptcy.petitionType.help"
          adjustFor="buttons">
          <RadioGroup className="petition-chapters" selectedValue={this.props.PetitionType}>
            <Radio name="petition_type"
              label={i18n.m('financial.bankruptcy.petitionType.label.chapter7')}
              value="Chapter7"
              disabled={this.props.disabled}
              onUpdate={this.updatePetitionType}
              onValidate={this.props.onValidate}
            />
            <Radio name="petition_type"
              label={i18n.m('financial.bankruptcy.petitionType.label.chapter11')}
              value="Chapter11"
              disabled={this.props.disabled}
              onUpdate={this.updatePetitionType}
              onValidate={this.props.onValidate}
            />
            <Radio name="petition_type"
              label={i18n.m('financial.bankruptcy.petitionType.label.chapter12')}
              value="Chapter12"
              disabled={this.props.disabled}
              onUpdate={this.updatePetitionType}
              onValidate={this.props.onValidate}
            />
            <Radio name="petition_type"
              label={i18n.m('financial.bankruptcy.petitionType.label.chapter13')}
              value="Chapter13"
              disabled={this.props.disabled}
              onUpdate={this.updatePetitionType}
              onValidate={this.props.onValidate}
            />
          </RadioGroup>
        </Field>

        <Field title={i18n.t('financial.bankruptcy.heading.courtNumber')}
          help="financial.bankruptcy.courtNumber.help">
          <Text name="CourtNumber"
            onUpdate={this.updateCourtNumber}
            onValidate={this.props.onValidate}
            {...this.props.CourtNumber}
            className="courtnumber"
            placeholder={i18n.t('financial.bankruptcy.courtNumber.placeholder')}
            title={i18n.t('financial.bankruptcy.courtNumber.title')}
            placeholder={i18n.t('financial.bankruptcy.courtNumber.placeholder')}
          />
        </Field>

        <Field title={i18n.t('financial.bankruptcy.heading.dateFiled')}
          help="financial.bankruptcy.dateFiled.help"
          adjustFor="labels">
          <DateControl name="DateFiled"
            onUpdate={this.updateDateFiled}
            onValidate={this.props.onValidate}
            {...this.props.DateFiled}
            className="datefiled"
            prefix="bankruptcy.datefiled"
            hideDay={true} />
        </Field>

        <Field title={i18n.t('financial.bankruptcy.heading.dateDischarged')}
          help="financial.bankruptcy.dateDischarged.help"
          adjustFor="buttons">
          <NotApplicable name="DischargeDateNotApplicable"
            {...this.props.DischargeDateNotApplicable}
            onValidate={this.props.onValidate}
            onUpdate={this.updateDischargeDateNotApplicable}>
            <DateControl name="DateDischarged"
              className="datedischarged"
              onUpdate={this.updateDateDischarged}
              onValidate={this.props.onValidate}
              {...this.props.DateDischarged}
              prefix="bankruptcy.datedischarged"
              hideDay={true} />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('financial.bankruptcy.heading.totalAmount')}
          help="financial.bankruptcy.totalAmount.help">
          <Currency name="TotalAmount"
            onUpdate={this.updateTotalAmount}
            onValidate={this.props.onValidate}
            {...this.props.TotalAmount}
            className="amount"
            min="0"
            placeholder={i18n.t('financial.bankruptcy.totalAmount.placeholder')}
          />
          <div className="flags">
            <Checkbox name="TotalAmountEstimated"
              ref="estimated"
              onUpdate={this.updateTotalAmountEstimated}
              onValidate={this.props.onValidate}
              {...this.props.TotalAmountEstimated}
              label={i18n.t('financial.bankruptcy.totalAmount.estimated')}
              toggle="false"
              checked={this.props.TotalAmountEstimated}
            />
          </div>
        </Field>

        <h3>{i18n.t('financial.bankruptcy.heading.nameDebt')}</h3>
        <Name name="NameDebt"
          className="namedebt"
          {...this.props.NameDebt}
          onUpdate={this.updateNameDebt}
          onValidate={this.props.onValidate}
        />

      <Field title={i18n.t('financial.bankruptcy.heading.courtInvolved')}
        help="financial.bankruptcy.courtInvolved.help">
        <Text name="CourtInvolved"
          placeholder={i18n.t('financial.bankruptcy.courtInvolved.placeholder')}
          {...this.props.CourtInvolved}
          className="courtinvolved"
          onUpdate={this.updateCourtInvolved}
          onValidate={this.props.onValidate}
        />
      </Field>

      <Field title={i18n.t('financial.bankruptcy.heading.courtAddress')}
        help="financial.bankruptcy.courtAddress.help"
        adjustFor="labels">
        <Address name="CourtAddress"
          label={i18n.t('financial.bankruptcy.courtAddress.label')}
          {...this.props.CourtAddress}
          onUpdate={this.updateCourtAddress}
          onValidate={this.props.onValidate}
        />
      </Field>

      <Show when={this.props.PetitionType === 'Chapter13'}>
        <div className="chapter13">
          <Field title={i18n.t('financial.bankruptcy.trustee.title')}
            help="financial.bankruptcy.trustee.help">
            <Text name="chapter13Trustee"
              className="trustee"
              {...this.props.Trustee}
              placeholder={i18n.t('financial.bankruptcy.trustee.placeholder')}
              onValidate={this.props.onValidate}
              onUpdate={this.updateTrustee}
            />
          </Field>

          <Field title={i18n.t('financial.bankruptcy.trustee.address.title')}
            help="financial.bankruptcy.trustee.address.help"
            adjustFor="labels">
            <Address name="trusteeAddress"
              className="trustee-address"
              {...this.props.TrusteeAddress}
              label={i18n.t('financial.bankruptcy.trustee.address.label')}
              onValidate={this.props.onValidate}
              onUpdate={this.updateTrusteeAddress}
            />
          </Field>
        </div>
      </Show>

      <Branch name="discharge_explanation"
        label={i18n.t('financial.bankruptcy.heading.dischargeExplanation')}
        labelSize="h3"
        className="has-discharge-explanation"
        value={this.props.HasDischargeExplanation}
        onUpdate={this.updateHasDischargeExplanation}
        onValidate={this.props.onValidate}
      />

    <Show when={this.props.HasDischargeExplanation}>
      <Textarea name="DischargeExplanation"
        label={i18n.t('financial.bankruptcy.label.dischargeExplanation')}
        {...this.props.DischargeExplanation}
        className="discharge-explanation"
        onUpdate={this.updateDischargeExplanation}
        onValidate={this.props.onValidate}
      />
    </Show>
  </div>
    )
  }
}
