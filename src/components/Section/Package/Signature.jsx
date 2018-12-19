import React from 'react'
import { i18n } from '../../../config'
import { ValidationElement, Show } from '../../Form'
import { NameSummary, NameText, DateSummary } from '../../Summary'
import { validDate } from '../History/dateranges'

export default class Signature extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.addSignature = this.addSignature.bind(this)
    this.removeSignature = this.removeSignature.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Name: this.props.Name,
      Date: this.props.Date,
      ...queue
    })
  }

  addSignature() {
    const now = new Date()
    this.update({
      Name: {
        value: this.name(false)
      },
      Date: {
        date: now,
        month: `${now.getMonth() + 1}`,
        day: `${now.getDate()}`,
        year: `${now.getFullYear()}`
      }
    })
  }

  removeSignature() {
    this.update({
      Name: {},
      Date: {}
    })
  }

  handleError(value, arr) {
    arr = arr.map(err => {
      return {
        code: `signature.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    return this.props.onError(value, arr)
  }

  name(formatted = true) {
    if ((this.props.Name || {}).value) {
      return formatted ? (
        <span className="title-case">{this.props.Name.value}</span>
      ) : (
        this.props.Name.value
      )
    }

    const legalName = (this.props.LegalName || {}).Name
    return formatted ? NameSummary(legalName) : NameText(legalName)
  }

  render() {
    const name = this.name()
    const signed = validDate(this.props.Date)
    const button = (
      <button className="add" onClick={this.addSignature}>
        {i18n.t('signature.add')}
      </button>
    )
    const nameSummary = signed ? name : button
    const dateSummary = signed ? DateSummary(this.props.Date, '', true) : ''
    return (
      <div className="signature">
        <span className="name wet">{nameSummary}</span>
        <span className="spacer" />
        <span className="date wet">{dateSummary}</span>
        <span className="name muted">{i18n.t('signature.name')}</span>
        <span className="spacer" />
        <span className="date muted">{i18n.t('signature.date')}</span>
        <Show when={signed}>
          <a
            href="javascript:;;"
            onClick={this.removeSignature}
            className="remove">
            <span>{i18n.t('signature.remove')}</span>
            <i className="fa fa-times-circle" />
          </a>
        </Show>
      </div>
    )
  }
}

Signature.defaultProps = {
  Name: {},
  Date: {},
  LegalName: {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
