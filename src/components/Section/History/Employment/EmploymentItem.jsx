import React from 'react'

import i18n from 'util/i18n'

import {
  ValidationElement,
  DateRange,
  Location,
  Text,
  Field,
  Telephone,
  Show,
  Name,
} from 'components/Form'
import ConnectedAlternateAddress from 'components/Form/Location/AlternateAddress'

import EmploymentActivity from './EmploymentActivity'
import EmploymentStatus from './EmploymentStatus'
import PhysicalAddress from './PhysicalAddress'
import AdditionalActivity from './AdditionalActivity'
import Supervisor from './Supervisor'
import ReasonLeft from './ReasonLeft'
import Reprimand from './Reprimand'

import { today, daysAgo, extractDate } from '../dateranges'

export default class EmploymentItem extends ValidationElement {
  update = (queue) => {
    this.props.onUpdate({
      ...this.props,
      ...queue,
    })
  }

  updateEmploymentActivity = (values) => {
    const activity = (this.props.EmploymentActivity || {}).value
    const zeroReference = activity && !['SelfEmployment', 'Unemployment'].includes(activity)
    this.update({
      EmploymentActivity: values,
      ReferenceName: zeroReference ? {} : this.props.ReferenceName,
      ReferencePhone: zeroReference ? {} : this.props.ReferencePhone,
      ReferenceAddress: zeroReference ? {} : this.props.ReferenceAddress,
    })
  }

  updateEmployment = (values) => {
    this.update({
      Employment: values,
    })
  }

  updateDates = (values) => {
    this.update({
      Dates: values,
    })
  }

  updateTitle = (values) => {
    this.update({
      Title: values,
    })
  }

  updateDutyStation = (values) => {
    this.update({
      DutyStation: values,
    })
  }

  updateStatus = (values) => {
    this.update({
      Status: values,
    })
  }

  updateAddress = (values) => {
    this.update({
      Address: values,
    })
  }

  updateTelephone = (values) => {
    this.update({
      Telephone: values,
    })
  }

  updateSupervisor = (values) => {
    this.update({
      Supervisor: values,
    })
  }

  updateReferenceName = (values) => {
    this.update({
      ReferenceName: values,
    })
  }

  updateReferencePhone = (values) => {
    this.update({
      ReferencePhone: values,
    })
  }

  updateReferenceAddress = (values) => {
    this.update({
      ReferenceAddress: values,
    })
  }

  updatePhysicalAddress = (values) => {
    this.update({
      PhysicalAddress: values,
    })
  }

  updateAdditional = (values) => {
    this.update({
      Additional: values,
    })
  }

  updateReasonLeft = (values) => {
    this.update({
      ReasonLeft: values,
    })
  }

  updateReprimand = (values) => {
    this.update({
      Reprimand: values,
    })
  }

  showStatus() {
    const activity = (this.props.EmploymentActivity || {}).value
    return activity && !['Unemployment'].includes(activity)
  }

  showAdditionalActivity() {
    const activity = (this.props.EmploymentActivity || {}).value
    return (
      activity && [
        'OtherFederal',
        'StateGovernment',
        'FederalContractor',
        'Other',
        'NonGovernment',
      ].includes(activity)
    )
  }

  showReference() {
    const activity = (this.props.EmploymentActivity || {}).value
    return activity && ['SelfEmployment', 'Unemployment'].includes(activity)
  }

  showAssignedDuty() {
    const activity = (this.props.EmploymentActivity || {}).value
    return (
      activity && ['ActiveMilitary', 'NationalGuard', 'USPHS'].includes(activity)
    )
  }

  showEmployer() {
    const activity = (this.props.EmploymentActivity || {}).value
    return (
      activity && !['Unemployment', 'ActiveMilitary', 'NationalGuard', 'USPHS'].includes(activity)
    )
  }

  showPhysicalAddress() {
    const activity = (this.props.EmploymentActivity || {}).value
    return (
      activity && [
        'SelfEmployment',
        'OtherFederal',
        'StateGovernment',
        'FederalContractor',
        'NonGovernment',
        'Other',
      ].includes(activity)
    )
  }

  showSupervisor() {
    const activity = (this.props.EmploymentActivity || {}).value
    return (
      activity && [
        'ActiveMilitary',
        'NationalGuard',
        'USPHS',
        'OtherFederal',
        'StateGovernment',
        'FederalContractor',
        'NonGovernment',
        'Other',
      ].includes(activity)
    )
  }

  showEmployed() {
    const activity = (this.props.EmploymentActivity || {}).value
    return activity && !['Unemployment'].includes(activity)
  }

  /**
   * Only show the reasons for leaving if
   *
   *  - employed there within the last # years
   *  - employed by:
   *    - Active Military
   *    - National Guard
   *    - USPHS
   *    - Other Federal
   *    - State Government
   *    - Federal Contractor
   *    - Non-Government
   *    - Self Employment
   *    - Other
   */
  showLeaving(years = 7) {
    const activity = (this.props.EmploymentActivity || {}).value
    const recordYearsAgo = daysAgo(today, 365 * years)
    const now = new Date()
    const dates = this.props.Dates || {}
    const from = extractDate(dates.from)
    const to = dates.present === true ? now : extractDate(dates.to)

    // Check user is within seven years and part of approved employers.
    return (
      (from && from >= recordYearsAgo)
      || (to && to >= recordYearsAgo && [
        'ActiveMilitary',
        'NationalGuard',
        'USPHS',
        'OtherFederal',
        'StateGovernment',
        'FederalContractor',
        'NonGovernment',
        'SelfEmployment',
        'Other',
      ].includes(activity))
    )
  }

  localizeByActivity() {
    const activity = (this.props.EmploymentActivity || {}).value || 'default'
    return activity.toLowerCase()
  }

  render() {
    const { recordYears } = this.props
    const prefix = `history.employment.${this.localizeByActivity()}`.trim()

    const hasDifferentPhysicalAddress = this.props.PhysicalAddress
      && this.props.PhysicalAddress.HasDifferentAddress
      && this.props.PhysicalAddress.HasDifferentAddress.value === 'Yes'

    return (
      <div>
        <EmploymentActivity
          name="EmploymentActivity"
          {...this.props.EmploymentActivity}
          onUpdate={this.updateEmploymentActivity}
          onError={this.props.onError}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.showEmployer()}>
          <Field
            title={i18n.t(`${prefix}.heading.employer`)}
            titleSize="h4"
            adjustFor="labels"
            scrollIntoView={this.props.scrollIntoView}
          >
            <Text
              name="Employment"
              {...this.props.Employment}
              onUpdate={this.updateEmployment}
              onError={this.props.onError}
              className="text full-width employment"
              required={this.props.required}
            />
          </Field>
        </Show>

        <Show when={this.showEmployed()}>
          <Field
            title={i18n.t(`${prefix}.heading.title`)}
            titleSize="h4"
            adjustFor="labels"
            scrollIntoView={this.props.scrollIntoView}
          >
            <Text
              name="Title"
              {...this.props.Title}
              onUpdate={this.updateTitle}
              className="text employment-title"
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
        </Show>

        <Show when={this.showAssignedDuty()}>
          <Field
            title={i18n.t(`${prefix}.heading.dutyStation`)}
            titleSize="h4"
            adjustFor="labels"
            scrollIntoView={this.props.scrollIntoView}
          >
            <Text
              name="DutyStation"
              {...this.props.DutyStation}
              onUpdate={this.updateDutyStation}
              className="text full-width employment-duty-station"
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
        </Show>

        <Show when={this.showStatus()}>
          <Field
            title={i18n.t(`${prefix}.heading.status`)}
            titleSize="h4"
            shrink
            scrollIntoView={this.props.scrollIntoView}
          >
            <EmploymentStatus
              name="Status"
              {...this.props.Status}
              onUpdate={this.updateStatus}
              onError={this.props.onError}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Field>
        </Show>

        <Field
          title={i18n.t('history.employment.default.heading.datesEmployed')}
          titleSize="h4"
          help="history.employment.default.datesEmployed.help"
          adjustFor="daterange"
          shrink
          scrollIntoView={this.props.scrollIntoView}
        >
          <DateRange
            name="Dates"
            {...this.props.Dates}
            receiveProps={this.props.receiveProps}
            minDateEqualTo
            onUpdate={this.updateDates}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Show when={this.showEmployed()}>
          <Field
            title={i18n.t(`${prefix}.heading.address`)}
            titleSize="h4"
            optional
            help={`${prefix}.address.help`}
            adjustFor="address"
            shrink
            scrollIntoView={this.props.scrollIntoView}
          >
            <Location
              name="Address"
              {...this.props.Address}
              layout={Location.ADDRESS}
              geocode
              addressBooks={this.props.addressBooks}
              addressBook="Employment"
              showPostOffice
              dispatch={this.props.dispatch}
              onUpdate={this.updateAddress}
              onError={this.props.onError}
              label={i18n.t(`${prefix}.address.label`)}
              required={this.props.required}
            />
          </Field>
        </Show>

        <Show when={this.showEmployed()}>
          <Field
            title={i18n.t(`${prefix}.heading.telephone`)}
            titleSize="h4"
            className="override-required"
            adjustFor="telephone"
            scrollIntoView={this.props.scrollIntoView}
          >
            <Telephone
              name="Telephone"
              {...this.props.Telephone}
              onUpdate={this.updateTelephone}
              allowNotApplicable={false}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
        </Show>

        <Show when={this.showPhysicalAddress()}>
          <PhysicalAddress
            name="PhysicalAddress"
            {...this.props.PhysicalAddress}
            title={i18n.t(`${prefix}.heading.physicalAddress`)}
            addressBooks={this.props.addressBooks}
            dispatch={this.props.dispatch}
            onUpdate={this.updatePhysicalAddress}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
          {hasDifferentPhysicalAddress && (
            <ConnectedAlternateAddress
              address={this.props.PhysicalAlternateAddress}
              addressBook="Employment"
              belongingTo="PhysicalAlternateAddress"
              country={(
                this.props.PhysicalAddress
                && this.props.PhysicalAddress.Address
                && this.props.PhysicalAddress.Address.country
              )}
              onUpdate={this.update}
            />
          )}
        </Show>

        {this.showEmployed() && !hasDifferentPhysicalAddress && (
          <ConnectedAlternateAddress
            address={this.props.AlternateAddress}
            addressBook="Employment"
            belongingTo="AlternateAddress"
            country={this.props.Address.country}
            onUpdate={this.update}
          />
        )}

        <Show when={this.showSupervisor()}>
          <Supervisor
            name="Supervisor"
            {...this.props.Supervisor}
            addressBooks={this.props.addressBooks}
            dispatch={this.props.dispatch}
            onUpdate={this.updateSupervisor}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
          <ConnectedAlternateAddress
            address={this.props.SupervisorAlternateAddress}
            belongingTo="SupervisorAlternateAddress"
            country={this.props.Supervisor.Address.country}
            militaryAddressLabel={i18n.t('address.militaryAddress.supervisor')}
            onUpdate={this.update}
          />
        </Show>

        <Show when={this.showReference()}>
          <div className="reference">
            <Field
              title={i18n.t(`${prefix}.heading.reference`)}
              titleSize="h4"
              optional
              filterErrors={Name.requiredErrorsOnly}
              scrollIntoView={this.props.scrollIntoView}
            >
              <Name
                name="ReferenceName"
                prefix="name"
                className="reference-name"
                {...this.props.ReferenceName}
                scrollIntoView={this.props.scrollIntoView}
                onUpdate={this.updateReferenceName}
                onError={this.props.onError}
                required={this.props.required}
                hideMiddleName
              />
            </Field>

            <Field
              title={i18n.t('reference.heading.phone.default')}
              titleSize="h4"
              className="override-required"
              help="reference.help.phone"
              adjustFor="telephone"
              scrollIntoView={this.props.scrollIntoView}
            >
              <Telephone
                name="ReferencePhone"
                className="reference-phone"
                {...this.props.ReferencePhone}
                allowNotApplicable={false}
                onUpdate={this.updateReferencePhone}
                onError={this.props.onError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t('reference.heading.employment.address')}
              titleSize="h4"
              optional
              help="reference.help.address"
              adjustFor="address"
              scrollIntoView={this.props.scrollIntoView}
            >
              <p>{i18n.t('reference.para.address')}</p>
              <Location
                name="ReferenceAddress"
                className="reference-address"
                {...this.props.ReferenceAddress}
                label={i18n.t('reference.label.employment.address')}
                layout={Location.ADDRESS}
                geocode
                addressBooks={this.props.addressBooks}
                addressBook="Reference"
                showPostOffice
                dispatch={this.props.dispatch}
                onUpdate={this.updateReferenceAddress}
                onError={this.props.onError}
              />
            </Field>
            <ConnectedAlternateAddress
              address={this.props.ReferenceAlternateAddress}
              addressBook="Reference"
              belongingTo="ReferenceAlternateAddress"
              country={this.props.ReferenceAddress.country}
              militaryAddressLabel={i18n.t(`${prefix}.heading.militaryAddress`)}
              onUpdate={this.update}
            />
          </div>
        </Show>

        <Show when={this.showAdditionalActivity()}>
          <Field
            title={i18n.t(`${prefix}.heading.additionalActivity`)}
            titleSize="h3"
            optional
            className="no-margin-bottom"
            scrollIntoView={this.props.scrollIntoView}
          >
            {i18n.m(`${prefix}.para.additionalActivity`)}
          </Field>

          <AdditionalActivity
            name="Additional"
            {...this.props.Additional}
            employmentFromDate={this.props.Dates.from}
            onUpdate={this.updateAdditional}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Show>

        <Show when={this.showEmployed()}>
          <ReasonLeft
            name="ReasonLeft"
            recordYears={recordYears}
            {...this.props.ReasonLeft}
            Dates={this.props.Dates}
            onUpdate={this.updateReasonLeft}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Show>

        <Show when={this.showEmployed() && this.showLeaving(recordYears)}>
          <Reprimand
            name="Reprimand"
            recordYears={recordYears}
            {...this.props.Reprimand}
            onUpdate={this.updateReprimand}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Show>
      </div>
    )
  }
}

EmploymentItem.defaultProps = {
  EmploymentActivity: {},
  Employment: {},
  Dates: {},
  Title: {},
  DutyStation: {},
  Status: {},
  Address: {},
  Telephone: {},
  Supervisor: { Address: {} },
  ReferenceName: {},
  ReferencePhone: {},
  ReferenceAddress: {},
  PhysicalAddress: {},
  Additional: {},
  ReasonLeft: {},
  Reprimand: {},
  addressBooks: {},
  recordYears: 7,
  dispatch: () => {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
}
