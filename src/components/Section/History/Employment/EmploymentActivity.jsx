import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Textarea, Field, Radio, RadioGroup, Show } from '../../../Form'

export default class EmploymentActivity extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value,
      otherExplanation: props.otherExplanation
    }

    this.updateActivity = this.updateActivity.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
  }

  updateActivity (event) {
    this.setState({ value: event.target.value, otherExplanation: '' }, () => {
      this.onUpdate(event)
    })
  }

  updateExplanation (event) {
    this.setState({ otherExplanation: event.target.value }, () => {
      this.onUpdate(event)
    })
  }

  onUpdate (event) {
    super.handleChange(event)
    if (this.props.onUpdate) {
      this.props.onUpdate({
        name: this.props.name,
        value: this.state.value,
        otherExplanation: this.state.otherExplanation
      })
    }
  }

  render () {
    return (
      <div className="employment-activity">
        <div className={this.props.className}>
          <Field title={i18n.t(`history.employment.default.heading.activity`)}
                 titleSize="h3"
                 help="history.employment.default.activity.help"
                 className={this.state.value === 'Other' ? 'no-margin-bottom' : ''}
                 adjustFor="p"
                 scrollIntoView={this.props.scrollIntoView}>
            <RadioGroup name="employment_activity"
                        className="option-list"
                        required={this.props.required}
                        onError={this.props.onError}
                        selectedValue={this.state.value}>
              <div>{i18n.t('history.employment.default.activity.title')}</div>
              <Radio
                label={i18n.t('history.employment.default.activity.type.activeMilitary')}
                value="ActiveMilitary"
                className="employment-activity-active"
                disabled={this.props.disabled}
                onChange={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
              <Radio
                label={i18n.t('history.employment.default.activity.type.nationalGuard')}
                value="NationalGuard"
                className="employment-activity-national"
                disabled={this.props.disabled}
                onChange={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
              <Radio
                label={i18n.t('history.employment.default.activity.type.usphs')}
                value="USPHS"
                className="employment-activity-usphs"
                disabled={this.props.disabled}
                onChange={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
              <Radio
                label={i18n.t('history.employment.default.activity.type.otherFederal')}
                value="OtherFederal"
                className="employment-activity-other-federal"
                disabled={this.props.disabled}
                onChange={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
              <Radio
                label={i18n.t('history.employment.default.activity.type.stateGovernment')}
                value="StateGovernment"
                className="employment-activity-state-government"
                disabled={this.props.disabled}
                onChange={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
              <Radio
                label={i18n.t('history.employment.default.activity.type.federalContractor')}
                value="FederalContractor"
                className="employment-activity-federal-contractor"
                disabled={this.props.disabled}
                onChange={this.updateActivity}
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
                onChange={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
              <Radio
                label={i18n.t('history.employment.default.activity.type.selfEmployment')}
                value="SelfEmployment"
                className="employment-activity-self"
                disabled={this.props.disabled}
                onChange={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
              <Radio
                label={i18n.t('history.employment.default.activity.type.unemployment')}
                value="Unemployment"
                className="employment-activity-unemployment"
                disabled={this.props.disabled}
                onChange={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
              <Radio
                label={i18n.t('history.employment.default.activity.type.other')}
                value="Other"
                className="employment-activity-other"
                disabled={this.props.disabled}
                onChange={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
            </RadioGroup>
          </Field>
          <Show when={this.state.value === 'Other'}>
            <Field title={i18n.t('history.employment.default.activity.other.label')}
                   titleSize="label"
                   help="history.employment.other.activity.other.help"
                   adjustFor="labels"
                   scrollIntoView={this.props.scrollIntoView}>
              <Textarea name="otherExplanation"
                        className="other"
                        value={this.state.otherExplanation}
                        onChange={this.updateExplanation}
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
  onError: (value, arr) => { return arr }
}
