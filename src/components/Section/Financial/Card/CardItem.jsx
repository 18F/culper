import React from 'react'
import { i18n } from '../../../../config'
import {
  ValidationElement,
  DateControl,
  Checkbox,
  Currency,
  Field,
  Text,
  Textarea,
  Location
} from '../../../Form'

export default class CardItem extends ValidationElement {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateAgency = this.updateAgency.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateDate = this.updateDate.bind(this)
    this.updateReason = this.updateReason.bind(this)
    this.updateAmount = this.updateAmount.bind(this)
    this.updateAmountEstimated = this.updateAmountEstimated.bind(this)
    this.updateDescription = this.updateDescription.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Agency: this.props.Agency,
      Address: this.props.Address,
      Date: this.props.Date,
      Reason: this.props.Reason,
      Amount: this.props.Amount,
      AmountEstimated: this.props.AmountEstimated,
      Description: this.props.Description,
      ...queue
    })
  }

  updateAgency(values) {
    this.update({
      Agency: values
    })
  }

  updateAddress(values) {
    this.update({
      Address: values
    })
  }

  updateDate(values) {
    this.update({
      Date: values
    })
  }

  updateReason(values) {
    this.update({
      Reason: values
    })
  }

  updateAmount(values) {
    this.update({
      Amount: values
    })
  }

  updateAmountEstimated(values) {
    this.update({
      AmountEstimated: values
    })
  }

  updateDescription(values) {
    this.update({
      Description: values
    })
  }

  render() {
    return (
      <div className="card-item">
        <Field
          title={i18n.t('financial.card.heading.agency')}
          scrollIntoView={this.props.scrollIntoView}>
          <Text
            name="Agency"
            {...this.props.Agency}
            className="card-agency"
            required={this.props.required}
            onUpdate={this.updateAgency}
            onError={this.props.onError}
          />
        </Field>

        <Field
          title={i18n.t('financial.card.heading.address')}
          optional={true}
          help="financial.card.help.address"
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="address">
          <Location
            name="Address"
            {...this.props.Address}
            className="card-address"
            layout={Location.ADDRESS}
            geocode={true}
            dispatch={this.props.dispatch}
            addressBooks={this.props.addressBooks}
            addressBook="Agency"
            required={this.props.required}
            onUpdate={this.updateAddress}
            onError={this.props.onError}
          />
        </Field>

        <Field
          title={i18n.t('financial.card.heading.date')}
          adjustFor="labels"
          scrollIntoView={this.props.scrollIntoView}
          shrink={true}>
          <DateControl
            name="Date"
            {...this.props.Date}
            className="card-date"
            hideDay={true}
            minDateEqualTo={true}
            required={this.props.required}
            onUpdate={this.updateDate}
            onError={this.props.onError}
          />
        </Field>

        <Field
          title={i18n.t('financial.card.heading.reason')}
          scrollIntoView={this.props.scrollIntoView}>
          <Textarea
            name="Reason"
            {...this.props.Reason}
            className="card-reason"
            required={this.props.required}
            onUpdate={this.updateReason}
            onError={this.props.onError}
          />
        </Field>

        <Field
          title={i18n.t('financial.card.heading.amount')}
          scrollIntoView={this.props.scrollIntoView}>
          <div>
            <Currency
              name="Amount"
              {...this.props.Amount}
              className="card-amount"
              min="1"
              required={this.props.required}
              onUpdate={this.updateAmount}
              onError={this.props.onError}
            />
            <div className="flags">
              <Checkbox
                name="AmountEstimated"
                className="card-estimated"
                {...this.props.AmountEstimated}
                ref="estimated"
                label={i18n.t('financial.card.label.estimated')}
                toggle="false"
                onUpdate={this.updateAmountEstimated}
                onError={this.props.onError}
              />
            </div>
          </div>
        </Field>

        <Field
          title={i18n.t('financial.card.heading.description')}
          scrollIntoView={this.props.scrollIntoView}
          help="financial.card.help.description">
          <Textarea
            name="Description"
            {...this.props.Description}
            className="card-description"
            required={this.props.required}
            onUpdate={this.updateDescription}
            onError={this.props.onError}
          />
        </Field>
      </div>
    )
  }
}

CardItem.defaultProps = {
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  required: false
}
