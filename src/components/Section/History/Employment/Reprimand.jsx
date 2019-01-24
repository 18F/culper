import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, BranchCollection } from '../../../Form'
import ReprimandItem from './ReprimandItem'

export default class Reprimand extends ValidationElement {
  constructor(props) {
    super(props)
    this.updateReasons = this.updateReasons.bind(this)
  }

  updateReasons(values) {
    this.props.onUpdate({
      ...values
    })
  }

  render() {
    return (
      <BranchCollection
        label={i18n.t('history.employment.default.reprimand.label')}
        appendLabel={i18n.t('history.employment.default.reprimand.append')}
        help="history.employment.default.reprimand.help"
        {...this.props}
        className="reprimand-branch"
        onUpdate={this.updateReasons}
        onError={this.props.onError}
        required={this.props.required}
        scrollIntoView={this.props.scrollIntoView}>
        <ReprimandItem
          name="Item"
          bind={true}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
        />
      </BranchCollection>
    )
  }
}

Reprimand.defaultProps = {
  Reasons: { items: [] },
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
