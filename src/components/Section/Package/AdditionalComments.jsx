import React from 'react'
import { i18n } from '../../../config'
import SubsectionElement from '../SubsectionElement'
import { SignatureValidator } from '../../../validators'
import { Field } from '../../Form'
import Signature from './Signature'

export default class AdditionalComments extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateSignature = this.updateSignature.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Signature: this.props.Signature,
      ...queue
    })
  }

  updateSignature (values) {
    this.update({ Signature: values })
  }

  render () {
    return (
      <div className="additional-comments">
        { i18n.m('releases.additionalComments.certificationContents') }
        <Signature {...this.props.Signature}
                   LegalName={this.props.LegalName}
                   onUpdate={this.updateSignature}
                   onError={this.handleError}
                   />
      </div>
    )
  }
}

AdditionalComments.defaultProps = {
  Signature: {},
  LegalName: {},
  section: 'releases',
  subsection: 'comments',
  dispatch: () => {},
  validator: (data) => {
    return new SignatureValidator(data).isValid()
  },
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
