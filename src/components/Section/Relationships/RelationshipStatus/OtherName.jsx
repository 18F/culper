import React from 'react'
import { i18n } from '../../../../config'
import {
  ValidationElement,
  Field,
  Name,
  MaidenName,
  DateRange
} from '../../../Form'

export default class OtherName extends ValidationElement {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateOtherName = this.updateOtherName.bind(this)
    this.updateMaidenName = this.updateMaidenName.bind(this)
    this.updateDatesUsed = this.updateDatesUsed.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      OtherName: this.props.OtherName,
      MaidenName: this.props.MaidenName,
      DatesUsed: this.props.DatesUsed,
      ...queue
    })
  }

  updateOtherName(values) {
    this.update({
      OtherName: values
    })
  }

  updateMaidenName(values) {
    this.update({
      MaidenName: values
    })
  }

  updateDatesUsed(values) {
    this.update({
      DatesUsed: values
    })
  }

  render() {
    return (
      <div>
        <Field
          title={i18n.t('relationships.cohabitant.othernames.heading.name')}
          optional={true}
          filterErrors={Name.requiredErrorsOnly}
          scrollIntoView={this.props.scrollIntoView}>
          <Name
            name="Othername"
            {...this.props.OtherName}
            onUpdate={this.updateOtherName}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Field>

        <Field
          title={i18n.t('relationships.cohabitant.othernames.heading.maiden')}
          help="alias.maiden.help"
          adjustFor="buttons"
          shrink={true}
          scrollIntoView={this.props.scrollIntoView}>
          <MaidenName
            name="MaidenName"
            {...this.props.MaidenName}
            onUpdate={this.updateMaidenName}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('relationships.cohabitant.othernames.heading.used')}
          adjustFor="daterange"
          shrink={true}
          scrollIntoView={this.props.scrollIntoView}>
          <DateRange
            name="DatesUsed"
            {...this.props.DatesUsed}
            minDate={(this.props.Birthdate || {}).date}
            minDateEqualTo
            maxDate={(this.props.minDate || {}).date}
            maxDateEqualTo
            onUpdate={this.updateDatesUsed}
            onError={this.props.onError}
            className="datesused"
            required={this.props.required}
          />
        </Field>
      </div>
    )
  }
}

OtherName.defaultProps = {
  OtherName: {},
  MaidenName: {},
  DatesUsed: {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
