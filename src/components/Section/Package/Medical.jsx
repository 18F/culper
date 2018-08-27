import React from 'react'
import { i18n } from '../../../config'
import { ValidationElement } from '../../Form'
import Signature from './Signature'

export default class Medical extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateSignature = this.updateSignature.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Signature: this.props.Signature,
      ...queue
    })
  }

  updateSignature(values) {
    this.update({ Signature: values })
  }

  render() {
    return (
      <div className="medical-release">
        {i18n.m('releases.medical.contents')}
        <Signature
          {...this.props.Signature}
          LegalName={this.props.LegalName}
          onUpdate={this.updateSignature}
          onError={this.props.onError}
        />
      </div>
    )
  }
}

Medical.defaultProps = {
  Signature: {},
  LegalName: {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
