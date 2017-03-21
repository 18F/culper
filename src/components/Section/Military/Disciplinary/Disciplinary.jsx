import React from 'react'
import { i18n } from '../../../../config'
import { MilitaryDisciplinaryValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion } from '../../../Form'
import Procedure from './Procedure'

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

export default class Disciplinary extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      HasDisciplinary: props.HasDisciplinary,
      List: props.List,
      errorCodes: []
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateDisciplinary = this.updateDisciplinary.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)
    })
  }

  updateDisciplinary (value, event) {
    this.onUpdate('HasDisciplinary', value)

    // If there is no history clear out any previously entered data
    if (value === 'No') {
      this.onUpdate('List', [])
    }
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
      const errorObject = { [this.props.name]: codes }
      let statusObject = { [this.props.name]: { status: complexStatus } }
      if (this.state.error === false || this.state.valid === true) {
        super.handleValidation(event, statusObject, errorObject)
        return
      }

      super.handleValidation(event, statusObject, errorObject)
    })
  }

  /**
   * Determine if all items in the collection are considered to be in
   * a valid state.
   */
  isValid () {
    return new MilitaryDisciplinaryValidator(this.state, null).isValid()
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const itemProperties = (item || {}).Item || {}
    const service = itemProperties.Name && itemProperties.Name.value
          ? itemProperties.Name.value
          : i18n.t('military.disciplinary.collection.summary.unknown')
    const dates = itemProperties.Date && itemProperties.Date.date
          ? `${itemProperties.Date.month}/${itemProperties.Date.year}`
          : ''

    return (
      <span>
        <span className="index">{i18n.t('military.disciplinary.collection.summary.item')} {index + 1}:</span>
        <span><strong>{service}</strong></span>
        <span className="dates"><strong>{dates}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="disciplinary">
        <Branch name="has_disciplinary"
                className="eapp-field-wrap no-label"
                value={this.state.HasDisciplinary}
                help="military.disciplinary.help.branch"
                onUpdate={this.updateDisciplinary}
                onValidate={this.handleValidation}>
        </Branch>

        <Show when={this.state.HasDisciplinary === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
                     onUpdate={this.updateList}
                     onValidate={this.handleValidation}
                     summary={this.summary}
                     description={i18n.t('military.disciplinary.collection.summary.title')}
                     appendTitle={i18n.t('military.disciplinary.collection.appendTitle')}
                     appendMessage={i18n.m('military.disciplinary.collection.appendMessage')}
                     appendLabel={i18n.t('military.disciplinary.collection.append')}>
            <Procedure name="Item"
                       bind={true}
                       />
          </Accordion>
        </Show>
      </div>
    )
  }
}
