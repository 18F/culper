import React from 'react'

import i18n from 'util/i18n'

import {
  Field,
  ValidationElement,
  Branch,
  Text,
  Textarea,
  DateRange,
} from 'components/Form'

export default class PrescriptionUse extends ValidationElement {
  update = (updateValues) => {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        PrescriptionName: this.props.PrescriptionName,
        InvolvementDates: this.props.InvolvementDates,
        Reason: this.props.Reason,
        UseWhileEmployed: this.props.UseWhileEmployed,
        UseWithClearance: this.props.UseWithClearance,
        ...updateValues,
      })
    }
  }

  updatePrescriptionName = (values) => {
    this.update({ PrescriptionName: values })
  }

  updateInvolvementDates = (values) => {
    this.update({ InvolvementDates: values })
  }

  updateReason = (values) => {
    this.update({ Reason: values })
  }

  updateUseWhileEmployed = (values) => {
    this.update({ UseWhileEmployed: values })
  }

  updateUseWithClearance = (values) => {
    this.update({ UseWithClearance: values })
  }

  render() {
    const { requireDrugWhileSafety, requireDrugWithClearance } = this.props

    return (
      <div className="prescription-use">
        <Field
          title={i18n.t(
            'substance.drugs.prescription.heading.prescriptionName'
          )}
          scrollIntoView={this.props.scrollIntoView}
        >
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
          help="substance.drugs.prescription.help.involvementDates"
          scrollIntoView={this.props.scrollIntoView}
        >
          <DateRange
            name="InvolvementDates"
            className="involvement-dates"
            {...this.props.InvolvementDates}
            minDateEqualTo
            onUpdate={this.updateInvolvementDates}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('substance.drugs.prescription.heading.reason')}
          scrollIntoView={this.props.scrollIntoView}
        >
          <Textarea
            name="Reason"
            className="reason"
            {...this.props.Reason}
            onUpdate={this.updateReason}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        {requireDrugWhileSafety && (
          <Branch
            name="UseWhileEmployed"
            label={i18n.t(
              'substance.drugs.prescription.heading.useWhileEmployed'
            )}
            labelSize="h4"
            className="use-while-employed"
            {...this.props.UseWhileEmployed}
            onError={this.props.onError}
            onUpdate={this.updateUseWhileEmployed}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        )}

        {requireDrugWithClearance && (
          <Branch
            name="UseWithClearance"
            label={i18n.t(
              'substance.drugs.prescription.heading.useWithClearance'
            )}
            labelSize="h4"
            className="use-with-clearance"
            {...this.props.UseWithClearance}
            onError={this.props.onError}
            onUpdate={this.updateUseWithClearance}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        )}
      </div>
    )
  }
}

PrescriptionUse.defaultProps = {
  UseWhileEmployed: {},
  UseWhileClearance: {},
  onError: (value, arr) => arr,
}
