import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, CheckboxGroup, Checkbox } from '../../../Form'

export default class TravelPurpose extends ValidationElement {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this)
  }

  update(response) {
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

  render() {
    return (
      <CheckboxGroup
        className={`travel-purpose ${this.props.className || ''}`.trim()}
        onError={this.props.onError}
        required={this.props.required}
        selectedValues={this.props.values || []}>
        <Checkbox
          name="purpose-business"
          label={i18n.m('foreign.travel.label.business')}
          value="Business"
          className="purpose-business"
          onUpdate={this.update}
          onError={this.props.onError}
        />
        <Checkbox
          name="purpose-volunteer"
          label={i18n.m('foreign.travel.label.volunteer')}
          value="Volunteer"
          className="purpose-volunteer"
          onUpdate={this.update}
          onError={this.props.onError}
        />
        <Checkbox
          name="purpose-education"
          label={i18n.m('foreign.travel.label.education')}
          value="Education"
          className="purpose-education"
          onUpdate={this.update}
          onError={this.props.onError}
        />
        <Checkbox
          name="purpose-tourism"
          label={i18n.m('foreign.travel.label.tourism')}
          value="Tourism"
          className="purpose-tourism"
          onUpdate={this.update}
          onError={this.props.onError}
        />
        <Checkbox
          name="purpose-conference"
          label={i18n.m('foreign.travel.label.conference')}
          value="Conference"
          className="purpose-conference"
          onUpdate={this.update}
          onError={this.props.onError}
        />
        <Checkbox
          name="purpose-family"
          label={i18n.m('foreign.travel.label.family')}
          value="Family"
          className="purpose-family"
          onUpdate={this.update}
          onError={this.props.onError}
        />
        <Checkbox
          name="purpose-other"
          label={i18n.m('foreign.travel.label.other')}
          value="Other"
          className="purpose-other"
          onUpdate={this.update}
          onError={this.props.onError}
        />
      </CheckboxGroup>
    )
  }
}

TravelPurpose.defaultProps = {
  values: [],
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
