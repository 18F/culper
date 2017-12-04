import React from 'react'
import { i18n } from '../../../config'
import { ValidationElement, Show } from '../../Form'
import { NameSummary, DateSummary } from '../../Summary'

export default class Signature extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.addSignature = this.addSignature.bind(this)
    this.removeSignature = this.removeSignature.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Name: this.props.Name,
      Date: this.props.Date,
      ...queue
    })
  }

  addSignature () {
    this.update({
      Name: this.props.LegalName,
      Date: {
        value: new Date()
      }
    })
  }

  removeSignature () {
    this.update({
      Name: {},
      Date: {}
    })
  }

  handleError (value, arr) {
    arr = arr.map(err => {
      return {
        code: `signature.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    return this.props.onError(value, arr)
  }

  render () {
    const name = (this.props.LegalName || {}).Name
    const signed = this.props.Date && this.props.Date.value
    const button = <button className="add" onClick={this.addSignature}>{i18n.t('signature.add')}</button>
    const nameSummary = signed ? NameSummary(name) : button
    const dateSummary = signed ? DateSummary(this.props.Date, '', true) : ''
    return (
      <div className="signature">
        <span className="name wet">{nameSummary}</span>
        <span className="spacer"></span>
        <span className="date wet">{dateSummary}</span>

        <span className="name muted">{i18n.t('signature.name')}</span>
        <span className="spacer"></span>
        <span className="date muted">{i18n.t('signature.date')}</span>
        <Show when={signed}>
          <a href="javascript:;;" onClick={this.removeSignature} className="remove">
            <span>{i18n.t('signature.remove')}</span>
            <i className="fa fa-times-circle"></i>
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
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
