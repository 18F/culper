import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Field, Text, Textarea, Name, Country, DateRange, Location } from '../../../Form'

export default class VenturesItem extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateDescription = this.updateDescription.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateCitizenship = this.updateCitizenship.bind(this)
    this.updateRelationship = this.updateRelationship.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updateAssociation = this.updateAssociation.bind(this)
    this.updatePosition = this.updatePosition.bind(this)
    this.updateService = this.updateService.bind(this)
    this.updateSupport = this.updateSupport.bind(this)
    this.updateCompensation = this.updateCompensation.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Description: this.props.Description,
      Name: this.props.Name,
      Address: this.props.Address,
      Citizenship: this.props.Citizenship,
      Relationship: this.props.Relationship,
      Dates: this.props.Dates,
      Association: this.props.Association,
      Position: this.props.Position,
      Service: this.props.Service,
      Support: this.props.Support,
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

  updateAddress (values) {
    this.update({
      Address: values
    })
  }

  updateCitizenship (values) {
    this.update({
      Citizenship: values
    })
  }

  updateRelationship (values) {
    this.update({
      Relationship: values
    })
  }

  updateDates (values) {
    this.update({
      Dates: values
    })
  }

  updateAssociation (values) {
    this.update({
      Association: values
    })
  }

  updatePosition (values) {
    this.update({
      Position: values
    })
  }

  updateService (values) {
    this.update({
      Service: values
    })
  }

  updateSupport (values) {
    this.update({
      Support: values
    })
  }

  updateCompensation (values) {
    this.update({
      Compensation: values
    })
  }

  render () {
    return (
      <div className="ventures-item">
        <Field title={i18n.t('foreign.business.ventures.heading.name')}
          scrollIntoView={this.props.scrollIntoView}>
          <Name name="Name"
            {...this.props.Name}
            onUpdate={this.updateName}
            onError={this.props.onError}
            className="ventures-name"
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Field>

        <Field title={i18n.t('foreign.business.ventures.heading.address')}
          help="foreign.business.ventures.help.address"
          adjustFor="address"
          scrollIntoView={this.props.scrollIntoView}>
          <Location name="Address"
            {...this.props.Address}
            onUpdate={this.updateAddress}
            onError={this.props.onError}
            className="ventures-address"
            layout={Location.ADDRESS}
            addressBooks={this.props.addressBooks}
            addressBook="ForeignNational"
            dispatch={this.props.dispatch}
            geocode={true}
            required={this.props.required}
          />
        </Field>

        <Field title={i18n.t('foreign.business.ventures.heading.citizenship')}
          help="foreign.business.ventures.help.citizenship"
          scrollIntoView={this.props.scrollIntoView}>
          <Country name="Citizenship"
            {...this.props.Citizenship}
            onUpdate={this.updateCitizenship}
            onError={this.props.onError}
            className="ventures-citizenship"
            multiple={true}
            required={this.props.required}
          />
        </Field>

        <Field title={i18n.t('foreign.business.ventures.heading.description')}
          help="foreign.business.ventures.help.description"
          scrollIntoView={this.props.scrollIntoView}>
          <Textarea name="Description"
            {...this.props.Description}
            onUpdate={this.updateDescription}
            onError={this.props.onError}
            className="ventures-description"
            required={this.props.required}
          />
        </Field>

        <Field title={i18n.t('foreign.business.ventures.heading.relationship')}
          help="foreign.business.ventures.help.relationship"
          scrollIntoView={this.props.scrollIntoView}>
          <Textarea name="Relationship"
            {...this.props.Relationship}
            onUpdate={this.updateRelationship}
            onError={this.props.onError}
            className="ventures-relationship"
            required={this.props.required}
          />
        </Field>

        <Field title={i18n.t('foreign.business.ventures.heading.dates')}
          help="foreign.business.ventures.help.dates"
          adjustFor="daterange"
          scrollIntoView={this.props.scrollIntoView}>
          <DateRange name="Dates"
            {...this.props.Dates}
            onUpdate={this.updateDates}
            onError={this.props.onError}
            className="ventures-dates"
            required={this.props.required}
          />
        </Field>

        <Field title={i18n.t('foreign.business.ventures.heading.association')}
          help="foreign.business.ventures.help.association"
          scrollIntoView={this.props.scrollIntoView}>
          <Textarea name="Association"
            {...this.props.Association}
            onUpdate={this.updateAssociation}
            onError={this.props.onError}
            className="ventures-association"
            required={this.props.required}
          />
        </Field>

        <Field title={i18n.t('foreign.business.ventures.heading.position')}
          help="foreign.business.ventures.help.position"
          scrollIntoView={this.props.scrollIntoView}>
          <Text name="Position"
            {...this.props.Position}
            onUpdate={this.updatePosition}
            onError={this.props.onError}
            className="ventures-position"
            required={this.props.required}
          />
        </Field>

        <Field title={i18n.t('foreign.business.ventures.heading.service')}
          help="foreign.business.ventures.help.service"
          scrollIntoView={this.props.scrollIntoView}>
          <Text name="Service"
            {...this.props.Service}
            onUpdate={this.updateService}
            onError={this.props.onError}
            className="ventures-service"
            required={this.props.required}
          />
        </Field>

        <Field title={i18n.t('foreign.business.ventures.heading.support')}
          help="foreign.business.ventures.help.support"
          scrollIntoView={this.props.scrollIntoView}>
          <Text name="Support"
            {...this.props.Support}
            onUpdate={this.updateSupport}
            onError={this.props.onError}
            className="ventures-support"
            required={this.props.required}
          />
        </Field>

        <Field title={i18n.t('foreign.business.ventures.heading.compensation')}
          help="foreign.business.ventures.help.compensation"
          scrollIntoView={this.props.scrollIntoView}>
          <Textarea name="Compensation"
            {...this.props.Compensation}
            onUpdate={this.updateCompensation}
            onError={this.props.onError}
            className="ventures-compensation"
            required={this.props.required}
          />
        </Field>
      </div>
    )
  }
}

VenturesItem.defaultProps = {
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
