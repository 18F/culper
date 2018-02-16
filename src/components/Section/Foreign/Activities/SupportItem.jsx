import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Name, Currency, Location, Field, Text, Textarea, Country, Checkbox } from '../../../Form'

export default class SupportItem extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateRelationship = this.updateRelationship.bind(this)
    this.updateAmount = this.updateAmount.bind(this)
    this.updateAmountEstimated = this.updateAmountEstimated.bind(this)
    this.updateFrequency = this.updateFrequency.bind(this)
    this.updateCitizenship = this.updateCitizenship.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Name: this.props.Name,
      Address: this.props.Address,
      Relationship: this.props.Relationship,
      Amount: this.props.Amount,
      AmountEstimated: this.props.AmountEstimated,
      Frequency: this.props.Frequency,
      Citizenship: this.props.Citizenship,
      ...queue
    })
  }

  updateName (values) {
    this.update({
      Name: values
    })
  }

  updateAddress (values) {
    this.update({
      Address: values
    })
  }

  updateRelationship (values) {
    this.update({
      Relationship: values
    })
  }

  updateAmount (values) {
    this.update({
      Amount: values
    })
  }

  updateAmountEstimated (values) {
    this.update({
      AmountEstimated: values.checked
    })
  }

  updateFrequency (values) {
    this.update({
      Frequency: values
    })
  }

  updateCitizenship (values) {
    this.update({
      Citizenship: values
    })
  }

  render () {
    return (
      <div className="support-item">
        <Field title={i18n.t('foreign.activities.support.heading.name')}
               optional={true}
               filterErrors={Name.requiredErrorsOnly}
               scrollIntoView={this.props.scrollIntoView}>
          <Name name="Name"
                {...this.props.Name}
                className="foreign-activities-support-name"
                onUpdate={this.updateName}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                onError={this.props.onError}
                />
        </Field>

        <Field title={i18n.t('foreign.activities.support.heading.address')}
               optional={true}
               adjustFor="address"
               scrollIntoView={this.props.scrollIntoView}>
          <Location name="Address"
                    {...this.props.Address}
                    onUpdate={this.updateAddress}
                    className="foreign-activities-support-address"
                    layout={Location.ADDRESS}
                    geocode={true}
                    addressBook="ForeignNational"
                    addressBooks={this.props.addressBooks}
                    dispatch={this.props.dispatch}
                    required={this.props.required}
                    onError={this.props.onError}
                    />
        </Field>

        <Field title={i18n.t('foreign.activities.support.heading.relationship')}
               adjustFor="textarea"
               scrollIntoView={this.props.scrollIntoView}>
          <Textarea name="Relationship"
                    {...this.props.Relationship}
                    onUpdate={this.updateRelationship}
                    className="foreign-activities-support-relationship"
                    required={this.props.required}
                    onError={this.props.onError}
                    />
        </Field>

        <Field title={i18n.t('foreign.activities.support.heading.amount')}
               help="foreign.activities.support.help.amount"
               adjustFor="currency"
               scrollIntoView={this.props.scrollIntoView}>
          <Currency name="Amount"
                    {...this.props.Amount}
                    className="foreign-activities-support-amount"
                    onUpdate={this.updateAmount}
                    min="0"
                    required={this.props.required}
                    onError={this.props.onError}
                    />
          <div className="flags">
            <Checkbox name="AmountEstimated"
                      ref="estimated"
                      className="foreign-activities-support-amount-estimated"
                      label={i18n.t('foreign.activities.support.label.estimated')}
                      toggle="false"
                      {...this.props.AmountEstimated}
                      onUpdate={this.updateAmountEstimated}
                      onError={this.props.onError}
                      />
          </div>
        </Field>

        <Field title={i18n.t('foreign.activities.support.heading.frequency')}
               adjustFor="text"
               scrollIntoView={this.props.scrollIntoView}>
          <Text name="Frequency"
                {...this.props.Frequency}
                className="foreign-activities-support-frequency"
                required={this.props.required}
                onUpdate={this.updateFrequency}
                onError={this.props.onError}
                />
        </Field>

        <Field title={i18n.t('foreign.activities.support.heading.citizenship')}
               help="foreign.activities.support.help.citizenship"
               adjustFor="country"
               scrollIntoView={this.props.scrollIntoView}>
          <Country name="Citizenship"
                   {...this.props.Citizenship}
                   className="foreign-activities-support-citizenship"
                   multiple={true}
                   required={this.props.required}
                   onUpdate={this.updateCitizenship}
                   onError={this.props.onError}
                   />
        </Field>
      </div>
    )
  }
}

SupportItem.defaultProps = {
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
