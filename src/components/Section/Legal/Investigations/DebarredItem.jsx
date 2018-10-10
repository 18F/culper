import React from 'react'
import { i18n } from '../../../../config'
import {
  ValidationElement,
  Field,
  DateControl,
  Text,
  Textarea
} from '../../../Form'

export default class DebarredItem extends ValidationElement {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateAgency = this.updateAgency.bind(this)
    this.updateDate = this.updateDate.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Agency: this.props.Agency,
      Date: this.props.Date,
      Explanation: this.props.Explanation,
      ...queue
    })
  }

  updateAgency(values) {
    this.update({
      Agency: values
    })
  }

  updateDate(values) {
    this.update({
      Date: values
    })
  }

  updateExplanation(values) {
    this.update({
      Explanation: values
    })
  }

  render() {
    return (
      <div>
        <Field
          title={i18n.t('legal.investigations.debarred.heading.agency')}
          adjustFor="text"
          scrollIntoView={this.props.scrollIntoView}>
          <Text
            name="Agency"
            {...this.props.Agency}
            onUpdate={this.updateAgency}
            onError={this.props.onError}
            className="legal-investigations-debarred-agency"
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('legal.investigations.debarred.heading.date')}
          help="legal.investigations.debarred.help.date"
          adjustFor="datecontrol"
          scrollIntoView={this.props.scrollIntoView}>
          <DateControl
            name="Date"
            {...this.props.Date}
            minDateEqualTo
            onUpdate={this.updateDate}
            onError={this.props.onError}
            className="legal-investigations-debarred-date"
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('legal.investigations.debarred.heading.explanation')}
          help="legal.investigations.debarred.help.explanation"
          adjustFor="textarea"
          scrollIntoView={this.props.scrollIntoView}>
          <Textarea
            name="Explanation"
            {...this.props.Explanation}
            onUpdate={this.updateExplanation}
            onError={this.props.onError}
            className="legal-investigations-debarred-explanation"
            required={this.props.required}
          />
        </Field>
      </div>
    )
  }
}

DebarredItem.defaultProps = {
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
