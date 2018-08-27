import React from 'react'
import { i18n } from '../../../../config'
import {
  ValidationElement,
  Name,
  Field,
  Text,
  Textarea,
  Country,
  DateControl
} from '../../../Form'

export default class FamilyItem extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateAgency = this.updateAgency.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateDate = this.updateDate.bind(this)
    this.updateCircumstances = this.updateCircumstances.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Name: this.props.Name,
      Agency: this.props.Agency,
      Country: this.props.Country,
      Date: this.props.Date,
      Circumstances: this.props.Circumstances,
      ...queue
    })
  }

  updateName(values) {
    this.update({
      Name: values
    })
  }

  updateAgency(values) {
    this.update({
      Agency: values
    })
  }

  updateCountry(values) {
    this.update({
      Country: values
    })
  }

  updateDate(values) {
    this.update({
      Date: values
    })
  }

  updateCircumstances(values) {
    this.update({
      Circumstances: values
    })
  }

  render() {
    return (
      <div className="family-item">
        <Field
          title={i18n.t('foreign.business.family.heading.name')}
          optional={true}
          filterErrors={Name.requiredErrorsOnly}
          scrollIntoView={this.props.scrollIntoView}>
          <Name
            name="Name"
            {...this.props.Name}
            onUpdate={this.updateName}
            onError={this.props.onError}
            className="family-name"
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Field>

        <Field
          title={i18n.t('foreign.business.family.heading.agency')}
          scrollIntoView={this.props.scrollIntoView}>
          <Text
            name="Agency"
            {...this.props.Agency}
            onUpdate={this.updateAgency}
            onError={this.props.onError}
            className="family-agency"
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.business.family.heading.country')}
          scrollIntoView={this.props.scrollIntoView}>
          <Country
            name="Country"
            {...this.props.Country}
            onUpdate={this.updateCountry}
            onError={this.props.onError}
            className="family-country"
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.business.family.heading.date')}
          help="foreign.business.family.help.date"
          adjustFor="datecontrol"
          scrollIntoView={this.props.scrollIntoView}>
          <DateControl
            name="Date"
            {...this.props.Date}
            onUpdate={this.updateDate}
            onError={this.props.onError}
            className="family-date"
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.business.family.heading.circumstances')}
          scrollIntoView={this.props.scrollIntoView}>
          <Textarea
            name="Circumstances"
            {...this.props.Circumstances}
            onUpdate={this.updateCircumstances}
            onError={this.props.onError}
            className="family-circumstances"
            required={this.props.required}
          />
        </Field>
      </div>
    )
  }
}

FamilyItem.defaultProps = {
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
