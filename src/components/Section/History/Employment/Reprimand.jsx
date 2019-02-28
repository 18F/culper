import React from 'react'

import i18n from 'util/i18n'

import { ValidationElement, BranchCollection } from 'components/Form'
import ReprimandItem from './ReprimandItem'

export default class Reprimand extends ValidationElement {
  getYearsString = (years) => {
    switch (years) {
      case 5:
        return 'five'
      case 7:
        return 'seven'
      default:
        return ''
    }
  }

  updateReasons = (values) => {
    this.props.onUpdate({
      ...values,
    })
  }

  render() {
    const { recordYears } = this.props
    const recordYearsString = this.getYearsString(recordYears)

    return (
      <BranchCollection
        label={i18n.t('history.employment.default.reprimand.label', { years: recordYears, yearsString: recordYearsString })}
        appendLabel={i18n.t('history.employment.default.reprimand.append')}
        help="history.employment.default.reprimand.help"
        {...this.props}
        className="reprimand-branch"
        onUpdate={this.updateReasons}
        onError={this.props.onError}
        required={this.props.required}
        scrollIntoView={this.props.scrollIntoView}
      >
        <ReprimandItem
          name="Item"
          bind
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
        />
      </BranchCollection>
    )
  }
}

Reprimand.defaultProps = {
  Reasons: { items: [] },
  onUpdate: () => {},
  onError: (value, arr) => arr,
}
