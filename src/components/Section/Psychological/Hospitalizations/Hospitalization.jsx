import React from 'react'
import { i18n } from '../../../../config'
import { HospitalizationValidator } from '../../../../validators'
import { Address, ValidationElement, Field, Text, Textarea, DateRange, RadioGroup, Radio, Show } from '../../../Form'

export default class Hospitalization extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      errorCodes: []
    }
    this.update = this.update.bind(this)
    this.updateAdmission = this.updateAdmission.bind(this)
    this.updateTreatmentDate = this.updateTreatmentDate.bind(this)
    this.updateFacility = this.updateFacility.bind(this)
    this.updateFacilityAddress = this.updateFacilityAddress.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
  }

  update (field, values) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        Admission: this.props.Admission,
        TreatmentDate: this.props.TreatmentDate,
        Facility: this.props.Facility,
        FacilityAddress: this.props.FacilityAddress,
        Explanation: this.props.Explanation,
        [field]: values
      })
    }
  }

  updateTreatmentDate (values) {
    this.update('TreatmentDate', values)
  }

  updateAdmission (values) {
    this.update('Admission', values.value)
  }

  updateFacility (values) {
    this.update('Facility', values)
  }

  updateFacilityAddress (values) {
    this.update('FacilityAddress', values)
  }

  updateExplanation (values) {
    this.update('Explanation', values)
  }

  isValid () {
    return new HospitalizationValidator(this.props).isValid()
  }

  handleValidation (event, status, error) {
    let codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.isValid()) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      const errorObject = { [this.props.name]: codes }
      const statusObject = { [this.props.name]: { status: complexStatus } }
      super.handleValidation(event, statusObject, errorObject)
    })
  }

  render () {
    return (
      <div className="hospitalization">
        <Field title={i18n.t(`psychological.hospitalization.heading.admission`)}>
          <RadioGroup className="admission" name="admission" selectedValue={this.props.Admission}>
            <Radio
              className="voluntary-option"
              value="Voluntary"
              onValidate={this.handleValidation}
              onUpdate={this.updateAdmission}>
              <div className="voluntary">
                {i18n.t('psychological.hospitalization.label.voluntaryAdmission')}
              </div>
            </Radio>
            <Radio
              className="involuntary-option"
              value="Involuntary"
              onValidate={this.handleValidation}
              onUpdate={this.updateAdmission}>
              <div className="involuntary">
                {i18n.t('psychological.hospitalization.label.involuntaryAdmission')}
              </div>
            </Radio>
          </RadioGroup>
        </Field>

        <Field title={i18n.t(`psychological.hospitalization.heading.explanation`)}>
          <Textarea name="Explanation"
            className="explanation"
            {...this.props.Explanation}
            onUpdate={this.updateExplanation}
            onValidate={this.handleValidation}
          />
        </Field>

        <Field title={i18n.t(`psychological.hospitalization.heading.treatment`)}
          help="psychological.hospitalization.help.treatment"
          adjustFor="daterange">
          <DateRange name="TreatmentDate"
            {...this.props.TreatmentDate}
            receiveProps={this.props.receiveProps}
            onUpdate={this.updateTreatmentDate}
            onValidate={this.handleValidation}
            minDate={this.props.ApplicantBirthDate}
            prefix="hospitalization"
          />
        </Field>

        <Field title={i18n.t(`psychological.hospitalization.heading.facility`)}
          help="psychological.hospitalization.help.facility">
          <Text name="Facility"
            className="facility"
            {...this.props.Facility}
            onUpdate={this.updateFacility}
            onValidate={this.handleValidation}
          />
        </Field>

        <Field title={i18n.t(`psychological.hospitalization.heading.address`)}
          help="psychological.hospitalization.help.address">
          <Address name="FacilityAddress"
            {...this.props.FacilityAddress}
            label={i18n.t(`psychological.hospitalization.label.address`)}
            onUpdate={this.updateFacilityAddress}
            onValidate={this.handleValidation}
          />
        </Field>

      </div>
    )
  }
}

Hospitalization.defaultProps = {
  Admission: { value: null }
}
