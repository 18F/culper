import React from 'react'
import { i18n } from '../../../../../config'
import { ValidationElement, Currency, Field, Text, DateControl, Textarea, Radio, Country, RadioGroup, Show, Checkbox, CheckboxGroup } from '../../../../Form'

export default class Benefit extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateInterestTypes = this.updateInterestTypes.bind(this)
    this.updateBenefitType = this.updateBenefitType.bind(this)
    this.updateBenefitFrequency = this.updateBenefitFrequency.bind(this)
    this.updateReceived = this.updateReceived.bind(this)
    this.updaateCountry = this.updateCountry.bind(this)
    this.updateValue = this.updateValue.bind(this)
  }

  update (field, values) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        InterestTypes: this.props.InterestTypes,
        BenefitType: this.props.BenefitType,
        BenefitFrequency: this.props.BenefitFrequency,
        Received: this.props.Received,
        Country: this.props.Country,
        Value: this.props.Value,
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

  updateBenefitType (values) {
    this.update('BenefitType', values)
  }

  updateBenefitFrequency (values) {
    this.update('BenefitFrequency', values)
  }

  updateReceived (values) {
    this.update('Received', values)
  }

  updateCountry (values) {
    this.update('Country', values)
  }

  updateValue (values) {
    this.update('Value', values)
  }

  render () {
    return (
      <div className="benefit">
        <Field title={i18n.t(`foreign.activities.benefit.heading.interestTypes`)}
          help={`foreign.activities.benefit.help.interestType`}
          adjustFor="big-buttons">

          <p>{i18n.t(`foreign.activities.benefit.para.checkAll`)}</p>
          <CheckboxGroup className="interest-types option-list"
            selectedValues={this.props.InterestTypes}>
            <Checkbox name="interest-type"
              label={i18n.t(`foreign.activities.benefit.label.interestTypes.yourself`)}
              value="Yourself"
              className="yourself"
              onChange={this.updateInterestTypes}
            />
            <Checkbox name="interest-type"
              label={i18n.t(`foreign.activities.benefit.label.interestTypes.spouse`)}
              value="Spouse"
              className="spouse"
              onChange={this.updateInterestTypes}
            />
            <Checkbox name="interest-type"
              label={i18n.t(`foreign.activities.benefit.label.interestTypes.cohabitant`)}
              value="Cohabitant"
              className="cohabitant"
              onChange={this.updateInterestTypes}
            />
            <Checkbox name="interest-type"
              label={i18n.t(`foreign.activities.benefit.label.interestTypes.dependentChildren`)}
              value="DependentChildren"
              className="dependent-children"
              onChange={this.updateInterestTypes}
            />
          </CheckboxGroup>
        </Field>

        <Field title={i18n.t(`foreign.activities.benefit.heading.benefitType`)}
          help={i18n.t(`foreign.activities.benefit.help.benefitType`)}>
          <RadioGroup className="option-list" selectedValue={this.props.BenefitType}>
            <Radio name="benefit_type"
              label={i18n.t(`foreign.activities.benefit.label.benefitTypes.educational`)}
              value="Educational"
              onChange={this.updateBenefitType}
              onValidate={this.props.onValidate}
            />
            <Radio name="benefit_type"
              label={i18n.t(`foreign.activities.benefit.label.benefitTypes.medical`)}
              value="Medical"
              onChange={this.updateBenefitType}
              onValidate={this.props.onValidate}
            />
            <Radio name="benefit_type"
              label={i18n.t(`foreign.activities.benefit.label.benefitTypes.retirement`)}
              value="Retirement"
              onChange={this.updateBenefitType}
              onValidate={this.props.onValidate}
            />
            <Radio name="benefit_type"
              label={i18n.t(`foreign.activities.benefit.label.benefitTypes.other`)}
              value="Other"
              onChange={this.updateBenefitType}
              onValidate={this.props.onValidate}
            />
          </RadioGroup>
        </Field>

        <Field title={i18n.t(`foreign.activities.benefit.heading.benefitFrequency`)}
          help={i18n.t(`foreign.activities.benefit.help.benefitFrequency`)}>
          <RadioGroup className="option-list" selectedValue={this.props.BenefitFrequency}>
            <Radio name="benefit_frequency"
              label={i18n.t(`foreign.activities.benefit.label.benefitFrequency.oneTime`)}
              value="OneTime"
              onChange={this.updateBenefitFrequency}
              onValidate={this.props.onValidate}
            />
            <Radio name="benefit_frequency"
              label={i18n.t(`foreign.activities.benefit.label.benefitFrequency.future`)}
              value="Future"
              onChange={this.updateBenefitFrequency}
              onValidate={this.props.onValidate}
            />
            <Radio name="benefit_frequency"
              label={i18n.t(`foreign.activities.benefit.label.benefitFrequency.continuing`)}
              value="Continuing"
              onChange={this.updateBenefitFrequency}
              onValidate={this.props.onValidate}
            />
            <Radio name="benefit_frequency"
              label={i18n.t(`foreign.activities.benefit.label.benefitFrequency.other`)}
              value="Other"
              onChange={this.updateBenefitFrequency}
              onValidate={this.props.onValidate}
            />
          </RadioGroup>
        </Field>

        <Show when={this.props.BenefitFrequency === 'OneTime'}>
          <div>
            <Field title={i18n.t(`foreign.activities.benefit.heading.received`)}
              help={`foreign.activities.benefit.help.received`}
              adjustFor="labels">
              <DateControl name="Received"
                className="received"
                {...this.props.Received}
                label={i18n.t(`foreign.activities.benefit.label.received`)}
                hideDay={true}
                prefix={this.props.prefix}
                onUpdate={this.updateReceived}
                onValidate={this.props.onValidate}
              />
            </Field>

            <Field title={i18n.t(`foreign.activities.benefit.heading.country`)}
              help={`foreign.activities.benefit.help.country`}>
              <Country name="Country"
                {...this.props.Country}
                onUpdate={this.updateCountry}
                onValidate={this.props.onValidate}
              />
            </Field>

            <Field title={i18n.t(`foreign.activities.benefit.heading.value`)}
              help={`foreign.activities.benefit.help.value`}>
              <Currency name="Value"
                className="value"
                {...this.props.Value}
                onUpdate={this.updateValue}
                onValidate={this.props.onValidate}
              />
            </Field>
          </div>
        </Show>
      </div>
    )
  }
}

Benefit.defaultProps = {
}
