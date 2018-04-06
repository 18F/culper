import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, DateControl, Currency, Field,
         NotApplicable, Location, Checkbox, Text, Textarea } from '../../../Form'
import Infractions from './Infractions'

export default class NonpaymentItem extends ValidationElement {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateInfractions = this.updateInfractions.bind(this)
    this.updateAccountNumber = this.updateAccountNumber.bind(this)
    this.updatePropertyType = this.updatePropertyType.bind(this)
    this.updateAmount = this.updateAmount.bind(this)
    this.updateAmountEstimated = this.updateAmountEstimated.bind(this)
    this.updateReason = this.updateReason.bind(this)
    this.updateStatus = this.updateStatus.bind(this)
    this.updateDate = this.updateDate.bind(this)
    this.updateResolvedNotApplicable = this.updateResolvedNotApplicable.bind(this)
    this.updateResolved = this.updateResolved.bind(this)
    this.updateDescription = this.updateDescription.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Name: this.props.Name,
      Infractions: this.props.Infractions,
      AccountNumber: this.props.AccountNumber,
      PropertyType: this.props.PropertyType,
      Amount: this.props.Amount,
      AmountEstimated: this.props.AmountEstimated,
      Reason: this.props.Reason,
      Status: this.props.Status,
      Date: this.props.Date,
      ResolvedNotApplicable: this.props.ResolvedNotApplicable,
      Resolved: this.props.Resolved,
      Description: this.props.Description,
      ...queue
    })
  }

  updateName (values) {
    this.update({
      Name: values
    })
  }

  updateInfractions (values) {
    this.update({
      Infractions: values
    })
  }

  updateAccountNumber (values) {
    this.update({
      AccountNumber: values
    })
  }

  updatePropertyType (values) {
    this.update({
      PropertyType: values
    })
  }

  updateAmount (values) {
    this.update({
      Amount: values
    })
  }

  updateAmountEstimated (values) {
    this.update({
      AmountEstimated: values
    })
  }

  updateReason (values) {
    this.update({
      Reason: values
    })
  }

  updateStatus (values) {
    this.update({
      Status: values
    })
  }

  updateDate (values) {
    this.update({
      Date: values
    })
  }

  updateResolved (values) {
    this.update({
      Resolved: values
    })
  }

  updateResolvedNotApplicable (values) {
    this.update({
      ResolvedNotApplicable: values
    })
  }

  updateDescription (values) {
    this.update({
      Description: values
    })
  }

  render () {
    return (
      <div className="nonpayment-item">
        <Field title={i18n.t('financial.nonpayment.heading.name')}
               scrollIntoView={this.props.scrollIntoView}>
          <Text name="Name"
                {...this.props.Name}
                onUpdate={this.updateName}
                onError={this.props.onError}
                className="nonpayment-name"
                required={this.props.required}
                />
        </Field>

        <Field title={i18n.t('financial.nonpayment.heading.infractions')}
               scrollIntoView={this.props.scrollIntoView}>
          <Infractions name="Infractions"
                       {...this.props.Infractions}
                       onUpdate={this.updateInfractions}
                       onError={this.props.onError}
                       className="nonpayment-infractions"
                       required={this.props.required}
                       />
        </Field>

        <Field title={i18n.t('financial.nonpayment.heading.accountnumber')}
               scrollIntoView={this.props.scrollIntoView}>
          <Text name="AccountNumber"
                {...this.props.AccountNumber}
                onUpdate={this.updateAccountNumber}
                onError={this.props.onError}
                className="nonpayment-accountnumber"
                required={this.props.required}
                />
        </Field>

        <Field title={i18n.t('financial.nonpayment.heading.propertytype')}
               scrollIntoView={this.props.scrollIntoView}>
          <Text name="PropertyType"
                {...this.props.PropertyType}
                onUpdate={this.updatePropertyType}
                onError={this.props.onError}
                className="nonpayment-propertytype"
                required={this.props.required}
                />
        </Field>

        <Field title={i18n.t('financial.nonpayment.heading.amount')}
               className="nonpayment-amount-notapplicable"
               scrollIntoView={this.props.scrollIntoView}>
          <div>
            <Currency name="Amount"
                      {...this.props.Amount}
                      onUpdate={this.updateAmount}
                      onError={this.props.onError}
                      className="nonpayment-amount"
                      min="1"
                      required={this.props.required}
                      />
            <div className="flags">
              <Checkbox name="AmountEstimated"
                        ref="estimated"
                        label={i18n.t('financial.nonpayment.label.estimated')}
                        toggle="false"
                        onUpdate={this.updateAmountEstimated}
                        onError={this.props.onError}
                        {...this.props.AmountEstimated}
                        />
            </div>
          </div>
        </Field>

        <Field title={i18n.t('financial.nonpayment.heading.reason')}
               scrollIntoView={this.props.scrollIntoView}
               help="financial.nonpayment.help.reason">
          <Textarea name="Reason"
                    {...this.props.Reason}
                    onUpdate={this.updateReason}
                    onError={this.props.onError}
                    className="nonpayment-reason"
                    required={this.props.required}
                    />
        </Field>

        <Field title={i18n.t('financial.nonpayment.heading.status')}
               scrollIntoView={this.props.scrollIntoView}>
          <Text name="Status"
                {...this.props.Status}
                onUpdate={this.updateStatus}
                onError={this.props.onError}
                className="nonpayment-status"
                required={this.props.required}
                />
        </Field>

        <Field title={i18n.t('financial.nonpayment.heading.resolved')}
               adjustFor="label"
               scrollIntoView={this.props.scrollIntoView}
               shrink={true}>
          <NotApplicable name="ResolvedNotApplicable"
                         label={i18n.t('financial.nonpayment.label.notresolved')}
                         or={i18n.m('financial.nonpayment.para.or')}
                         {...this.props.ResolvedNotApplicable}
                         onUpdate={this.updateResolvedNotApplicable}
                         onError={this.props.onError}>
            <DateControl name="Resolved"
                         {...this.props.Resolved}
                         onUpdate={this.updateResolved}
                         onError={this.props.onError}
                         className="nonpayment-resolved"
                         hideDay={true}
                         required={this.props.required}
                         />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('financial.nonpayment.heading.date')}
               adjustFor="labels"
               scrollIntoView={this.props.scrollIntoView}
               shrink={true}>
          <DateControl name="Date"
                       {...this.props.Date}
                       onUpdate={this.updateDate}
                       onError={this.props.onError}
                       className="nonpayment-date"
                       hideDay={true}
                       required={this.props.required}
                       />
        </Field>

        <Field title={i18n.t('financial.nonpayment.heading.description')}
               scrollIntoView={this.props.scrollIntoView}
               help="financial.nonpayment.help.description">
          <Textarea name="Description"
                    {...this.props.Description}
                    onUpdate={this.updateDescription}
                    onError={this.props.onError}
                    className="nonpayment-description"
                    required={this.props.required}
                    />
        </Field>
      </div>
    )
  }
}

NonpaymentItem.defaultProps = {
  ResolvedNotApplicable: { applicable: true },
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  required: false
}
