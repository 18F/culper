import React from 'react'
import { i18n } from '../../../../../config'
import {
  ValidationElement,
  Field,
  Radio,
  RadioGroup,
  Show,
  Checkbox,
  CheckboxGroup,
  Textarea
} from '../../../../Form'
import OneTimeBenefit from './OneTimeBenefit'
import FutureBenefit from './FutureBenefit'
import ContinuingBenefit from './ContinuingBenefit'
import OtherBenefit from './OtherBenefit';

export default class Benefit extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateInterestTypes = this.updateInterestTypes.bind(this)
    this.updateBenefitType = this.updateBenefitType.bind(this)
    this.updateOtherBenefitType = this.updateOtherBenefitType.bind(this)
    this.updateBenefitFrequency = this.updateBenefitFrequency.bind(this)
    this.updateOneTimeBenefit = this.updateOneTimeBenefit.bind(this)
    this.updateFutureBenefit = this.updateFutureBenefit.bind(this)
    this.updateContinuingBenefit = this.updateContinuingBenefit.bind(this)
    this.updateOtherBenefit = this.updateOtherBenefit.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      InterestTypes: this.props.InterestTypes,
      BenefitType: this.props.BenefitType,
      OtherBenefitType: this.props.OtherBenefitType,
      BenefitFrequency: this.props.BenefitFrequency,
      OneTimeBenefit: this.props.OneTimeBenefit,
      FutureBenefit: this.props.FutureBenefit,
      ContinuingBenefit: this.props.ContinuingBenefit,
      OtherBenefit: this.props.OtherBenefit,
      ...queue
    })
  }

  updateInterestTypes(values) {
    let interestType = values.value
    let selected = [...((this.props.InterestTypes || {}).values || [])]
    if (selected.includes(interestType)) {
      selected.splice(selected.indexOf(interestType), 1)
    } else {
      selected.push(interestType)
    }

    this.update({
      InterestTypes: { values: selected }
    })
  }

  updateBenefitType(values) {
    this.update({
      BenefitType: values
    })
  }

  updateOtherBenefitType(values) {
    this.update({
      OtherBenefitType: values
    })
  }

  updateBenefitFrequency(values) {
    this.update({
      BenefitFrequency: values
    })
  }

  updateOneTimeBenefit(values) {
    this.update({
      OneTimeBenefit: values
    })
  }

  updateFutureBenefit(values) {
    this.update({
      FutureBenefit: values
    })
  }

  updateContinuingBenefit(values) {
    this.update({
      ContinuingBenefit: values
    })
  }

  updateOtherBenefit(values) {
    this.update({
      OtherBenefit: values
    })
  }

  render() {
    return (
      <div className="benefit">
        <Field
          title={i18n.t('foreign.activities.benefit.heading.interestTypes')}
          adjustFor="p"
          scrollIntoView={this.props.scrollIntoView}>
          <p>{i18n.t('foreign.activities.benefit.para.checkAll')}</p>
          <CheckboxGroup
            className="interest-types"
            onError={this.props.onError}
            required={this.props.required}
            selectedValues={(this.props.InterestTypes || {}).values}>
            <Checkbox
              name="interest-type"
              label={i18n.m(
                'foreign.activities.benefit.label.interestTypes.yourself'
              )}
              value="Yourself"
              className="yourself"
              onUpdate={this.updateInterestTypes}
              onError={this.props.onError}
            />
            <Checkbox
              name="interest-type"
              label={i18n.m(
                'foreign.activities.benefit.label.interestTypes.spouse'
              )}
              value="Spouse"
              className="spouse"
              onUpdate={this.updateInterestTypes}
              onError={this.props.onError}
            />
            <Checkbox
              name="interest-type"
              label={i18n.m(
                'foreign.activities.benefit.label.interestTypes.cohabitant'
              )}
              value="Cohabitant"
              className="cohabitant"
              onUpdate={this.updateInterestTypes}
              onError={this.props.onError}
            />
            <Checkbox
              name="interest-type"
              label={i18n.m(
                'foreign.activities.benefit.label.interestTypes.dependentChildren'
              )}
              value="DependentChildren"
              className="dependent-children"
              onUpdate={this.updateInterestTypes}
              onError={this.props.onError}
            />
          </CheckboxGroup>
        </Field>

        <Field
          title={i18n.t('foreign.activities.benefit.heading.benefitType')}
          adjustFor="big-buttons"
          scrollIntoView={this.props.scrollIntoView}>
          <RadioGroup
            className="benefit-types"
            onError={this.props.onError}
            required={this.props.required}
            selectedValue={(this.props.BenefitType || {}).value}>
            <Radio
              name="benefit_type"
              label={i18n.m(
                'foreign.activities.benefit.label.benefitTypes.educational'
              )}
              value="Educational"
              onUpdate={this.updateBenefitType}
              onError={this.props.onError}
            />
            <Radio
              name="benefit_type"
              label={i18n.m(
                'foreign.activities.benefit.label.benefitTypes.medical'
              )}
              value="Medical"
              onUpdate={this.updateBenefitType}
              onError={this.props.onError}
            />
            <Radio
              name="benefit_type"
              label={i18n.m(
                'foreign.activities.benefit.label.benefitTypes.retirement'
              )}
              value="Retirement"
              onUpdate={this.updateBenefitType}
              onError={this.props.onError}
            />
            <Radio
              name="benefit_type"
              label={i18n.m(
                'foreign.activities.benefit.label.benefitTypes.socialWelfare'
              )}
              value="SocialWelfare"
              onUpdate={this.updateBenefitType}
              onError={this.props.onError}
            />
            <Radio
              name="benefit_type"
              label={i18n.m(
                'foreign.activities.benefit.label.benefitTypes.other'
              )}
              value="Other"
              className="benefit-other"
              onUpdate={this.updateBenefitType}
              onError={this.props.onError}
            />
          </RadioGroup>
          <Show when={(this.props.BenefitType || {}).value === 'Other'}>
            <div>
              {i18n.m('foreign.activities.benefit.label.otherBenefitType')}
              <Textarea
                name="OtherBenefitType"
                {...this.props.OtherBenefitType}
                onUpdate={this.updateOtherBenefitType}
                onError={this.props.onError}
                required={this.props.required}
              />
            </div>
          </Show>
        </Field>

        <Field
          title={i18n.t('foreign.activities.benefit.heading.benefitFrequency')}
          adjustFor="big-buttons"
          scrollIntoView={this.props.scrollIntoView}>
          <RadioGroup
            className="benefit-frequency"
            onError={this.props.onError}
            required={this.props.required}
            selectedValue={(this.props.BenefitFrequency || {}).value}>
            <Radio
              name="benefit_frequency"
              label={i18n.m(
                'foreign.activities.benefit.label.benefitFrequency.oneTime'
              )}
              value="OneTime"
              onUpdate={this.updateBenefitFrequency}
              onError={this.props.onError}
            />
            <Radio
              name="benefit_frequency"
              label={i18n.m(
                'foreign.activities.benefit.label.benefitFrequency.future'
              )}
              value="Future"
              onUpdate={this.updateBenefitFrequency}
              onError={this.props.onError}
            />
            <Radio
              name="benefit_frequency"
              label={i18n.m(
                'foreign.activities.benefit.label.benefitFrequency.continuing'
              )}
              value="Continuing"
              onUpdate={this.updateBenefitFrequency}
              onError={this.props.onError}
            />
            <Radio
              name="benefit_frequency"
              label={i18n.m(
                'foreign.activities.benefit.label.benefitFrequency.other'
              )}
              value="Other"
              onUpdate={this.updateBenefitFrequency}
              onError={this.props.onError}
            />
          </RadioGroup>
        </Field>

        <Show when={(this.props.BenefitFrequency || {}).value === 'OneTime'}>
          <OneTimeBenefit
            name="OneTimeBenefit"
            {...this.props.OneTimeBenefit}
            onUpdate={this.updateOneTimeBenefit}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Show>

        <Show when={(this.props.BenefitFrequency || {}).value === 'Future'}>
          <FutureBenefit
            name="FutureBenefit"
            {...this.props.FutureBenefit}
            onUpdate={this.updateFutureBenefit}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Show>

        <Show when={(this.props.BenefitFrequency || {}).value === 'Continuing'}>
          <ContinuingBenefit
            name="ContinuingBenefit"
            {...this.props.ContinuingBenefit}
            onUpdate={this.updateContinuingBenefit}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Show>

        <Show when={(this.props.BenefitFrequency || {}).value === 'Other'}>
          <OtherBenefit
            name="OtherBenefit"
            otherBenefit={this.props.OtherBenefit}
            onUpdate={this.updateOtherBenefit}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Show>
      </div>
    )
  }
}

Benefit.defaultProps = {
  InterestTypes: {},
  BenefitType: {},
  BenefitFrequency: {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
