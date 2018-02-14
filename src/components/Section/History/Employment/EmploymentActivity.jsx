import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Textarea, Field, Radio, RadioGroup, Show } from '../../../Form'

export default class EmploymentActivity extends ValidationElement {
  constructor (props) {
    super(props)
    this.updateActivity = this.updateActivity.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      value: this.props.value,
      otherExplanation: this.props.otherExplanation,
      ...queue
    })
  }

  updateActivity (values) {
    this.update({
      value: values.value,
      otherExplanation: ''
    })
  }

  updateExplanation (values) {
    this.update({
      otherExplanation: values.value
    })
  }

  render () {
    return (
      <div className="employment-activity">
        <div className={this.props.className}>
          <Field title={i18n.t(`history.employment.default.heading.activity`)}
                 titleSize="h3"
                 help="history.employment.default.activity.help"
                 className={this.props.value === 'Other' ? 'no-margin-bottom' : ''}
                 adjustFor="p"
                 scrollIntoView={this.props.scrollIntoView}>
            <RadioGroup name="employment_activity"
                        className="option-list"
                        required={this.props.required}
                        onError={this.props.onError}
                        selectedValue={this.props.value}>
              <div>{i18n.t('history.employment.default.activity.title')}</div>
              <Radio
                label={i18n.t('history.employment.default.activity.type.activeMilitary')}
                value="ActiveMilitary"
                className="employment-activity-active"
                disabled={this.props.disabled}
                onUpdate={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
              <Radio
                label={i18n.t('history.employment.default.activity.type.nationalGuard')}
                value="NationalGuard"
                className="employment-activity-national"
                disabled={this.props.disabled}
                onUpdate={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
              <Radio
                label={i18n.t('history.employment.default.activity.type.usphs')}
                value="USPHS"
                className="employment-activity-usphs"
                disabled={this.props.disabled}
                onUpdate={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
              <Radio
                label={i18n.t('history.employment.default.activity.type.otherFederal')}
                value="OtherFederal"
                className="employment-activity-other-federal"
                disabled={this.props.disabled}
                onUpdate={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
              <Radio
                label={i18n.t('history.employment.default.activity.type.stateGovernment')}
                value="StateGovernment"
                className="employment-activity-state-government"
                disabled={this.props.disabled}
                onUpdate={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
              <Radio
                label={i18n.t('history.employment.default.activity.type.federalContractor')}
                value="FederalContractor"
                className="employment-activity-federal-contractor"
                disabled={this.props.disabled}
                onUpdate={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
              <div>Other employment</div>
              <Radio
                label={i18n.t('history.employment.default.activity.type.nonGovernment')}
                value="NonGovernment"
                className="employment-activity-nongovernment"
                disabled={this.props.disabled}
                onUpdate={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
              <Radio
                label={i18n.t('history.employment.default.activity.type.selfEmployment')}
                value="SelfEmployment"
                className="employment-activity-self"
                disabled={this.props.disabled}
                onUpdate={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
              <Radio
                label={i18n.t('history.employment.default.activity.type.unemployment')}
                value="Unemployment"
                className="employment-activity-unemployment"
                disabled={this.props.disabled}
                onUpdate={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
              <Radio
                label={i18n.t('history.employment.default.activity.type.other')}
                value="Other"
                className="employment-activity-other"
                disabled={this.props.disabled}
                onUpdate={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
            </RadioGroup>
          </Field>
          <Show when={this.props.value === 'Other'}>
            <Field title={i18n.t('history.employment.default.activity.other.label')}
                   titleSize="label"
                   adjustFor="labels"
                   scrollIntoView={this.props.scrollIntoView}>
              <Textarea name="otherExplanation"
                        className="other"
                        value={this.props.otherExplanation}
                        onUpdate={this.updateExplanation}
                        onError={this.props.onError}
                        required={this.props.required}
                        />
            </Field>
          </Show>
        </div>
      </div>
    )
  }
}

EmploymentActivity.defaultProps = {
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
