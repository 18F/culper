import React from 'react'
import { i18n } from '../../../../config'
import {
  ValidationElement,
  Field,
  Textarea,
  DateRange,
  RadioGroup,
  Radio,
  Show,
  Text
} from '../../../Form'
import Treatment from '../Treatment'
import { getContext } from '../../../../validators/datecontrol'

export default class Diagnosis extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateCondition = this.updateCondition.bind(this)
    this.updateDiagnosed = this.updateDiagnosed.bind(this)
    this.updateTreatment = this.updateTreatment.bind(this)
    this.updateEffective = this.updateEffective.bind(this)
    this.updateTreatmentFacility = this.updateTreatmentFacility.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Condition: this.props.Condition,
      Diagnosed: this.props.Diagnosed,
      Treatment: this.props.Treatment,
      TreatmentFacility: this.props.TreatmentFacility,
      Effective: this.props.Effective,
      Explanation: this.props.Explanation,
      ...queue
    })
  }

  updateCondition(values) {
    this.update({
      Condition: values
    })
  }

  updateDiagnosed(values) {
    this.update({
      Diagnosed: values
    })
  }

  updateTreatment(values) {
    this.update({
      Treatment: values
    })
  }

  updateTreatmentFacility(values) {
    this.update({
      TreatmentFacility: values
    })
  }

  updateEffective(values) {
    this.update({
      Effective: values
    })
  }

  updateExplanation(values) {
    this.update({
      Explanation: values
    })
  }

  render() {
    const prefix = this.props.prefix
    const applicantBirthdate = getContext().applicantBirthdate
    return (
      <div className="diagnosis">
        <Show when={this.props.prefix !== 'existingConditions.diagnosis'}>
          <Field
            title={i18n.t(`psychological.diagnosis.heading.condition`)}
            scrollIntoView={this.props.scrollIntoView}>
            <RadioGroup
              className="diagnosis-condition"
              onError={this.props.onError}
              required={this.props.required}
              selectedValue={(this.props.Condition || {}).value}>
              <Radio
                name="diagnosis-condition-psychotic"
                label={i18n.m('psychological.diagnosis.label.psychotic')}
                value="Psychotic disorder"
                className="diagnosis-condition-psychotic"
                onUpdate={this.updateCondition}
                onError={this.props.onError}
              />
              <Radio
                name="diagnosis-condition-schizophrenia"
                label={i18n.m('psychological.diagnosis.label.schizophrenia')}
                value="Schizophrenia"
                className="diagnosis-condition-schizophrenia"
                onUpdate={this.updateCondition}
                onError={this.props.onError}
              />
              <Radio
                name="diagnosis-condition-schizoaffective"
                label={i18n.m('psychological.diagnosis.label.schizoaffective')}
                value="Schizoaffective disorder"
                className="diagnosis-condition-schizoaffective"
                onUpdate={this.updateCondition}
                onError={this.props.onError}
              />
              <Radio
                name="diagnosis-condition-delusional"
                label={i18n.m('psychological.diagnosis.label.delusional')}
                value="Delusional disorder"
                className="diagnosis-condition-delusional"
                onUpdate={this.updateCondition}
                onError={this.props.onError}
              />
              <Radio
                name="diagnosis-condition-bipolar"
                label={i18n.m('psychological.diagnosis.label.bipolar')}
                value="Bipolar mood disorder"
                className="diagnosis-condition-bipolar"
                onUpdate={this.updateCondition}
                onError={this.props.onError}
              />
              <Radio
                name="diagnosis-condition-borderline"
                label={i18n.m('psychological.diagnosis.label.borderline')}
                value="Borderline personality disorder"
                className="diagnosis-condition-borderline"
                onUpdate={this.updateCondition}
                onError={this.props.onError}
              />
              <Radio
                name="diagnosis-condition-antisocial"
                label={i18n.m('psychological.diagnosis.label.antisocial')}
                value="Antisocial personality disorder"
                className="diagnosis-condition-antisocial"
                onUpdate={this.updateCondition}
                onError={this.props.onError}
              />
            </RadioGroup>
          </Field>
        </Show>

        <Field
          title={i18n.t(`psychological.${prefix}.heading.diagnosed`)}
          help={`psychological.${prefix}.help.diagnosed`}
          adjustFor="daterange"
          scrollIntoView={this.props.scrollIntoView}>
          <DateRange
            name="Diagnosed"
            {...this.props.Diagnosed}
            receiveProps={this.props.receiveProps}
            onUpdate={this.updateDiagnosed}
            minDate={(this.props.Birthdate || {}).date}
            minDateEqualTo={true}
            maxDate={(this.props.minDate || {}).date}
            maxDateEqualTo
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t(
            `psychological.${prefix}.heading.healthcareProfessional`
          )}
          titleSize="h2"
          optional={true}
          className="no-margin-bottom"
        />
        <div className="person">
          <Treatment
            name="Treatment"
            {...this.props.Treatment}
            prefix={`${prefix}.person`}
            addressBooks={this.props.addressBooks}
            dispatch={this.props.dispatch}
            onUpdate={this.updateTreatment}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </div>

        <Field
          title={i18n.t(`psychological.${prefix}.heading.facility`)}
          titleSize="h2"
          optional={true}
          className="no-margin-bottom"
        />
        <div className="facility">
          <Treatment
            name="TreatmentFacility"
            {...this.props.TreatmentFacility}
            prefix={`${prefix}.facility`}
            addressBooks={this.props.addressBooks}
            dispatch={this.props.dispatch}
            onUpdate={this.updateTreatmentFacility}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </div>

        <Show when={this.props.prefix !== 'existingConditions.diagnosis'}>
          <div>
            <Field
              title={i18n.t(`psychological.${prefix}.heading.effective`)}
              className="no-margin-bottom"
              adjustFor="buttons"
              scrollIntoView={this.props.scrollIntoView}>
              <RadioGroup
                className="effective"
                selectedValue={(this.props.Effective || {}).value}
                onError={this.props.onError}
                required={this.props.required}>
                <Radio
                  name="effective"
                  label="Yes"
                  value="Yes"
                  className="yes"
                  onUpdate={this.updateEffective}
                  onError={this.props.onError}
                />
                <Radio
                  name="effective"
                  label="No"
                  value="No"
                  className="No"
                  onUpdate={this.updateEffective}
                  onError={this.props.onError}
                />
              </RadioGroup>
            </Field>

            <Show when={(this.props.Effective || {}).value === 'No'}>
              <Field
                title={i18n.t(`psychological.${prefix}.heading.explanation`)}
                titleSize="label"
                help={`psychological.${prefix}.help.explanation`}
                scrollIntoView={this.props.scrollIntoView}>
                <Textarea
                  name="Explanation"
                  className="explanation"
                  {...this.props.Explanation}
                  onUpdate={this.updateExplanation}
                  onError={this.props.onError}
                  required={this.props.required}
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
  prefix: 'diagnosis',
  addressBooks: {},
  dispatch: action => {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
