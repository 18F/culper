import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Field, Textarea, DateRange,
         RadioGroup, Radio, Show, Text } from '../../../Form'
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

  updateCondition (response) {
    this.update('Condition', response.value)
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
          <Show when={this.props.prefix === 'existingConditions.diagnosis'}>
            <Text name="Condition"
                  className="diagnosis-condition"
                  value={this.props.Condition}
                  onUpdate={this.updateCondition}
                  onValidate={this.props.onValidate}
                  />
          </Show>
          <Show when={this.props.prefix === 'diagnosis'}>
            <RadioGroup className="diagnosis-condition"
                        selectedValue={this.props.Condition}>
              <Radio name="diagnosis-condition-psychotic"
                    label={i18n.m('psychological.diagnosis.label.psychotic')}
                    value="Psychotic disorder"
                    className="diagnosis-condition-psychotic"
                    onUpdate={this.updateCondition}
                    onValidate={this.props.onValidate}
                    />
              <Radio name="diagnosis-condition-schizophrenia"
                    label={i18n.m('psychological.diagnosis.label.schizophrenia')}
                    value="Schizophrenia"
                    className="diagnosis-condition-schizophrenia"
                    onUpdate={this.updateCondition}
                    onValidate={this.props.onValidate}
                    />
              <Radio name="diagnosis-condition-schizoaffective"
                    label={i18n.m('psychological.diagnosis.label.schizoaffective')}
                    value="Schizoaffective disorder"
                    className="diagnosis-condition-schizoaffective"
                    onUpdate={this.updateCondition}
                    onValidate={this.props.onValidate}
                    />
              <Radio name="diagnosis-condition-delusional"
                    label={i18n.m('psychological.diagnosis.label.delusional')}
                    value="Delusional disorder"
                    className="diagnosis-condition-delusional"
                    onUpdate={this.updateCondition}
                    onValidate={this.props.onValidate}
                    />
              <Radio name="diagnosis-condition-bipolar"
                    label={i18n.m('psychological.diagnosis.label.bipolar')}
                    value="Bipolar mood disorder"
                    className="diagnosis-condition-bipolar"
                    onUpdate={this.updateCondition}
                    onValidate={this.props.onValidate}
                    />
              <Radio name="diagnosis-condition-borderline"
                    label={i18n.m('psychological.diagnosis.label.borderline')}
                    value="Borderline personality disorder"
                    className="diagnosis-condition-borderline"
                    onUpdate={this.updateCondition}
                    onValidate={this.props.onValidate}
                    />
              <Radio name="diagnosis-condition-antisocial"
                    label={i18n.m('psychological.diagnosis.label.antisocial')}
                    value="Antisocial personality disorder"
                    className="diagnosis-condition-antisocial"
                    onUpdate={this.updateCondition}
                    onValidate={this.props.onValidate}
                    />
            </RadioGroup>
          </Show>
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
