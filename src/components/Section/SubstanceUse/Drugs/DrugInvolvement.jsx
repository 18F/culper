import React from 'react'
import { i18n } from '../../../../config'
import { Show, Field, Branch, ValidationElement, Textarea, DateControl } from '../../../Form'
import DrugType from './DrugType'

export default class DrugInvolvement extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateDrugType = this.updateDrugType.bind(this)
    this.updateFirstInvolvement = this.updateFirstInvolvement.bind(this)
    this.updateRecentInvolvement = this.updateRecentInvolvement.bind(this)
    this.updateNatureOfInvolvement = this.updateNatureOfInvolvement.bind(this)
    this.updateReasons = this.updateReasons.bind(this)
    this.updateInvolvementWhileEmployed = this.updateInvolvementWhileEmployed.bind(this)
    this.updateInvolvementWithClearance = this.updateInvolvementWithClearance.bind(this)
    this.updateInvolvementInFuture = this.updateInvolvementInFuture.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        DrugType: this.props.DrugType,
        FirstInvolvement: this.props.FirstInvolvement,
        RecentInvolvement: this.props.RecentInvolvement,
        NatureOfInvolvement: this.props.NatureOfInvolvement,
        Reasons: this.props.Reasons,
        InvolvementWhileEmployed: this.props.InvolvementWhileEmployed,
        InvolvementWithClearance: this.props.InvolvementWithClearance,
        InvolvementInFuture: this.props.InvolvementInFuture,
        Explanation: this.props.Explanation,
        ...updateValues
      })
    }
  }

  updateDrugType (values) {
    this.update({ DrugType: values })
  }

  updateFirstInvolvement (values) {
    this.update({ FirstInvolvement: values })
  }

  updateRecentInvolvement (values) {
    this.update({ RecentInvolvement: values })
  }

  updateNatureOfInvolvement (values) {
    this.update({ NatureOfInvolvement: values })
  }

  updateReasons (values) {
    this.update({ Reasons: values })
  }

  updateInvolvementWhileEmployed (values) {
    this.update({ InvolvementWhileEmployed: values })
  }

  updateInvolvementWithClearance (values) {
    this.update({ InvolvementWithClearance: values })
  }

  updateInvolvementInFuture (values) {
    this.update({ InvolvementInFuture: values })
  }

  updateExplanation (values) {
    this.update({ Explanation: values })
  }

  render () {
    return (
      <div className="drug-involvement">
        <Field title={i18n.t('substance.drugs.involvement.heading.drugType')}
               className="drug-type-involvement"
               adjustFor="labels">
          <DrugType name="DrugType"
                    {...this.props.DrugType}
                    onUpdate={this.updateDrugType}
                    onError={this.props.onError}
                    />
        </Field>

        <Field title={i18n.t('substance.drugs.involvement.heading.firstInvolvement')}
               adjustFor="datecontrol"
               help={'substance.drugs.involvement.help.firstInvolvement'}>
          <DateControl name="FirstInvolvement"
                       className="first-involvement"
                       {...this.props.FirstInvolvement}
                       hideDay={true}
                       showEstimated={false}
                       onUpdate={this.updateFirstInvolvement}
                       onError={this.props.onError}
                       />
        </Field>

        <Field title={i18n.t('substance.drugs.involvement.heading.recentInvolvement')}
               adjustFor="datecontrol">
          <DateControl name="RecentInvolvement"
                       className="recent-involvement"
                       {...this.props.RecentInvolvement}
                       hideDay={true}
                       showEstimated={false}
                       onUpdate={this.updateRecentInvolvement}
                       onError={this.props.onError}
                       />
        </Field>

        <Field title={i18n.t('substance.drugs.involvement.heading.natureOfInvolvement')}>
          <Textarea name="NatureOfInvolvement"
                    className="nature-of-involvement"
                    {...this.props.NatureOfInvolvement}
                    onUpdate={this.updateNatureOfInvolvement}
                    onError={this.props.onError}
                    />
        </Field>

        <Field title={i18n.t('substance.drugs.involvement.heading.reasons')}>
          <Textarea name="Reasons"
                    className="reasons"
                    {...this.props.Reasons}
                    onUpdate={this.updateReasons}
                    onError={this.props.onError}
                    />
        </Field>

        <h3>{i18n.t('substance.drugs.involvement.heading.involvementWhileEmployed')}</h3>
        <Branch name="InvolvementWhileEmployed"
                className="involvement-while-employed"
                value={this.props.InvolvementWhileEmployed}
                onError={this.props.onError}
                onUpdate={this.updateInvolvementWhileEmployed}>
        </Branch>

        <h3>{i18n.t('substance.drugs.involvement.heading.involvementWithClearance')}</h3>
        <Branch name="InvolvementWithClearance"
                className="involvement-with-clearance"
                value={this.props.InvolvementWithClearance}
                onError={this.props.onError}
                onUpdate={this.updateInvolvementWithClearance}>
        </Branch>

        <h3>{i18n.t('substance.drugs.involvement.heading.involvementInFuture')}</h3>
        <Branch name="InvolvementInFuture"
                className="involvement-in-future"
                value={this.props.InvolvementInFuture}
                onError={this.props.onError}
                onUpdate={this.updateInvolvementInFuture}>
        </Branch>

        <Show when={this.props.InvolvementInFuture === 'Yes'}>
          <Field title={i18n.t('substance.drugs.involvement.heading.explanation')}
                 titleSize="h4">
            <Textarea name="Explanation"
                      className="explanation"
                      {...this.props.Explanation}
                      onUpdate={this.updateExplanation}
                      onError={this.props.onError}
                      />
          </Field>
        </Show>
      </div>
    )
  }
}

DrugInvolvement.defaultProps = {
  onError: (value, arr) => { return arr }
}
