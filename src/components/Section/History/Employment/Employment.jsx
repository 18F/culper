import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Collection, DateRange, Address, Text, Help, HelpIcon, Reference, Telephone, Svg } from '../../../Form'
import EmploymentActivity from './EmploymentActivity'
import EmploymentStatus from './EmploymentStatus'
import PhysicalAddress from './PhysicalAddress'
import AdditionalActivity from './AdditionalActivity'
import Supervisor from './Supervisor'

export default class Employment extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      List: props.List || [],
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
    if (!this.state.List || !this.state.List.length) {
      return false
    }

    for (let employment of this.state.List) {
      const item = employment.Item

      if (!item) {
        return false
      }

      if (!item.EmploymentActivity || !item.EmploymentActivity.value) {
        return false
      }

      if (item.EmploymentActivity.value === 'Other' && item.EmploymentActivity.otherExplanation === '') {
        return false
      }

      if (!item.DatesEmployed || !item.DatesEmployed.from || !item.DatesEmployed.to) {
        return false
      }

      const { from, to } = item.DatesEmployed
      if (from > to) {
        return false
      }

      if (!item.Employment || !item.Employment.value) {
        return false
      }

      if (!item.Status || !item.Status.value) {
        return false
      }

      if (!item.Title || !item.Title.value) {
        return false
      }

      if (!item.Address) {
        return false
      }

      const address = item.Address
      switch (address.addressType) {
        case 'United States':
          if (!address.address || !address.city || !address.state || !address.zipcode) {
            return false
          }
          break

        case 'International':
          if (!address.address || !address.city || !address.country) {
            return false
          }
          break

        case 'APOFPO':
          if (!address.address || !address.apoFpo || !address.apoFpoType || !address.zipcode) {
            return false
          }
          break

        default:
          return false
      }

      if (!item.Additional || !item.Additional.HasAdditionalActivity) {
        return false
      }

      if (item.Additional.HasAdditionalActivity === 'Yes') {
        for (let activity of item.Additional.List) {
          if (!activity.Position || !activity.Position.value) {
            return false
          }
          if (!activity.Supervisor || !activity.Supervisor.value) {
            return false
          }

          if (!activity.DatesEmployed || !activity.DatesEmployed.from || !activity.DatesEmployed.to) {
            return false
          }

          const { from, to } = activity.DatesEmployed
          if (from > to) {
            return false
          }
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
          List: this.state.List
        })
      }
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const i = item.Item
    const employer = (i && i.Employment && i.Employment.value ? i.Employment.value : 'N/A')
    const dates = this.dateSummary(i)

    return (
      <div className="table">
        <div className="table-cell index">
          <Svg src="img/employer-briefcase.svg" />
          {i18n.t('history.employment.collection.summary.employer')}:
        </div>
        <div className="table-cell employer">{ employer }</div>
        <div className="table-cell dates">{ dates }</div>
      </div>
    )
  }

  /**
   * Helper for renders date information
   */
  dateSummary (item) {
    const noDateLabel = i18n.t('history.employment.noDate.label')
    const format = (d) => {
      return `${d.getMonth()}/${d.getFullYear()}`
    }

    let vals = []
    if (!item || !item.DatesEmployed) {
      return ''
    }

    if (item.DatesEmployed.from) {
      vals.push(format(item.DatesEmployed.from))
    } else {
      vals.push(noDateLabel)
    }

    if (item.DatesEmployed.to) {
      vals.push(format(item.DatesEmployed.to))
    } else {
      vals.push(noDateLabel)
    }

    return vals.join(' - ')
  }

  /**
   * Render children only when we explicit state to do so
   */
  visibleComponents () {
    return (
      <Collection minimum="1"
                  items={this.state.List}
                  dispatch={this.myDispatch}
                  summary={this.summary.bind(this)}
                  summaryTitle={i18n.t('history.employment.collection.summary.title')}
                  appendClass="eapp-field-wrap"
                  appendLabel={i18n.t('history.employment.collection.append')}>
        <EmploymentItem name="Item"
                        onUpdate={this.props.onUpdate}
                        onValidate={this.handleValidation}
                        />
        <h2>{i18n.t('history.employment.heading.done')}</h2>
        <p>{i18n.t('history.employment.para.done')}</p>
      </Collection>
    )
  }

  render () {
    return (
      <div className="employment">
        {this.visibleComponents()}
      </div>
    )
  }
}

export class EmploymentItem extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      EmploymentActivity: props.EmploymentActivity,
      Employment: props.Employment,
      Dates: props.Dates,
      Title: props.Title,
      Status: props.Status,
      Address: props.Address,
      Telephone: props.Telephone,
      Supervisor: props.Supervisor,
      Reference: props.Reference,
      PhysicalAddress: props.PhysicalAddress,
      Additional: props.Additional
    }
  }

  onUpdate (field, values) {
    this.setState({
      [field]: values
    }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.name,
          EmploymentActivity: this.state.EmploymentActivity,
          Employment: this.state.Employment,
          Dates: this.state.Dates,
          Title: this.state.Title,
          Status: this.state.Status,
          Address: this.state.Address,
          Telephone: this.state.Telephone,
          Supervisor: this.state.Supervisor,
          Reference: this.state.Reference,
          PhysicalAddress: this.state.PhysicalAddress,
          Additional: this.state.Additional
        })
      }
    })
  }

  render () {
    return (
      <div>
        <h3>{i18n.t('history.employment.heading.activity')}</h3>
        <div className="eapp-field-wrap no-label">
          <Help id="history.employment.activity.help">
            <EmploymentActivity
              {...this.props.EmploymentActivity}
              onUpdate={this.onUpdate.bind(this, 'EmploymentActivity')}
              name="EmploymentActivity"
              />
            <HelpIcon className="activity"/>
          </Help>
        </div>

        <h3>{i18n.t('history.employment.heading.datesEmployed')}</h3>
        <div className="eapp-field-wrap">
          <Help id="history.employment.datesEmployed.help">
            <DateRange name="Dates"
                       {...this.props.Dates}
                       onUpdate={this.onUpdate.bind(this, 'Dates')}
                       onValidate={this.handleValidation}
                       />
            <HelpIcon className="used-help-icon" />
          </Help>
        </div>

        <h3>{i18n.t('history.employment.heading.employer')}</h3>
        <div className="eapp-field-wrap">
          <Help id="history.employment.employer.help">
            <Text name="Employment"
                  {...this.props.Employment}
                  onUpdate={this.onUpdate.bind(this, 'Employment')}
                  className="text"
                  label={i18n.t('history.employment.employer.label')}
                  />
            <HelpIcon className="employer" />
          </Help>
        </div>

        <h3>{i18n.t('history.employment.heading.title')}</h3>
        <div className="eapp-field-wrap">
          <Help id="history.employment.title.help">
            <Text name="Title"
                  {...this.props.Title}
                  onUpdate={this.onUpdate.bind(this, 'Title')}
                  className="text"
                  label={i18n.t('history.employment.title.label')}
                  onValidate={this.handleValidation}
                  />
            <HelpIcon className="title" />
          </Help>
        </div>

        <h3>{i18n.t('history.employment.heading.status')}</h3>
        <div className="eapp-field-wrap no-label">
          <Help id="history.employment.status.help">
            <EmploymentStatus name="Status"
                              {...this.props.Status}
                              onUpdate={this.onUpdate.bind(this, 'Status')}
                              />
            <HelpIcon className="status" />
          </Help>
        </div>

        <h3>{i18n.t('history.employment.heading.address')}</h3>
        <div className="eapp-field-wrap">
          <Help id="history.employment.address.help">
            <Address name="Address"
                     {...this.props.Address}
                     onUpdate={this.onUpdate.bind(this, 'Address')}
                     label={i18n.t('history.employment.address.label')}
                     />
            <HelpIcon className="address"/>
          </Help>
        </div>

        <h3>{i18n.t('history.employment.heading.telephone')}</h3>
        <div className="eapp-field-wrap no-label">
          <Help id="history.employment.telephone.help">
            <Telephone name="Telephone"
                       {...this.props.Telephone}
                       onUpdate={this.onUpdate.bind(this, 'Telephone')}
                       />
            <HelpIcon className="telephone-icon"/>
          </Help>
        </div>

        <Supervisor name="Supervisor"
                    {...this.props.Supervisor}
                    onUpdate={this.onUpdate.bind(this, 'Supervisor')}
                    />

        <h3>{i18n.t('history.employment.heading.reference')}</h3>
        <Reference name="Reference"
                   {...this.props.Reference}
                   onUpdate={this.onUpdate.bind(this, 'Reference')}
                   />

        <h3>{i18n.t('history.employment.heading.physicalAddress')}</h3>
        <PhysicalAddress name="PhysicalAddress"
                         {...this.props.PhysicalAddress}
                         onUpdate={this.onUpdate.bind(this, 'PhysicalAddress')}
                         className="eapp-field-wrap"
                         />

        <h3>{i18n.t('history.employment.heading.additionalActivity')}</h3>
        <p>{i18n.t('history.employment.para.additionalActivity')}</p>
        <AdditionalActivity name="Additional"
                            {...this.props.Additional}
                            onUpdate={this.onUpdate.bind(this, 'Additional')}
                            className="additional-activity eapp-field-wrap" />
      </div>
    )
  }
}
