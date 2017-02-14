import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Collection, Comments, DateRange, Reference, Text, RadioGroup, Radio, Help, HelpIcon, Address, Svg } from '../../../Form'

// We need to determine how far back 3 years ago was
const threeYearsAgo = new Date(new Date() - (1000 * 60 * 60 * 24 * 365 * 3))
const withinThreeYears = (from, to) => {
  return (from && from >= threeYearsAgo) || (to && to >= threeYearsAgo)
}

/**
 * Residence collection
 */
export default class Residence extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      List: props.List || [],
      Comments: props.Comments,
      errorCodes: []
    }

    this.myDispatch = this.myDispatch.bind(this)
    this.summary = this.summary.bind(this)
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    if (!event) {
      return
    }

    let codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.isValid()) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      let e = { [this.props.name]: codes }
      let s = { [this.props.name]: { status: complexStatus } }
      if (this.state.error === false || this.state.valid === true) {
        super.handleValidation(event, s, e)
        return
      }

      super.handleValidation(event, s, e)
    })
  }

  /**
   * Determine if all items in the collection are considered to be in
   * a valid state.
   */
  isValid () {
    for (let residence of this.state.List) {
      const item = residence.Item
      if (!item || !item.Dates || !item.Dates.from || (!item.Dates.to && !item.Dates.present)) {
        return false
      }

      if (!item.Address) {
        return false
      }

      switch (item.Address.addressType) {
        case 'United States':
          if (!item.Address.address || !item.Address.city || !item.Address.state || !item.Address.zipcode) {
            return false
          }
          break

        case 'International':
          if (!item.Address.address || !item.Address.city || !item.Address.country) {
            return false
          }
          break

        case 'APOFPO':
          if (!item.Address.address || !item.Address.apoFpo || !item.Address.apoFpoType || !item.Address.zipcode) {
            return false
          }
          break

        default:
          return false
      }

      if (!item.Role) {
        return false
      }

      if (withinThreeYears(item.Dates.from, item.Dates.to)) {
        if (!item.Reference) {
          return false
        }

        if (!item.Reference.FullName) {
          return false
        }

        if (!item.Reference.FullName.first || !item.Reference.FullName.last) {
          return false
        }

        if (!item.Reference.LastContact) {
          return false
        }

        if (!item.Reference.LastContact.date) {
          return false
        }

        if (!item.Reference.Relationship) {
          return false
        }

        if (!item.Reference.Phone) {
          return false
        }

        if (!item.Reference.Phone.number) {
          return false
        }

        if (!item.Reference.Email) {
          return false
        }

        if (!item.Reference.Address) {
          return false
        }

        switch (item.Reference.Address.addressType) {
          case 'United States':
            if (!item.Reference.Address.address || !item.Reference.Address.city || !item.Reference.Address.state || !item.Reference.Address.zipcode) {
              return false
            }
            break

          case 'International':
            if (!item.Reference.Address.address || !item.Reference.Address.city || !item.Reference.Address.country) {
              return false
            }
            break

          case 'APOFPO':
            if (!item.Reference.Address.address || !item.Reference.Address.apoFpo || !item.Reference.Address.apoFpoType || !item.Reference.Address.zipcode) {
              return false
            }
            break

          default:
            return false
        }
      }
    }

    return true
  }

  /**
   * Dispatch callback initiated from the collection to notify of any new
   * updates to the items.
   */
  myDispatch (collection) {
    this.setState({ List: collection }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          List: this.state.List,
          Comments: this.state.Comments
        })
      }
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const res = item.Item || {}

    let address1 = ''
    let address2 = ''
    if (res.Address) {
      address1 += `${res.Address.address || ''}`.trim()
      if (res.Address.addressType === 'United States') {
        address2 = `${res.Address.city || ''}, ${res.Address.state || ''} ${res.Address.zipcode || ''}`.trim()
      } else if (res.Address.addressType === 'APOFPO') {
        address2 = `${res.Address.apoFpoType || ''}, ${res.Address.apoFpo || ''} ${res.Address.zipcode || ''}`.trim()
      } else if (res.Address.addressType === 'International') {
        address2 = `${res.Address.city || ''}, ${res.Address.country || ''}`.trim()
      }
    }

    if (address1.length === 0 || address2.length === 1) {
      address1 = i18n.t('history.residence.collection.summary.unknown')
    }

    const dates = res.Dates || {}
    let from = i18n.t('history.residence.collection.summary.unknown')
    if (dates.from) {
      from = '' + dates.from.getMonth() + '/' + dates.from.getFullYear()
    }
    let to = i18n.t('history.residence.collection.summary.unknown')
    if (dates.to) {
      to = '' + dates.to.getMonth() + '/' + dates.to.getFullYear()
    }

    return (
      <div className="table">
        <div className="table-cell index">
          <Svg src="img/residence-house.svg" />
          {i18n.t('history.residence.collection.summary.item')} {index + 1}:
        </div>
        <div className="table-cell">{address1}<br />{address2}</div>
        <div className="table-cell dates">{from}-{to}</div>
      </div>
    )
  }

  render () {
    const klass = `residences ${this.props.className || ''}`.trim()
    return (
      <div className={klass}>
        <Collection minimum="1"
                    items={this.state.List}
                    dispatch={this.myDispatch}
                    summary={this.summary}
                    summaryTitle={i18n.t('history.residence.collection.summary.title')}
                    appendLabel={i18n.t('history.residence.collection.append')}>
          <h3>{i18n.t('history.residence.heading.details')}</h3>
          <p>{i18n.t('history.residence.para.details')}</p>
          <ResidenceItem name="Item"
                         onValidate={this.handleValidation} />
          <h2>{i18n.t('history.residence.heading.done')}</h2>
          <p>{i18n.t('history.residence.para.done')}</p>
        </Collection>
      </div>
    )
  }
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
          <h3>{i18n.t('history.residence.heading.reference')}</h3>
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
        <h4>{i18n.t('history.residence.heading.dates')}</h4>
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

        <Comments name="Comments"
                  {...this.state.Comments}
                  addLabel="history.residence.label.comments"
                  title={i18n.t('history.residence.heading.comments')}
                  className="eapp-field-wrap"
                  onUpdate={this.onUpdate.bind(this, 'Comments')}
                  onValidate={this.props.onValidate}>
          <h4>{i18n.t('history.residence.heading.address')}</h4>
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

        <h4>{i18n.t('history.residence.heading.role')}</h4>
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
            <div className={this.showOther(this.state.Role) + ' role'}>
              <Text name="Role"
                    {...this.state.OtherRole}
                    label={i18n.t('history.residence.label.role.explanation')}
                    className="other"
                    maxlength="100"
                    onUpdate={this.onUpdate.bind(this, 'OtherRole')}
                    onValidate={this.props.handleValidation}
                    />
            </div>
          </Help>
        </div>

        {this.reference()}
      </div>
    )
  }
}
