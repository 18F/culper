import React from 'react'
import i18n from 'util/i18n'
import {
  ValidationElement,
  Currency,
  Field,
  Text,
  DateControl,
  Textarea,
  NotApplicable,
  Checkbox,
  CheckboxGroup,
  Show,
} from '../../../../Form'
import CoOwners from '../CoOwners'

export default class IndirectInterest extends ValidationElement {
  update = (queue) => {
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
      ...queue,
    })
  }

  updateInterestTypes = (values) => {
    const interestType = values.value
    const selected = [...((this.props.InterestTypes || {}).values || [])]
    if (selected.includes(interestType)) {
      selected.splice(selected.indexOf(interestType), 1)
    } else {
      selected.push(interestType)
    }

    this.update({
      InterestTypes: { values: selected },
    })
  }

  updateInterestType = (values) => {
    this.update({
      InterestType: values,
    })
  }

  updateFirstname = (values) => {
    this.update({
      Firstname: values,
    })
  }

  updateLastname = (values) => {
    this.update({
      Lastname: values,
    })
  }

  updateRelationship = (values) => {
    this.update({
      Relationship: values,
    })
  }

  updateAcquired = (values) => {
    this.update({
      Acquired: values,
    })
  }

  updateHowAcquired = (values) => {
    this.update({
      HowAcquired: values,
    })
  }

  updateCost = (values) => {
    this.update({
      Cost: values,
    })
  }

  updateCostEstimated = (values) => {
    this.update({
      CostEstimated: values,
    })
  }

  updateValue = (values) => {
    this.update({
      Value: values,
    })
  }

  updateValueEstimated = (values) => {
    this.update({
      ValueEstimated: values,
    })
  }

  updateSold = (values) => {
    this.update({
      Sold: values,
    })
  }

  updateSoldNotApplicable = (values) => {
    this.update({
      SoldNotApplicable: values,
      Sold: values.applicable ? this.props.Sold : {},
      Explanation: values.applicable ? this.props.Explanation : {},
    })
  }

  updateExplanation = (values) => {
    this.update({
      Explanation: values,
    })
  }

  updateCoOwners = (values) => {
    this.update({
      CoOwners: values,
    })
  }

  render() {
    const { prefix } = this.props
    return (
      <div className="interest">
        <Field
          title={i18n.t(
            'foreign.activities.indirect.interest.heading.interestTypes'
          )}
          adjustFor="p"
          scrollIntoView={this.props.scrollIntoView}
        >
          <p>{i18n.t('foreign.activities.indirect.interest.para.checkAll')}</p>
          <CheckboxGroup
            className="interest-types option-list option-list-vertical"
            onError={this.props.onError}
            required={this.props.required}
            selectedValues={(this.props.InterestTypes || {}).values}
          >
            <Checkbox
              name="interest-type"
              label={i18n.m(
                'foreign.activities.indirect.interest.label.interestTypes.yourself'
              )}
              value="Yourself"
              className="yourself"
              onError={this.props.onError}
              onUpdate={this.updateInterestTypes}
            />
            <Checkbox
              name="interest-type"
              label={i18n.m(
                'foreign.activities.indirect.interest.label.interestTypes.spouse'
              )}
              value="Spouse"
              className="spouse"
              onError={this.props.onError}
              onUpdate={this.updateInterestTypes}
            />
            <Checkbox
              name="interest-type"
              label={i18n.m(
                'foreign.activities.indirect.interest.label.interestTypes.cohabitant'
              )}
              value="Cohabitant"
              className="cohabitant"
              onError={this.props.onError}
              onUpdate={this.updateInterestTypes}
            />
            <Checkbox
              name="interest-type"
              label={i18n.m(
                'foreign.activities.indirect.interest.label.interestTypes.dependentChildren'
              )}
              value="DependentChildren"
              className="dependent-children"
              onError={this.props.onError}
              onUpdate={this.updateInterestTypes}
            />
          </CheckboxGroup>
        </Field>

        <Field
          title={i18n.t(
            'foreign.activities.indirect.interest.heading.interestType'
          )}
          scrollIntoView={this.props.scrollIntoView}
        >
          <Text
            name="InterestType"
            className="interest-type"
            {...this.props.InterestType}
            onUpdate={this.updateInterestType}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.activities.indirect.interest.heading.name')}
          scrollIntoView={this.props.scrollIntoView}
        >
          <Text
            name="Firstname"
            label={i18n.t(
              'foreign.activities.indirect.interest.label.firstname'
            )}
            {...this.props.Firstname}
            pattern="^[a-zA-Z\-\.' ]*$"
            prefix="name.first"
            onUpdate={this.updateFirstname}
            onError={this.props.onError}
            required={this.props.required}
          />
          <Text
            name="Lastname"
            label={i18n.t(
              'foreign.activities.indirect.interest.label.lastname'
            )}
            {...this.props.Lastname}
            pattern="^[a-zA-Z\-\.' ]*$"
            prefix="name.last"
            onUpdate={this.updateLastname}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t(
            'foreign.activities.indirect.interest.heading.relationship'
          )}
          help="foreign.activities.indirect.interest.help.relationship"
          scrollIntoView={this.props.scrollIntoView}
        >
          <Textarea
            name="Relationship"
            {...this.props.Relationship}
            onUpdate={this.updateRelationship}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t(
            'foreign.activities.indirect.interest.heading.acquired'
          )}
          adjustFor="labels"
          scrollIntoView={this.props.scrollIntoView}
        >
          <DateControl
            name="Acquired"
            className="acquired"
            {...this.props.Acquired}
            minDateEqualTo
            onUpdate={this.updateAcquired}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.activities.indirect.interest.heading.cost')}
          scrollIntoView={this.props.scrollIntoView}
        >
          <Currency
            name="Cost"
            className="cost"
            {...this.props.Cost}
            onUpdate={this.updateCost}
            min="0"
            onError={this.props.onError}
            required={this.props.required}
          />
          <div className="flags">
            <Checkbox
              name="CostEstimated"
              label={i18n.t(
                'foreign.activities.indirect.interest.label.costEstimated'
              )}
              toggle="false"
              {...this.props.CostEstimated}
              onUpdate={this.updateCostEstimated}
              onError={this.props.onError}
            />
          </div>
        </Field>

        <Field
          title={i18n.t(
            'foreign.activities.indirect.interest.heading.howAcquired'
          )}
          adjustFor="p"
          scrollIntoView={this.props.scrollIntoView}
        >
          <p>
            {i18n.t('foreign.activities.indirect.interest.para.howAcquired')}
          </p>
          <Textarea
            name="HowAcquired"
            className="how-acquired"
            {...this.props.HowAcquired}
            onUpdate={this.updateHowAcquired}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.activities.indirect.interest.heading.value')}
          scrollIntoView={this.props.scrollIntoView}
        >
          <Currency
            name="Value"
            className="value"
            {...this.props.Value}
            onUpdate={this.updateValue}
            min="0"
            onError={this.props.onError}
            required={this.props.required}
          />
          <div className="flags">
            <Checkbox
              name="ValueEstimated"
              label={i18n.t(
                'foreign.activities.indirect.interest.label.valueEstimated'
              )}
              toggle="false"
              {...this.props.ValueEstimated}
              onUpdate={this.updateValueEstimated}
              onError={this.props.onError}
            />
          </div>
        </Field>

        <Field
          title={i18n.t('foreign.activities.indirect.interest.heading.sold')}
          help="foreign.activities.indirect.interest.help.sold"
          adjustFor="labels"
          shrink
          scrollIntoView={this.props.scrollIntoView}
        >
          <NotApplicable
            name="SoldNotApplicable"
            {...this.props.SoldNotApplicable}
            label={i18n.t(
              'foreign.activities.indirect.interest.label.soldNotApplicable'
            )}
            or={i18n.m('foreign.activities.indirect.interest.label.or')}
            onError={this.props.onError}
            required={this.props.required}
            onUpdate={this.updateSoldNotApplicable}
          >
            <DateControl
              name="Sold"
              className="sold"
              {...this.props.Sold}
              minDate={this.props.Acquired}
              minDateEqualTo
              prefix="indirectControl"
              onUpdate={this.updateSold}
              onError={this.props.onError}
              required={this.props.required}
            />
          </NotApplicable>
        </Field>

        <Show when={(this.props.SoldNotApplicable || {}).applicable}>
          <Field
            title={i18n.t(
              'foreign.activities.indirect.interest.heading.explanation'
            )}
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

        <CoOwners
          prefix={prefix}
          {...this.props.CoOwners}
          addressBooks={this.props.addressBooks}
          dispatch={this.props.dispatch}
          onUpdate={this.updateCoOwners}
          onError={this.props.onError}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
        />
      </div>
    )
  }
}

IndirectInterest.defaultProps = {
  SoldNotApplicable: { applicable: true },
  prefix: 'activities.indirect.interest',
  addressBooks: {},
  dispatch: () => {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
}
