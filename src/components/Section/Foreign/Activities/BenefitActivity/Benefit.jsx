import React from 'react'
import { i18n } from '../../../../../config'
import { ValidationElement, Currency, Field, Text, DateControl, Textarea, Radio, Country, RadioGroup, Show, Checkbox, CheckboxGroup } from '../../../../Form'
import OneTimeBenefit from './OneTimeBenefit'
import FutureBenefit from './FutureBenefit'
import ContinuingBenefit from './ContinuingBenefit'

export default class Benefit extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateInterestTypes = this.updateInterestTypes.bind(this)
    this.updateBenefitType = this.updateBenefitType.bind(this)
    this.updateBenefitFrequency = this.updateBenefitFrequency.bind(this)
    this.updateOneTimeBenefit = this.updateOneTimeBenefit.bind(this)
    this.updateFutureBenefit = this.updateFutureBenefit.bind(this)
    this.updateContinuingBenefit = this.updateContinuingBenefit.bind(this)
  }

  update (field, values) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        InterestTypes: this.props.InterestTypes,
        BenefitType: this.props.BenefitType,
        BenefitFrequency: this.props.BenefitFrequency,
        OneTimeBenefit: this.props.OneTimeBenefit,
        FutureBenefit: this.props.FutureBenefit,
        ContinuingBenefit: this.props.ContinuingBenefit,
        [field]: values
      })
    }
  }

  updateInterestTypes (event) {
    let interestType = event.target.value
    let selected = [...(this.props.InterestTypes || [])]
    if (selected.includes(interestType)) {
      selected.splice(selected.indexOf(interestType), 1)
    } else {
      selected.push(interestType)
    }

    this.update('InterestTypes', selected)
  }

  updateBenefitType (cb) {
    this.update('BenefitType', cb.target.value)
  }

  updateBenefitFrequency (cb) {
    this.update('BenefitFrequency', cb.target.value)
  }

  updateOneTimeBenefit (values) {
    this.update('OneTimeBenefit', values)
  }

  updateFutureBenefit (values) {
    this.update('FutureBenefit', values)
  }

  updateContinuingBenefit (values) {
    this.update('ContinuingBenefit', values)
  }

  render () {
    return (
      <div className="benefit">
        <Field title={i18n.t('foreign.activities.benefit.heading.interestTypes')}
          help={'foreign.activities.benefit.help.interestType'}
          adjustFor="big-buttons">

          <p>{i18n.t('foreign.activities.benefit.para.checkAll')}</p>
          <CheckboxGroup className="interest-types option-list"
            selectedValues={this.props.InterestTypes}>
            <Checkbox name="interest-type"
              label={i18n.t('foreign.activities.benefit.label.interestTypes.yourself')}
              value="Yourself"
              className="yourself"
              onChange={this.updateInterestTypes}
            />
            <Checkbox name="interest-type"
              label={i18n.t('foreign.activities.benefit.label.interestTypes.spouse')}
              value="Spouse"
              className="spouse"
              onChange={this.updateInterestTypes}
            />
            <Checkbox name="interest-type"
              label={i18n.t('foreign.activities.benefit.label.interestTypes.cohabitant')}
              value="Cohabitant"
              className="cohabitant"
              onChange={this.updateInterestTypes}
            />
            <Checkbox name="interest-type"
              label={i18n.t('foreign.activities.benefit.label.interestTypes.dependentChildren')}
              value="DependentChildren"
              className="dependent-children"
              onChange={this.updateInterestTypes}
            />
          </CheckboxGroup>
        </Field>

        <Field title={i18n.t('foreign.activities.benefit.heading.benefitType')}
          help={i18n.t('foreign.activities.benefit.help.benefitType')}>
          <RadioGroup className="option-list" selectedValue={this.props.BenefitType}>
            <Radio name="benefit_type"
              label={i18n.t('foreign.activities.benefit.label.benefitTypes.educational')}
              value="Educational"
              onChange={this.updateBenefitType}
              onValidate={this.props.onValidate}
            />
            <Radio name="benefit_type"
              label={i18n.t('foreign.activities.benefit.label.benefitTypes.medical')}
              value="Medical"
              onChange={this.updateBenefitType}
              onValidate={this.props.onValidate}
            />
            <Radio name="benefit_type"
              label={i18n.t('foreign.activities.benefit.label.benefitTypes.retirement')}
              value="Retirement"
              onChange={this.updateBenefitType}
              onValidate={this.props.onValidate}
            />
            <Radio name="benefit_type"
              label={i18n.t('foreign.activities.benefit.label.benefitTypes.other')}
              value="Other"
              onChange={this.updateBenefitType}
              onValidate={this.props.onValidate}
            />
          </RadioGroup>
        </Field>

        <Field title={i18n.t('foreign.activities.benefit.heading.benefitFrequency')}
          help={i18n.t('foreign.activities.benefit.help.benefitFrequency')}>
          <RadioGroup className="option-list" selectedValue={this.props.BenefitFrequency}>
            <Radio name="benefit_frequency"
              label={i18n.t('foreign.activities.benefit.label.benefitFrequency.oneTime')}
              value="OneTime"
              onChange={this.updateBenefitFrequency}
              onValidate={this.props.onValidate}
            />
            <Radio name="benefit_frequency"
              label={i18n.t('foreign.activities.benefit.label.benefitFrequency.future')}
              value="Future"
              onChange={this.updateBenefitFrequency}
              onValidate={this.props.onValidate}
            />
            <Radio name="benefit_frequency"
              label={i18n.t('foreign.activities.benefit.label.benefitFrequency.continuing')}
              value="Continuing"
              onChange={this.updateBenefitFrequency}
              onValidate={this.props.onValidate}
            />
            <Radio name="benefit_frequency"
              label={i18n.t('foreign.activities.benefit.label.benefitFrequency.other')}
              value="Other"
              onChange={this.updateBenefitFrequency}
              onValidate={this.props.onValidate}
            />
          </RadioGroup>
        </Field>

        <Show when={this.props.BenefitFrequency === 'OneTime'}>
          <OneTimeBenefit name="OneTimeBenefit"
            {...this.props.OneTimeBenefit}
            onUpdate={this.updateOneTimeBenefit}
            onValidate={this.props.onValidate}
          />
        </Show>

        <Show when={this.props.BenefitFrequency === 'Future'}>
          <FutureBenefit name="FutureBenefit"
            {...this.props.FutureBenefit}
            onUpdate={this.updateFutureBenefit}
            onValidate={this.props.onValidate}
          />
        </Show>

        <Show when={this.props.BenefitFrequency === 'Continuing'}>
          <ContinuingBenefit name="ContinuingBenefit"
            {...this.props.ContinuingBenefit}
            onUpdate={this.updateContinuingBenefit}
            onValidate={this.props.onValidate}
          />
        </Show>
      </div>
    )
  }
}

Benefit.defaultProps = {
}
