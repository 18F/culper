import React from 'react'
import { i18n } from '../../../../config'
import { MilitaryForeignValidator } from '../../../../validators'
import { ValidationElement, BranchCollection } from '../../../Form'
import ForeignService from './ForeignService'

export default class Foreign extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      errorCodes: []
    }

    this.updateList = this.updateList.bind(this)
  }

  updateList (collection) {
    if (this.props.onUpdate) {
      this.props.onUpdate({ List: collection })
    }
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
      const statusObject = { [this.props.name]: { status: complexStatus } }
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
    return new MilitaryForeignValidator(this.props, null).isValid()
  }

  render () {
    return (
      <div className="foreign">
        <BranchCollection items={this.props.List}
                          branchName="has_foreign"
                          appendLabel={i18n.t('military.foreign.collection.foreign.appendTitle')}
                          appendSize="h2"
                          help="military.foreign.help.served"
                          onUpdate={this.updateList}
                          onValidate={this.handleValidation}>
          <ForeignService name="Item"
                          bind={true}
                          onValidate={this.handleValidation}
                          />
        </BranchCollection>
      </div>
    )
  }
}
