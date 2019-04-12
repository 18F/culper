import React from 'react'

import i18n from 'util/i18n'
import {
  ValidationElement,
  DateControl,
  Currency,
  Field,
  NotApplicable,
  Location,
  Checkbox,
  Text,
  Textarea,
} from 'components/Form'

import Infractions from './Infractions'

export default class DelinquentItem extends ValidationElement {
  update = (queue) => {
    const { allowFinancialDelinquentNonFederal } = this.props
    const infractionValues = allowFinancialDelinquentNonFederal
      ? this.props.Infractions
      : ['Federal']

    this.props.onUpdate({
      Name: this.props.Name,
      Infractions: infractionValues,
      AccountNumber: this.props.AccountNumber,
      PropertyType: this.props.PropertyType,
      Amount: this.props.Amount,
      AmountEstimated: this.props.AmountEstimated,
      Reason: this.props.Reason,
      Status: this.props.Status,
      Date: this.props.Date,
      ResolvedNotApplicable: this.props.ResolvedNotApplicable,
      Resolved: this.props.Resolved,
      CourtName: this.props.CourtName,
      CourtAddress: this.props.CourtAddress,
      Description: this.props.Description,
      ...queue,
    })
  }

  updateName = (values) => {
    this.update({
      Name: values,
    })
  }

  updateInfractions = (values) => {
    this.update({
      Infractions: values,
    })
  }

  updateAccountNumber = (values) => {
    this.update({
      AccountNumber: values,
    })
  }

  updatePropertyType = (values) => {
    this.update({
      PropertyType: values,
    })
  }

  updateAmount = (values) => {
    this.update({
      Amount: values,
    })
  }

  updateAmountEstimated = (values) => {
    this.update({
      AmountEstimated: values,
    })
  }

  updateReason = (values) => {
    this.update({
      Reason: values,
    })
  }

  updateStatus = (values) => {
    this.update({
      Status: values,
    })
  }

  updateDate = (values) => {
    this.update({
      Date: values,
    })
  }

  updateResolved = (values) => {
    this.update({
      Resolved: values,
    })
  }

  updateResolvedNotApplicable = (values) => {
    this.update({
      ResolvedNotApplicable: values,
    })
  }

  updateCourtName = (values) => {
    this.update({
      CourtName: values,
    })
  }

  updateCourtAddress = (values) => {
    this.update({
      CourtAddress: values,
    })
  }

  updateDescription = (values) => {
    this.update({
      Description: values,
    })
  }

  render() {
    const {
      years, yearsString, requireFinancialDelinquentName, allowFinancialDelinquentNonFederal,
    } = this.props

    return (
      <div className="delinquent-item">
        {requireFinancialDelinquentName && (
          <Field
            title={i18n.t('financial.delinquent.heading.name')}
            scrollIntoView={this.props.scrollIntoView}
          >
            <Text
              name="Name"
              {...this.props.Name}
              onUpdate={this.updateName}
              onError={this.props.onError}
              className="delinquent-name"
              required={this.props.required}
            />
          </Field>
        )}

        {allowFinancialDelinquentNonFederal && (
          <Field
            title={i18n.t('financial.delinquent.heading.infractions')}
            scrollIntoView={this.props.scrollIntoView}
          >
            <Infractions
              name="Infractions"
              {...this.props.Infractions}
              onUpdate={this.updateInfractions}
              onError={this.props.onError}
              className="delinquent-infractions"
              required={this.props.required}
              years={years}
              yearsString={yearsString}
            />
          </Field>
        )}

        <Field
          title={i18n.t('financial.delinquent.heading.accountnumber')}
          scrollIntoView={this.props.scrollIntoView}
        >
          <Text
            name="AccountNumber"
            {...this.props.AccountNumber}
            onUpdate={this.updateAccountNumber}
            onError={this.props.onError}
            className="delinquent-accountnumber"
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('financial.delinquent.heading.propertytype')}
          scrollIntoView={this.props.scrollIntoView}
        >
          <Text
            name="PropertyType"
            {...this.props.PropertyType}
            onUpdate={this.updatePropertyType}
            onError={this.props.onError}
            className="delinquent-propertytype"
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('financial.delinquent.heading.amount')}
          className="delinquent-amount-notapplicable"
          scrollIntoView={this.props.scrollIntoView}
        >
          <div>
            <Currency
              name="Amount"
              {...this.props.Amount}
              onUpdate={this.updateAmount}
              onError={this.props.onError}
              className="delinquent-amount"
              min="1"
              required={this.props.required}
            />
            <div className="flags">
              <Checkbox
                name="AmountEstimated"
                label={i18n.t('financial.delinquent.label.estimated')}
                toggle="false"
                onUpdate={this.updateAmountEstimated}
                onError={this.props.onError}
                {...this.props.AmountEstimated}
              />
            </div>
          </div>
        </Field>

        <Field
          title={i18n.t('financial.delinquent.heading.reason')}
          scrollIntoView={this.props.scrollIntoView}
          help="financial.delinquent.help.reason"
        >
          <Textarea
            name="Reason"
            {...this.props.Reason}
            onUpdate={this.updateReason}
            onError={this.props.onError}
            className="delinquent-reason"
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('financial.delinquent.heading.status')}
          scrollIntoView={this.props.scrollIntoView}
        >
          <Text
            name="Status"
            {...this.props.Status}
            onUpdate={this.updateStatus}
            onError={this.props.onError}
            className="delinquent-status"
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('financial.delinquent.heading.date')}
          adjustFor="labels"
          scrollIntoView={this.props.scrollIntoView}
          shrink
        >
          <DateControl
            name="Date"
            {...this.props.Date}
            onUpdate={this.updateDate}
            onError={this.props.onError}
            minDateEqualTo
            className="delinquent-date"
            hideDay
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('financial.delinquent.heading.resolved')}
          adjustFor="label"
          scrollIntoView={this.props.scrollIntoView}
          shrink
        >
          <NotApplicable
            name="ResolvedNotApplicable"
            label={i18n.t('financial.delinquent.label.notresolved')}
            or={i18n.m('financial.delinquent.para.or')}
            {...this.props.ResolvedNotApplicable}
            onUpdate={this.updateResolvedNotApplicable}
            onError={this.props.onError}
          >
            <DateControl
              name="Resolved"
              {...this.props.Resolved}
              prefix="delinquent"
              onUpdate={this.updateResolved}
              onError={this.props.onError}
              minDate={this.props.Date}
              minDateEqualTo
              className="delinquent-resolved"
              hideDay
              required={this.props.required}
            />
          </NotApplicable>
        </Field>

        <Field
          title={i18n.t('financial.delinquent.heading.courtname')}
          scrollIntoView={this.props.scrollIntoView}
        >
          <Text
            name="CourtName"
            {...this.props.CourtName}
            onUpdate={this.updateCourtName}
            onError={this.props.onError}
            className="delinquent-courtname"
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('financial.delinquent.heading.courtaddress')}
          optional
          help="financial.delinquent.help.courtaddress"
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="address"
        >
          <Location
            name="CourtAddress"
            {...this.props.CourtAddress}
            onUpdate={this.updateCourtAddress}
            onError={this.props.onError}
            layout={Location.ADDRESS}
            geocode
            className="delinquent-courtaddress"
            showPostOffice
            dispatch={this.props.dispatch}
            addressBooks={this.props.addressBooks}
            addressBook="Court"
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('financial.delinquent.heading.description')}
          scrollIntoView={this.props.scrollIntoView}
          help="financial.delinquent.help.description"
        >
          <Textarea
            name="Description"
            {...this.props.Description}
            onUpdate={this.updateDescription}
            onError={this.props.onError}
            className="delinquent-description"
            required={this.props.required}
          />
        </Field>
      </div>
    )
  }
}

DelinquentItem.defaultProps = {
  ResolvedNotApplicable: { applicable: true },
  onUpdate: () => {},
  onError: (value, arr) => arr,
  required: false,
}
