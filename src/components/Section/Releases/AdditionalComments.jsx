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
               onUpdate={this.updateAdditionalComments}
               onError={this.handleError}>
          { i18n.m('releases.additionalComments.contents') }
        </Field>

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
  AdditionalComments: {},
  Signature: {},
  LegalName: {},
  section: 'releases',
  subsection: 'comments',
  dispatch: () => {},
  validator: (state, props) => {
    return new SignatureValidator(props).isValid()
  },
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
