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
          <Field help={`history.employment.default.activity.help`}
                 adjustFor="labels"
                 shrink={true}>
            <RadioGroup name="employment_activity"
                        className="option-list"
                        selectedValue={this.state.value}>
              <div>{i18n.t('history.employment.default.activity.title')}</div>
              <Radio
                label={i18n.t('history.employment.default.activity.type.activeMilitary')}
                value="ActiveMilitary"
                disabled={this.props.disabled}
                onChange={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
              <Radio
                label={i18n.t('history.employment.default.activity.type.nationalGuard')}
                value="NationalGuard"
                disabled={this.props.disabled}
                onChange={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
              <Radio
                label={i18n.t('history.employment.default.activity.type.usphs')}
                value="USPHS"
                disabled={this.props.disabled}
                onChange={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
              <Radio
                label={i18n.t('history.employment.default.activity.type.otherFederal')}
                value="OtherFederal"
                disabled={this.props.disabled}
                onChange={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
              <Radio
                label={i18n.t('history.employment.default.activity.type.stateGovernment')}
                value="StateGovernment"
                disabled={this.props.disabled}
                onChange={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
              <Radio
                label={i18n.t('history.employment.default.activity.type.federalContractor')}
                value="FederalContractor"
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
                disabled={this.props.disabled}
                onChange={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
              <Radio
                label={i18n.t('history.employment.default.activity.type.selfEmployment')}
                value="SelfEmployment"
                disabled={this.props.disabled}
                onChange={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
              <Radio
                label={i18n.t('history.employment.default.activity.type.unemployment')}
                value="Unemployment"
                disabled={this.props.disabled}
                onChange={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
              <Radio
                label={i18n.t('history.employment.default.activity.type.other')}
                value="Other"
                disabled={this.props.disabled}
                onChange={this.updateActivity}
                onError={this.props.onError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                />
            </RadioGroup>
          </Field>
          <Show when={this.state.value === 'Other'}>
            <Field help="history.employment.other.activity.other.help"
                   adjustFor="labels">
              <Textarea name="otherExplanation"
                        className="other"
                        value={this.state.otherExplanation}
                        label={i18n.t('history.employment.default.activity.other.label')}
                        onChange={this.updateExplanation}
                        onError={this.props.onError}
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
