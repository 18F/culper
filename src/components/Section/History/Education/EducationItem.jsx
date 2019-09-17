import React from 'react'

import i18n from 'util/i18n'
import {
  ValidationElement,
  BranchCollection,
  DateRange,
  Text,
  RadioGroup,
  Radio,
  Field,
  Location,
  NotApplicable,
  Name,
  Telephone,
  Show,
  Email,
} from 'components/Form'

import { educationRequiresReference } from 'models/education'

import DiplomaItem from './Diploma'

/**
 * Education item in a collection
 *
 * This was broken apart so it could manage minor local state in determining
 * when particular portions of this should be rendered.
 */
export default class EducationItem extends ValidationElement {
  update = (queue) => {
    this.props.onUpdate({
      Dates: this.props.Dates,
      Type: this.props.Type,
      Name: this.props.Name,
      Address: this.props.Address,
      Comments: this.props.Comments,
      ReferenceName: this.props.ReferenceName,
      ReferenceNameNotApplicable: this.props.ReferenceNameNotApplicable,
      ReferencePhone: this.props.ReferencePhone,
      ReferenceEmail: this.props.ReferenceEmail,
      ReferenceEmailNotApplicable: this.props.ReferenceEmailNotApplicable,
      ReferenceAddress: this.props.ReferenceAddress,
      Diplomas: this.props.Diplomas,
      ...queue,
    })
  }

  updateDates = (values) => {
    const dates = values || {}
    const requireReference = educationRequiresReference(dates)

    const {
      ReferenceName, ReferenceNameNotApplicable, ReferencePhone, ReferenceEmail,
      ReferenceEmailNotApplicable, ReferenceAddress,
    } = this.props

    this.update({
      Dates: values,
      ReferenceName: requireReference ? ReferenceName : {},
      ReferenceNameNotApplicable: requireReference ? ReferenceNameNotApplicable : {},
      ReferencePhone: requireReference ? ReferencePhone : {},
      ReferenceEmail: requireReference ? ReferenceEmail : {},
      ReferenceEmailNotApplicable: requireReference ? ReferenceEmailNotApplicable : {},
      ReferenceAddress: requireReference ? ReferenceAddress : {},
    })
  }

  updateType = (values) => {
    this.update({
      Type: values,
    })
  }

  updateName = (values) => {
    this.update({
      Name: values,
    })
  }

  updateAddress = (values) => {
    this.update({
      Address: values,
    })
  }

  updateReferenceName = (values) => {
    this.update({
      ReferenceName: values,
      ReferenceNameNotApplicable: { applicable: true },
    })
  }

  updateReferenceNameNotApplicable = (values) => {
    this.update({
      ReferenceName: values.applicable ? this.props.ReferenceName : {},
      ReferenceNameNotApplicable: values,
    })
  }

  updateReferencePhone = (values) => {
    this.update({
      ReferencePhone: values,
    })
  }

  updateReferenceEmail = (values) => {
    this.update({
      ReferenceEmail: values,
      ReferenceEmailNotApplicable: { applicable: true },
    })
  }

  updateReferenceEmailNotApplicable = (values) => {
    this.update({
      ReferenceEmail: values.applicable ? this.props.ReferenceEmail : {},
      ReferenceEmailNotApplicable: values,
    })
  }

  updateReferenceAddress = (values) => {
    this.update({
      ReferenceAddress: values,
    })
  }

  updateDiplomas = (values) => {
    this.update({
      Diplomas: values,
    })
  }

  render() {
    // Certain elements are present if the date range of the attendance was
    // within the last 3 years.
    const { Dates = {} } = this.props
    const requireReference = educationRequiresReference(Dates)

    return (
      <div className="education">
        <div className="content">
          <Field
            title={i18n.t('history.education.heading.name')}
            titleSize="h4"
            adjustFor="labels"
            scrollIntoView={this.props.scrollIntoView}
          >
            <Text
              name="Name"
              {...this.props.Name}
              className="school-name"
              maxlength="100"
              onUpdate={this.updateName}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>

          <Field
            title={i18n.t('history.education.heading.dates')}
            titleSize="h4"
            help="history.education.help.dates"
            adjustFor="daterange"
            shrink={true}
            scrollIntoView={this.props.scrollIntoView}
          >
            <DateRange
              name="Dates"
              {...this.props.Dates}
              label={i18n.t('history.education.label.dates')}
              minDateEqualTo={true}
              onUpdate={this.updateDates}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>

          <Field
            title={i18n.t('history.education.heading.address')}
            titleSize="h4"
            optional={true}
            help="history.education.help.address"
            onError={this.props.onError}
            adjustFor="address"
            shrink={true}
            scrollIntoView={this.props.scrollIntoView}
          >
            {/* eslint jsx-a11y/label-has-associated-control: 0 */}
            {/* eslint jsx-a11y/label-has-for: 0 */}
            <label className="into-label">
              {i18n.m('history.education.label.addressLink')}
            </label>
            <Location
              name="Address"
              {...this.props.Address}
              label={i18n.t('history.education.label.address')}
              layout={Location.ADDRESS}
              dispatch={this.props.dispatch}
              addressBooks={this.props.addressBooks}
              addressBook="Education"
              geocode={true}
              showPostOffice={true}
              onUpdate={this.updateAddress}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>

          <Field
            title={i18n.t('history.education.heading.type')}
            titleSize="h4"
            adjustFor="big-buttons"
            shrink={true}
            scrollIntoView={this.props.scrollIntoView}
          >
            <RadioGroup
              className="type option-list option-list-vertical"
              required={this.props.required}
              onError={this.props.onError}
              selectedValue={(this.props.Type || {}).value}
            >
              <Radio
                name="type-highschool"
                className="type-highschool"
                label={i18n.m('history.education.label.type.highschool')}
                value="High School"
                onUpdate={this.updateType}
                onError={this.props.onError}
              />
              <Radio
                name="type-college"
                className="type-college"
                label={i18n.m('history.education.label.type.college')}
                value="College"
                onUpdate={this.updateType}
                onError={this.props.onError}
              />
              <Radio
                name="type-vocational"
                className="type-vocational"
                label={i18n.m('history.education.label.type.vocational')}
                value="Vocational"
                onUpdate={this.updateType}
                onError={this.props.onError}
              />
              <Radio
                name="type-correspondence"
                className="type-correspondence"
                label={i18n.m('history.education.label.type.correspondence')}
                value="Correspondence"
                onUpdate={this.updateType}
                onError={this.props.onError}
              />
            </RadioGroup>
          </Field>

          <Show when={requireReference}>
            <div className="reference">
              <Field
                title={i18n.t('history.education.heading.reference')}
                titleSize="h3"
                className="no-margin-bottom"
                scrollIntoView={this.props.scrollIntoView}
              >
                {i18n.m('history.education.para.reference')}
              </Field>

              <Field
                title={i18n.t('reference.heading.name')}
                titleSize="h4"
                optional={true}
                filterErrors={Name.requiredErrorsOnly}
                scrollIntoView={this.props.scrollIntoView}
              >
                <NotApplicable
                  name="ReferenceNameNotApplicable"
                  {...this.props.ReferenceNameNotApplicable}
                  label={i18n.t('reference.label.idk')}
                  or={i18n.m('reference.para.or')}
                  onUpdate={this.updateReferenceNameNotApplicable}
                  onError={this.props.onError}
                >
                  <Name
                    name="ReferenceName"
                    prefix="name"
                    className="reference-name"
                    {...this.props.ReferenceName}
                    scrollIntoView={this.props.scrollIntoView}
                    hideMiddleName={true}
                    onUpdate={this.updateReferenceName}
                    onError={this.props.onError}
                    required={this.props.required}
                  />
                </NotApplicable>
              </Field>

              <Field
                title={i18n.t('reference.heading.correspondence')}
                titleSize="h4"
                optional={true}
                className="no-margin-bottom"
                scrollIntoView={this.props.scrollIntoView}
              >
                {i18n.m('reference.para.correspondence')}
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
                  onUpdate={this.updateReferencePhone}
                  allowNotApplicable={false}
                  onError={this.props.onError}
                  required={this.props.required}
                />
              </Field>

              <Field
                title={i18n.t('reference.heading.email')}
                titleSize="h4"
                help="reference.help.email"
                adjustFor="label"
                scrollIntoView={this.props.scrollIntoView}
              >
                <NotApplicable
                  name="ReferenceEmailNotApplicable"
                  {...this.props.ReferenceEmailNotApplicable}
                  label={i18n.t('reference.label.idk')}
                  or={i18n.m('reference.para.or')}
                  onUpdate={this.updateReferenceEmailNotApplicable}
                  onError={this.props.onError}
                >
                  <Email
                    name="ReferenceEmail"
                    {...this.props.ReferenceEmail}
                    className="reference-email"
                    label={i18n.t('reference.label.email')}
                    onUpdate={this.updateReferenceEmail}
                    onError={this.props.onError}
                  />
                </NotApplicable>
              </Field>

              <Field
                title={i18n.t('reference.heading.address')}
                titleSize="h4"
                optional={true}
                help="reference.help.address"
                adjustFor="address"
                scrollIntoView={this.props.scrollIntoView}
              >
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
            </div>
          </Show>

          <BranchCollection
            label={i18n.t('history.education.heading.degree')}
            titleSize="h4"
            appendLabel={i18n.t('history.education.heading.degreeTail')}
            className="receive-degree"
            {...this.props.Diplomas}
            onUpdate={this.updateDiplomas}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <DiplomaItem
              name="Item"
              bind={true}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </BranchCollection>
        </div>
      </div>
    )
  }
}

EducationItem.defaultProps = {
  Dates: {},
  Type: {},
  Name: {},
  Address: {},
  Comments: {},
  ReferenceName: {},
  ReferenceNameNotApplicable: { applicable: true },
  ReferencePhone: {},
  ReferenceEmail: {},
  ReferenceEmailNotApplicable: { applicable: true },
  ReferenceAddress: {},
  Diplomas: { items: [] },
  onUpdate: () => {},
  onError: (value, arr) => arr,
}
