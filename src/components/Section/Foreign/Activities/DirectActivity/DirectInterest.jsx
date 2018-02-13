import React from 'react'
import { i18n } from '../../../../../config'
import { ValidationElement, Currency, Field, Text, DateControl, Textarea, NotApplicable, Checkbox, CheckboxGroup } from '../../../../Form'
import CoOwners from '../CoOwners'

export default class DirectInterest extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateInterestTypes = this.updateInterestTypes.bind(this)
    this.updateInterestType = this.updateInterestType.bind(this)
    this.updateAcquired = this.updateAcquired.bind(this)
    this.updateHowAcquired = this.updateHowAcquired.bind(this)
    this.updateCost = this.updateCost.bind(this)
    this.updateCostEstimated = this.updateCostEstimated.bind(this)
    this.updateValue = this.updateValue.bind(this)
    this.updateValueEstimated = this.updateValueEstimated.bind(this)
    this.updateRelinquished = this.updateRelinquished.bind(this)
    this.updateRelinquishedNotApplicable = this.updateRelinquishedNotApplicable.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
    this.updateCoOwners = this.updateCoOwners.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      InterestTypes: this.props.InterestTypes,
      InterestType: this.props.InterestType,
      Acquired: this.props.Acquired,
      HowAcquired: this.props.HowAcquired,
      Cost: this.props.Cost,
      CostEstimated: this.props.CostEstimated,
      Value: this.props.Value,
      ValueEstimated: this.props.ValueEstimated,
      Relinquished: this.props.Relinquished,
      RelinquishedNotApplicable: this.props.RelinquishedNotApplicable,
      Explanation: this.props.Explanation,
      CoOwners: this.props.CoOwners,
      ...queue
    })
  }

  updateInterestTypes (values) {
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

  updateInterestType (values) {
    this.update({
      InterestType: values
    })
  }

  updateAcquired (values) {
    this.update({
      Acquired: values
    })
  }

  updateHowAcquired (values) {
    this.update({
      HowAcquired: values
    })
  }

  updateCost (values) {
    this.update({
      Cost: values
    })
  }

  updateCostEstimated (values) {
    this.update({
      CostEstimated: values
    })
  }

  updateValue (values) {
    this.update({
      Value: values
    })
  }

  updateValueEstimated (values) {
    this.update({
      ValueEstimated: values
    })
  }

  updateRelinquished (values) {
    this.update({
      Relinquished: values
    })
  }

  updateRelinquishedNotApplicable (values) {
    this.update({
      RelinquishedNotApplicable: values
    })
  }

  updateExplanation (values) {
    this.update({
      Explanation: values
    })
  }

  updateCoOwners (values) {
    this.update({
      CoOwners: values
    })
  }

  render () {
    const prefix = this.props.prefix
    return (
      <div className="interest">
        <Field title={i18n.t(`foreign.activities.direct.interest.heading.interestTypes`)}
               adjustFor="p"
               scrollIntoView={this.props.scrollIntoView}>

          <p>{i18n.t('foreign.activities.direct.interest.para.checkAll')}</p>
          <CheckboxGroup className="interest-types option-list"
                         onError={this.props.onError}
                         required={this.props.required}
                         selectedValues={(this.props.InterestTypes || {}).values}>
            <Checkbox name="interest-type"
                      label={i18n.m('foreign.activities.direct.interest.label.interestTypes.yourself')}
                      value="Yourself"
                      className="yourself"
                      onError={this.props.onError}
                      onUpdate={this.updateInterestTypes}
                      />
            <Checkbox name="interest-type"
                      label={i18n.m('foreign.activities.direct.interest.label.interestTypes.spouse')}
                      value="Spouse"
                      className="spouse"
                      onError={this.props.onError}
                      onUpdate={this.updateInterestTypes}
                      />
            <Checkbox name="interest-type"
                      label={i18n.m('foreign.activities.direct.interest.label.interestTypes.cohabitant')}
                      value="Cohabitant"
                      className="cohabitant"
                      onError={this.props.onError}
                      onUpdate={this.updateInterestTypes}
                      />
            <Checkbox name="interest-type"
                      label={i18n.m('foreign.activities.direct.interest.label.interestTypes.dependentChildren')}
                      value="DependentChildren"
                      className="dependent-children"
                      onError={this.props.onError}
                      onUpdate={this.updateInterestTypes}
                      />
          </CheckboxGroup>
        </Field>

        <Field title={i18n.t(`foreign.activities.direct.interest.heading.interestType`)}
               scrollIntoView={this.props.scrollIntoView}>
          <Text name="InterestType"
                className="interest-type"
                {...this.props.InterestType}
                onUpdate={this.updateInterestType}
                onError={this.props.onError}
                required={this.props.required}
                />
        </Field>

        <Field title={i18n.t('foreign.activities.direct.interest.heading.acquired')}
               adjustFor="labels"
               scrollIntoView={this.props.scrollIntoView}>
          <DateControl name="Acquired"
                       className="acquired"
                       {...this.props.Acquired}
                       label={i18n.t('foreign.activities.direct.interest.label.acquired')}
                       onUpdate={this.updateAcquired}
                       onError={this.props.onError}
                       required={this.props.required}
                       />
        </Field>

        <Field title={i18n.t('foreign.activities.direct.interest.heading.howAcquired')}
               adjustFor="p"
               scrollIntoView={this.props.scrollIntoView}>
          {i18n.m('foreign.activities.direct.interest.para.howAcquired')}
          <Textarea name="HowAcquired"
                    className="how-acquired"
                    {...this.props.HowAcquired}
                    onUpdate={this.updateHowAcquired}
                    onError={this.props.onError}
                    required={this.props.required}
                    />
        </Field>

        <Field title={i18n.t('foreign.activities.direct.interest.heading.cost')}
               help={'foreign.activities.direct.interest.help.cost'}
               scrollIntoView={this.props.scrollIntoView}>
          <Currency name="Cost"
                    className="cost"
                    {...this.props.Cost}
                    onUpdate={this.updateCost}
                    min="0"
                    onError={this.props.onError}
                    required={this.props.required}
                    />
          <div className="flags">
            <Checkbox name="CostEstimated"
                      label={i18n.t('foreign.activities.direct.interest.label.costEstimated')}
                      toggle="false"
                      {...this.props.CostEstimated}
                      onUpdate={this.updateCostEstimated}
                      onError={this.props.onError}
                      />
          </div>

        </Field>

        <Field title={i18n.t('foreign.activities.direct.interest.heading.value')}
               help={'foreign.activities.direct.interest.help.value'}
               scrollIntoView={this.props.scrollIntoView}>
          <Currency name="Value"
                    className="value"
                    {...this.props.Value}
                    onUpdate={this.updateValue}
                    min="0"
                    onError={this.props.onError}
                    required={this.props.required}
                    />
          <div className="flags">
            <Checkbox name="ValueEstimated"
                      label={i18n.t('foreign.activities.direct.interest.label.valueEstimated')}
                      toggle="false"
                      {...this.props.ValueEstimated}
                      onUpdate={this.updateValueEstimated}
                      onError={this.props.onError}
                      />
          </div>

        </Field>

        <Field title={i18n.t('foreign.activities.direct.interest.heading.relinquished')}
               help={'foreign.activities.direct.interest.help.relinquished'}
               adjustFor="labels"
               scrollIntoView={this.props.scrollIntoView}>
          <NotApplicable name="RelinquishedNotApplicable"
                         {...this.props.RelinquishedNotApplicable}
                         label={i18n.t('foreign.activities.direct.interest.label.relinquishedNotApplicable')}
                         or={i18n.m('foreign.activities.direct.interest.label.or')}
                         onError={this.props.onError}
                         required={this.props.required}
                         onUpdate={this.updateRelinquishedNotApplicable}>
            <DateControl name="Relinquished"
                         className="relinquished"
                         {...this.props.Relinquished}
                         label={i18n.t('foreign.activities.direct.interest.label.relinquished')}
                         onUpdate={this.updateRelinquished}
                         onError={this.props.onError}
                         required={this.props.required}
                         />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('foreign.activities.direct.interest.heading.explanation')}
               scrollIntoView={this.props.scrollIntoView}>
          <Textarea name="Explanation"
                    className="explanation"
                    {...this.props.Explanation}
                    onUpdate={this.updateExplanation}
                    onError={this.props.onError}
                    required={this.props.required}
                    />
        </Field>

        <CoOwners prefix={prefix}
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

DirectInterest.defaultProps = {
  prefix: 'activities.direct.interest',
  addressBooks: {},
  RelinquishedNotApplicable: { applicable: true },
  dispatch: (action) => {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
