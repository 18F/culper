import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Collection, Comments, DateRange, Address, Textarea, Text, Help, HelpIcon } from '../../../Form'
import EmploymentActivity from './EmploymentActivity'
import EmploymentStatus from './EmploymentStatus'
import PhysicalAddress from './PhysicalAddress'
import AdditionalActivity from './AdditionalActivity'

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
    console.log(item)
    const employer = (item.Employment && item.Employment.value ? item.Employment.value : 'N/A')
    const dates = this.dateSummary(item)

    return (
      <div className="table">
        <div className="table-cell index">{i18n.t('history.employment.collection.summary.employer')} {index + 1}:</div>
        <div className="table-cell employer">{ employer }</div>
        <div className="table-cell dates">{ dates }</div>
      </div>
    )
  }

  dateSummary (item) {
    function format (d) {
      return `${d.getMonth() + 1}/${d.getFullYear()}`
    }

    let vals = []
    if (!item.DatesEmployed) {
      return ''
    }

    if (item.DatesEmployed.from) {
      vals.push(format(item.DatesEmployed.from))
    } else {
      vals.push('NA')
    }

    if (item.DatesEmployed.to) {
      vals.push(format(item.DatesEmployed.to))
    } else {
      vals.push('NA')
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

        <h3>{i18n.t('history.employment.heading.activity')}</h3>
        <div className="eapp-field-wrap">
          <Help id="history.employment.activity.help">
            <EmploymentActivity name="EmploymentActivity"/>
            <HelpIcon className="activity"/>
          </Help>
        </div>

        <h3>{i18n.t('history.employment.heading.datesEmployed')}</h3>
        <div className="eapp-field-wrap">
          <Help id="history.employment.datesEmployed.help">
            <DateRange name="DatesEmployed"
              onValidate={this.handleValidation}
            />
            <HelpIcon className="used-help-icon" />
          </Help>
        </div>

        <h3>{i18n.t('history.employment.heading.employer')}</h3>
        <div className="eapp-field-wrap">
          <Help id="history.employment.employer.help">
            <Text name="Employment"
              className="text"
              label={i18n.t('history.employment.employer.label')}
              onValidate={this.handleValidation}
            />
            <HelpIcon className="employer" />
          </Help>
        </div>

        <h3>{i18n.t('history.employment.heading.title')}</h3>
        <div className="eapp-field-wrap">
          <Help id="history.employment.title.help">
            <Text name="Title"
              className="text"
              label={i18n.t('history.employment.title.label')}
              onValidate={this.handleValidation}
            />
            <HelpIcon className="title" />
          </Help>
        </div>

        <h3>{i18n.t('history.employment.heading.status')}</h3>
        <div className="eapp-field-wrap">
          <Help id="history.employment.status.help">
            <EmploymentStatus name="Status" />
            <HelpIcon className="status" />
          </Help>
        </div>

        <h3>{i18n.t('history.employment.heading.address')}</h3>
        <div className="eapp-field-wrap">
          <Help id="history.employment.address.help">
            <Address name="Address"
              label={i18n.t('history.employment.address.label')}
            />
            <HelpIcon className="address"/>
          </Help>
        </div>

        <h3>{i18n.t('history.employment.heading.telephone')}</h3>
        <div className="eapp-field-wrap">
          <Help id="history.employment.telephone.help">
            <div>TODO: Telephone</div>
            <HelpIcon className="telephone"/>
          </Help>
        </div>

        <h3>{i18n.t('history.employment.heading.physicalAddress')}</h3>
        <div className="eapp-field-wrap">
          <PhysicalAddress name="PhysicalAddress" />
        </div>

        <h2>Additional periods of activity with this employer</h2>
        <p>
          List all of your employment activities, including unemployment and self-employment, beginning with the present and working back 10 years. The entire period must be accounted for without breaks. If the employment activity was military duty, list separate employment activity periods to show each change of military duty station.
        </p>
        <p>
          Do not list employment before your 18th birthday unless to provide a minimum of 2 years employment history.
        </p>
        <div className="eapp-field-wrap">
          <AdditionalActivity name="Additional"
            className="additional-activity" />
        </div>

      </Collection>
    )
  }

  render () {
    return (
      <div className="employment">
        <h2>List where you have worked</h2>
        <p>
          List all of your employment activities, including unemployment and self-employment, beginning with the present and working back 10 years. The entire period must be accounted for without breaks. If the employment activity was military duty, list separate employment activity periods to show each change of military duty station.
        </p>
        <p>
          Do not list employment before your 18th birthday unless to provide a minimum of 2 years employment history.
        </p>
        {this.visibleComponents()}
      </div>
    )
  }
}
