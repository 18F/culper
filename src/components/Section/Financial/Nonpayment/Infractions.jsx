import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, CheckboxGroup, Checkbox } from '../../../Form'

export default class Infractions extends ValidationElement {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this)
  }

  update(values) {
    let selected = values.value
    let list = [...(this.props.values || [])]

    if (list.includes(selected)) {
      list.splice(list.indexOf(selected), 1)
    } else {
      list.push(selected)
    }

    if (this.props.onUpdate) {
      this.props.onUpdate({
        name: this.props.name,
        values: list
      })
    }
  }

  render() {
    return (
      <div>
        {i18n.m('financial.nonpayment.para.checkAll')}
        <CheckboxGroup
          className={`option-list option-list-vertical ${this.props.className || ''}`.trim()}
          selectedValues={this.props.values}>
          <Checkbox
            label={i18n.m('financial.nonpayment.para.repo')}
            value="Repossession"
            className="nonpayment-repossession"
            onUpdate={this.update}
            onError={this.props.onError}
          />
          <Checkbox
            label={i18n.m('financial.nonpayment.para.defaulted')}
            value="Defaulted"
            className="nonpayment-defaulted"
            onUpdate={this.update}
            onError={this.props.onError}
          />
          <Checkbox
            label={i18n.m('financial.nonpayment.para.collections')}
            value="Collections"
            className="nonpayment-collections"
            onUpdate={this.update}
            onError={this.props.onError}
          />
          <Checkbox
            label={i18n.m('financial.nonpayment.para.cancelled')}
            value="Cancelled"
            className="nonpayment-cancelled"
            onUpdate={this.update}
            onError={this.props.onError}
          />
          <Checkbox
            label={i18n.m('financial.nonpayment.para.evicted')}
            value="Evicted"
            className="nonpayment-evicted"
            onUpdate={this.update}
            onError={this.props.onError}
          />
          <Checkbox
            label={i18n.m('financial.nonpayment.para.garnished')}
            value="Garnished"
            className="nonpayment-garnished"
            onUpdate={this.update}
            onError={this.props.onError}
          />
          <Checkbox
            label={i18n.m('financial.nonpayment.para.delinquent')}
            value="Delinquent"
            className="nonpayment-delinquent"
            onUpdate={this.update}
            onError={this.props.onError}
          />
          <Checkbox
            label={i18n.m('financial.nonpayment.para.any')}
            value="Any"
            className="nonpayment-any"
            onUpdate={this.update}
            onError={this.props.onError}
          />
        </CheckboxGroup>
      </div>
    )
  }
}

Infractions.defaultProps = {
  values: [],
  onError: (value, arr) => {
    return arr
  }
}
