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

    this.update = this.update.bind(this)
    this.updateHasCondition = this.updateHasCondition.bind(this)
    this.updateReceivedTreatment = this.updateReceivedTreatment.bind(this)
    this.updateTreatmentList = this.updateTreatmentList.bind(this)
    this.updateDidNotFollow = this.updateDidNotFollow.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
    this.updateDidNotFollowExplanation = this.updateDidNotFollowExplanation.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      HasCondition: this.props.HasCondition,
      ReceivedTreatment: this.props.ReceivedTreatment,
      Explanation: this.props.Explanation,
      TreatmentList: this.props.TreatmentList,
      TreatmentListBranch: this.props.TreatmentListBranch,
      DidNotFollow: this.props.DidNotFollow,
      DidNotFollowExplanation: this.props.DidNotFollowExplanation,
      ...queue
    })
  }

  updateHasCondition (values) {
    this.update({
      HasCondition: values,
      ReceivedTreatment: values === 'Yes' ? this.props.ReceivedTreatment : '',
      Explanation: values === 'Yes' ? this.props.Explanation : {},
      TreatmentList: values === 'Yes' ? this.props.TreatmentList : [],
      TreatmentListBranch: values === 'Yes' ? this.props.TreatmentListBranch : '',
      DidNotFollow: values === 'Yes' ? this.props.DidNotFollow : '',
      DidNotFollowExplanation: values === 'Yes' ? this.props.DidNotFollowExplanation : {}
    })
  }

  updateReceivedTreatment (checkbox) {
    this.update({
      ReceivedTreatment: checkbox.value,
      Explanation: checkbox.value === 'No' ? this.props.Explanation : {}
    })
  }

  updateTreatmentList (values) {
    this.update({
      TreatmentList: values.items,
      TreatmentListBranch: values.branch
    })
  }

  updateDidNotFollow (values) {
    this.update({
      DidNotFollow: values,
      DidNotFollowExplanation: values === 'Yes' ? this.props.DidNotFollowExplanation : {}
    })
  }

  updateExplanation (values) {
    this.update({
      Explanation: values
    })
  }

  updateDidNotFollowExplanation (values) {
    this.update({
      DidNotFollowExplanation: values
    })
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
            {condition || i18n.m('psychological.existingConditions.treatment.collection.summary')}
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
                value={this.props.HasCondition}
                warning={true}
                onError={this.handleError}
                onUpdate={this.updateHasCondition}>
        </Branch>

        <Show when={this.props.HasCondition === 'Yes'}>
          <div>
            <h3>{i18n.t('psychological.existingConditions.heading.receivedTreatment')}</h3>
            {i18n.m('psychological.existingConditions.para.receivedTreatment')}
            <Field adjustFor="button">
              <RadioGroup className="treatment-list option-list" selectedValue={this.props.ReceivedTreatment}>
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

            <Show when={this.props.ReceivedTreatment === 'No'}>
              <Field title={i18n.t(`psychological.existingConditions.heading.explanation`)}>
                <Textarea name="Explanation"
                          className="explanation existing-condition-explanation"
                          {...this.props.Explanation}
                          onUpdate={this.updateExplanation}
                          onError={this.handleError}
                          />
              </Field>
            </Show>

            <Show when={this.props.ReceivedTreatment === 'Yes'}>
              <Accordion minimum="1"
                         defaultState={this.props.defaultState}
                         items={this.props.TreatmentList}
                         branch={this.props.TreatmentListBranch}
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
                    value={this.props.DidNotFollow}
                    onError={this.handleError}
                    onUpdate={this.updateDidNotFollow}>
            </Branch>

            <Show when={this.props.DidNotFollow === 'Yes'}>
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
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'psychological',
  subsection: 'conditions',
  dispatch: () => {},
  validator: (state, props) => {
    return new ExistingConditionsValidator(props, props).isValid()
  }
}
