import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Comments, DateRange, Reference, Text, RadioGroup, Radio, Help, HelpIcon, Address } from '../../../Form'
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
export class ResidenceItem extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      Dates: props.Dates,
      Address: props.Address,
      Comments: props.Comments,
      Role: props.Role,
      OtherRole: props.OtherRole,
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
          OtherRole: this.state.OtherRole,
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
   * Some fields are only visible if `Other` is selected
   */
  showOther (value) {
    return !value || ['Owned', 'Rented', 'Military'].includes(value) ? 'hidden' : ''
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
          <h2>{i18n.t('history.residence.heading.reference')}</h2>
          <p>{i18n.t('history.residence.para.reference')}</p>
          <Reference name="Reference"
                     {...this.state.Reference}
                     onUpdate={this.onUpdate.bind(this, 'Reference')}
                     onValidate={this.props.onValidate}
                     />
        </div>
      )
    }

    return null
  }

  render () {
    return (
      <div className="residence">
        <Comments name="Comments"
                  {...this.state.Comments}
                  className="eapp-field-wrap"
                  addLabel="history.residence.label.comments"
                  title={i18n.t('history.residence.heading.comments')}
                  onUpdate={this.onUpdate.bind(this, 'Comments')}
                  onValidate={this.props.onValidate}>
          <h3>{i18n.t('history.residence.heading.address')}</h3>
          <div className="eapp-field-wrap">
            <Help id="history.residence.help.address">
              <Address name="Address"
                       {...this.state.Address}
                       label={i18n.t('history.residence.label.address')}
                       onUpdate={this.onUpdate.bind(this, 'Address')}
                       onValidate={this.props.onValidate}
                       />
              <HelpIcon className="address-help-icon" />
            </Help>
          </div>
        </Comments>

        <h3>{i18n.t('history.residence.heading.dates')}</h3>
        <div className="eapp-field-wrap">
          <label className="info-label">{i18n.t('history.residence.label.dates')}</label>
          <Help id="history.residence.help.dates">
            <DateRange name="Dates"
                       {...this.state.Dates}
                       label={i18n.t('history.residence.label.dates')}
                       onUpdate={this.onUpdate.bind(this, 'Dates')}
                       onValidate={this.props.onValidate}
                       />
            <HelpIcon className="dates-help-icon" />
          </Help>
        </div>

        <h3>{i18n.t('history.residence.heading.role')}</h3>
        <div className="eapp-field-wrap">
          <Help id="history.residence.help.role">
            <RadioGroup className="role option-list"
                        selectedValue={this.state.Role}>
              <Radio name="role-owned"
                     label={i18n.t('history.residence.label.role.owned')}
                     value="Owned"
                     onChange={this.handleRoleChange}
                     />
              <Radio name="role-rented"
                     label={i18n.t('history.residence.label.role.rented')}
                     value="Rented"
                     onChange={this.handleRoleChange}
                     />
              <Radio name="role-military"
                     label={i18n.t('history.residence.label.role.military')}
                     value="Military"
                     onChange={this.handleRoleChange}
                     />
              <Radio name="role-other"
                     label={i18n.t('history.residence.label.role.other')}
                     value="Other"
                     onChange={this.handleRoleChange}
                     />
            </RadioGroup>
            <HelpIcon className="role-help-icon" />
            <div className={`role ${this.showOther(this.state.Role)}`.trim()}>
              <Text name="OtherRole"
                    {...this.state.OtherRole}
                    label={i18n.t('history.residence.label.role.explanation')}
                    className="other"
                    maxlength="100"
                    onUpdate={this.onUpdate.bind(this, 'OtherRole')}
                    onValidate={this.props.onValidate}
                    />
            </div>
          </Help>
        </div>

        {this.reference()}
      </div>
    )
  }
}
