import React from 'react'
import { i18n } from '../../../../config'
import { DomesticViolenceValidator } from '../../../../validators'
import { ValidationElement, BranchCollection } from '../../../Form'
import DomesticViolence from './DomesticViolence'


export default class DomesticViolenceList extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      errorCodes: []
    }

    this.update = this.update.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (field, values) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        List: this.props.List,
        [field]: values
      })
    }
  }

  updateList (values, event) {
    this.update('List', values)
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
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
      super.handleValidation(event, statusObject, errorObject)
    })
  }

  /**
   * Determine if all items in the collection are considered to be in
   * a valid state.
   */
  isValid () {
    return new DomesticViolenceValidator(this.props.List, null).isValid()
  }

  render () {
    return (
      <div className="police">
        <BranchCollection help="legal.police.branchCollection.domesticViolence"
          label={i18n.m('legal.police.label.domesticViolence')}
          labelSize="h2"
          className="has-order"
          appendLabel={i18n.m('legal.police.label.domesticViolence')}
          items={this.props.List}
          onUpdate={this.updateList}>
          <DomesticViolence name="domestic"
            bind={true}
            onValidate={this.handleValidation}
          />
        </BranchCollection>
      </div>
    )
  }
}
