import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, CheckboxGroup, Checkbox } from '../../../Form'

export default class Infractions extends ValidationElement {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
  }

  update (event) {
    let selected = event.target.value
    let list = [...(this.props.value || [])]

    if (list.includes(selected)) {
      list.splice(list.indexOf(selected), 1)
    } else {
      list.push(selected)
    }

    if (this.props.onUpdate) {
      this.props.onUpdate({
        name: this.props.name,
        value: list
      })
    }
  }

  render () {
    return (
      <div>
        {i18n.m('financial.nonpayment.para.checkAll')}
        <CheckboxGroup className={`option-list ${this.props.className || ''}`.trim()}
                      selectedValues={this.props.value}>
          <Checkbox label={i18n.m('financial.nonpayment.para.repo')}
                    value="Repossession"
                    className="nonpayment-repossession"
                    toggle="false"
                    onChange={this.update}
                    onValidate={this.props.onValidate}
                    />
          <Checkbox label={i18n.m('financial.nonpayment.para.defaulted')}
                    value="Defaulted"
                    className="nonpayment-defaulted"
                    toggle="false"
                    onChange={this.update}
                    onValidate={this.props.onValidate}
                    />
          <Checkbox label={i18n.m('financial.nonpayment.para.collections')}
                    value="Collections"
                    className="nonpayment-collections"
                    toggle="false"
                    onChange={this.update}
                    onValidate={this.props.onValidate}
                    />
          <Checkbox label={i18n.m('financial.nonpayment.para.cancelled')}
                    value="Cancelled"
                    className="nonpayment-cancelled"
                    toggle="false"
                    onChange={this.update}
                    onValidate={this.props.onValidate}
                    />
          <Checkbox label={i18n.m('financial.nonpayment.para.evicted')}
                    value="Evicted"
                    className="nonpayment-evicted"
                    toggle="false"
                    onChange={this.update}
                    onValidate={this.props.onValidate}
                    />
          <Checkbox label={i18n.m('financial.nonpayment.para.garnished')}
                    value="Garnished"
                    className="nonpayment-garnished"
                    toggle="false"
                    onChange={this.update}
                    onValidate={this.props.onValidate}
                    />
          <Checkbox label={i18n.m('financial.nonpayment.para.delinquent')}
                    value="Delinquent"
                    className="nonpayment-delinquent"
                    toggle="false"
                    onChange={this.update}
                    onValidate={this.props.onValidate}
                    />
          <Checkbox label={i18n.m('financial.nonpayment.para.any')}
                    value="Any"
                    className="nonpayment-any"
                    toggle="false"
                    onChange={this.update}
                    onValidate={this.props.onValidate}
                    />
        </CheckboxGroup>
      </div>
    )
  }
}

Infractions.defaultProps = {
  value: []
}
