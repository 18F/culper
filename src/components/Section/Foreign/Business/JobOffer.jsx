import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Field, Show,
         Textarea, Name, DateControl, Location } from '../../../Form'

export default class JobOffer extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateDescription = this.updateDescription.bind(this)
    this.updateDate = this.updateDate.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateAccepted = this.updateAccepted.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Name: this.props.Name,
      Description: this.props.Description,
      Date: this.props.Date,
      Address: this.props.Address,
      Accepted: this.props.Accepted,
      Explanation: this.props.Explanation,
      ...queue
    })
  }

  updateName (values) {
    this.update({
      Name: values
    })
  }

  updateDescription (values) {
    this.update({
      Description: values
    })
  }

  updateDate (values) {
    this.update({
      Date: values
    })
  }

  updateAddress (values) {
    this.update({
      Address: values
    })
  }

  updateAccepted (values) {
    this.update({
      Accepted: values
    })
  }

  updateExplanation (values) {
    this.update({
      Explanation: values
    })
  }

  render () {
    return (
      <div className="job-offer">
        <h3>{i18n.t('foreign.business.employment.heading.name')}</h3>
        <Name name="Name"
              className="employment-name"
              onUpdate={this.updateName}
              onError={this.props.onError}
              {...this.props.Name}
              required={this.props.required}
              />

        <Field title={i18n.t('foreign.business.employment.heading.description')}>
          <Textarea name="Description"
                    className="employment-description"
                    onUpdate={this.updateDescription}
                    onError={this.props.onError}
                    {...this.props.Description}
                    required={this.props.required}
                    />
        </Field>

        <Field title={i18n.t('foreign.business.employment.heading.date')}
               help="foreign.business.employment.help.date"
               adjustFor="label">
          <DateControl name="Date"
                       {...this.props.Date}
                       className="employment-date"
                       onUpdate={this.updateDate}
                       onError={this.props.onError}
                       required={this.props.required}
                       />
        </Field>

        <Field title={i18n.t('foreign.business.employment.heading.address')}
               adjustFor="address">
          <Location name="Address"
                   {...this.props.Address}
                   label={i18n.t('foreign.business.employment.label.address')}
                   layout={Location.US_CITY_STATE_ZIP_INTERNATIONAL_CITY}
                   className="employment-address"
                   onUpdate={this.updateAddress}
                   onError={this.props.onError}
                   required={this.props.required}
                   />
        </Field>

        <Branch name="Accepted"
                label={i18n.t('foreign.business.employment.heading.accepted')}
                labelSize="h3"
                className="employment-accepted"
                value={this.props.Accepted}
                onUpdate={this.updateAccepted}
                onError={this.props.onError}
                required={this.props.required}
                />

        <Show when={this.props.Accepted === 'Yes' || this.props.Accepted === 'No'}>
          <Field title={i18n.t('foreign.business.employment.label.explanation')}
                 titleSize="label">
            <Textarea name="Explanation"
                      {...this.props.Explanation}
                      className="employment-explanation"
                      onUpdate={this.updateExplanation}
                      onError={this.props.onError}
                      required={this.props.required}
                      />
          </Field>
        </Show>
      </div>
    )
  }
}

JobOffer.defaultProps = {
  name: 'Item',
  Name: {},
  Description: {},
  Date: {},
  Address: {},
  Accepted: '',
  Explanation: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
