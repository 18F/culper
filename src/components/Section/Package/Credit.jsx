import React from 'react'

import i18n from 'util/i18n'
import Subsection from 'components/Section/shared/Subsection'
import { SignatureValidator } from 'validators'
import Signature from './Signature'

export default class Credit extends Subsection {
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
      <div className="credit-release">
        {i18n.m('releases.credit.contents')}
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

Credit.defaultProps = {
  Signature: {},
  LegalName: {},
  section: 'releases',
  subsection: 'credit',
  dispatch: () => {},
  validator: data => new SignatureValidator(data).isValid(),
  onUpdate: () => {},
  onError: (value, arr) => arr,
}
