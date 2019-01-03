import React from 'react'
import { i18n } from '../../../config'
import { Location, ValidationElement, Field, Text, Svg } from '../../Form'

export class AppealItem extends ValidationElement {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateCourtName = this.updateCourtName.bind(this)
    this.updateCourtAddress = this.updateCourtAddress.bind(this)
    this.updateDisposition = this.updateDisposition.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      CourtName: this.props.CourtName,
      CourtAddress: this.props.CourtAddress,
      Disposition: this.props.Disposition,
      ...queue
    })
  }

  updateCourtName(values) {
    this.update({
      CourtName: values
    })
  }

  updateCourtAddress(values) {
    this.update({
      CourtAddress: values
    })
  }

  updateDisposition(values) {
    this.update({
      Disposition: values
    })
  }

  render() {
    const prefix = this.props.prefix
    return (
      <div className="appeal">
        <Field
          title={i18n.t(`psychological.${prefix}.heading.appealCourtName`)}
          scrollIntoView={this.props.scrollIntoView}>
          <Text
            {...this.props.CourtName}
            name="CourtName"
            className="appealcourtname"
            onUpdate={this.updateCourtName}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t(`psychological.${prefix}.heading.appealCourtAddress`)}
          optional={true}
          adjustFor="address"
          scrollIntoView={this.props.scrollIntoView}>
          <Location
            {...this.props.CourtAddress}
            name="CourtAddress"
            className="appealcourtaddress"
            label={i18n.t(`psychological.${prefix}.label.courtAddress`)}
            layout={Location.ADDRESS}
            geocode={true}
            addressBooks={this.props.addressBooks}
            addressBook="Court"
            showPostOffice={true}
            onUpdate={this.updateCourtAddress}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t(`psychological.${prefix}.heading.disposition`)}
          help={`psychological.${prefix}.help.disposition`}
          scrollIntoView={this.props.scrollIntoView}>
          <Text
            {...this.props.Disposition}
            name="Disposition"
            className="disposition"
            onUpdate={this.updateDisposition}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>
      </div>
    )
  }
}

AppealItem.defaultProps = {
  prefix: 'order',
  addressBooks: {},
  CourtName: {},
  CourtAddress: {},
  Disposition: {},
  dispatch: action => {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
