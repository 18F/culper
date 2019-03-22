import React from 'react'

import i18n from 'util/i18n'
import {
  Show,
  Field,
  Branch,
  ValidationElement,
  Textarea,
  DateControl,
} from 'components/Form'

import DrugType from './DrugType'

export default class DrugInvolvement extends ValidationElement {
  update = (updateValues) => {
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
        ...updateValues,
      })
    }
  }

  updateDrugType = (values) => {
    this.update({ DrugType: values })
  }

  updateFirstInvolvement = (values) => {
    this.update({ FirstInvolvement: values })
  }

  updateRecentInvolvement = (values) => {
    this.update({ RecentInvolvement: values })
  }

  updateNatureOfInvolvement = (values) => {
    this.update({ NatureOfInvolvement: values })
  }

  updateReasons = (values) => {
    this.update({ Reasons: values })
  }

  updateInvolvementWhileEmployed = (values) => {
    this.update({ InvolvementWhileEmployed: values })
  }

  updateInvolvementWithClearance = (values) => {
    this.update({ InvolvementWithClearance: values })
  }

  updateInvolvementInFuture = (values) => {
    this.update({ InvolvementInFuture: values })
  }

  updateExplanation = (values) => {
    this.update({ Explanation: values })
  }

  render() {
    const {
      requireDrugWhileSafety, requireDrugWithClearance, requireDrugInFuture,
    } = this.props

    return (
      <div className="drug-involvement">
        <Field
          title={i18n.t('substance.drugs.involvement.heading.drugType')}
          className="drug-type-involvement"
          adjustFor="labels"
          scrollIntoView={this.props.scrollIntoView}
        >
          <DrugType
            name="DrugType"
            {...this.props.DrugType}
            onUpdate={this.updateDrugType}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Field>

        <Field
          title={i18n.t('substance.drugs.involvement.heading.firstInvolvement')}
          adjustFor="datecontrol"
          scrollIntoView={this.props.scrollIntoView}
        >
          <DateControl
            name="FirstInvolvement"
            className="first-involvement"
            {...this.props.FirstInvolvement}
            hideDay
            minDateEqualTo
            showEstimated={false}
            onUpdate={this.updateFirstInvolvement}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t(
            'substance.drugs.involvement.heading.recentInvolvement'
          )}
          adjustFor="datecontrol"
          scrollIntoView={this.props.scrollIntoView}
        >
          <DateControl
            name="RecentInvolvement"
            className="recent-involvement"
            {...this.props.RecentInvolvement}
            hideDay
            prefix="drugPurchase"
            minDate={this.props.FirstInvolvement}
            minDateEqualTo
            showEstimated={false}
            onUpdate={this.updateRecentInvolvement}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t(
            'substance.drugs.involvement.heading.natureOfInvolvement'
          )}
          scrollIntoView={this.props.scrollIntoView}
        >
          <Textarea
            name="NatureOfInvolvement"
            className="nature-of-involvement"
            {...this.props.NatureOfInvolvement}
            onUpdate={this.updateNatureOfInvolvement}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('substance.drugs.involvement.heading.reasons')}
          scrollIntoView={this.props.scrollIntoView}
        >
          <Textarea
            name="Reasons"
            className="reasons"
            {...this.props.Reasons}
            onUpdate={this.updateReasons}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        {requireDrugWhileSafety && (
          <Branch
            name="InvolvementWhileEmployed"
            label={i18n.t(
              'substance.drugs.involvement.heading.involvementWhileEmployed'
            )}
            labelSize="h4"
            className="involvement-while-employed"
            {...this.props.InvolvementWhileEmployed}
            onError={this.props.onError}
            required={this.props.required}
            onUpdate={this.updateInvolvementWhileEmployed}
            scrollIntoView={this.props.scrollIntoView}
          />
        )}

        {requireDrugWithClearance && (
          <Branch
            name="InvolvementWithClearance"
            label={i18n.t(
              'substance.drugs.involvement.heading.involvementWithClearance'
            )}
            labelSize="h4"
            className="involvement-with-clearance"
            {...this.props.InvolvementWithClearance}
            onError={this.props.onError}
            required={this.props.required}
            onUpdate={this.updateInvolvementWithClearance}
            scrollIntoView={this.props.scrollIntoView}
          />
        )}

        {requireDrugInFuture && (
          <span>
            <Branch
              name="InvolvementInFuture"
              label={i18n.t(
                'substance.drugs.involvement.heading.involvementInFuture'
              )}
              labelSize="h4"
              className="involvement-in-future no-margin-bottom"
              {...this.props.InvolvementInFuture}
              onError={this.props.onError}
              required={this.props.required}
              onUpdate={this.updateInvolvementInFuture}
              scrollIntoView={this.props.scrollIntoView}
            />

            <Show when={this.props.InvolvementInFuture.value === 'Yes'}>
              <Field
                title={i18n.t('substance.drugs.involvement.heading.explanation')}
                titleSize="label"
                scrollIntoView={this.props.scrollIntoView}
              >
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
          </span>
        )}
      </div>
    )
  }
}

DrugInvolvement.defaultProps = {
  InvolvementWhileEmployed: {},
  InvolvementWithClearance: {},
  InvolvementInFuture: {},
  onError: (value, arr) => arr,
}
