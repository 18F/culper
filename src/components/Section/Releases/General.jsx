import React from 'react'
import { Link } from 'react-router'
import { i18n } from '../../../config'
import { ValidationElement } from '../../Form'
import Signature from './Signature'

export default class General extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateSignature = this.updateSignature.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        Signature: this.props.Signature,
        ...updateValues
      })
    }
  }

  updateSignature (values) {
    this.update({ Signature: values })
  }

  render () {
    return (
      <div className="general-release">
        { i18n.m('releases.general.contents') }
        <Signature onUpdate={this.updateSignature}
          {...this.props.Signature}
        />
      </div>
    )
  }
}

General.defaultProps = {
  onError: (value, arr) => { return arr }
}
