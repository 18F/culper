import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Field, NotApplicable, DateControl, Text } from '../../../Form'
import InvestigatingAgency from './InvestigatingAgency'
import ClearanceLevel from './ClearanceLevel'

export default class HistoryItem extends ValidationElement {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateAgencyNotApplicable = this.updateAgencyNotApplicable.bind(this)
    this.updateAgency = this.updateAgency.bind(this)
    this.updateCompletedNotApplicable = this.updateCompletedNotApplicable.bind(this)
    this.updateCompleted = this.updateCompleted.bind(this)
    this.updateCompletedComments = this.updateCompletedComments.bind(this)
    this.updateIssued = this.updateIssued.bind(this)
    this.updateGrantedNotApplicable = this.updateGrantedNotApplicable.bind(this)
    this.updateGranted = this.updateGranted.bind(this)
    this.updateGrantedComments = this.updateGrantedComments.bind(this)
    this.updateClearanceNotApplicable = this.updateClearanceNotApplicable.bind(this)
    this.updateClearance = this.updateClearance.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      AgencyNotApplicable: this.props.AgencyNotApplicable,
      Agency: this.props.Agency,
      CompletedNotApplicable: this.props.CompletedNotApplicable,
      Completed: this.props.Completed,
      CompletedComments: this.props.CompletedComments,
      Issued: this.props.Issued,
      GrantedNotApplicable: this.props.GrantedNotApplicable,
      Granted: this.props.Granted,
      GrantedComments: this.props.GrantedComments,
      ClearanceNotApplicable: this.props.ClearanceNotApplicable,
      Clearance: this.props.Clearance,
      ...queue
    })
  }

  updateAgencyNotApplicable (values) {
    this.update({
      AgencyNotApplicable: values,
      Agency: null
    })
  }

  updateAgency (values) {
    this.update({
      Agency: values
    })
  }

  updateCompletedNotApplicable (values) {
    this.update({
      CompletedNotApplicable: values,
      Completed: null
    })
  }

  updateCompleted (values) {
    this.update({
      Completed: values
    })
  }

  updateCompletedComments (values) {
    this.update({
      CompletedComments: values
    })
  }

  updateIssued (values) {
    this.update({
      Issued: values
    })
  }

  updateGrantedNotApplicable (values) {
    this.update({
      GrantedNotApplicable: values,
      Granted: null
    })
  }

  updateGranted (values) {
    this.update({
      Granted: values
    })
  }

  updateGrantedComments (values) {
    this.update({
      GrantedComments: values
    })
  }

  updateClearanceNotApplicable (values) {
    this.update({
      ClearanceNotApplicable: values,
      Clearance: null
    })
  }

  updateClearance (values) {
    this.update({
      Clearance: values
    })
  }

  render () {
    return (
      <div>
        <Field title={i18n.t('legal.investigations.history.heading.agency')}
               adjustFor="big-buttons"
               scrollIntoView={this.props.scrollIntoView}>
          <NotApplicable name="AgencyNotApplicable"
                         className="legal-investigations-history-agency-notapplicable"
                         {...this.props.AgencyNotApplicable}
                         onUpdate={this.updateAgencyNotApplicable}
                         onError={this.props.onError}
                         or={i18n.m('legal.investigations.history.para.or')}
                         label={i18n.t('legal.investigations.history.label.idk')}
                         required={this.props.required}>
            <InvestigatingAgency name="Agency"
                                 {...this.props.Agency}
                                 onUpdate={this.updateAgency}
                                 onError={this.props.onError}
                                 className="legal-investigations-history-agency"
                                 required={this.props.required && this.props.AgencyNotApplicable.applicable}
                                 scrollIntoView={this.props.scrollIntoView}
                                 />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('legal.investigations.history.heading.completed')}
               help="legal.investigations.history.help.completed"
               adjustFor="datecontrol"
               comments={true}
               commentsName="CompletedComments"
               commentsValue={this.props.CompletedComments}
               onUpdate={this.updateCompletedComments}
               scrollIntoView={this.props.scrollIntoView}>
          <NotApplicable name="CompletedNotApplicable"
                         className="legal-investigations-history-completed-notapplicable"
                         {...this.props.CompletedNotApplicable}
                         onUpdate={this.updateCompletedNotApplicable}
                         onError={this.props.onError}
                         or={i18n.m('legal.investigations.history.para.or')}
                         label={i18n.t('legal.investigations.history.label.idk')}
                         required={this.props.required}>
            <DateControl name="Completed"
                         {...this.props.Completed}
                         onUpdate={this.updateCompleted}
                         onError={this.props.onError}
                         className="legal-investigations-history-completed"
                         required={this.props.required}
                         />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('legal.investigations.history.heading.issued')}
               adjustFor="text"
               scrollIntoView={this.props.scrollIntoView}>
          <Text name="Issued"
                {...this.props.Issued}
                onUpdate={this.updateIssued}
                onError={this.props.onError}
                className="legal-investigations-history-issued"
                required={this.props.required}
                />
        </Field>

        <Field title={i18n.t('legal.investigations.history.heading.granted')}
               help="legal.investigations.history.help.granted"
               comments={true}
               commentsName="GrantedComments"
               commentsValue={this.props.GrantedComments}
               onUpdate={this.updateGrantedComments}
               adjustFor="datecontrol"
               scrollIntoView={this.props.scrollIntoView}>
          <NotApplicable name="GrantedNotApplicable"
                         className="legal-investigations-history-granted-notapplicable"
                         {...this.props.GrantedNotApplicable}
                         onUpdate={this.updateGrantedNotApplicable}
                         onError={this.props.onError}
                         or={i18n.m('legal.investigations.history.para.or')}
                         label={i18n.t('legal.investigations.history.label.idk')}
                         required={this.props.required}>
            <DateControl name="Granted"
                         {...this.props.Granted}
                         onUpdate={this.updateGranted}
                         onError={this.props.onError}
                         className="legal-investigations-history-granted"
                         required={this.props.required}
                         />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('legal.investigations.history.heading.clearance')}
               adjustFor="big-button"
               scrollIntoView={this.props.scrollIntoView}>
          <NotApplicable name="ClearanceNotApplicable"
                         className="legal-investigations-history-clearance-notapplicable"
                         {...this.props.ClearanceNotApplicable}
                         onUpdate={this.updateClearanceNotApplicable}
                         onError={this.props.onError}
                         or={i18n.m('legal.investigations.history.para.or')}
                         label={i18n.t('legal.investigations.history.label.idk')}
                         required={this.props.required}>
            <ClearanceLevel name="Clearance"
                            {...this.props.Clearance}
                            onUpdate={this.updateClearance}
                            onError={this.props.onError}
                            className="legal-investigations-history-clearance"
                            required={this.props.required}
                            scrollIntoView={this.props.scrollIntoView}
                            />
          </NotApplicable>
        </Field>
      </div>
    )
  }
}

HistoryItem.defaultProps = {
  required: false,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  AgencyNotApplicable: { applicable: true },
  CompletedNotApplicable: { applicable: true },
  GrantedNotApplicable: { applicable: true },
  ClearanceNotApplicable: { applicable: true }
}
