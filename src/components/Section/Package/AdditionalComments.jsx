import React from 'react'
import { i18n } from '../../../config'
import SubsectionElement from '../SubsectionElement'
import { SignatureValidator } from '../../../validators'
import Signature from './Signature'

// TODO: Rename this component and relevant references (frontend and backend)
// This section of the application was improperly named and never got fixed.
// See https://github.com/ryanhofdotgov/e-QIP-prototype-truetandem/issues/657#issuecomment-349350305
export default class AdditionalComments extends SubsectionElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateSignature = this.updateSignature.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Signature: this.props.Signature,
      ...queue,
    })
  }

  updateSignature(values) {
    this.update({ Signature: values })
  }

  render() {
    return (
      <div className="additional-comments">
        {i18n.m('releases.additionalComments.certificationContents')}
        <Signature
          {...this.props.Signature}
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
  validator: data => new SignatureValidator(data).isValid(),
  onUpdate: () => {},
  onError: (value, arr) => arr,
}
