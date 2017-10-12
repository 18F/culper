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

    this.state = {
      Dates: props.Dates,
      Address: props.Address,
      Comments: props.Comments,
      Role: props.Role,
      RoleOther: props.RoleOther,
      Reference: props.Reference
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.handleRoleChange = this.handleRoleChange.bind(this)
  }

  /**
   * Handle any updates and bubble them up.
   */
  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.name,
          Dates: this.state.Dates,
          Address: this.state.Address,
          Comments: this.state.Comments,
          Role: this.state.Role,
          RoleOther: this.state.RoleOther,
          Reference: this.state.Reference
        })
      }
    })
  }

  /**
   * Handle the change event for roles.
   */
  handleRoleChange (event) {
    this.onUpdate('Role', event.target.value)
  }

  /**
   * Certain elements are present if the date range of the residency was
   * within the last 3 years.
   */
  reference () {
    // Some shortcuts so our conditional isn't unreadable
    const dates = this.state.Dates || {}
    const from = dates.from
    const to = dates.to

    if (withinThreeYears(from, to)) {
      return (
        <div>
          <Field title={i18n.t('history.residence.heading.reference')}
                 titleSize="h2"
                 className="no-margin-bottom">
            {i18n.m('history.residence.para.reference')}
          </Field>

          <Reference name="Reference"
                     {...this.state.Reference}
                     addressBooks={this.props.addressBooks}
                     dispatch={this.props.dispatch}
                     onUpdate={this.onUpdate.bind(this, 'Reference')}
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
               help="history.residence.help.address"
               comments={false}
               commentsName="Comments"
               commentsValue={this.state.Comments}
               commentsAdd="history.residence.label.comments"
               onUpdate={this.onUpdate.bind(this, 'Comments')}
               onError={this.props.onError}
               adjustFor="address"
               shrink={true}
               scrollIntoView={this.props.scrollIntoView}>
          <Location name="Address"
                    {...this.state.Address}
                    label={i18n.t('history.residence.label.address')}
                    layout={Location.ADDRESS}
                    geocode={true}
                    addressBook="Residence"
                    addressBooks={this.props.addressBooks}
                    dispatch={this.props.dispatch}
                    onUpdate={this.onUpdate.bind(this, 'Address')}
                    onError={this.props.onError}
                    required={this.props.required}
                    />
        </Field>

        <Field title={i18n.t('history.residence.heading.dates')}
          help="history.residence.help.dates"
          scrollIntoView={this.props.scrollIntoView}>
          <label className="info-label">{i18n.t('history.residence.label.dates')}</label>
          <DateRange name="Dates"
                     {...this.state.Dates}
                     label={i18n.t('history.residence.label.dates')}
                     onUpdate={this.onUpdate.bind(this, 'Dates')}
                     onError={this.props.onError}
                     required={this.props.required}
                     />
        </Field>

        <Field title={i18n.t('history.residence.heading.role')}
               adjustFor="big-buttons"
               shrink={true}
               scrollIntoView={this.props.scrollIntoView}>
          <RadioGroup className="role option-list"
                      required={this.props.required}
                      onError={this.props.onError}
                      selectedValue={this.state.Role}>
            <Radio name="role-owned"
                   label={i18n.m('history.residence.label.role.owned')}
                   value="Owned"
                   onChange={this.handleRoleChange}
                   onError={this.props.onError}
                   />
            <Radio name="role-rented"
                   label={i18n.m('history.residence.label.role.rented')}
                   value="Rented"
                   onChange={this.handleRoleChange}
                   onError={this.props.onError}
                   />
            <Radio name="role-military"
                   label={i18n.m('history.residence.label.role.military')}
                   value="Military"
                   onChange={this.handleRoleChange}
                   onError={this.props.onError}
                   />
            <Radio name="role-other"
                   label={i18n.m('history.residence.label.role.other')}
                   value="Other"
                   onChange={this.handleRoleChange}
                   onError={this.props.onError}
                   />
          </RadioGroup>
        </Field>
        <Show when={this.state.Role && !['Owned', 'Rented', 'Military'].includes(this.state.Role)}>
          <Field title={i18n.t('history.residence.label.role.explanation')}
            titleSize="label"
            help="section.subsection.help.field-name"
            adjustFor="text"
            scrollIntoView={this.props.scrollIntoView}>
            <Text name="RoleOther"
              {...this.state.RoleOther}
              className="other"
              maxlength="100"
              onUpdate={this.onUpdate.bind(this, 'RoleOther')}
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
  addressBooks: {},
  dispatch: (action) => {},
  onError: (value, arr) => { return arr }
}
