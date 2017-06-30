import React from 'react'
import { i18n } from '../../../config'
import { ValidationElement, Field } from '../../Form'
import Signature from './Signature'

export default class AdditionalComments extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateSignature = this.updateSignature.bind(this)
    this.updateAdditionalComments = this.updateAdditionalComments.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Signature: this.props.Signature,
      AdditionalComments: this.props.AdditionalComments,
      ...queue
    })
  }

  updateSignature (values) {
    this.update({ Signature: values })
  }

  updateAdditionalComments (values) {
    this.update({ AdditionalComments: values })
  }

  render () {
    return (
      <div className="additional-comments">
        <Field comments={true}
               commentsName="AdditionalComments"
               commentsValue={this.props.AdditionalComments}
               onUpdate={this.updateAdditionalComments}>
          { i18n.m('releases.additionalComments.contents') }
        </Field>

        { i18n.m('releases.additionalComments.certificationContents') }
        <Signature onUpdate={this.updateSignature}
                   {...this.props.Signature}
                   />
      </div>
    )
  }
}

AdditionalComments.defaultProps = {
  AdditionalComments: {},
  Signature: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
