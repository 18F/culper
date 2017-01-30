import React from 'react'
import { i18n } from '../../../../config'
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

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    let addr = i18n.t('identification.contacts.collection.summary.unknown')
    if (item.Email && item.Email.value) {
      addr = item.Email.value
    }

    return (
      <div className="table">
        <div className="table-cell index">{i18n.t('identification.contacts.collection.summary.email')} {index + 1}:</div>
        <div className="table-cell"><strong>{addr}</strong></div>
      </div>
    )
  }

  render () {
    const klass = `${this.props.className || ''}`.trim()

    return (
      <div className="contact">
        <h3>{i18n.t('identification.contacts.heading.email')}</h3>
        <div className={klass}>
          <Collection minimum="1"
                      items={this.state.Emails}
                      dispatch={this.emailDispatch.bind(this)}
                      summary={this.summary}
                      summaryTitle={i18n.t('identification.contacts.collection.summary.title')}
                      appendClass="eapp-field-wrap"
                      appendLabel={i18n.t('identification.contacts.collection.append')}>
            <Email name="Email"
                   className="eapp-field-wrap"
                   label={i18n.t('identification.contacts.label.email')}
                   onValidate={this.handleValidation}
                   placeholder={i18n.t('identification.contacts.placeholder.email')}
                   />
          </Collection>
        </div>

        <Comments name="comments"
                  value={this.state.Comments}
                  label={i18n.t('identification.contacts.label.comments')}
                  className="eapp-field-wrap"
                  onUpdate={this.handleUpdate.bind(this, 'Comments')}
                  onValidate={this.handleValidation}
                  >
          <h3>{i18n.t('identification.contacts.heading.comments')}</h3>
        </Comments>

      </div>
    )
  }
}
