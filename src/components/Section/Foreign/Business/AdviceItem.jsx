import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Name, DateRange, Field, Text, Textarea, Country } from '../../../Form'

export default class AdviceItem extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateDescription = this.updateDescription.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateOrganization = this.updateOrganization.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updateCompensation = this.updateCompensation.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Description: this.props.Description,
      Name: this.props.Name,
      Organization: this.props.Organization,
      Country: this.props.Country,
      Dates: this.props.Dates,
      Compensation: this.props.Compensation,
      ...queue
    })
  }

  updateDescription (values) {
    this.update({
      Description: values
    })
  }

  updateName (values) {
    this.update({
      Name: values
    })
  }

  updateOrganization (values) {
    this.update({
      Organization: values
    })
  }

  updateCountry (values) {
    this.update({
      Country: values
    })
  }

  updateDates (values) {
    this.update({
      Dates: values
    })
  }

  updateCompensation (values) {
    this.update({
      Compensation: values
    })
  }

  render () {
    return (
      <div className="advice-item">
        <Field title={i18n.t('foreign.business.advice.heading.description')}
               scrollIntoView={this.props.scrollIntoView}>
          <Textarea name="Description"
                    {...this.props.Description}
                    onUpdate={this.updateDescription}
                    onError={this.props.onError}
                    className="advice-description"
                    required={this.props.required}
                    />
        </Field>

        <Field title={i18n.t('foreign.business.advice.heading.name')}
               optional={true}
               scrollIntoView={this.props.scrollIntoView}>
          <Name name="Name"
                {...this.props.Name}
                onUpdate={this.updateName}
                onError={this.props.onError}
                className="advice-name"
                required={this.props.required}
                />
        </Field>
        <Field title={i18n.t('foreign.business.advice.heading.organization')}
               scrollIntoView={this.props.scrollIntoView}>
          <Text name="Organization"
                {...this.props.Organization}
                onUpdate={this.updateOrganization}
                onError={this.props.onError}
                className="advice-organization"
                required={this.props.required}
                />
        </Field>

        <Field title={i18n.t('foreign.business.advice.heading.country')}
               scrollIntoView={this.props.scrollIntoView}>
          <Country name="Country"
                   {...this.props.Country}
                   className="advice-country"
                   onUpdate={this.updateCountry}
                   onError={this.props.onError}
                   required={this.props.required}
                   />
        </Field>

        <Field title={i18n.t('foreign.business.advice.heading.dates')}
               help="foreign.business.advice.help.dates"
               adjustFor="daterange"
               scrollIntoView={this.props.scrollIntoView}>
          <DateRange name="Dates"
                     {...this.props.Dates}
                     onUpdate={this.updateDates}
                     onError={this.props.onError}
                     className="advice-dates"
                     required={this.props.required}
                     />
        </Field>

        <Field title={i18n.t('foreign.business.advice.heading.compensation')}
               scrollIntoView={this.props.scrollIntoView}>
          <Textarea name="Compensation"
                    {...this.props.Compensation}
                    onUpdate={this.updateCompensation}
                    onError={this.props.onError}
                    className="advice-compensation"
                    required={this.props.required}
                    />
        </Field>
      </div>
    )
  }
}

AdviceItem.defaultProps = {
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
