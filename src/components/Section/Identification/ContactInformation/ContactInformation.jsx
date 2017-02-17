import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Help, HelpIcon, Email, Collection, Comments, Telephone } from '../../../Form'

export default class ContactInformation extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      focus: props.focus || false,
      error: props.error || false,
      valid: props.valid || false,
      errorCodes: [],
      Comments: props.Comments,
      Emails: props.Emails || [],
      PhoneNumbers: props.PhoneNumbers || []
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

  contactDispatch (field, collection) {
    this.handleUpdate(field, collection)
  }

  handleUpdate (field, values) {
    this.setState({ [field]: values }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          Emails: this.state.Emails,
          Comments: this.state.Comments,
          PhoneNumbers: this.state.PhoneNumbers
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
    for (let email of this.state.Emails) {
      if (!email.Email || !email.Email.value) {
        return false
      }
    }

    if (this.state.Emails.length < 2) {
      return false
    }

    for (let phone of this.state.PhoneNumbers) {
      if (!phone.Telephone || !phone.Telephone.number) {
        return false
      }
    }

    if (this.state.PhoneNumbers.length < 2) {
      return false
    }

    return true
  }

  /**
   * Assists in rendering the summary section.
   */
  emailSummary (item, index) {
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

  /**
   * Assists in rendering the summary section.
   */
  phoneNumberSummary (item, index) {
    let number = i18n.t('identification.contacts.collection.summary.unknown')
    if (item.Telephone && !item.noNumber && item.Telephone.number) {
      number = item.Telephone.number

      switch (item.Telephone.type) {
      case 'DSN':
        number = `${number.slice(0, 3)}-${number.slice(3, 7)}`
        break

      case 'International':
        number = `+${number.slice(0, 3)} ${number.slice(3, 13)}`
        if (item.Telephone.extension) {
          number += ` x${item.Telephone.extension}`
        }
        break

      case 'Domestic':
      default:
        number = `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6, 10)}`
        if (item.Telephone.extension) {
          number += ` x${item.Telephone.extension}`
        }
        break
      }
    }

    return (
      <div className="table">
        <div className="table-cell index">{i18n.t('identification.contacts.collection.summary.phoneNumber')} {index + 1}:</div>
        <div className="table-cell"><strong>{number}</strong></div>
      </div>
    )
  }

  render () {
    const klass = `${this.props.className || ''}`.trim()

    return (
      <div className="contact">
        <h3>{i18n.t('identification.contacts.heading.email')}</h3>
        <p>{i18n.t('identification.contacts.para.email')}</p>
        <div className={klass + ' email-collection'}>
          <Collection minimum="1"
                      items={this.state.Emails}
                      dispatch={this.contactDispatch.bind(this, 'Emails')}
                      scrollTo="self"
                      summary={this.emailSummary}
                      summaryTitle={i18n.t('identification.contacts.collection.summary.title')}
                      appendClass="eapp-field-wrap"
                      appendLabel={i18n.t('identification.contacts.collection.append')}>

            <div className="eapp-field-wrap">
              <Help id="identification.contacts.help.email">
                <Email name="Email"
                       label={i18n.t('identification.contacts.label.email')}
                       onValidate={this.handleValidation}
                       placeholder={i18n.t('identification.contacts.placeholder.email')}
                       />
                       <HelpIcon className="email-icon" />
              </Help>
            </div>
          </Collection>
        </div>

        <h3>{i18n.t('identification.contacts.heading.phoneNumber')}</h3>
        <p>{i18n.t('identification.contacts.para.phoneNumber')}</p>
        <div className={klass + ' telephone-collection'}>
          <Collection minimum="2"
                      items={this.state.PhoneNumbers}
                      dispatch={this.contactDispatch.bind(this, 'PhoneNumbers')}
                      scrollTo="self"
                      summary={this.phoneNumberSummary}
                      summaryTitle={i18n.t('identification.contacts.collection.phoneNumbers.summary.title')}
                      appendClass="eapp-field-wrap"
                      appendLabel={i18n.t('identification.contacts.collection.phoneNumbers.append')}>

            <div className="eapp-field-wrap no-label">
              <Help id="identification.contacts.help.phoneNumber">
                <Telephone name="Telephone"
                       label={i18n.t('identification.contacts.label.telephone')}
                       onValidate={this.handleValidation}
                       placeholder={i18n.t('identification.contacts.placeholder.telephone')}
                       />
                       <HelpIcon className="telephone-icon" />
              </Help>
            </div>
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
