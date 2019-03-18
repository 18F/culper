import React from 'react'
import { i18n } from 'config'
import {
  ValidationElement,
  Branch,
  Show,
  DateControl,
  Currency,
  Field,
  Text,
  Textarea,
  Name,
  Checkbox,
  NotApplicable,
  RadioGroup,
  Radio,
  Location,
} from '../../../Form'

export default class Bankruptcy extends ValidationElement {
  update(queue) {
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
      ...queue,
    })
  }

  updateField = (field, values) => {
    this.update({
      [field]: values,
    })
  }

  render() {
    return (
      <div className="bankruptcy">
        <Field
          title={i18n.t('financial.bankruptcy.heading.petitionType')}
          titleSize="h4"
          help="financial.bankruptcy.petitionType.help"
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="buttons"
        >
          <RadioGroup
            className="petition-chapters option-list option-list-vertical"
            selectedValue={(this.props.PetitionType || {}).value}
            required={this.props.required}
            onError={this.props.onError}
          >
            <Radio
              name="petition_type"
              label={i18n.t('financial.bankruptcy.petitionType.label.chapter7')}
              value="Chapter7"
              disabled={this.props.disabled}
              onUpdate={(value) => { this.updateField('PetitionType', value) }}
              onError={this.props.onError}
            />
            <Radio
              name="petition_type"
              label={i18n.t('financial.bankruptcy.petitionType.label.chapter11')}
              value="Chapter11"
              disabled={this.props.disabled}
              onUpdate={(value) => { this.updateField('PetitionType', value) }}
              onError={this.props.onError}
            />
            <Radio
              name="petition_type"
              label={i18n.t('financial.bankruptcy.petitionType.label.chapter12')}
              value="Chapter12"
              disabled={this.props.disabled}
              onUpdate={(value) => { this.updateField('PetitionType', value) }}
              onError={this.props.onError}
            />
            <Radio
              name="petition_type"
              label={i18n.t('financial.bankruptcy.petitionType.label.chapter13')}
              value="Chapter13"
              disabled={this.props.disabled}
              onUpdate={(value) => { this.updateField('PetitionType', value) }}
              onError={this.props.onError}
            />
          </RadioGroup>
        </Field>

        <Field
          title={i18n.t('financial.bankruptcy.heading.courtNumber')}
          scrollIntoView={this.props.scrollIntoView}
        >
          <Text
            name="CourtNumber"
            onUpdate={(value) => { this.updateField('CourtNumber', value) }}
            onError={this.props.onError}
            {...this.props.CourtNumber}
            className="courtnumber"
            title={i18n.t('financial.bankruptcy.courtNumber.title')}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('financial.bankruptcy.heading.dateFiled')}
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="labels"
        >
          <DateControl
            name="DateFiled"
            onUpdate={(value) => { this.updateField('DateFiled', value) }}
            minDateEqualTo
            onError={this.props.onError}
            {...this.props.DateFiled}
            className="datefiled"
            required={this.props.required}
            hideDay
          />
        </Field>

        <Field
          title={i18n.t('financial.bankruptcy.heading.dateDischarged')}
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="label"
        >
          <NotApplicable
            name="DateDischargedNotApplicable"
            {...this.props.DateDischargedNotApplicable}
            onError={this.props.onError}
            onUpdate={(value) => { this.updateField('DateDischargedNotApplicable', value) }}
          >
            <DateControl
              name="DateDischarged"
              className="datedischarged"
              onUpdate={(value) => { this.updateField('DateDischarged', value) }}
              onError={this.props.onError}
              minDate={this.props.DateFiled}
              minDateEqualTo
              {...this.props.DateDischarged}
              required={this.props.required}
              hideDay
            />
          </NotApplicable>
        </Field>

        <Field
          title={i18n.t('financial.bankruptcy.heading.totalAmount')}
          scrollIntoView={this.props.scrollIntoView}
        >
          <Currency
            name="TotalAmount"
            onUpdate={(value) => { this.updateField('TotalAmount', value) }}
            onError={this.props.onError}
            {...this.props.TotalAmount}
            className="amount"
            min="1"
            required={this.props.required}
          />
          <div className="flags">
            <Checkbox
              name="TotalAmountEstimated"
              ref="estimated"
              onUpdate={(value) => { this.updateField('TotalAmountEstimated', value) }}
              onError={this.props.onError}
              {...this.props.TotalAmountEstimated}
              label={i18n.t('financial.bankruptcy.totalAmount.estimated')}
              toggle="false"
              checked={this.props.TotalAmountEstimated}
            />
          </div>
        </Field>

        <Field
          title={i18n.t('financial.bankruptcy.heading.nameDebt')}
          filterErrors={Name.requiredErrorsOnly}
          scrollIntoView={this.props.scrollIntoView}
          optional
        >
          <Name
            name="NameDebt"
            className="namedebt"
            {...this.props.NameDebt}
            onUpdate={(value) => { this.updateField('NameDebt', value) }}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Field>

        <Field
          title={i18n.t('financial.bankruptcy.heading.courtInvolved')}
          scrollIntoView={this.props.scrollIntoView}
        >
          <Text
            name="CourtInvolved"
            {...this.props.CourtInvolved}
            className="courtinvolved"
            onUpdate={(value) => { this.updateField('CourtInvolved', value) }}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('financial.bankruptcy.heading.courtAddress')}
          optional
          help="financial.bankruptcy.courtAddress.help"
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="address"
        >
          <Location
            name="CourtAddress"
            label={i18n.t('financial.bankruptcy.courtAddress.label')}
            {...this.props.CourtAddress}
            layout={Location.ADDRESS}
            geocode
            dispatch={this.props.dispatch}
            addressBooks={this.props.addressBooks}
            addressBook="Court"
            onUpdate={(value) => { this.updateField('CourtAddress', value) }}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Show when={(this.props.PetitionType || {}).value === 'Chapter13'}>
          <div className="chapter13">
            <Field
              title={i18n.t('financial.bankruptcy.trustee.title')}
              scrollIntoView={this.props.scrollIntoView}
            >
              <Text
                name="chapter13Trustee"
                className="trustee"
                {...this.props.Trustee}
                onError={this.props.onError}
                onUpdate={(value) => { this.updateField('Trustee', value) }}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t('financial.bankruptcy.trustee.address.title')}
              optional
              help="financial.bankruptcy.trustee.address.help"
              scrollIntoView={this.props.scrollIntoView}
              adjustFor="address"
            >
              <Location
                name="trusteeAddress"
                className="trustee-address"
                {...this.props.TrusteeAddress}
                label={i18n.t('financial.bankruptcy.trustee.address.label')}
                layout={Location.ADDRESS}
                geocode
                dispatch={this.props.dispatch}
                addressBooks={this.props.addressBooks}
                addressBook="Court"
                onError={this.props.onError}
                onUpdate={(value) => { this.updateField('TrusteeAddress', value) }}
                required={this.props.required}
              />
            </Field>
          </div>
        </Show>

        <Branch
          name="discharge_explanation"
          label={i18n.t('financial.bankruptcy.heading.dischargeExplanation')}
          labelSize="h4"
          className="has-discharge-explanation no-margin-bottom"
          {...this.props.HasDischargeExplanation}
          onUpdate={(value) => { this.updateField('HasDischargeExplanation', value) }}
          onError={this.props.onError}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={(this.props.HasDischargeExplanation || {}).value}>
          <Field
            title={i18n.t('financial.bankruptcy.label.dischargeExplanation')}
            titleSize="label"
            adjustFor="textarea"
            scrollIntoView={this.props.scrollIntoView}
          >
            <Textarea
              name="DischargeExplanation"
              {...this.props.DischargeExplanation}
              className="discharge-explanation"
              onUpdate={(value) => { this.updateField('DischargeExplanation', value) }}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
        </Show>
      </div>
    )
  }
}

Bankruptcy.defaultProps = {
  DischargeDateNotApplicable: { applicable: true },
  addressBooks: {},
  dispatch: () => {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
}
