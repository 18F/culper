import React from 'react'
import { ValidationElement, Help, Text, Checkbox, Email, Collection, Comments } from '../../../Form'
import { api } from '../../../../services/api'

export default class ContactInformation extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      name: props.name,
      label: props.label,
      value: props.value,
      focus: props.focus || false,
      error: props.error || false,
      valid: props.valid || false,
      errorCodes: [],
      Comments: props.Comments,
      Emails: props.Emails || []
    }
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
  }

  /**
   * Handle the key down event.
   */
  handleKeyDown (event) {
  }

  emailDispatch (collection) {
    this.handleUpdate('Emails', collection)
  }

  handleUpdate (field, values) {
    this.setState({ [field]: values }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          Emails: this.state.Emails,
          Comments: this.state.Comments
        })
      }
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
      if (this.state.error === false || this.state.valid === true) {
        super.handleValidation(event, s, e)
        return
      }
      super.handleValidation(event, s, e)
    })
  }

  isValid () {
    return true
  }

  render () {
    return (
      <div className="contact">
        <h2>Your contact information</h2>

        <h3>Your e-mail addresses</h3>
        <div className="eapp-field-wrap">
          <Collection minimum="1"
            items={this.state.Emails}
            dispatch={this.emailDispatch.bind(this)}
            appendLabel="Add another email">
            <Email name="Email"
              onValidate={this.handleValidation}
              placeholder="Enter an email address"
            />
          </Collection>
        </div>

        <div className="eapp-field-wrap">
          <Comments name="comments"
                    value={this.state.Comments}
                    label="If you need to provide any additional comments about this information enter them below"
                    onUpdate={this.handleUpdate.bind(this, 'Comments')}
                    onValidate={this.handleValidation}
                    >
            <h3>Add optional comment</h3>
          </Comments>
        </div>

      </div>
    )
  }
}
