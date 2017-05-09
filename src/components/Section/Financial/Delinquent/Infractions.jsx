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
        {i18n.m('financial.delinquent.para.checkAll')}
        <CheckboxGroup className={`option-list ${this.props.className || ''}`.trim()}
                      selectedValues={this.props.value}>
          <Checkbox label={i18n.m('financial.delinquent.para.alimony')}
                    value="Alimony"
                    className="delinquent-alimony"
                    toggle="false"
                    onChange={this.update}
                    onValidate={this.props.onValidate}
                    />
          <Checkbox label={i18n.m('financial.delinquent.para.judgement')}
                    value="Judgement"
                    className="delinquent-judgement"
                    toggle="false"
                    onChange={this.update}
                    onValidate={this.props.onValidate}
                    />
          <Checkbox label={i18n.m('financial.delinquent.para.lien')}
                    value="Lien"
                    className="delinquent-lien"
                    toggle="false"
                    onChange={this.update}
                    onValidate={this.props.onValidate}
                    />
          <Checkbox label={i18n.m('financial.delinquent.para.federal')}
                    value="Federal"
                    className="delinquent-federal"
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
