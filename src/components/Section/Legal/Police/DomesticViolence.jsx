import React from 'react'
import { i18n } from '../../../../config'
import { PoliceValidator } from '../../../../validators'
import { ValidationElement, Address, Branch, Show, Text, Textarea, DateControl, Help, HelpIcon } from '../../../Form'

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
        <h4>{i18n.t('legal.police.heading.domesticExplanation')}</h4>
        <div className="eapp-field-wrap">
          <Textarea
            className="explanation no-label"
            name="explanation"
            onUpdate={this.updateExplanation} />
        </div>

        <h4>{i18n.t('legal.police.heading.domesticCourtDate')}</h4>
        <div className="eapp-field-wrap">
          <Help id="legal.police.help.domesticIssued">
            <DateControl name="Issued"
              {...this.state.Issued}
              hideDay={true}
              className="issued"
              onUpdate={this.updateIssued}
              onValidate={this.props.onValidate}
            />
            <HelpIcon />
          </Help>
        </div>

        <h4>{i18n.t('legal.police.heading.domesticCourtName')}</h4>
        <div className="eapp-field-wrap">
          <Help id="legal.police.help.courtname">
            <Text name="CourtName"
              {...this.state.CourtName}
              label={i18n.t('legal.police.label.courtname')}
              className="domestic-courtname"
              onUpdate={this.updateCourtName}
              onValidate={this.props.onValidate}
            />
            <HelpIcon />
          </Help>
        </div>

        <h4>{i18n.t('legal.police.heading.domesticCourtAddress')}</h4>
        <div className="eapp-field-wrap">
          <Help id="legal.police.help.courtaddress">
            <Address name="CourtAddress"
              {...this.state.CourtAddress}
              label={i18n.t('legal.police.label.address')}
              className="domestic-courtaddress"
              onUpdate={this.updateCourtAddress}
              onValidate={this.props.onValidate}
            />
            <HelpIcon className="address-help-icon" />
          </Help>
        </div>
      </div>
    )
  }
}
