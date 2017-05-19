import React from 'react'
import { i18n } from '../../../../config'
import { Address, DateControl, Checkbox, Text, ValidationElement, Field, Textarea, Branch, Show } from '../../../Form'

export default class ReceivedCounseling extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateTreatmentProviderName = this.updateTreatmentProviderName.bind(this)
    this.updateTreatmentProviderAddress = this.updateTreatmentProviderAddress.bind(this)
    this.updateAgencyName = this.updateAgencyName.bind(this)
    this.updateAgencyAddress = this.updateAgencyAddress.bind(this)
    this.updateUseSameAddress = this.updateUseSameAddress.bind(this)
    this.updateTreatmentBeganDate = this.updateTreatmentBeganDate.bind(this)
    this.updateTreatmentEndDate = this.updateTreatmentEndDate.bind(this)
    this.updatePresentTreatmentEndDate = this.updatePresentTreatmentEndDate.bind(this)
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
        UseSameAddress: this.props.UseSameAddress,
        TreatmentBeganDate: this.props.TreatmentBeganDate,
        TreatmentEndDate: this.props.TreatmentEndDate,
        PresentTreatmentEndDate: this.props.PresentTreatmentEndDate,
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

  updateTreatmentBeganDate (values) {
    this.update({
      TreatmentBeganDate: values
    })
  }

  updateTreatmentEndDate (values) {
    this.update({
      TreatmentEndDate: values,
      PresentTreatmentEndDate: false
    })
  }

  updatePresentTreatmentEndDate (event) {
    const checked = event.target.checked
    if (event.target.checked) {
      const date = new Date()
      this.update({
        TreatmentEndDate: {
          date: date,
          estimated: false,
          month: String(date.getMonth()),
          year: String(date.getFullYear()),
          day: String(date.getDate())
        },
        PresentTreatmentEndDate: checked
      })
    } else {
      this.update({ PresentTreatmentEndDate: checked })
    }
  }

  updateAgencyAddress (values) {
    this.update({AgencyAddress: values})
  }

  updateUseSameAddress (values) {
    this.update({UseSameAddress: values})
  }

  render () {
    return (
      <div className="voluntary-counseling">
        <Field title={i18n.t('substance.alcohol.receivedCounseling.heading.treatmentProviderName')}
          help={'substance.alcohol.receivedCounseling.help.treatmentProviderName'}>
            <Text name="TreatmentProviderName"
              className="treatment-provider-name"
              {...this.props.TreatmentProviderName}
              onUpdate={this.updateTreatmentProviderName}
              onValidate={this.props.onValidate}
            />
          </Field>
          <Field title={i18n.t('substance.alcohol.receivedCounseling.heading.treatmentProviderAddress')}
                 help={'substance.alcohol.receivedCounseling.help.treatmentProviderAddress'}
                 adjustFor="address">
            <Address name="TreatmentProviderAddress"
              className="provider-address"
              {...this.props.TreatmentProviderAddress}
              onUpdate={this.updateTreatmentProviderAddress}
              onValidate={this.props.onValidate}
            />
          </Field>

          <Field title={i18n.t('substance.alcohol.receivedCounseling.heading.agencyName')}
            help={'substance.alcohol.receivedCounseling.help.agencyName'}>
            <Text name="AgencyName"
              className="agency-name"
              {...this.props.AgencyName}
              onUpdate={this.updateAgencyName}
              onValidate={this.props.onValidate}
            />
          </Field>

          <h3>{i18n.t('substance.alcohol.receivedCounseling.heading.agencyAddress')}</h3>
          <Branch name="UseSameAddress"
            className="use-same-address"
            yesLabel="Same as above"
            noLabel="Different address"
            value={this.props.UseSameAddress}
            onValidate={this.props.onValidate}
            onUpdate={this.updateUseSameAddress}>
          </Branch>

          <Show when={this.props.UseSameAddress === 'No'}>
            <Field help={'substance.alcohol.receivedCounseling.help.agencyAddress'}
                   adjustFor="address">
              <Address name="AgencyAddress"
                className="agency-address"
                {...this.props.AgencyAddress}
                onUpdate={this.updateAgencyAddress}
                onValidate={this.props.onValidate}
              />
            </Field>
          </Show>

          <Field title={i18n.t('substance.alcohol.receivedCounseling.heading.treatmentBeganDate')}
                 help={'substance.alcohol.receivedCounseling.help.treatmentBeganDate'}
                 adjustFor="datecontrol">
            <DateControl name="TreatmentBeganDate"
              className="treatment-began-date"
              {...this.props.TreatmentBeganDate}
              onUpdate={this.updateTreatmentBeganDate}
              onValidate={this.props.onValidate}
            />
          </Field>

          <Field title={i18n.t('substance.alcohol.receivedCounseling.heading.treatmentEndDate')}
                 help={'substance.alcohol.receivedCounseling.help.treatmentEndDate'}
                 adjustFor="datecontrol">
            <DateControl name="TreatmentEndDate"
              className="treatment-end-date"
              {...this.props.TreatmentEndDate}
              onUpdate={this.updateTreatmentEndDate}
              receiveProps={true}
              onValidate={this.props.onValidate}
            />
            <Checkbox name="PresentTreatmentEndDate"
              className="present-treatment-end-date"
              label="Present"
              value="present"
              checked={this.props.PresentTreatmentEndDate}
              onChange={this.updatePresentTreatmentEndDate}
            />
          </Field>

          <h3>{i18n.t('substance.alcohol.receivedCounseling.heading.completedTreatment')}</h3>
          <Branch name="CompletedTreatment"
            help={'substance.alcohol.receivedCounseling.help.completedTreatment'}
            className="completed-treatment"
            value={this.props.CompletedTreatment}
            onValidate={this.props.onValidate}
            onUpdate={this.updateCompletedTreatment}>
          </Branch>

          <Show when={['Yes', 'No'].includes(this.props.CompletedTreatment)}>
            <Field title={i18n.t('substance.alcohol.receivedCounseling.heading.noCompletedTreatment')}
              help={'substance.alcohol.receivedCounseling.help.noCompletedTreatment'}>
              <Textarea name="NoCompletedTreatmentExplanation"
                className="no-completed-treatment"
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
