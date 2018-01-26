import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Field, DateControl, Location, Textarea } from '../../../Form'

export default class ManipulatingItem extends ValidationElement {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateDate = this.updateDate.bind(this)
    this.updateIncident = this.updateIncident.bind(this)
    this.updateLocation = this.updateLocation.bind(this)
    this.updateAction = this.updateAction.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Date: this.props.Date,
      Incident: this.props.Incident,
      Location: this.props.Location,
      Action: this.props.Action,
      ...queue
    })
  }

  updateDate (values) {
    this.update({
      Date: values
    })
  }

  updateIncident (values) {
    this.update({
      Incident: values
    })
  }

  updateLocation (values) {
    this.update({
      Location: values
    })
  }

  updateAction (values) {
    this.update({
      Action: values
    })
  }

  render () {
    return (
      <div>
        <Field title={i18n.t('legal.technology.manipulating.heading.date')}
               help="legal.technology.manipulating.help.date"
               adjustFor="datecontrol"
               scrollIntoView={this.props.scrollIntoView}>
          <DateControl name="Date"
                       {...this.props.Date}
                       applicantBirthdate={this.props.applicantBirthdate}
                       onUpdate={this.updateDate}
                       onError={this.props.onError}
                       className="legal-technology-manipulating-date"
                       required={this.props.required}
                       />
        </Field>

        <Field title={i18n.t('legal.technology.manipulating.heading.incident')}
               adjustFor="textarea"
               scrollIntoView={this.props.scrollIntoView}>
          <Textarea name="Incident"
                    {...this.props.Incident}
                    onUpdate={this.updateIncident}
                    onError={this.props.onError}
                    className="legal-technology-manipulating-incident"
                    required={this.props.required}
                    />
        </Field>

        <Field title={i18n.t('legal.technology.manipulating.heading.location')}
               optional={true}
               help="legal.technology.manipulating.help.location"
               adjustFor="address"
               scrollIntoView={this.props.scrollIntoView}>
          <Location name="Location"
                    {...this.props.Location}
                    onUpdate={this.updateLocation}
                    onError={this.props.onError}
                    className="legal-technology-manipulating-location"
                    layout={Location.ADDRESS}
                    geocode={true}
                    addressBooks={this.props.addressBooks}
                    addressBook="Incident"
                    dispatch={this.props.dispatch}
                    required={this.props.required}
                    />
        </Field>

        <Field title={i18n.t('legal.technology.manipulating.heading.action')}
               adjustFor="textarea"
               scrollIntoView={this.props.scrollIntoView}>
          <Textarea name="Action"
                    {...this.props.Action}
                    onUpdate={this.updateAction}
                    onError={this.props.onError}
                    className="legal-technology-manipulating-action"
                    required={this.props.required}
                    />
        </Field>
      </div>
    )
  }
}

ManipulatingItem.defaultProps = {
  applicantBirthdate: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
