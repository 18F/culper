import React from 'react'

import i18n from 'util/i18n'

import {
  ValidationElement,
  Field,
  NotApplicable,
  DateControl,
  Text,
  Branch,
} from 'components/Form'

import InvestigatingAgency from './InvestigatingAgency'
import ClearanceLevel from './ClearanceLevel'

export default class HistoryItem extends ValidationElement {
  update = (queue) => {
    this.props.onUpdate({
      AgencyNotApplicable: this.props.AgencyNotApplicable,
      Agency: this.props.Agency,
      AgencyExplanation: this.props.AgencyExplanation,
      CompletedNotApplicable: this.props.CompletedNotApplicable,
      Completed: this.props.Completed,
      CompletedComments: this.props.CompletedComments,
      Issued: this.props.Issued,
      GrantedNotApplicable: this.props.GrantedNotApplicable,
      Granted: this.props.Granted,
      GrantedComments: this.props.GrantedComments,
      ClearanceLevelNotApplicable: this.props.ClearanceLevelNotApplicable,
      ClearanceLevel: this.props.ClearanceLevel,
      ClearanceGranted: this.props.ClearanceGranted,
      ...queue,
    })
  }

  updateAgencyNotApplicable = (values) => {
    this.update({
      AgencyNotApplicable: values,
      Agency: {},
      AgencyExplanation: {},
    })
  }

  updateAgency = (values) => {
    this.update({
      Agency: values.Agency,
      AgencyExplanation: values.Explanation,
    })
  }

  updateCompletedNotApplicable = (values) => {
    this.update({
      CompletedNotApplicable: values,
      Completed: {},
    })
  }

  updateCompleted = (values) => {
    this.update({
      Completed: values,
    })
  }

  updateIssued = (values) => {
    this.update({
      Issued: values,
    })
  }

  updateGrantedNotApplicable = (values) => {
    this.update({
      GrantedNotApplicable: values,
      Granted: {},
    })
  }

  updateGranted = (values) => {
    this.update({
      Granted: values,
    })
  }

  updateClearanceLevelNotApplicable = (values) => {
    this.update({
      ClearanceLevelNotApplicable: values,
      ClearanceLevel: {},
    })
  }

  updateClearanceLevel = (values) => {
    this.update({
      ClearanceLevel: values,
    })
  }

  updateClearanceGranted = (values) => {
    this.update({
      ClearanceGranted: values,
      Issued: {},
      Granted: {},
      ClearanceLevel: {},
    })
  }

  render() {
    const { requireLegalInvestigationClearanceGranted } = this.props

    return (
      <div>
        <Field
          title={i18n.t('legal.investigations.history.heading.agency')}
          adjustFor="big-buttons"
          scrollIntoView={this.props.scrollIntoView}
        >
          <NotApplicable
            name="AgencyNotApplicable"
            className="legal-investigations-history-agency-notapplicable"
            {...this.props.AgencyNotApplicable}
            onUpdate={this.updateAgencyNotApplicable}
            onError={this.props.onError}
            or={i18n.m('legal.investigations.history.para.or')}
            label={i18n.t('legal.investigations.history.label.idk')}
            required={this.props.required}
          >
            <InvestigatingAgency
              name="Agency"
              {...{
                Agency: this.props.Agency,
                Explanation: this.props.AgencyExplanation,
              }}
              onUpdate={this.updateAgency}
              onError={this.props.onError}
              className="legal-investigations-history-agency"
              required={
                this.props.required && this.props.AgencyNotApplicable.applicable
              }
              scrollIntoView={this.props.scrollIntoView}
            />
          </NotApplicable>
        </Field>

        <Field
          title={i18n.t('legal.investigations.history.heading.completed')}
          help="legal.investigations.history.help.completed"
          adjustFor="datecontrol"
          scrollIntoView={this.props.scrollIntoView}
        >
          <NotApplicable
            name="CompletedNotApplicable"
            className="legal-investigations-history-completed-notapplicable"
            {...this.props.CompletedNotApplicable}
            onUpdate={this.updateCompletedNotApplicable}
            onError={this.props.onError}
            or={i18n.m('legal.investigations.history.para.or')}
            label={i18n.t('legal.investigations.history.label.idk')}
            required={this.props.required}
          >
            <DateControl
              name="Completed"
              {...this.props.Completed}
              onUpdate={this.updateCompleted}
              onError={this.props.onError}
              minDateEqualTo={true}
              className="legal-investigations-history-completed"
              required={this.props.required}
            />
          </NotApplicable>
        </Field>

        {requireLegalInvestigationClearanceGranted && (
          <Branch
            label={i18n.t('legal.investigations.history.heading.wasClearanceGranted')}
            labelSize="h4"
            warning={true}
            onError={this.props.onError}
            required={this.props.required}
            onUpdate={this.updateClearanceGranted}
            scrollIntoView={this.props.scrollIntoView}
            {...this.props.ClearanceGranted}
          />
        )}

        {((
          requireLegalInvestigationClearanceGranted
          && this.props.ClearanceGranted
          && this.props.ClearanceGranted.value === 'Yes'
        ) || (
          !requireLegalInvestigationClearanceGranted
        )) && (
          <span>
            <Field
              title={i18n.t('legal.investigations.history.heading.issued')}
              adjustFor="text"
              optional={true}
              scrollIntoView={this.props.scrollIntoView}
            >
              <Text
                name="Issued"
                {...this.props.Issued}
                onUpdate={this.updateIssued}
                onError={this.props.onError}
                className="legal-investigations-history-issued"
              />
            </Field>

            <Field
              title={i18n.t('legal.investigations.history.heading.granted')}
              help="legal.investigations.history.help.granted"
              adjustFor="datecontrol"
              scrollIntoView={this.props.scrollIntoView}
            >
              <NotApplicable
                name="GrantedNotApplicable"
                className="legal-investigations-history-granted-notapplicable"
                {...this.props.GrantedNotApplicable}
                onUpdate={this.updateGrantedNotApplicable}
                onError={this.props.onError}
                or={i18n.m('legal.investigations.history.para.or')}
                label={i18n.t('legal.investigations.history.label.idk')}
                required={this.props.required}
              >
                <DateControl
                  name="Granted"
                  {...this.props.Granted}
                  onUpdate={this.updateGranted}
                  minDate={this.props.Completed}
                  minDateEqualTo={true}
                  onError={this.props.onError}
                  className="legal-investigations-history-granted"
                  required={this.props.required}
                />
              </NotApplicable>
            </Field>

            <Field
              title={i18n.t('legal.investigations.history.heading.clearance')}
              adjustFor="big-button"
              scrollIntoView={this.props.scrollIntoView}
            >
              <NotApplicable
                name="ClearanceLevelNotApplicable"
                className="legal-investigations-history-clearance-notapplicable"
                {...this.props.ClearanceLevelNotApplicable}
                onUpdate={this.updateClearanceLevelNotApplicable}
                onError={this.props.onError}
                or={i18n.m('legal.investigations.history.para.or')}
                label={i18n.t('legal.investigations.history.label.idk')}
                required={this.props.required}
              >
                <ClearanceLevel
                  name="ClearanceLevel"
                  {...this.props.ClearanceLevel}
                  onUpdate={this.updateClearanceLevel}
                  onError={this.props.onError}
                  className="legal-investigations-history-clearance"
                  required={this.props.required}
                  scrollIntoView={this.props.scrollIntoView}
                />
              </NotApplicable>
            </Field>
          </span>
        )}
      </div>
    )
  }
}

HistoryItem.defaultProps = {
  required: false,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  AgencyNotApplicable: { applicable: true },
  CompletedNotApplicable: { applicable: true },
  GrantedNotApplicable: { applicable: true },
  ClearanceLevelNotApplicable: { applicable: true },
  requireLegalInvestigationClearanceGranted: false,
}
