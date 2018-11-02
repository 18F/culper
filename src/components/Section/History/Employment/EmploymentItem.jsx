import React from 'react'
import { i18n } from '../../../../config'
import {
  ValidationElement,
  DateRange,
  Location,
  Text,
  Field,
  Telephone,
  Show,
  Name
} from '../../../Form'
import EmploymentActivity from './EmploymentActivity'
import EmploymentStatus from './EmploymentStatus'
import PhysicalAddress from './PhysicalAddress'
import AdditionalActivity from './AdditionalActivity'
import Supervisor from './Supervisor'
import ReasonLeft from './ReasonLeft'
import Reprimand from './Reprimand'
import { today, daysAgo } from '../dateranges'
import { buildDate } from '../../../../validators/helpers'

export default class EmploymentItem extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this);
    this.updateEmploymentActivity = this.updateEmploymentActivity.bind(this)
    this.updateEmployment = this.updateEmployment.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
    this.updateDutyStation = this.updateDutyStation.bind(this)
    this.updateStatus = this.updateStatus.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateTelephone = this.updateTelephone.bind(this)
    this.updateSupervisor = this.updateSupervisor.bind(this)
    this.updateReferenceName = this.updateReferenceName.bind(this)
    this.updateReferencePhone = this.updateReferencePhone.bind(this)
    this.updateReferenceAddress = this.updateReferenceAddress.bind(this)
    this.updatePhysicalAddress = this.updatePhysicalAddress.bind(this)
    this.updateAdditional = this.updateAdditional.bind(this)
    this.updateReasonLeft = this.updateReasonLeft.bind(this)
    this.updateReprimand = this.updateReprimand.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      EmploymentActivity: this.props.EmploymentActivity,
      Employment: this.props.Employment,
      Dates: this.props.Dates,
      Title: this.props.Title,
      DutyStation: this.props.DutyStation,
      Status: this.props.Status,
      Address: this.props.Address,
      Telephone: this.props.Telephone,
      Supervisor: this.props.Supervisor,
      ReferenceName: this.props.ReferenceName,
      ReferencePhone: this.props.ReferencePhone,
      ReferenceAddress: this.props.ReferenceAddress,
      PhysicalAddress: this.props.PhysicalAddress,
      Additional: this.props.Additional,
      ReasonLeft: this.props.ReasonLeft,
      Reprimand: this.props.Reprimand,
      ...queue
    })
  }

  updateEmploymentActivity(values) {
    const activity = (this.props.EmploymentActivity || {}).value
    const zeroReference =
      activity && !['SelfEmployment', 'Unemployment'].includes(activity)
    this.update({
      EmploymentActivity: values,
      ReferenceName: zeroReference ? {} : this.props.ReferenceName,
      ReferencePhone: zeroReference ? {} : this.props.ReferencePhone,
      ReferenceAddress: zeroReference ? {} : this.props.ReferenceAddress
    })
  }

  updateEmployment(values) {
    this.update({
      Employment: values
    })
  }

  updateDates(values) {
    this.update({
      Dates: values
    })
  }

  updateTitle(values) {
    this.update({
      Title: values
    })
  }

  updateDutyStation(values) {
    this.update({
      DutyStation: values
    })
  }

  updateStatus(values) {
    this.update({
      Status: values
    })
  }

  updateAddress(values) {
    this.update({
      Address: values
    })
  }

  updateTelephone(values) {
    this.update({
      Telephone: values
    })
  }

  updateSupervisor(values) {
    this.update({
      Supervisor: values
    })
  }

  updateReferenceName(values) {
    this.update({
      ReferenceName: values
    })
  }

  updateReferencePhone(values) {
    this.update({
      ReferencePhone: values
    })
  }

  updateReferenceAddress(values) {
    this.update({
      ReferenceAddress: values
    })
  }

  updatePhysicalAddress(values) {
    this.update({
      PhysicalAddress: values
    })
  }

  updateAdditional(values) {
    this.update({
      Additional: values
    })
  }

  updateReasonLeft(values) {
    this.update({
      ReasonLeft: values
    })
  }

  updateReprimand(values) {
    this.update({
      Reprimand: values
    })
  }

  showStatus() {
    const activity = (this.props.EmploymentActivity || {}).value
    return activity && !['Unemployment'].includes(activity)
  }

  showAdditionalActivity() {
    const activity = (this.props.EmploymentActivity || {}).value
    return (
      activity &&
      [
        'OtherFederal',
        'StateGovernment',
        'FederalContractor',
        'Other',
        'NonGovernment'
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
      activity &&
      ['ActiveMilitary', 'NationalGuard', 'USPHS'].includes(activity)
    )
  }

  showEmployer() {
    const activity = (this.props.EmploymentActivity || {}).value
    return (
      activity &&
      !['Unemployment', 'ActiveMilitary', 'NationalGuard', 'USPHS'].includes(
        activity
      )
    )
  }

  showPhysicalAddress() {
    const activity = (this.props.EmploymentActivity || {}).value
    return (
      activity &&
      [
        'SelfEmployment',
        'OtherFederal',
        'StateGovernment',
        'FederalContractor',
        'NonGovernment',
        'Other'
      ].includes(activity)
    )
  }

  showSupervisor() {
    const activity = (this.props.EmploymentActivity || {}).value
    return (
      activity &&
      [
        'ActiveMilitary',
        'NationalGuard',
        'USPHS',
        'OtherFederal',
        'StateGovernment',
        'FederalContractor',
        'NonGovernment',
        'Other'
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
   *  - employed there within the last 7 years
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
  showLeaving() {
    const activity = (this.props.EmploymentActivity || {}).value
    const sevenYearsAgo = daysAgo(today, 365 * 7)
    const now = new Date()
    const dates = this.props.Dates || {}
    const from = buildDate(dates.from)
    const to = dates.present === true ? now : buildDate(dates.to)

    // Check user is within seven years and part of approved employers.
    return (
      (from && from >= sevenYearsAgo) ||
      (to &&
        to >= sevenYearsAgo &&
        [
          'ActiveMilitary',
          'NationalGuard',
          'USPHS',
          'OtherFederal',
          'StateGovernment',
          'FederalContractor',
          'NonGovernment',
          'SelfEmployment',
          'Other'
        ].includes(activity))
    )
  }

  localizeByActivity() {
    const activity = (this.props.EmploymentActivity || {}).value || 'default'
    return activity.toLowerCase()
  }

  render() {
    const prefix = `history.employment.${this.localizeByActivity()}`.trim()
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
            adjustFor="labels"
            scrollIntoView={this.props.scrollIntoView}>
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
            adjustFor="labels"
            scrollIntoView={this.props.scrollIntoView}>
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
            adjustFor="labels"
            scrollIntoView={this.props.scrollIntoView}>
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
            shrink={true}
            scrollIntoView={this.props.scrollIntoView}>
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
          title={i18n.t(`history.employment.default.heading.datesEmployed`)}
          help={`history.employment.default.datesEmployed.help`}
          adjustFor="daterange"
          shrink={true}
          scrollIntoView={this.props.scrollIntoView}>
          <DateRange
            name="Dates"
            {...this.props.Dates}
            receiveProps={this.props.receiveProps}
            onUpdate={this.updateDates}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Show when={this.showEmployed()}>
          <Field
            title={i18n.t(`${prefix}.heading.address`)}
            optional={true}
            help={`${prefix}.address.help`}
            adjustFor="address"
            shrink={true}
            scrollIntoView={this.props.scrollIntoView}>
            <Location
              name="Address"
              {...this.props.Address}
              layout={Location.ADDRESS}
              geocode={true}
              addressBooks={this.props.addressBooks}
              addressBook="Employment"
              showPostOffice={true}
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
            className="override-required"
            adjustFor="telephone"
            scrollIntoView={this.props.scrollIntoView}>
            <Telephone
              name="Telephone"
              {...this.props.Telephone}
              onUpdate={this.updateTelephone}
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
        </Show>

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
        </Show>

        <Show when={this.showReference()}>
          <Field
            title={i18n.t(`${prefix}.heading.reference`)}
            titleSize="h2"
            className="no-margin-bottom"
            scrollIntoView={this.props.scrollIntoView}
          />

          <div className="reference">
            <Field
              title={i18n.t('reference.heading.name')}
              optional={true}
              filterErrors={Name.requiredErrorsOnly}
              scrollIntoView={this.props.scrollIntoView}>
              <Name
                name="ReferenceName"
                prefix={'name'}
                className="reference-name"
                {...this.props.ReferenceName}
                scrollIntoView={this.props.scrollIntoView}
                onUpdate={this.updateReferenceName}
                onError={this.props.onError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t('reference.heading.phone.default')}
              className="override-required"
              help={'reference.help.phone'}
              adjustFor="telephone"
              scrollIntoView={this.props.scrollIntoView}>
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
              title={i18n.t('reference.heading.address')}
              optional={true}
              help={'reference.help.address'}
              adjustFor="address"
              scrollIntoView={this.props.scrollIntoView}>
              <p>{i18n.t('reference.para.address')}</p>
              <Location
                name="ReferenceAddress"
                className="reference-address"
                {...this.props.ReferenceAddress}
                label={i18n.t('reference.label.address')}
                layout={Location.ADDRESS}
                geocode={true}
                addressBooks={this.props.addressBooks}
                addressBook="Reference"
                showPostOffice={true}
                dispatch={this.props.dispatch}
                onUpdate={this.updateReferenceAddress}
                onError={this.props.onError}
              />
            </Field>

            { this.props.render({
              country: this.props.ReferenceAddress.country,
              onUpdate: this.update
            })}
          </div>
        </Show>

        <Show when={this.showAdditionalActivity()}>
          <Field
            title={i18n.t(`${prefix}.heading.additionalActivity`)}
            titleSize="h2"
            optional={true}
            className="no-margin-bottom"
            scrollIntoView={this.props.scrollIntoView}>
            {i18n.m(`${prefix}.para.additionalActivity`)}
          </Field>

          <AdditionalActivity
            name="Additional"
            {...this.props.Additional}
            onUpdate={this.updateAdditional}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Show>

        <Show when={this.showEmployed() && this.showLeaving()}>
          <ReasonLeft
            name="ReasonLeft"
            {...this.props.ReasonLeft}
            Dates={this.props.Dates}
            onUpdate={this.updateReasonLeft}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Show>

        <Show when={this.showEmployed() && this.showLeaving()}>
          <Reprimand
            name="Reprimand"
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
  Supervisor: {},
  ReferenceName: {},
  ReferencePhone: {},
  ReferenceAddress: {},
  PhysicalAddress: {},
  Additional: {},
  ReasonLeft: {},
  Reprimand: {},
  addressBooks: {},
  dispatch: action => {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
