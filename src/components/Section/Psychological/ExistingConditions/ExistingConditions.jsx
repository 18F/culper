import React from 'react'
import { i18n } from '../../../../config'
import { ExistingConditionsValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show, RadioGroup, Radio, Field, Textarea } from '../../../Form'
import Diagnosis from '../Diagnoses/Diagnosis'
import { dateRangeFormat } from '../summaryHelper'

export default class ExistingConditions extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      HasCondition: props.HasCondition,
      ReceivedTreatment: props.ReceivedTreatment,
      Explanation: props.Explanation,
      TreatmentList: props.TreatmentList,
      TreatmentListBranch: props.TreatmentListBranch,
      DidNotFollow: props.DidNotFollow,
      DidNotFollowExplanation: props.DidNotFollowExplanation
    }

    this.update = this.update.bind(this)
    this.updateHasCondition = this.updateHasCondition.bind(this)
    this.updateReceivedTreatment = this.updateReceivedTreatment.bind(this)
    this.updateTreatmentList = this.updateTreatmentList.bind(this)
    this.updateDidNotFollow = this.updateDidNotFollow.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
    this.updateDidNotFollowExplanation = this.updateDidNotFollowExplanation.bind(this)
  }

  update (field, values) {
    this.setState({[field]: values}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          HasCondition: this.state.HasCondition,
          ReceivedTreatment: this.state.ReceivedTreatment,
          Explanation: this.state.Explanation,
          TreatmentList: this.state.TreatmentList,
          DidNotFollow: this.state.DidNotFollow,
          didNotFollowExplanation: this.state.DidNotFollowExplanation
        })
      }
    })
  }

  updateHasCondition (values) {
    this.update('HasCondition', values)
  }

  updateReceivedTreatment (checkbox) {
    this.update('ReceivedTreatment', checkbox.value)
  }

  updateTreatmentList (values) {
    this.update('TreatmentList', values.items)
    this.update('TreatmentListBranch', values.branch)
  }

  updateDidNotFollow (values) {
    this.update('DidNotFollow', values)
  }

  updateExplanation (values) {
    this.update('Explanation', values)
  }

  updateDidNotFollowExplanation (values) {
    this.update('didNotFollowExplanation', values)
  }

  summary (item, index) {
    const o = (item || {}).Diagnosis || {}
    const treatmentDate = (o.Diagnosed || {})
    const formattedTreatmentDate = dateRangeFormat(treatmentDate)
    const condition = (o.Condition || {}).value ? o.Condition.value : null
    const type = i18n.t('psychological.existingConditions.treatment.collection.itemType')
    return (

      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span className="info">
          <strong>
            {condition || i18n.t('psychological.existingConditions.treatment.collection.summary')}
          </strong>
        </span>
        <span className="treatmentdate"><strong>{condition && formattedTreatmentDate}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="existingconditions">
        <h3>{i18n.t('psychological.existingConditions.heading.hasCondition')}</h3>
        {i18n.m('psychological.existingConditions.para.hasCondition')}
        <Branch name="hascondition"
                className="eapp-field-wrap hascondition"
                value={this.state.HasCondition}
                onError={this.handleError}
                onUpdate={this.updateHasCondition}>
        </Branch>

        <Show when={this.state.HasCondition}>
          <div>
            <h3>{i18n.t('psychological.existingConditions.heading.receivedTreatment')}</h3>
            {i18n.m('psychological.existingConditions.para.receivedTreatment')}
            <Field adjustFor="button">
              <RadioGroup className="treatment-list option-list" selectedValue={this.state.ReceivedTreatment}>
                <Radio name="treatment"
                       className="treatment yes"
                       label={i18n.t('psychological.existingConditions.receivedTreatment.label.yes')}
                       value="Yes"
                       onUpdate={this.updateReceivedTreatment}
                       onError={this.handleError}
                       />
                <Radio name="treatment"
                       className="treatment no"
                       label={i18n.t('psychological.existingConditions.receivedTreatment.label.no')}
                       value="No"
                       onUpdate={this.updateReceivedTreatment}
                       onError={this.handleError}
                       />
                <Radio name="treatment"
                       className="treatment decline"
                       label={i18n.t('psychological.existingConditions.receivedTreatment.label.decline')}
                       value="Decline"
                       onUpdate={this.updateReceivedTreatment}
                       onError={this.handleError}
                       />
              </RadioGroup>
            </Field>

            <Show when={this.state.ReceivedTreatment === 'No'}>
              <Field title={i18n.t(`psychological.existingConditions.heading.explanation`)}>
                <Textarea name="Explanation"
                          className="explanation existing-condition-explanation"
                          {...this.props.Explanation}
                          onUpdate={this.updateExplanation}
                          onError={this.handleError}
                          />
              </Field>
            </Show>

            <Show when={this.state.ReceivedTreatment === 'Yes'}>
              <Accordion minimum="1"
                         defaultState={this.props.defaultState}
                         items={this.state.TreatmentList}
                         branch={this.state.TreatmentListBranch}
                         onUpdate={this.updateTreatmentList}
                         summary={this.summary}
                         onError={this.handleError}
                         description={i18n.t('psychological.existingConditions.treatment.collection.description')}
                         appendTitle={i18n.t('psychological.existingConditions.treatment.collection.appendTitle')}
                         appendLabel={i18n.t('psychological.existingConditions.treatment.collection.appendLabel')}>
                <Diagnosis name="Diagnosis"
                           ApplicantBirthDate={this.props.ApplicantBirthDate}
                           prefix="existingConditions.diagnosis"
                           bind={true} />
              </Accordion>
            </Show>

            <h3>{i18n.t('psychological.existingConditions.heading.didNotFollow')}</h3>
            <Branch name="didNotFollow"
                    className="eapp-field-wrap didnotfollow"
                    value={this.state.DidNotFollow}
                    onError={this.handleError}
                    onUpdate={this.updateDidNotFollow}>
            </Branch>

            <Show when={this.state.DidNotFollow === 'Yes'}>
              <Field title={i18n.t(`psychological.existingConditions.heading.didNotFollowExplanation`)}>
                <Textarea name="DidNotFollowExplanation"
                          className="explanation existing-condition-didnotfollow-explanation"
                          {...this.props.DidNotFollowExplanation}
                          onUpdate={this.updateDidNotFollowExplanation}
                          onError={this.handleError}
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
  TreatmentList: [],
  TreatmentListBranch: '',
  defaultState: true,
  onError: (value, arr) => { return arr },
  section: 'psychological',
  subsection: 'conditions',
  dispatch: () => {},
  validator: (state, props) => {
    return new ExistingConditionsValidator(state, props).isValid()
  }
}
