import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, DateRange, Reference, Text, RadioGroup, Radio, Field, Location, Show } from '../../../Form'
import { today, daysAgo } from '../dateranges'

// We need to determine how far back 3 years ago was
const threeYearsAgo = daysAgo(today, 365 * 3)
const withinThreeYears = (from, to) => {
  return (from && from.date >= threeYearsAgo) || (to && to.date >= threeYearsAgo)
}

/**
 * Residence item in a collection
 *
 * This was broken apart so it could manage minor local state in determining
 * when particular portions of this should be rendered.
 */
export default class ResidenceItem extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateReference = this.updateReference.bind(this)
    this.updateComments = this.updateComments.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updateRole = this.updateRole.bind(this)
    this.updateRoleOther = this.updateRoleOther.bind(this)
  }

  /**
   * Handle any updates and bubble them up.
   */
  update (queue) {
    this.props.onUpdate({
      name: this.props.name,
      Dates: this.props.Dates,
      Address: this.props.Address,
      Comments: this.props.Comments,
      Role: this.props.Role,
      RoleOther: this.props.RoleOther,
      Reference: this.props.Reference,
      ...queue
    })
  }

  updateReference (values) {
    this.update({
      Reference: values
    })
  }

  updateComments (values) {
    this.update({
      Comments: values
    })
  }

  updateAddress (values) {
    this.update({
      Address: values
    })
  }

  updateDates (values) {
    this.update({
      Dates: values
    })
  }

  updateRole (values) {
    this.update({
      Role: values
    })
  }

  updateRoleOther (values) {
    this.update({
      RoleOther: values
    })
  }

  /**
   * Certain elements are present if the date range of the residency was
   * within the last 3 years.
   */
  reference () {
    // Some shortcuts so our conditional isn't unreadable
    const dates = this.props.Dates || {}
    const from = dates.from
    const to = dates.to

    if (withinThreeYears(from, to)) {
      return (
        <div>
          <Field title={i18n.t('history.residence.heading.reference')}
                 titleSize="h2"
                 optional={true}
                 className="no-margin-bottom">
            {i18n.m('history.residence.para.reference')}
          </Field>

          <Reference name="Reference"
                     {...this.props.Reference}
                     addressBooks={this.props.addressBooks}
                     dispatch={this.props.dispatch}
                     onUpdate={this.updateReference}
                     onError={this.props.onError}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}
                     />
        </div>
      )
    }

    return null
  }

  render () {
    return (
      <div className="residence">
        <Field title={i18n.t('history.residence.heading.address')}
               optional={true}
               help="history.residence.help.address"
               comments={false}
               commentsName="Comments"
               commentsValue={this.props.Comments}
               commentsAdd="history.residence.label.comments"
               onUpdate={this.updateComments}
               onError={this.props.onError}
               adjustFor="address"
               shrink={true}
               scrollIntoView={this.props.scrollIntoView}>
          <Location name="Address"
                    {...this.props.Address}
                    label={i18n.t('history.residence.label.address')}
                    layout={Location.ADDRESS}
                    geocode={true}
                    addressBook="Residence"
                    addressBooks={this.props.addressBooks}
                    dispatch={this.props.dispatch}
                    onUpdate={this.updateAddress}
                    onError={this.props.onError}
                    required={this.props.required}
                    />
        </Field>

        <Field title={i18n.t('history.residence.heading.dates')}
               help="history.residence.help.dates"
               scrollIntoView={this.props.scrollIntoView}>
          <label className="info-label">{i18n.t('history.residence.label.dates')}</label>
          <DateRange name="Dates"
                     {...this.props.Dates}
                     label={i18n.t('history.residence.label.dates')}
                     onUpdate={this.updateDates}
                     onError={this.props.onError}
                     required={this.props.required}
                     />
        </Field>

        <Field title={i18n.t('history.residence.heading.role')}
               className={(this.props.Role || {}).value === 'Other' ? 'no-margin-bottom' : ''}
               scrollIntoView={this.props.scrollIntoView}>
          <RadioGroup className="role option-list"
                      required={this.props.required}
                      onError={this.props.onError}
                      selectedValue={(this.props.Role || {}).value}>
            <Radio name="role-owned"
                   label={i18n.m('history.residence.label.role.owned')}
                   value="Owned"
                   onUpdate={this.updateRole}
                   onError={this.props.onError}
                   />
            <Radio name="role-rented"
                   label={i18n.m('history.residence.label.role.rented')}
                   value="Rented"
                   onUpdate={this.updateRole}
                   onError={this.props.onError}
                   />
            <Radio name="role-military"
                   label={i18n.m('history.residence.label.role.military')}
                   value="Military"
                   onUpdate={this.updateRole}
                   onError={this.props.onError}
                   />
            <Radio name="role-other"
                   label={i18n.m('history.residence.label.role.other')}
                   value="Other"
                   onUpdate={this.updateRole}
                   onError={this.props.onError}
                   />
          </RadioGroup>
        </Field>
        <Show when={(this.props.Role || {}).value && !['Owned', 'Rented', 'Military'].includes((this.props.Role || {}).value)}>
          <Field title={i18n.t('history.residence.label.role.explanation')}
                 titleSize="label"
                 help="section.subsection.help.field-name"
                 adjustFor="text"
                 scrollIntoView={this.props.scrollIntoView}>
            <Text name="RoleOther"
                  {...this.props.RoleOther}
                  className="other"
                  maxlength="100"
                  onUpdate={this.updateRoleOther}
                  onError={this.props.onError}
                  required={this.props.required}
                  />
          </Field>
        </Show>

        {this.reference()}
      </div>
    )
  }
}

ResidenceItem.defaultProps = {
  Dates: {},
  Address: {},
  Comments: {},
  Role: {},
  RoleOther: {},
  Reference: {},
  addressBooks: {},
  dispatch: (action) => {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
