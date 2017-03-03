import React from 'react'
import { i18n } from '../../../../config'
import { MilitaryHistoryValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Collection } from '../../../Form'
import { dateSummary } from '../../History/HistoryCollection/summaries'
import MilitaryService from './MilitaryService'

/**
 * Convenience function to send updates along their merry way
 */
const sendUpdate = (fn, name, props) => {
  if (fn) {
    fn({
      name: name,
      ...props
    })
  }
}

export default class History extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      HasServed: props.HasServed,
      List: props.List,
      errorCodes: []
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateServed = this.updateServed.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)
    })
  }

  updateServed (value, event) {
    this.onUpdate('HasServed', value)

    // If there is no history clear out any previously entered data
    if (value === 'No') {
      this.onUpdate('List', [])
    }

    // Force validation checks
    this.handleValidation(event, null, null)
  }

  updateList (collection) {
    this.onUpdate('List', collection)
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
    return new MilitaryHistoryValidator(this.state, null).isValid()
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const o = (item || {}).Item || {}
    const service = o.Service || i18n.t('military.history.collection.summary.unknown')
    const dates = dateSummary(o)

    return (
      <div className="table">
        <div className="table-cell index">{i18n.t('military.history.collection.summary.item')} {index + 1}:</div>
        <div className="table-cell"><strong>{service}</strong></div>
        <div className="table-cell dates"><strong>{dates}</strong></div>
      </div>
    )
  }

  render () {
    return (
      <div className="history">
        <Branch name="has_served"
                className="eapp-field-wrap served"
                value={this.state.HasServed}
                help="military.history.help.served"
                onUpdate={this.updateServed}>
        </Branch>

        <Show when={this.state.HasServed === 'Yes'}>
          <Collection minimum="1"
                      items={this.state.List}
                      dispatch={this.updateList}
                      summary={this.summary}
                      summaryTitle={i18n.t('military.history.collection.summary.title')}
                      appendTitle={i18n.t('military.history.collection.appendTitle')}
                      appendMessage={i18n.m('military.history.collection.appendMessage')}
                      appendLabel={i18n.t('military.history.collection.append')}>
            <MilitaryService name="Item"
                             onValidate={this.handleValidation}
                             />
          </Collection>
        </Show>
      </div>
    )
  }
}
