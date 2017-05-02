import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Field, Text, Textarea, DateRange, RadioGroup, Radio, Show } from '../../../Form'
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
    this.updateExplanation = this.updateExplanation.bind(this)
  }

  update (field, values) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        Condition: this.props.Condition,
        Diagnosed: this.props.Diagnosed,
        Treatment: this.props.Treatment,
        TreatmentFacility: this.props.TreatmentFacility,
        Effective: this.props.Effective,
        Explanation: this.props.Explanation,
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

  updateEffective (radio) {
    this.update('Effective', radio.value)
  }

  updateExplanation (values) {
    this.update('Explanation', values)
  }

  render () {
    const prefix = this.props.prefix
    return (
      <div className="diagnosis">
        <Field title={i18n.t(`psychological.${prefix}.heading.condition`)}>
          <Text name="Condition"
                className="condition"
                {...this.props.Condition}
                onUpdate={this.updateCondition}
                onValidate={this.props.onValidate}
                />
        </Field>

        <Field title={i18n.t(`psychological.${prefix}.heading.diagnosed`)}
               help={`psychological.${prefix}.help.diagnosed`}
               adjustFor="daterange">
          <DateRange name="Diagnosed"
                     {...this.props.Diagnosed}
                     receiveProps={this.props.receiveProps}
                     onUpdate={this.updateDiagnosed}
                     prefix={prefix}
                     minDate={this.props.ApplicantBirthDate}
                     onValidate={this.props.onValidate}
                     />
        </Field>

        <h2>{i18n.t(`psychological.${prefix}.heading.healthcareProfessional`)}</h2>
        <div className="person">
          <Treatment name="Treatment"
                     {...this.props.Treatment}
                     prefix={`${prefix}.person`}
                     onUpdate={this.updateTreatment}
                     onValidate={this.props.onValidate}
                     />
        </div>

        <h2>{i18n.t(`psychological.${prefix}.heading.facility`)}</h2>
        <div className="facility">
          <Treatment name="TreatmentFacility"
                     {...this.props.TreatmentFacility}
                     prefix={`${prefix}.facility`}
                     onUpdate={this.updateTreatmentFacility}
                     onValidate={this.props.onValidate}
                     />
        </div>

        <Show when={this.props.prefix !== 'existingConditions.diagnosis'}>
          <div>
            <Field title={i18n.t(`psychological.${prefix}.heading.effective`)}
              adjustFor="buttons">
              <RadioGroup className="effective" selectedValue={this.props.Effective}>
                <Radio name="effective"
                  label="Yes"
                  value="Yes"
                  onUpdate={this.updateEffective}>
                </Radio>
                <Radio name="effective"
                  label="No"
                  value="No"
                  onUpdate={this.updateEffective}>
                </Radio>
              </RadioGroup>
            </Field>

            <Show when={this.props.Effective === 'No'}>
              <Field title={i18n.t(`psychological.${prefix}.heading.explanation`)}
                help={`psychological.${prefix}.help.explanation`}>
                <Textarea name="Explanation"
                  className="explanation"
                  {...this.props.Explanation}
                  onUpdate={this.updateExplanation}
                  onValidate={this.props.onValidate}
                />
              </Field>
            </Show>
          </div>
        </Show>
      </div>
    )
  }
}

Diagnosis.defaultProps = {
  prefix: 'diagnosis'
}
