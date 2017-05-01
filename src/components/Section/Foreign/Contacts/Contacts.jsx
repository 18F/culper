import React from 'react'
import { i18n } from '../../../../config'
import { PassportValidator } from '../../../../validators'
import { ValidationElement, Branch, Accordion } from '../../../Form'

export default class Contacts extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      List: props.List,
      error: false,
      valid: false,
      errorCodes: []
    }

    this.onSuggestion = this.onSuggestion.bind(this)
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    this.handleUpdate('Card', event.target.value, () => {
      // This allows us to force a blur/validation using
      // the new regular expression
      this.refs.number.refs.text.refs.input.focus()
      this.refs.number.refs.text.refs.input.blur()
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
      let e = { [this.props.name]: codes }
      let s = { [this.props.name]: { status: complexStatus } }
      super.handleValidation(event, s, e)
    })
  }

  /**
   * Handle the update event.
   */
  handleUpdate (field, values, callback) {
    this.setState({ [field]: values }, () => {
      if (callback) {
        callback()
      }

      if (this.props.onUpdate) {
        this.props.onUpdate({
          Name: this.state.Name,
          Number: this.state.Number,
          Card: this.state.Card,
          Issued: this.state.Issued,
          Expiration: this.state.Expiration,
          Comments: this.state.Comments,
          HasPassport: this.state.HasPassport
        })
      }
    })
  }

  isValid () {
    return new PassportValidator(this.state, null).isValid()
  }

  render () {
    return (
      <div className="foreign-contacts">
      </div>
    )
  }
}

Contacts.defaultProps = {
  List: []
}
