import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Address, Text, Textarea, DateControl, Field } from '../../../Form'

export default class DomesticViolence extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      Explanation: props.Explanation,
      Issued: props.Issued,
      CourtName: props.CourtName,
      CourtAddress: props.CourtAddress
    }

    this.update = this.update.bind(this)
    this.updateIssued = this.updateIssued.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
    this.updateCourtName = this.updateCourtName.bind(this)
    this.updateCourtAddress = this.updateCourtAddress.bind(this)
  }

  update (name, values) {
    this.setState({ [name]: values }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          Explanation: this.state.Explanation,
          Issued: this.state.Issued,
          CourtName: this.state.CourtName,
          CourtAddress: this.state.CourtAddress
        })
      }
    })
  }

  updateIssued (value) {
    this.update('Issued', value)
  }

  updateExplanation (value) {
    this.update('Explanation', value)
  }

  updateCourtName (value) {
    this.update('CourtName', value)
  }
  updateCourtAddress (value) {
    this.update('CourtAddress', value)
  }

  render () {
    return (
      <div className="domestic-violence">
        <Field title={i18n.t('legal.police.heading.domesticExplanation')}
               titleSize="h3">
          <Textarea
            className="explanation"
            name="explanation"
            {...this.state.Explanation}
            onUpdate={this.updateExplanation} />
        </Field>

        <Field title={i18n.t('legal.police.heading.domesticCourtDate')}
               titleSize="h3"
               adjustFor="labels"
               shrink={true}>
          <DateControl name="Issued"
                       {...this.state.Issued}
                       hideDay={true}
                       className="issued"
                       onUpdate={this.updateIssued}
                       onValidate={this.props.onValidate}
                       />
        </Field>

        <Field title={i18n.t('legal.police.heading.domesticCourtName')}
               titleSize="h3"
               help="legal.police.help.courtname"
               adjustFor="labels">
          <Text name="CourtName"
                {...this.state.CourtName}
                label={i18n.t('legal.police.label.courtname')}
                className="domestic-courtname"
                onUpdate={this.updateCourtName}
                onValidate={this.props.onValidate}
                />
        </Field>

        <Field title={i18n.t('legal.police.heading.domesticCourtAddress')}
               titleSize="h3"
               help="legal.police.help.courtaddress"
               adjustFor="address"
               shrink={true}>
          <Address name="CourtAddress"
                   {...this.state.CourtAddress}
                   label={i18n.t('legal.police.label.address')}
                   className="domestic-courtaddress"
                   onUpdate={this.updateCourtAddress}
                   onValidate={this.props.onValidate}
                   />
        </Field>
      </div>
    )
  }
}
