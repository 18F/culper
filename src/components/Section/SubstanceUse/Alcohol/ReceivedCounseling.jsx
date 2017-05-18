import React from 'react'
import { i18n } from '../../../../config'
import { Address, Text, ValidationElement, Field, Textarea, Branch, Show } from '../../../Form'

export default class ReceivedCounseling extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateTreatmentProviderName = this.updateTreatmentProviderName.bind(this)
    this.updateTreatmentProviderAddress = this.updateTreatmentProviderAddress.bind(this)
    this.updateAgencyName = this.updateAgencyName.bind(this)
    this.updateAgencyAddress = this.updateAgencyAddress.bind(this)
    this.updateCompletedTreatment = this.updateCompletedTreatment.bind(this)
    this.updateNoCompletedTreatmentExplanation = this.updateNoCompletedTreatmentExplanation.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        CounselingDates: this.props.CounselingDates,
        TreatmentProviderName: this.props.TreatmentProviderName,
        TreatmentProviderAddress: this.props.TreatmentProviderAddress,
        AgencyName: this.props.AgencyName,
        AgencyAddress: this.props.AgencyAddress,
        CompletedTreatment: this.props.CompletedTreatment,
        NoCompletedTreatmentExplanation: this.props.NoCompletedTreatmentExplanation,
        ...updateValues
      })
    }
  }

  updateTreatmentProviderName (values) {
    this.update({TreatmentProviderName: values})
  }

  updateTreatmentProviderAddress (values) {
    this.update({TreatmentProviderAddress: values})
  }

  updateCompletedTreatment (values) {
    this.update({CompletedTreatment: values})
  }

  updateNoCompletedTreatmentExplanation (values) {
    this.update({NoCompletedTreatmentExplanation: values})
  }

  updateAgencyName (values) {
    this.update({AgencyName: values})
  }

  updateAgencyAddress (values) {
    this.update({AgencyAddress: values})
  }

  render () {
    return (
      <div className="voluntary-counseling">
          <Field title={i18n.t('substance.alcohol.receivedCounseling.heading.treatmentProviderName')}>
            <Text name="TreatmentProviderName"
              {...this.props.TreatmentProviderName}
              onUpdate={this.updateTreatmentProviderName}
              onValidate={this.props.onValidate}
            />
          </Field>
          <Field title={i18n.t('substance.alcohol.receivedCounseling.heading.treatmentProviderAddress')}>
            <Address name="TreatmentProviderAddress"
              className="provider-address"
              {...this.props.TreatmentProviderAddress}
              onUpdate={this.updateTreatmentProviderAddress}
              onValidate={this.props.onValidate}
            />
          </Field>

          <Field title={i18n.t('substance.alcohol.receivedCounseling.heading.agencyName')}>
            <Text name="AgencyName"
              {...this.props.AgencyName}
              onUpdate={this.updateAgencyName}
              onValidate={this.props.onValidate}
            />
          </Field>

          <Field title={i18n.t('substance.alcohol.receivedCounseling.heading.agencyAddress')}>
            <Address name="AgencyAddress"
              className="agency-address"
              {...this.props.AgencyAddress}
              onUpdate={this.updateAgencyAddress}
              onValidate={this.props.onValidate}
            />
          </Field>

          <h3>{i18n.t('substance.alcohol.receivedCounseling.heading.completedTreatment')}</h3>
          <Branch name="CompletedTreatment"
            className="completed-treatment"
            value={this.props.CompletedTreatment}
            onValidate={this.props.onValidate}
            onUpdate={this.updateCompletedTreatment}>
          </Branch>

          <Show when={this.props.CompletedTreatment === 'No'}>
            <Field title={i18n.t('substance.alcohol.receivedCounseling.heading.noCompletedTreatment')}>
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

ReceivedCounseling.defaultProps = {
}
