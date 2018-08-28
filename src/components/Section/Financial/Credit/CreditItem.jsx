import React from 'react'
import { i18n } from '../../../../config'
import {
  ValidationElement,
  Branch,
  Show,
  Accordion,
  Field,
  Telephone,
  Text,
  Textarea,
  Location
} from '../../../Form'

export default class CreditItem extends ValidationElement {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateTelephone = this.updateTelephone.bind(this)
    this.updateLocation = this.updateLocation.bind(this)
    this.updateDescription = this.updateDescription.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Explanation: this.props.Explanation,
      Name: this.props.Name,
      Telephone: this.props.Telephone,
      Location: this.props.Location,
      Description: this.props.Description,
      ...queue
    })
  }

  updateExplanation(values) {
    this.update({
      Explanation: values
    })
  }

  updateName(values) {
    this.update({
      Name: values
    })
  }

  updateTelephone(values) {
    this.update({
      Telephone: values
    })
  }

  updateLocation(values) {
    this.update({
      Location: values
    })
  }

  updateDescription(values) {
    this.update({
      Description: values
    })
  }

  render() {
    return (
      <div className="credit-item">
        <Field
          title={i18n.t('financial.credit.heading.explanation')}
          scrollIntoView={this.props.scrollIntoView}
          help="financial.credit.help.explanation">
          <Textarea
            name="Explanation"
            {...this.props.Explanation}
            className="credit-explanation"
            onUpdate={this.updateExplanation}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('financial.credit.heading.name')}
          scrollIntoView={this.props.scrollIntoView}>
          <Text
            name="Name"
            {...this.props.Name}
            className="credit-name"
            required={this.props.required}
            onUpdate={this.updateName}
            onError={this.props.onError}
          />
        </Field>

        <Field
          title={i18n.t('financial.credit.heading.telephone')}
          className="override-required"
          help="financial.credit.help.telephone"
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="telephone">
          <Telephone
            name="Telephone"
            {...this.props.Telephone}
            className="credit-telephone"
            required={this.props.required}
            onUpdate={this.updateTelephone}
            onError={this.props.onError}
          />
        </Field>

        <Field
          title={i18n.t('financial.credit.heading.address')}
          help="financial.credit.help.address"
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="label">
          <Location
            name="Location"
            {...this.props.Location}
            layout={Location.CITY_STATE}
            className="credit-location"
            dispatch={this.props.dispatch}
            addressBooks={this.props.addressBooks}
            addressBook="Agency"
            bind={true}
            help=""
            statePlaceholder={i18n.t('financial.credit.placeholder.state')}
            cityPlaceholder={i18n.t('financial.credit.placeholder.city')}
            required={this.props.required}
            onUpdate={this.updateLocation}
            onError={this.props.onError}
          />
        </Field>

        <Field
          title={i18n.t('financial.credit.heading.description')}
          scrollIntoView={this.props.scrollIntoView}
          help="financial.credit.help.description">
          <Textarea
            name="Description"
            {...this.props.Description}
            className="credit-description"
            required={this.props.required}
            onUpdate={this.updateDescription}
            onError={this.props.onError}
          />
        </Field>
      </div>
    )
  }
}

CreditItem.defaultProps = {
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  required: false
}
