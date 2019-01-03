import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, RadioGroup, Radio } from '../../../Form'

export default class TravelDays extends ValidationElement {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this)
  }

  update(values) {
    const { onUpdate } = this.props;
    onUpdate && onUpdate({ value: values.value })
  }

  render() {
    const selected = this.props.value
    return (
      <RadioGroup
        className={`travel-days option-list option-list-vertical ${this.props.className || ''}`.trim()}
        onError={this.props.onError}
        required={this.props.required}
        selectedValue={selected}>
        <Radio
          name="days-1-5"
          label={i18n.m('foreign.travel.label.one')}
          value="1-5"
          className="days-1-5"
          onUpdate={this.update}
          onError={this.props.onError}
        />
        <Radio
          name="days-6-10"
          label={i18n.m('foreign.travel.label.six')}
          value="6-10"
          className="days-6-10"
          onUpdate={this.update}
          onError={this.props.onError}
        />
        <Radio
          name="days-11-20"
          label={i18n.m('foreign.travel.label.eleven')}
          value="11-20"
          className="days-11-20"
          onUpdate={this.update}
          onError={this.props.onError}
        />
        <Radio
          name="days-21-30"
          label={i18n.m('foreign.travel.label.twentyone')}
          value="21-30"
          className="days-21-30"
          onUpdate={this.update}
          onError={this.props.onError}
        />
        <Radio
          name="more-than-30"
          label={i18n.m('foreign.travel.label.more')}
          value="More than 30"
          className="more-than-30"
          onUpdate={this.update}
          onError={this.props.onError}
        />
        <Radio
          name="many-short-trips"
          label={i18n.m('foreign.travel.label.many')}
          value="Many short trips"
          className="many-short-trips"
          onUpdate={this.update}
          onError={this.props.onError}
        />
      </RadioGroup>
    )
  }
}

TravelDays.defaultProps = {
  value: '',
  onError: (value, arr) => {
    return arr
  }
}
