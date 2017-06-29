import React from 'react'
import { i18n } from '../../../config'
import { ValidationElement } from '../../Form'
import Signature from './Signature'

export default class Credit extends ValidationElement {
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
      <div className="credit-release">
        { i18n.m('releases.credit.contents') }
        <Signature onUpdate={this.updateSignature}
          {...this.props.Signature}
        />
      </div>
    )
  }
}

Credit.defaultProps = {}
