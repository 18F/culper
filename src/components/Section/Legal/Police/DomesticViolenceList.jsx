import React from 'react'
import { i18n } from '../../../../config'
import { PoliceValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion, BranchCollection } from '../../../Form'
import { DateSummary } from '../../../Summary'
import Offense from './Offense'
import OtherOffense from './OtherOffense'
import DomesticViolence from './DomesticViolence'

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

export default class DomesticViolenceList extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      DomesticViolence: props.DomesticViolence,
      errorCodes: []
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateDomesticViolence = this.updateDomesticViolence.bind(this)
  }

  onUpdate (name, values, fn) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)

      if (fn) {
        fn()
      }
    })
  }


  checkToClear () {

  }

  updateDomesticViolence (value, event) {
    this.onUpdate('DomesticViolence', value, () => {
      this.checkToClear()
    })
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
    return new PoliceValidator(this.state, null).isValid()
  }

  render () {
    return (
      <div className="police">
        <BranchCollection help="legal.police.branchCollection.domesticViolence"
          label={i18n.m('legal.police.label.domesticViolence')}
          labelSize="h2"
          appendLabel={i18n.m('legal.police.label.domesticViolence')}
          items={this.state.DomesticViolence}
          onUpdate={this.updateDomesticViolence}>
          <DomesticViolence name="domestic"
            bind={true}
            onValidate={this.handleValidation}
          />
        </BranchCollection>
      </div>
    )
  }
}
