import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Field, DateRange, Text, Location } from '../../../Form'

export default class FederalItem extends ValidationElement {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updatePosition = this.updatePosition.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Dates: this.props.Dates,
      Name: this.props.Name,
      Position: this.props.Position,
      Address: this.props.Address,
      ...queue
    })
  }

  updateDates (values) {
    this.update({
      Dates: values
    })
  }

  updateName (values) {
    this.update({
      Name: values
    })
  }

  updatePosition (values) {
    this.update({
      Position: values
    })
  }

  updateAddress (values) {
    this.update({
      Address: values
    })
  }

  render () {
    return (
      <div className="federal-item">
        <Field title={i18n.t('history.federal.heading.dates')}
               help="history.federal.help.dates"
               adjustFor="daterange"
               scrollIntoView={this.props.scrollIntoView}>
          <DateRange name="Dates"
                     {...this.props.Dates}
                     onUpdate={this.updateDates}
                     onError={this.props.onError}
                     required={this.props.required}
                     />
        </Field>

        <Field title={i18n.t('history.federal.heading.name')}
               className="federal-agency"
               scrollIntoView={this.props.scrollIntoView}>
          <Text name="Name"
                {...this.props.Name}
                onUpdate={this.updateName}
                onError={this.props.onError}
                required={this.props.required}
                />
        </Field>

        <Field title={i18n.t('history.federal.heading.position')}
               className="federal-position"
               scrollIntoView={this.props.scrollIntoView}>
          <Text name="Position"
                {...this.props.Position}
                onUpdate={this.updatePosition}
                onError={this.props.onError}
                required={this.props.required}
                />
        </Field>

        <Field title={i18n.t('history.federal.heading.address')}
               optional={true}
               help="history.federal.help.address"
               className="federal-agency-address"
               adjustFor="address"
               scrollIntoView={this.props.scrollIntoView}>
          <Location name="Address"
                    {...this.props.Address}
                    onUpdate={this.updateAddress}
                    onError={this.props.onError}
                    layout={Location.ADDRESS}
                    geocode={true}
                    addressBooks={this.props.addressBooks}
                    addressBook="Agency"
                    dispatch={this.props.dispatch}
                    required={this.props.required}
                    />
        </Field>
      </div>
    )
  }
}

FederalItem.defaultProps = {
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
