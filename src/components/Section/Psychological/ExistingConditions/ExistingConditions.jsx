import React from 'react'

import i18n from 'util/i18n'

import schema from 'schema'

import validate, { ExistingConditionsDiagnosisValidator } from 'validators'

import { Summary, DateSummary } from 'components/Summary'
import {
  Accordion,
  Branch,
  Show,
  RadioGroup,
  Radio,
  Field,
  Textarea,
} from 'components/Form'

import Subsection from 'components/Section/shared/Subsection'

import { PSYCHOLOGICAL, PSYCHOLOGICAL_CONDITIONS } from 'config/formSections/psychological'
import connectPsychologicalSection from '../PsychologicalConnector'

import Diagnosis from '../Diagnoses/Diagnosis'

const sectionConfig = {
  section: PSYCHOLOGICAL.name,
  store: PSYCHOLOGICAL.store,
  subsection: PSYCHOLOGICAL_CONDITIONS.name,
  storeKey: PSYCHOLOGICAL_CONDITIONS.storeKey,
}

export class ExistingConditions extends Subsection {
  constructor(props) {
    super(props)

    const {
      section, subsection, store, storeKey,
    } = sectionConfig

    this.section = section
    this.subsection = subsection
    this.store = store
    this.storeKey = storeKey
  }

  update = (queue) => {
    this.props.onUpdate(this.storeKey, {
      HasCondition: this.props.HasCondition,
      ReceivedTreatment: this.props.ReceivedTreatment,
      Explanation: this.props.Explanation,
      TreatmentList: this.props.TreatmentList,
      DidNotFollow: this.props.DidNotFollow,
      DidNotFollowExplanation: this.props.DidNotFollowExplanation,
      ...queue,
    })
  }

  updateHasCondition = (values) => {
    this.update({
      HasCondition: values,
      ReceivedTreatment:
        values.value === 'Yes' ? this.props.ReceivedTreatment : {},
      Explanation: values.value === 'Yes' ? this.props.Explanation : {},
      TreatmentList:
        values.value === 'Yes'
          ? this.props.TreatmentList
          : { items: [], branch: {} },
      DidNotFollow: values.value === 'Yes' ? this.props.DidNotFollow : {},
      DidNotFollowExplanation:
        values.value === 'Yes' ? this.props.DidNotFollowExplanation : {},
    })
  }

  updateReceivedTreatment = (checkbox) => {
    this.update({
      ReceivedTreatment: checkbox,
      Explanation: checkbox.value === 'No' ? this.props.Explanation : {},
    })
  }

  updateTreatmentList = (values) => {
    this.update({
      TreatmentList: values,
    })
  }

  updateDidNotFollow = (values) => {
    this.update({
      DidNotFollow: values,
      DidNotFollowExplanation:
        values.value === 'Yes' ? this.props.DidNotFollowExplanation : {},
    })
  }

  updateExplanation = (values) => {
    this.update({
      Explanation: values,
    })
  }

  updateDidNotFollowExplanation = (values) => {
    this.update({
      DidNotFollowExplanation: values,
    })
  }

  summary = (item, index) => {
    const o = (item || {}).Diagnosis || {}
    const treatmentDate = o.Diagnosed || {}
    const date = DateSummary(treatmentDate)
    const condition = (o.Condition || {}).value || ''

    return Summary({
      type: i18n.t(
        'psychological.existingConditions.treatment.collection.itemType'
      ),
      index,
      left: condition,
      right: date,
      placeholder: i18n.t(
        'psychological.existingConditions.treatment.collection.summary'
      ),
    })
  }

  render() {
    return (
      <div
        className="section-content existingconditions"
        {...super.dataAttributes()}
      >
        <h1 className="section-header">{i18n.t('psychological.destination.existingConditions')}</h1>
        <Branch
          name="hascondition"
          label={i18n.t(
            'psychological.existingConditions.heading.hasCondition'
          )}
          labelSize="h4"
          className="eapp-field-wrap hascondition"
          {...this.props.HasCondition}
          warning
          onError={this.handleError}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
          onUpdate={this.updateHasCondition}
        >
          {i18n.m('psychological.existingConditions.para.hasCondition')}
        </Branch>

        <Show when={this.props.HasCondition.value === 'Yes'}>
          <div>
            <Field
              title={i18n.t(
                'psychological.existingConditions.heading.receivedTreatment'
              )}
              titleSize="h4"
              className={
                this.props.ReceivedTreatment === 'No' ? 'no-margin-bottom' : ''
              }
              adjustFor="button"
              scrollIntoView={this.props.scrollIntoView}
            >
              {i18n.m(
                'psychological.existingConditions.para.receivedTreatment'
              )}
              <RadioGroup
                className="treatment-list option-list"
                selectedValue={(this.props.ReceivedTreatment || {}).value}
                onError={this.handleError}
                required={this.props.required}
              >
                <Radio
                  name="treatment"
                  className="treatment yes"
                  label={i18n.t(
                    'psychological.existingConditions.receivedTreatment.label.yes'
                  )}
                  value="Yes"
                  onUpdate={this.updateReceivedTreatment}
                  onError={this.handleError}
                />
                <Radio
                  name="treatment"
                  className="treatment no"
                  label={i18n.t(
                    'psychological.existingConditions.receivedTreatment.label.no'
                  )}
                  value="No"
                  onUpdate={this.updateReceivedTreatment}
                  onError={this.handleError}
                />
                <Radio
                  name="treatment"
                  className="treatment decline"
                  label={i18n.t(
                    'psychological.existingConditions.receivedTreatment.label.decline'
                  )}
                  value="Decline"
                  onUpdate={this.updateReceivedTreatment}
                  onError={this.handleError}
                />
              </RadioGroup>
            </Field>

            <Show when={this.props.ReceivedTreatment.value === 'No'}>
              <Field
                title={i18n.t('psychological.existingConditions.heading.explanation')}
                titleSize="label"
                scrollIntoView={this.props.scrollIntoView}
              >
                <Textarea
                  name="Explanation"
                  className="explanation existing-condition-explanation"
                  {...this.props.Explanation}
                  onUpdate={this.updateExplanation}
                  onError={this.handleError}
                  required={this.props.required}
                />
              </Field>
            </Show>

            <Show when={this.props.ReceivedTreatment.value === 'Yes'}>
              <Accordion
                defaultState={this.props.defaultState}
                {...this.props.TreatmentList}
                onUpdate={this.updateTreatmentList}
                summary={this.summary}
                onError={this.handleError}
                validator={ExistingConditionsDiagnosisValidator}
                description={i18n.t(
                  'psychological.existingConditions.treatment.collection.description'
                )}
                appendTitle={i18n.t(
                  'psychological.existingConditions.treatment.collection.appendTitle'
                )}
                appendLabel={i18n.t(
                  'psychological.existingConditions.treatment.collection.appendLabel'
                )}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
              >
                <Diagnosis
                  name="Item"
                  prefix="existingConditions.diagnosis"
                  required={this.props.required}
                  scrollIntoView={this.props.scrollIntoView}
                  bind
                />
              </Accordion>
            </Show>

            <Branch
              name="didNotFollow"
              label={i18n.t(
                'psychological.existingConditions.heading.didNotFollow'
              )}
              labelSize="h4"
              className="eapp-field-wrap didnotfollow no-margin-bottom"
              {...this.props.DidNotFollow}
              onError={this.handleError}
              required={this.props.required}
              onUpdate={this.updateDidNotFollow}
              scrollIntoView={this.props.scrollIntoView}
            />

            <Show when={this.props.DidNotFollow.value === 'Yes'}>
              <Field
                title={i18n.t(
                  'psychological.existingConditions.heading.didNotFollowExplanation'
                )}
                titleSize="label"
                scrollIntoView={this.props.scrollIntoView}
              >
                <Textarea
                  name="DidNotFollowExplanation"
                  className="explanation existing-condition-didnotfollow-explanation"
                  {...this.props.DidNotFollowExplanation}
                  onUpdate={this.updateDidNotFollowExplanation}
                  onError={this.handleError}
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

ExistingConditions.defaultProps = {
  HasCondition: {},
  DidNotFollow: {},
  ReceivedTreatment: {},
  TreatmentList: [],
  defaultState: true,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  dispatch: () => {},
  validator: data => validate(schema('psychological.conditions', data)),
  scrollToBottom: '.bottom-btns',
}

export default connectPsychologicalSection(ExistingConditions, sectionConfig)
