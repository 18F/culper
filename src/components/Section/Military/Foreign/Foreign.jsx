import React from 'react'
import { i18n } from '../../../../config'
import { MilitaryForeignValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Collection } from '../../../Form'
import ForeignService from './ForeignService'

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

export default class Foreign extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      HasForeignMilitary: props.HasForeignMilitary,
      List: props.List,
      errorCodes: []
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateHasForeign = this.updateHasForeign.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)
    })
  }

  updateHasForeign (value, event) {
    this.onUpdate('HasForeignMilitary', value)

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
    return new MilitaryForeignValidator(this.state, null).isValid()
  }

  render () {
    return (
      <div className="foreign">
        <Branch name="has_foreign"
                className="eapp-field-wrap"
                value={this.state.HasForeignMilitary}
                help="military.foreign.help.served"
                onUpdate={this.updateHasForeign}>
        </Branch>

        <Show when={this.state.HasForeignMilitary === 'Yes'}>
          <Collection minimum="1"
                      items={this.state.List}
                      dispatch={this.updateList}
                      appendTitle={i18n.t('military.foreign.collection.foreign.appendTitle')}
                      appendLabel={i18n.t('military.foreign.collection.foreign.append')}>
            <ForeignService name="Item"
                            onValidate={this.handleValidation}
                            />
          </Collection>
        </Show>
      </div>
    )
  }
}
