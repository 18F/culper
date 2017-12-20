import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Field, DateControl, Text, Textarea } from '../../../Form'

export default class RevokedItem extends ValidationElement {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateDate = this.updateDate.bind(this)
    this.updateAgency = this.updateAgency.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Date: this.props.Date,
      Agency: this.props.Agency,
      Explanation: this.props.Explanation,
      ...queue
    })
  }

  updateDate (values) {
    this.update({
      Date: values
    })
  }

  updateAgency (values) {
    this.update({
      Agency: values
    })
  }

  updateExplanation (values) {
    this.update({
      Explanation: values
    })
  }

  render () {
    return (
      <div>
        <Field title={i18n.t('legal.investigations.revoked.heading.date')}
               help="legal.investigations.revoked.help.date"
               adjustFor="datecontrol"
               scrollIntoView={this.props.scrollIntoView}>
          <DateControl name="Date"
                       {...this.props.Date}
                       onUpdate={this.updateDate}
                       onError={this.props.onError}
                       className="legal-investigations-revoked-date"
                       required={this.props.required}
                       />
        </Field>

        <Field title={i18n.t('legal.investigations.revoked.heading.agency')}
               adjustFor="text"
               scrollIntoView={this.props.scrollIntoView}>
          <Text name="Agency"
                {...this.props.Agency}
                onUpdate={this.updateAgency}
                onError={this.props.onError}
                className="legal-investigations-revoked-agency"
                required={this.props.required}
                />
        </Field>

        <Field title={i18n.t('legal.investigations.revoked.heading.explanation')}
               help="legal.investigations.revoked.help.explanation"
               adjustFor="textarea"
               scrollIntoView={this.props.scrollIntoView}>
          <Textarea name="Explanation"
                    {...this.props.Explanation}
                    onUpdate={this.updateExplanation}
                    onError={this.props.onError}
                    className="legal-investigations-revoked-explanation"
                    required={this.props.required}
                    />
        </Field>
      </div>
    )
  }
}

RevokedItem.defaultProps = {
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
