import React from 'react'
import { i18n } from '../../../../../config'
import { ValidationElement, Currency, Field, Text, DateControl, Textarea, NotApplicable, Checkbox, CheckboxGroup } from '../../../../Form'
import CoOwners from '../CoOwners'

export default class IndirectInterest extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateInterestTypes = this.updateInterestTypes.bind(this)
    this.updateInterestType = this.updateInterestType.bind(this)
    this.updateFirstname = this.updateFirstname.bind(this)
    this.updateLastname = this.updateLastname.bind(this)
    this.updateRelationship = this.updateRelationship.bind(this)
    this.updateAcquired = this.updateAcquired.bind(this)
    this.updateHowAcquired = this.updateHowAcquired.bind(this)
    this.updateCost = this.updateCost.bind(this)
    this.updateCostEstimated = this.updateCostEstimated.bind(this)
    this.updateValue = this.updateValue.bind(this)
    this.updateValueEstimated = this.updateValueEstimated.bind(this)
    this.updateSold = this.updateSold.bind(this)
    this.updateSoldNotApplicable = this.updateSoldNotApplicable.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
    this.updateCoOwners = this.updateCoOwners.bind(this)
  }

  update (field, values) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        InterestTypes: this.props.InterestTypes,
        InterestType: this.props.InterestType,
        Firstname: this.props.Firstname,
        Lastname: this.props.Lastname,
        Acquired: this.props.Acquired,
        Relationship: this.props.Relationship,
        HowAcquired: this.props.HowAcquired,
        Cost: this.props.Cost,
        CostEstimated: this.props.CostEstimated,
        Value: this.props.Value,
        ValueEstimated: this.props.ValueEstimated,
        Sold: this.props.Sold,
        SoldNotApplicable: this.props.SoldNotApplicable,
        Explanation: this.props.Explanation,
        CoOwners: this.props.CoOwners,
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

  updateInterestType (values) {
    this.update('InterestType', values)
  }

  updateFirstname (values) {
    this.update('Firstname', values)
  }

  updateLastname (values) {
    this.update('Lastname', values)
  }

  updateRelationship (values) {
    this.update('Relationship', values)
  }

  updateAcquired (values) {
    this.update('Acquired', values)
  }

  updateHowAcquired (values) {
    this.update('HowAcquired', values)
  }

  updateCost (values) {
    this.update('Cost', values)
  }

  updateCostEstimated (cb) {
    this.update('CostEstimated', cb.checked)
  }

  updateValue (values) {
    this.update('Value', values)
  }

  updateValueEstimated (cb) {
    this.update('ValueEstimated', cb.checked)
  }

  updateSold (values) {
    this.update('Sold', values)
  }

  updateSoldNotApplicable (values) {
    this.update('SoldNotApplicable', values)
  }

  updateExplanation (values) {
    this.update('Explanation', values)
  }

  updateCoOwners (values) {
    this.update('CoOwners', values)
  }

  render () {
    const prefix = this.props.prefix
    return (
      <div className="interest">
        <Field title={i18n.t(`foreign.activities.indirect.interest.heading.interestTypes`)}
          help={`foreign.activities.indirect.interest.help.interestType`}
          adjustFor="p">

          <p>{i18n.t(`foreign.activities.indirect.interest.para.checkAll`)}</p>
          <CheckboxGroup className="interest-types option-list"
            selectedValues={this.props.InterestTypes}>
            <Checkbox name="interest-type"
              label={i18n.m(`foreign.activities.indirect.interest.label.interestTypes.yourself`)}
              value="Yourself"
              className="yourself"
              onValidate={this.props.onValidate}
              onChange={this.updateInterestTypes}
            />
            <Checkbox name="interest-type"
              label={i18n.m(`foreign.activities.indirect.interest.label.interestTypes.spouse`)}
              value="Spouse"
              className="spouse"
              onValidate={this.props.onValidate}
              onChange={this.updateInterestTypes}
            />
            <Checkbox name="interest-type"
              label={i18n.m(`foreign.activities.indirect.interest.label.interestTypes.cohabitant`)}
              value="Cohabitant"
              className="cohabitant"
              onValidate={this.props.onValidate}
              onChange={this.updateInterestTypes}
            />
            <Checkbox name="interest-type"
              label={i18n.m(`foreign.activities.indirect.interest.label.interestTypes.dependentChildren`)}
              value="DependentChildren"
              className="dependent-children"
              onValidate={this.props.onValidate}
              onChange={this.updateInterestTypes}
            />
          </CheckboxGroup>
        </Field>

        <Field title={i18n.t(`foreign.activities.indirect.interest.heading.interestType`)}
          help={`foreign.activities.indirect.interest.help.interestType`}
          shrink={true}>
          <Text name="InterestType"
            className="interest-type"
            {...this.props.InterestType}
            onUpdate={this.updateInterestType}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t(`foreign.activities.indirect.interest.heading.name`)}
          help={`foreign.activities.indirect.interest.help.name`}>
          <Text name="Firstname"
            label={i18n.t(`foreign.activities.indirect.interest.label.firstname`)}
            {...this.props.Firstname}
            onUpdate={this.updateFirstname}
            onValidate={this.props.onValidate}
          />
          <Text name="Lastname"
            label={i18n.t(`foreign.activities.indirect.interest.label.lastname`)}
            {...this.props.Lastname}
            onUpdate={this.updateLastname}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t(`foreign.activities.indirect.interest.heading.relationship`)}
          help={`foreign.activities.indirect.interest.help.relationship`}>
          <Textarea name="Relationship"
            {...this.props.Relationship}
            onUpdate={this.updateRelationship}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t(`foreign.activities.indirect.interest.heading.acquired`)}
          help={`foreign.activities.indirect.interest.help.acquired`}
          adjustFor="labels"
          shrink={true}>
          <DateControl name="Acquired"
            className="acquired"
            {...this.props.Acquired}
            label={i18n.t(`foreign.activities.indirect.interest.label.acquired`)}
            onUpdate={this.updateAcquired}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t(`foreign.activities.indirect.interest.heading.cost`)}
          help={`foreign.activities.indirect.interest.help.cost`}>
          <Currency name="Cost"
            className="cost"
            {...this.props.Cost}
            onUpdate={this.updateCost}
            min="0"
            onValidate={this.props.onValidate}
          />
          <div className="flags">
            <Checkbox name="CostEstimated"
              label={i18n.t('foreign.activities.indirect.interest.label.costEstimated')}
              toggle="false"
              checked={this.props.CostEstimated}
              onUpdate={this.updateCostEstimated}
            />
          </div>
        </Field>

        <Field title={i18n.t(`foreign.activities.indirect.interest.heading.howAcquired`)}
               help={`foreign.activities.indirect.interest.help.howAcquired`}
               adjustf="p">
          <p>{i18n.t(`foreign.activities.indirect.interest.para.howAcquired`)}</p>
          <Textarea name="HowAcquired"
            className="how-acquired"
            {...this.props.HowAcquired}
            onUpdate={this.updateHowAcquired}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t(`foreign.activities.indirect.interest.heading.value`)}
          help={`foreign.activities.indirect.interest.help.value`}>
          <Currency name="Value"
            className="value"
            {...this.props.Value}
            onUpdate={this.updateValue}
            min="0"
            onValidate={this.props.onValidate}
          />
          <div className="flags">
            <Checkbox name="ValueEstimated"
              label={i18n.t('foreign.activities.indirect.interest.label.valueEstimated')}
              toggle="false"
              checked={this.props.ValueEstimated}
              onUpdate={this.updateValueEstimated}
            />
          </div>
        </Field>

        <Field title={i18n.t(`foreign.activities.indirect.interest.heading.sold`)}
          help={`foreign.activities.indirect.interest.help.sold`}
          adjustFor="labels"
          shrink={true}>
          <NotApplicable name="SoldNotApplicable"
            {...this.props.SoldNotApplicable}
            label={i18n.t(`foreign.activities.indirect.interest.label.soldNotApplicable`)}
            or={i18n.t(`foreign.activities.indirect.interest.label.or`)}
            onUpdate={this.updateSoldNotApplicable}>
            <DateControl name="Sold"
              className="sold"
              {...this.props.Sold}
              label={i18n.t(`foreign.activities.indirect.interest.label.sold`)}
              onUpdate={this.updateSold}
              onValidate={this.props.onValidate}
            />
          </NotApplicable>
        </Field>

        <Field title={i18n.t(`foreign.activities.indirect.interest.heading.explanation`)}
          help={`foreign.activities.indirect.interest.help.explanation`}>
          <Textarea name="Explanation"
            className="explanation"
            {...this.props.Explanation}
            onUpdate={this.updateExplanation}
            onValidate={this.props.onValidate}
          />
        </Field>

        <CoOwners prefix={prefix}
          {...this.props.CoOwners}
          onUpdate={this.updateCoOwners}
          onValidate={this.props.onValidate}
        />

      </div>
    )
  }
}

IndirectInterest.defaultProps = {
  prefix: 'activities.indirect.interest'
}
