import React from 'react'
import { i18n } from '../../../../config'
import {
  ValidationElement,
  DateControl,
  Number,
  Field,
  Checkbox,
  Text,
  Textarea,
  NotApplicable,
  Currency
} from '../../../Form'
import { getContext, dateLimits } from '../../../../validators/datecontrol'
import FailureType from './FailureType'

export default class TaxesItem extends ValidationElement {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateFailure = this.updateFailure.bind(this)
    this.updateYear = this.updateYear.bind(this)
    this.updateReason = this.updateReason.bind(this)
    this.updateAgency = this.updateAgency.bind(this)
    this.updateTaxType = this.updateTaxType.bind(this)
    this.updateAmount = this.updateAmount.bind(this)
    this.updateAmountEstimated = this.updateAmountEstimated.bind(this)
    this.updateDateNotApplicable = this.updateDateNotApplicable.bind(this)
    this.updateDate = this.updateDate.bind(this)
    this.updateDescription = this.updateDescription.bind(this)
    this.updateYearEstimated = this.updateYearEstimated.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Failure: this.props.Failure,
      Year: this.props.Year,
      YearEstimated: this.props.YearEstimated,
      Reason: this.props.Reason,
      Agency: this.props.Agency,
      TaxType: this.props.TaxType,
      Amount: this.props.Amount,
      AmountEstimated: this.props.AmountEstimated,
      DateNotApplicable: this.props.DateNotApplicable,
      Date: this.props.Date,
      Description: this.props.Description,
      ...queue
    })
  }

  updateFailure(values) {
    this.update({
      Failure: values
    })
  }

  updateYear(values) {
    this.update({
      Year: values
    })
  }

  updateReason(values) {
    this.update({
      Reason: values
    })
  }

  updateAgency(values) {
    this.update({
      Agency: values
    })
  }

  updateTaxType(values) {
    this.update({
      TaxType: values
    })
  }

  updateAmount(values) {
    this.update({
      Amount: values
    })
  }

  updateDateNotApplicable(values) {
    this.update({
      DateNotApplicable: values
    })
  }

  updateDate(values) {
    this.update({
      Date: values
    })
  }

  updateDescription(values) {
    this.update({
      Description: values
    })
  }

  updateYearEstimated(values) {
    this.update({
      YearEstimated: values
    })
  }

  updateAmountEstimated(values) {
    this.update({
      AmountEstimated: values
    })
  }

  render() {
    const minYearFiled = dateLimits(null, getContext().applicantBirthdate)
    return (
      <div className="taxes-item">
        <Field
          title={i18n.t('financial.taxes.heading.failure')}
          adjustFor="buttons"
          scrollIntoView={this.props.scrollIntoView}
          shrink={true}>
          <FailureType
            name="Failure"
            {...this.props.Failure}
            className="taxes-failure"
            required={this.props.required}
            onUpdate={this.updateFailure}
            onError={this.props.onError}
          />
        </Field>

        <Field
          title={i18n.t('financial.taxes.heading.year')}
          scrollIntoView={this.props.scrollIntoView}>
          <DateControl
            name="Year"
            {...this.props.Year}
            className="taxes-year"
            hideMonth={true}
            hideDay={true}
            showEstimated={false}
            min={minYearFiled.minDate.getFullYear()}
            required={this.props.required}
            onUpdate={this.updateYear}
            onError={this.props.onError}
          />
          <div className="flags">
            <Checkbox
              name="YearEstimated"
              ref="estimated"
              label={i18n.t('financial.taxes.label.estimated')}
              toggle="false"
              {...this.props.YearEstimated}
              onUpdate={this.updateYearEstimated}
              onError={this.props.onError}
            />
          </div>
        </Field>

        <Field
          title={i18n.t('financial.taxes.heading.reason')}
          scrollIntoView={this.props.scrollIntoView}>
          <Textarea
            name="Reason"
            {...this.props.Reason}
            className="taxes-reason"
            required={this.props.required}
            onUpdate={this.updateReason}
            onError={this.props.onError}
          />
        </Field>

        <Field
          title={i18n.t('financial.taxes.heading.agency')}
          scrollIntoView={this.props.scrollIntoView}>
          <Text
            name="Agency"
            {...this.props.Agency}
            className="taxes-agency"
            required={this.props.required}
            onUpdate={this.updateAgency}
            onError={this.props.onError}
          />
        </Field>

        <Field
          title={i18n.t('financial.taxes.heading.taxtype')}
          scrollIntoView={this.props.scrollIntoView}>
          <Text
            name="TaxType"
            {...this.props.TaxType}
            className="taxes-taxtype"
            required={this.props.required}
            onUpdate={this.updateTaxType}
            onError={this.props.onError}
          />
        </Field>

        <Field
          title={i18n.t('financial.taxes.heading.amount')}
          scrollIntoView={this.props.scrollIntoView}>
          <div>
            <Currency
              name="Amount"
              {...this.props.Amount}
              className="taxes-amount"
              min="1"
              required={this.props.required}
              onUpdate={this.updateAmount}
              onError={this.props.onError}
            />
            <div className="flags">
              <Checkbox
                name="AmountEstimated"
                ref="estimated"
                label={i18n.t('financial.taxes.label.estimated')}
                toggle="false"
                {...this.props.AmountEstimated}
                onUpdate={this.updateAmountEstimated}
                onError={this.props.onError}
              />
            </div>
          </div>
        </Field>

        <Field
          title={i18n.t('financial.taxes.heading.date')}
          adjustFor="label"
          scrollIntoView={this.props.scrollIntoView}
          className="taxes-date-notapplicable"
          shrink={true}>
          <NotApplicable
            name="DateNotApplicable"
            {...this.props.DateNotApplicable}
            label={i18n.t('financial.taxes.label.notapplicable')}
            or={i18n.m('financial.taxes.para.or')}
            onUpdate={this.updateDateNotApplicable}
            onError={this.props.onError}>
            <DateControl
              name="Date"
              {...this.props.Date}
              className="taxes-date"
              hideDay={true}
              required={this.props.required}
              onUpdate={this.updateDate}
              onError={this.props.onError}
            />
          </NotApplicable>
        </Field>

        <Field
          title={i18n.t('financial.taxes.heading.description')}
          scrollIntoView={this.props.scrollIntoView}>
          <Textarea
            name="Description"
            {...this.props.Description}
            className="taxes-description"
            required={this.props.required}
            onUpdate={this.updateDescription}
            onError={this.props.onError}
          />
        </Field>
      </div>
    )
  }
}

TaxesItem.defaultProps = {
  Failure: {},
  Year: {},
  YearEstimated: {},
  Reason: {},
  Agency: {},
  TaxType: {},
  Amount: {},
  AmountEstimated: {},
  DateNotApplicable: { applicable: true },
  Date: {},
  Description: {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  required: false
}
