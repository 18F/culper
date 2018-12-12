import React from 'react'
import { i18n } from '../../../../config'
import {
  ValidationElement,
  Location,
  Text,
  Textarea,
  DateControl,
  Field
} from '../../../Form'

export default class DomesticViolence extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateIssued = this.updateIssued.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
    this.updateCourtName = this.updateCourtName.bind(this)
    this.updateCourtAddress = this.updateCourtAddress.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Explanation: this.props.Explanation,
      Issued: this.props.Issued,
      CourtName: this.props.CourtName,
      CourtAddress: this.props.CourtAddress,
      ...queue
    })
  }

  updateIssued(value) {
    this.update({
      Issued: value
    })
  }

  updateExplanation(value) {
    this.update({
      Explanation: value
    })
  }

  updateCourtName(value) {
    this.update({
      CourtName: value
    })
  }
  updateCourtAddress(value) {
    this.update({
      CourtAddress: value
    })
  }

  render() {
    return (
      <div className="domestic-violence">
        <Field
          title={i18n.t('legal.police.heading.domesticExplanation')}
          titleSize="h3"
          help="legal.police.help.domesticExplanation"
          scrollIntoView={this.props.scrollIntoView}>
          <Textarea
            className="explanation"
            name="explanation"
            {...this.props.Explanation}
            onUpdate={this.updateExplanation}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('legal.police.heading.domesticCourtDate')}
          titleSize="h3"
          adjustFor="labels"
          shrink={true}
          scrollIntoView={this.props.scrollIntoView}>
          <DateControl
            name="Issued"
            {...this.props.Issued}
            hideDay={true}
            className="issued"
            minDateEqualTo={true}
            onUpdate={this.updateIssued}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('legal.police.heading.domesticCourtName')}
          titleSize="h3"
          adjustFor="labels"
          scrollIntoView={this.props.scrollIntoView}>
          <Text
            name="CourtName"
            {...this.props.CourtName}
            label={i18n.t('legal.police.label.courtname')}
            className="domestic-courtname"
            onUpdate={this.updateCourtName}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('legal.police.heading.domesticCourtAddress')}
          titleSize="h3"
          optional={true}
          help="legal.police.help.courtaddress"
          adjustFor="address"
          shrink={true}
          scrollIntoView={this.props.scrollIntoView}>
          <Location
            name="CourtAddress"
            {...this.props.CourtAddress}
            label={i18n.t('legal.police.label.address')}
            className="domestic-courtaddress"
            layout={Location.OFFENSE}
            geocode={true}
            addressBooks={this.props.addressBooks}
            addressBook="Court"
            dispatch={this.props.dispatch}
            onUpdate={this.updateCourtAddress}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>
      </div>
    )
  }
}

DomesticViolence.defaultProps = {
  addressBooks: {},
  dispatch: action => {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
