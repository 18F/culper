import React from 'react'
import { i18n } from '../../../../config'
import { Address, Text, DateRange, ValidationElement, Field, Textarea, Branch, Show, Telephone } from '../../../Form'

export default class VoluntaryCounseling extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateCounselingDates = this.updateCounselingDates.bind(this)
    this.updateTreatmentProviderName = this.updateTreatmentProviderName.bind(this)
    this.updateTreatmentProviderAddress = this.updateTreatmentProviderAddress.bind(this)
    this.updateTreatmentProviderTelephone = this.updateTreatmentProviderTelephone.bind(this)
    this.updateCompletedTreatment = this.updateCompletedTreatment.bind(this)
    this.updateNoCompletedTreatmentExplanation = this.updateNoCompletedTreatmentExplanation.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        CounselingDates: this.props.CounselingDates,
        TreatmentProviderName: this.props.TreatmentProviderName,
        TreatmentProviderAddress: this.props.TreatmentProviderAddress,
        TreatmentProviderTelephone: this.props.TreatmentProviderTelephone,
        CompletedTreatment: this.props.CompletedTreatment,
        NoCompletedTreatmentExplanation: this.props.NoCompletedTreatmentExplanation,
        ...updateValues
      })
    }
  }

  updateCounselingDates (values) {
    this.update({CounselingDates: values})
  }

  updateTreatmentProviderName (values) {
    this.update({TreatmentProviderName: values})
  }

  updateTreatmentProviderAddress (values) {
    this.update({TreatmentProviderAddress: values})
  }

  updateTreatmentProviderTelephone (values) {
    this.update({TreatmentProviderTelephone: values})
  }

  updateCompletedTreatment (values) {
    this.update({CompletedTreatment: values})
  }

  updateNoCompletedTreatmentExplanation (values) {
    this.update({NoCompletedTreatmentExplanation: values})
  }

  render () {
    return (
      <div className="voluntary-counseling">
          <Field title={i18n.t('substance.alcohol.voluntaryCounseling.heading.counselingDates')}
            help={'substance.alcohol.voluntaryCounseling.help.counselingDates'}>
            <DateRange name="CounselingDates"
              className="counseling-dates"
              {...this.props.CounselingDates}
              onUpdate={this.updateCounselingDates}
              onValidate={this.props.onValidate}
            />
          </Field>
          <Field title={i18n.t('substance.alcohol.voluntaryCounseling.heading.treatmentProviderName')}
            help={'substance.alcohol.voluntaryCounseling.help.treatmentProviderName'}>
            <Text name="TreatmentProviderName"
              {...this.props.TreatmentProviderName}
              onUpdate={this.updateTreatmentProviderName}
              onValidate={this.props.onValidate}
            />
          </Field>
          <Field title={i18n.t('substance.alcohol.voluntaryCounseling.heading.treatmentProviderAddress')}
            adjustFor="address"
            help={'substance.alcohol.voluntaryCounseling.help.treatmentProviderAddress'}>
            <Address name="TreatmentProviderAddress"
              className="provider-address"
              {...this.props.TreatmentProviderAddress}
              onUpdate={this.updateTreatmentProviderAddress}
              onValidate={this.props.onValidate}
            />
          </Field>
          <Field title={i18n.t('substance.alcohol.voluntaryCounseling.heading.treatmentProviderTelephone')}
            help={'substance.alcohol.voluntaryCounseling.help.treatmentProviderTelephone'}>
            <Telephone name="TreatmentProviderTelephone"
              className="provider-telephone"
              {...this.props.TreatmentProviderTelephone}
              onUpdate={this.updateTreatmentProviderTelephone}
              onValidate={this.props.onValidate}
            />
          </Field>

          <h3>{i18n.t('substance.alcohol.voluntaryCounseling.heading.completedTreatment')}</h3>
          <Branch name="CompletedTreatment"
            help={'substance.alcohol.voluntaryCounseling.help.completedTreatment'}
            className="completed-treatment"
            value={this.props.CompletedTreatment}
            onValidate={this.props.onValidate}
            onUpdate={this.updateCompletedTreatment}>
          </Branch>

          <Show when={this.props.CompletedTreatment === 'No'}>
            <Field title={i18n.t('substance.alcohol.voluntaryCounseling.heading.noCompletedTreatment')}
            help={'substance.alcohol.voluntaryCounseling.help.noCompletedTreatment'}>
              <Textarea name="NoCompletedTreatmentExplanation"
                {...this.props.NoCompletedTreatmentExplanation}
                onUpdate={this.updateNoCompletedTreatmentExplanation}
                onValidate={this.props.onValidate}
              />
            </Field>
          </Show>
      </div>
    )
  }
}

VoluntaryCounseling.defaultProps = {
}
