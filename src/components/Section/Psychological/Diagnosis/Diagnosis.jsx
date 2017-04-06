import React from 'react'
import { i18n } from '../../../../config'
import { Address, ValidationElement, Help, HelpIcon, Text, Textarea, DateRange, BranchCollection, Svg, RadioGroup, Radio, Show } from '../../../Form'
import Treatment from '../Treatment'

export default class Diagnosis extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateCondition = this.updateCondition.bind(this)
    this.updateDiagnosed = this.updateDiagnosed.bind(this)
    this.updateTreatment = this.updateTreatment.bind(this)
    this.updateEffective = this.updateEffective.bind(this)
    this.updateTreatmentFacility = this.updateTreatmentFacility.bind(this)
  }

  update (field, values) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        Condition: this.props.Condition,
        Diagnosed: this.props.Diagnosed,
        Treatment: this.props.Treatment,
        TreatmentFacility: this.props.TreatmentFacility,
        Effective: this.props.Effective,
        [field]: values
      })
    }
  }

  updateCondition (values) {
    this.update('Condition', values)
  }

  updateDiagnosed (values) {
    this.update('Diagnosed', values)
  }

  updateTreatment (values) {
    this.update('Treatment', values)
  }


  updateTreatmentFacility (values) {
    this.update('TreatmentFacility', values)
  }

  updateEffective (values) {
    this.update('Effective', values)
  }

  render () {
    return (
      <div className="diagnosis">

        <h3>{i18n.t(`psychological.diagnosis.heading.condition`)}</h3>
        <div className="eapp-field-wrap no-label">
          <Help id={`psychological.diagnosis.help.condition`}>
            <Text name="Facility"
              className="condition"
              {...this.props.Condition}
              onUpdate={this.updateCondition}
              onValidate={this.props.onValidate}
            />
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t(`psychological.diagnosis.heading.diagnosed`)}</h3>
        <div className="eapp-field-wrap">
          <Help id={`psychological.diagnosis.help.diagnosed`}>
            <DateRange name="Diagnosed"
              {...this.props.Diagnosed}
              receiveProps={this.props.receiveProps}
              onUpdate={this.updateDiagnosed}
              onValidate={this.props.onValidate}
            />
            <HelpIcon />
          </Help>
        </div>

        <h2>{i18n.t(`psychological.diagnosis.heading.healthcareProfessional`)}</h2>
        <div className="eapp-field-wrap person">
          <Treatment name="Treatment"
            {...this.props.Treatment}
            prefix="diagnosis.person"
            onUpdate={this.updateTreatment}
            onValidate={this.props.onValidate}
          />
        </div>

        <h2>{i18n.t(`psychological.diagnosis.heading.facility`)}</h2>
        <div className="eapp-field-wrap facility">
          <Treatment name="TreatmentFacility"
            {...this.props.TreatmentFacility}
            prefix="diagnosis.facility"
            onUpdate={this.updateTreatmentFacility}
            onValidate={this.props.onValidate}
          />
        </div>

        <h3>{i18n.t(`psychological.diagnosis.heading.effective`)}</h3>
        <div className="eapp-field-wrap">
          <RadioGroup className="effective" name="effective" selectedValue={this.props.Effective}>
            <Radio
              className="yes"
              label="Yes"
              value="Yes"
              onUpdate={this.updateEffective}>
            </Radio>
            <Radio
              className="no"
              label="No"
              value="No"
              onUpdate={this.updateEffective}>
            </Radio>
          </RadioGroup>
        </div>

      </div>
    )
  }
}

Diagnosis.defaultProps = {
}
