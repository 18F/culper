import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, CheckboxGroup, Checkbox } from '../../../Form'

export default class TravelDays extends ValidationElement {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
  }

  update (response) {
    if (!this.props.onUpdate) {
      return
    }

    let selected = response.value
    let list = [...(this.props.values || [])]

    if (list.includes(selected)) {
      list.splice(list.indexOf(selected), 1)
    } else {
      list.push(selected)
    }

    this.props.onUpdate({ values: list })
  }

  render () {
    return (
      <CheckboxGroup className={`travel-days ${this.props.className || ''}`.trim()}
                     onError={this.props.onError}
                     required={this.props.required}
                     selectedValues={this.props.values || []}>
        <Checkbox name="days-1-5"
                  label={i18n.m('foreign.travel.label.one')}
                  value="1-5"
                  className="days-1-5"
                  onUpdate={this.update}
                  onError={this.props.onError}
                  />
        <Checkbox name="days-6-10"
                  label={i18n.m('foreign.travel.label.six')}
                  value="6-10"
                  className="days-6-10"
                  onUpdate={this.update}
                  onError={this.props.onError}
                  />
        <Checkbox name="days-11-20"
                  label={i18n.m('foreign.travel.label.eleven')}
                  value="11-20"
                  className="days-11-20"
                  onUpdate={this.update}
                  onError={this.props.onError}
                  />
        <Checkbox name="days-21-30"
                  label={i18n.m('foreign.travel.label.twentyone')}
                  value="21-30"
                  className="days-21-30"
                  onUpdate={this.update}
                  onError={this.props.onError}
                  />
        <Checkbox name="more-than-30"
                  label={i18n.m('foreign.travel.label.more')}
                  value="More than 30"
                  className="more-than-30"
                  onUpdate={this.update}
                  onError={this.props.onError}
                  />
        <Checkbox name="many-short-trips"
                  label={i18n.m('foreign.travel.label.many')}
                  value="Many short trips"
                  className="many-short-trips"
                  onUpdate={this.update}
                  onError={this.props.onError}
                  />
      </CheckboxGroup>
    )
  }
}

TravelDays.defaultProps = {
  values: [],
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
