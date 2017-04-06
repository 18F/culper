import React from 'react'
import { i18n } from '../../../../config'
import { Address, ValidationElement, Help, HelpIcon, Text, Textarea, DateRange, BranchCollection, Svg, RadioGroup, Radio, Show } from '../../../Form'

export default class Hospitalization extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateAdmission = this.updateAdmission.bind(this)
    this.updateTreatmentDate = this.updateTreatmentDate.bind(this)
    this.updateFacility = this.updateFacility.bind(this)
    this.updateFacilityAddress = this.updateFacilityAddress.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
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
    this.update('Admission', values)
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

  render () {
    return (
      <div className="hospitalization">
        <h3>{i18n.t(`psychological.hospitalization.heading.admission`)}</h3>
        <div className="eapp-field-wrap">
          <RadioGroup className="admission" name="admission" selectedValue={this.props.Admission}>
            <Radio
              className="voluntary-option"
              value="Voluntary"
              onUpdate={this.updateAdmission}>
              <div className="voluntary">
                {i18n.m('psychological.hospitalization.label.voluntaryAdmission')}
              </div>
            </Radio>
            <Radio
              className="involuntary-option"
              value="Involuntary"
              onUpdate={this.updateAdmission}>
              <div className="involuntary">
                {i18n.m('psychological.hospitalization.label.involuntaryAdmission')}
              </div>
            </Radio>
          </RadioGroup>
        </div>

        <Show when={this.props.Admission}>
          <div>
            <h3>{i18n.t(`psychological.hospitalization.heading.treatment`)}</h3>
            <div className="eapp-field-wrap no-label">
              <Help id={`psychological.hospitalization.help.treatment`}>
                <Textarea name="Explanation"
                  className="explanation"
                  {...this.props.Explanation}
                  onUpdate={this.updateExplanation}
                  onValidate={this.props.onValidate}
                />
                <HelpIcon />
              </Help>
            </div>
          </div>
        </Show>

        <h3>{i18n.t(`psychological.hospitalization.heading.treatment`)}</h3>
        <div className="eapp-field-wrap">
          <Help id={`psychological.hospitalization.help.treatment`}>
            <DateRange name="TreatmentDate"
              {...this.props.TreatmentDate}
              receiveProps={this.props.receiveProps}
              onUpdate={this.updateTreatmentDate}
              onValidate={this.props.onValidate}
            />
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t(`psychological.hospitalization.heading.facility`)}</h3>
        <div className="eapp-field-wrap no-label">
          <Help id={`psychological.hospitalization.help.facility`}>
            <Text name="Facility"
              className="facility"
              {...this.props.Facility}
              onUpdate={this.updateFacility}
              onValidate={this.props.onValidate}
            />
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t(`psychological.hospitalization.heading.address`)}</h3>
        <div className="eapp-field-wrap">
          <Help id={ `psychological.hospitalization.help.address` }>
            <Address name="FacilityAddress"
              {...this.props.FacilityAddress}
              label={i18n.t(`psychological.hospitalization.label.address`)}
              onUpdate={this.updateFacilityAddress}
              onValidate={this.props.onValidate}
            />
            <HelpIcon />
          </Help>
        </div>

      </div>
    )
  }
}

Hospitalization.defaultProps = {
  Admission: { value: null }
}
