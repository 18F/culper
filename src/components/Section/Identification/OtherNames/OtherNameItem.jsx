import React from 'react'
import { i18n } from '../../../../config'
import { Field, MaidenName, Name, Textarea, DateRange } from '../../../Form'

export default class OtherNameItem extends React.Component {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateMaidenName = this.updateMaidenName.bind(this)
    this.updateDatesUsed = this.updateDatesUsed.bind(this)
    this.updateReason = this.updateReason.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Name: this.props.Name,
      MaidenName: this.props.MaidenName,
      DatesUsed: this.props.DatesUsed,
      Reason: this.props.Reason,
      ...queue
    })
  }

  updateName(values) {
    this.update({
      Name: values
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

  updateReason(values) {
    this.update({
      Reason: values
    })
  }

  render() {
    return (
      <div className="other-name">
        <Field
          title={i18n.t('identification.othernames.heading.name')}
          optional={true}
          filterErrors={Name.requiredErrorsOnly}
          scrollIntoView={this.props.scrollIntoView}>
          <Name
            name="Name"
            {...this.props.Name}
            onUpdate={this.updateName}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Field>

        <Field
          title={i18n.t('identification.othernames.heading.maiden')}
          help="alias.maiden.help"
          adjustFor="buttons"
          scrollIntoView={this.props.scrollIntoView}
          shrink={true}>
          <MaidenName
            name="MaidenName"
            required={this.props.required}
            {...this.props.MaidenName}
            onUpdate={this.updateMaidenName}
            onError={this.props.onError}
          />
        </Field>

        <Field
          title={i18n.t('identification.othernames.heading.used')}
          help="alias.used.help"
          adjustFor="daterange"
          scrollIntoView={this.props.scrollIntoView}
          shrink={true}>
          <DateRange
            name="DatesUsed"
            {...this.props.DatesUsed}
            onUpdate={this.updateDatesUsed}
            minDateEqualTo={true}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('identification.othernames.heading.reason')}
          scrollIntoView={this.props.scrollIntoView}
          help="alias.reason.help">
          <Textarea
            name="Reason"
            {...this.props.Reason}
            onUpdate={this.updateReason}
            onError={this.props.onError}
            className="reason"
            required={this.props.required}
          />
        </Field>
      </div>
    )
  }
}

OtherNameItem.defaultProps = {
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  required: false
}
