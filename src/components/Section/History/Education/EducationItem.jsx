import React from 'react'
import { i18n } from '../../../../config'
import { nameIsEmpty } from '../../../../validators'
import { ValidationElement, BranchCollection, DateRange, Text,
         RadioGroup, Radio, Field, Location, NotApplicable,
         Name, Telephone, Show, Email } from '../../../Form'
import { DiplomaItem } from './Diploma'
import { today, daysAgo } from '../dateranges'

// We need to determine how far back 3 years ago was
const threeYearsAgo = daysAgo(today, 365 * 3)
const withinThreeYears = (from, to) => {
  return (from && from >= threeYearsAgo) || (to && to >= threeYearsAgo)
}

/**
 * Education item in a collection
 *
 * This was broken apart so it could manage minor local state in determining
 * when particular portions of this should be rendered.
 */
export default class EducationItem extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updateType = this.updateType.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateComments = this.updateComments.bind(this)
    this.updateReferenceName = this.updateReferenceName.bind(this)
    this.updateReferenceNameNotApplicable = this.updateReferenceNameNotApplicable.bind(this)
    this.updateReferencePhone = this.updateReferencePhone.bind(this)
    this.updateReferenceEmail = this.updateReferenceEmail.bind(this)
    this.updateReferenceEmailNotApplicable = this.updateReferenceEmailNotApplicable.bind(this)
    this.updateReferenceAddress = this.updateReferenceAddress.bind(this)
    this.updateDiplomas = this.updateDiplomas.bind(this)
  }

  update (queue) {
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
      ...queue
    })
  }

  updateDates (values) {
    this.update({
      Dates: values
    })
  }

  updateType (values) {
    this.update({
      Type: values
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

  updateComments (values) {
    this.update({
      Comments: values
    })
  }

  updateReferenceName (values) {
    this.update({
      ReferenceName: values
    })
  }

  updateReferenceNameNotApplicable (values) {
    this.update({
      ReferenceNameNotApplicable: values
    })
  }

  updateReferencePhone (values) {
    this.update({
      ReferencePhone: values
    })
  }

  updateReferenceEmail (values) {
    this.update({
      ReferenceEmail: values
    })
  }

  updateReferenceEmailNotApplicable (values) {
    this.update({
      ReferenceEmailNotApplicable: values
    })
  }

  updateReferenceAddress (values) {
    this.update({
      ReferenceAddress: values
    })
  }

  updateDiplomas (values) {
    this.update({
      Diplomas: values
    })
  }

  diplomaSummary (item, index) {
    const unk = i18n.t('history.education.collection.diploma.summary.unknown')
    const diploma = item.Diploma || {}
    const d = diploma.Date || {}
    const text = (diploma.Diploma === 'Other' ? diploma.DiplomaOther : diploma.Diploma) || unk
    const dd = d.date
          ? `${d.month}/${d.year}`
          : unk

    return (
      <span>
        <span className="index">
          {i18n.t('history.education.collection.diploma.summary.item')} {index + 1}:
        </span>
        <span className=""><strong>{ text }</strong></span>
        <span className="dates"><strong>{ dd }</strong></span>
      </span>
    )
  }

  render () {
    // Certain elements are present if the date range of the attendance was
    // within the last 3 years.
    const dates = this.props.Dates || {}
    const from = (dates.from || {}).date
    const to = (dates.to || {}).date

    return (
      <div className="education">
        <div className="content">
          <Field title={i18n.t('history.education.heading.name')}
                 adjustFor="labels"
                 scrollIntoView={this.props.scrollIntoView}>
            <Text name="Name"
                  {...this.props.Name}
                  label={i18n.t('history.education.label.name')}
                  className="school-name"
                  maxlength="100"
                  onUpdate={this.updateName}
                  onError={this.props.onError}
                  required={this.props.required}
                  />
          </Field>

          <Field title={i18n.t('history.education.heading.dates')}
                 help="history.education.help.dates"
                 adjustFor="daterange"
                 shrink={true}
                 scrollIntoView={this.props.scrollIntoView}>
            <label className="info-label">{i18n.t('history.education.label.dates')}</label>
            <DateRange name="Dates"
                       {...this.props.Dates}
                       label={i18n.t('history.education.label.dates')}
                       onUpdate={this.updateDates}
                       onError={this.props.onError}
                       required={this.props.required}
                       />
          </Field>

          <Field title={i18n.t('history.education.heading.address')}
                 optional={true}
                 help="history.education.help.address"
                 comments={true}
                 commentsName="Comments"
                 commentsValue={this.props.Comments}
                 onUpdate={this.updateComments}
                 onError={this.props.onError}
                 adjustFor="address"
                 shrink={true}
                 scrollIntoView={this.props.scrollIntoView}>
            <Location name="Address"
                      {...this.props.Address}
                      label={i18n.t('history.education.label.address')}
                      layout={Location.ADDRESS}
                      dispatch={this.props.dispatch}
                      addressBooks={this.props.addressBooks}
                      addressBook="Education"
                      geocode={true}
                      onUpdate={this.updateAddress}
                      onError={this.props.onError}
                      required={this.props.required}
                      />
          </Field>

          <Field title={i18n.t('history.education.heading.type')}
                 adjustFor="big-buttons"
                 shrink={true}
                 scrollIntoView={this.props.scrollIntoView}>
            <RadioGroup className="type option-list"
                        required={this.props.required}
                        onError={this.props.onError}
                        selectedValue={(this.props.Type || {}).value}>
              <Radio name="type-highschool"
                     className="type-highschool"
                     label={i18n.m('history.education.label.type.highschool')}
                     value="High School"
                     onUpdate={this.updateType}
                     onError={this.props.onError}
                     />
              <Radio name="type-college"
                     className="type-college"
                     label={i18n.m('history.education.label.type.college')}
                     value="College"
                     onUpdate={this.updateType}
                     onError={this.props.onError}
                     />
              <Radio name="type-vocational"
                     className="type-vocational"
                     label={i18n.m('history.education.label.type.vocational')}
                     value="Vocational"
                     onUpdate={this.updateType}
                     onError={this.props.onError}
                     />
              <Radio name="type-correspondence"
                     className="type-correspondence"
                     label={i18n.m('history.education.label.type.correspondence')}
                     value="Correspondence"
                     onUpdate={this.updateType}
                     onError={this.props.onError}
                     />
            </RadioGroup>
          </Field>

          <Show when={withinThreeYears(from, to)}>
            <div className="reference">
              <Field title={i18n.t('history.education.heading.reference')}
                     titleSize="h2"
                     className="no-margin-bottom">
                {i18n.m('history.education.para.reference')}
              </Field>

              <Field title={i18n.t('reference.heading.name')}
                     titleSize="h3"
                     optional={true}>
                <NotApplicable name="ReferenceNameNotApplicable"
                               {...this.props.ReferenceNameNotApplicable}
                               label={i18n.t('reference.label.idk')}
                               or={i18n.m('reference.para.or')}
                               onUpdate={this.updateReferenceNameNotApplicable}>
                  <Name name="ReferenceName"
                        prefix={'name'}
                        className="reference-name"
                        {...this.props.ReferenceName}
                        onUpdate={this.updateReferenceName}
                        onError={this.props.onError}
                        required={this.props.required}
                        />
                </NotApplicable>
              </Field>

              <Show when={!nameIsEmpty(this.props.ReferenceName)}>
                <Field title={i18n.t('reference.heading.correspondence')}
                       titleSize="h2"
                       optional={true}
                       className="no-margin-bottom">
                  {i18n.m('reference.para.correspondence')}
                </Field>

                <Field title={i18n.t('reference.heading.phone.default')}
                       className="override-required"
                       help={'reference.help.phone'}
                       adjustFor="telephone"
                       scrollIntoView={this.props.scrollIntoView}>
                  <Telephone name="ReferencePhone"
                             className="reference-phone"
                             {...this.props.ReferencePhone}
                             onUpdate={this.updateReferencePhone}
                             onError={this.props.onError}
                             required={this.props.required}
                             />
                </Field>

                <Field title={i18n.t('reference.heading.email')}
                       help={'reference.help.email'}
                       adjustFor="label">
                  <NotApplicable name="ReferenceEmailNotApplicable"
                                 {...this.props.ReferenceEmailNotApplicable}
                                 label={i18n.t('reference.label.idk')}
                                 or={i18n.m('reference.para.or')}
                                 onUpdate={this.updateReferenceEmailNotApplicable}>
                    <Email name="ReferenceEmail"
                           {...this.props.ReferenceEmail}
                           className="reference-email"
                           label={i18n.t('reference.label.email')}
                           onUpdate={this.updateReferenceEmail}
                           onError={this.props.onError}
                           />
                  </NotApplicable>
                </Field>

                <Field title={i18n.t('reference.heading.address')}
                       optional={true}
                       help={'reference.help.address'}
                       adjustFor="address">
                  <p>{i18n.t('reference.para.address')}</p>
                  <Location name="ReferenceAddress"
                            className="reference-address"
                            {...this.props.ReferenceAddress}
                            label={i18n.t('reference.label.address')}
                            layout={Location.ADDRESS}
                            geocode={true}
                            addressBooks={this.props.addressBooks}
                            addressBook="Reference"
                            dispatch={this.props.dispatch}
                            onUpdate={this.updateReferenceAddress}
                            onError={this.props.onError}
                            />
                </Field>
              </Show>
            </div>
          </Show>

          <BranchCollection label={i18n.t('history.education.heading.degree')}
                            appendLabel={i18n.t('history.education.heading.degreeTail')}
                            className="receive-degree"
                            {...this.props.Diplomas}
                            onUpdate={this.updateDiplomas}
                            onError={this.props.onError}
                            required={this.props.required}
                            scrollIntoView={this.props.scrollIntoView}>
            <DiplomaItem name="Item" bind={true} required={this.props.required} scrollIntoView={this.props.scrollIntoView} />
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
  ReferenceNameNotApplicable: {},
  ReferencePhone: {},
  ReferenceEmail: {},
  ReferenceEmailNotApplicable: {},
  ReferenceAddress: {},
  Diplomas: { items: [] },
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
