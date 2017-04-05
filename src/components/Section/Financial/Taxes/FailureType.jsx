import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, RadioGroup, Radio } from '../../../Form'

export default class FailureType extends ValidationElement {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
  }

  update (event) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        name: this.props.name,
        value: event.target.value
      })
    }
  }

  render () {
    return (
      <RadioGroup className={`option-list ${this.props.className || ''}`.trim()}
                  selectedValue={this.props.value}>
        <Radio label={i18n.t('financial.taxes.label.file')}
               value="File"
               className="failure-file"
               onChange={this.update}
               onValidate={this.props.onValidate}
               />
        <Radio label={i18n.t('financial.taxes.label.pay')}
               value="Pay"
               className="failure-pay"
               onChange={this.update}
               onValidate={this.props.onValidate}
               />
        <Radio label={i18n.t('financial.taxes.label.both')}
               value="Both"
               className="failure-both"
               onChange={this.update}
               onValidate={this.props.onValidate}
               />
      </RadioGroup>
    )
  }
}

FailureType.defaultProps = {
  value: ''
}
