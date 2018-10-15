import React from 'react'
import { i18n } from '../../../../config'
import {
  Field,
  ValidationElement,
  Branch,
  Text,
  Textarea,
  DateRange
} from '../../../Form'

export default class PrescriptionUse extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updatePrescriptionName = this.updatePrescriptionName.bind(this)
    this.updateInvolvementDates = this.updateInvolvementDates.bind(this)
    this.updateReason = this.updateReason.bind(this)
    this.updateUseWhileEmployed = this.updateUseWhileEmployed.bind(this)
    this.updateUseWithClearance = this.updateUseWithClearance.bind(this)
  }

  update(updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        PrescriptionName: this.props.PrescriptionName,
        InvolvementDates: this.props.InvolvementDates,
        Reason: this.props.Reason,
        UseWhileEmployed: this.props.UseWhileEmployed,
        UseWithClearance: this.props.UseWithClearance,
        ...updateValues
      })
    }
  }

  updatePrescriptionName(values) {
    this.update({ PrescriptionName: values })
  }

  updateInvolvementDates(values) {
    this.update({ InvolvementDates: values })
  }

  updateReason(values) {
    this.update({ Reason: values })
  }

  updateUseWhileEmployed(values) {
    this.update({ UseWhileEmployed: values })
  }

  updateUseWithClearance(values) {
    this.update({ UseWithClearance: values })
  }

  render() {
    return (
      <div className="prescription-use">
        <Field
          title={i18n.t(
            'substance.drugs.prescription.heading.prescriptionName'
          )}
          scrollIntoView={this.props.scrollIntoView}>
          <Text
            name="PrescriptionName"
            className="prescription-name"
            {...this.props.PrescriptionName}
            onUpdate={this.updatePrescriptionName}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t(
            'substance.drugs.prescription.heading.involvementDates'
          )}
          adjustFor="daterange"
          help={'substance.drugs.prescription.help.involvementDates'}
          scrollIntoView={this.props.scrollIntoView}>
          <DateRange
            name="InvolvementDates"
            className="involvement-dates"
            {...this.props.InvolvementDates}
            minDateEqualTo={true}
            onUpdate={this.updateInvolvementDates}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('substance.drugs.prescription.heading.reason')}
          scrollIntoView={this.props.scrollIntoView}>
          <Textarea
            name="Reason"
            className="reason"
            {...this.props.Reason}
            onUpdate={this.updateReason}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Branch
          name="UseWhileEmployed"
          label={i18n.t(
            'substance.drugs.prescription.heading.useWhileEmployed'
          )}
          labelSize="h3"
          className="use-while-employed"
          {...this.props.UseWhileEmployed}
          onError={this.props.onError}
          onUpdate={this.updateUseWhileEmployed}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Branch
          name="UseWithClearance"
          label={i18n.t(
            'substance.drugs.prescription.heading.useWithClearance'
          )}
          labelSize="h3"
          className="use-with-clearance"
          {...this.props.UseWithClearance}
          onError={this.props.onError}
          onUpdate={this.updateUseWithClearance}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
        />
      </div>
    )
  }
}

PrescriptionUse.defaultProps = {
  UseWhileEmployed: {},
  UseWhileClearance: {},
  onError: (value, arr) => {
    return arr
  }
}
