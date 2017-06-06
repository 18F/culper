import React from 'react'
import { i18n } from '../../../../config'
import { Field, ValidationElement, Branch, Text, Textarea, DateRange } from '../../../Form'

export default class PrescriptionUse extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updatePrescriptionName = this.updatePrescriptionName.bind(this)
    this.updateInvolvementDates = this.updateInvolvementDates.bind(this)
    this.updateReason = this.updateReason.bind(this)
    this.updateUseWhileEmployed = this.updateUseWhileEmployed.bind(this)
    this.updateUseWithClearance = this.updateUseWithClearance.bind(this)
  }

  update (updateValues) {
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

  updatePrescriptionName (values) {
    this.update({PrescriptionName: values})
  }

  updateInvolvementDates (values) {
    this.update({InvolvementDates: values})
  }

  updateReason (values) {
    this.update({Reason: values})
  }

  updateUseWhileEmployed (values) {
    this.update({ UseWhileEmployed: values })
  }

  updateUseWithClearance (values) {
    this.update({ UseWithClearance: values })
  }

  render () {
    return (
      <div className="prescription-use">
        <Field title={i18n.t('substance.drugs.prescription.heading.prescriptionName')}
          help={'substance.drugs.prescription.help.prescriptionName'}>
          <Text name="PrescriptionName"
            className="prescription-name"
            {...this.props.PrescriptionName}
            onUpdate={this.updatePrescriptionName}
            onError={this.props.onError}
          />
        </Field>

        <Field title={i18n.t('substance.drugs.prescription.heading.involvementDates')}
          adjustFor="daterange"
          help={'substance.drugs.prescription.help.involvementDates'}>
          <DateRange name="InvolvementDates"
            className="involvement-dates"
            {...this.props.InvolvementDates}
            onUpdate={this.updateInvolvementDates}
            onError={this.props.onError}
          />
        </Field>

        <Field title={i18n.t('substance.drugs.prescription.heading.reason')}
          help={'substance.drugs.prescription.help.reason'}>
          <Textarea name="Reason"
            className="reason"
            {...this.props.Reason}
            onUpdate={this.updateReason}
            onError={this.props.onError}
          />
        </Field>

        <h3>{i18n.t('substance.drugs.prescription.heading.useWhileEmployed')}</h3>
        <Branch name="UseWhileEmployed"
          className="use-while-employed"
          help={'substance.drugs.prescription.help.useWhileEmployed'}
          value={this.props.UseWhileEmployed}
          onError={this.props.onError}
          onUpdate={this.updateUseWhileEmployed}>
        </Branch>

        <h3>{i18n.t('substance.drugs.prescription.heading.useWithClearance')}</h3>
        <Branch name="UseWithClearance"
          className="use-with-clearance"
          help={'substance.drugs.prescription.help.useWithClearance'}
          value={this.props.UseWithClearance}
          onError={this.props.onError}
          onUpdate={this.updateUseWithClearance}>
        </Branch>
      </div>
    )
  }
}

PrescriptionUse.defaultProps = {
  onError: (value, arr) => { return arr }
}
