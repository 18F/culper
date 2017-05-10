import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Field, Show,
         Address, Textarea, Name, DateControl } from '../../../Form'

export default class JobOffer extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      Name: props.Name,
      Description: props.Description,
      Date: props.Date,
      Address: props.Address,
      Accepted: props.Accepted,
      Explanation: props.Explanation
    }

    this.update = this.update.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateDescription = this.updateDescription.bind(this)
    this.updateDate = this.updateDate.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateAccepted = this.updateAccepted.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
  }

  update (field, values) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        Name: this.props.Name,
        Description: this.props.Description,
        Date: this.props.Date,
        Address: this.props.Address,
        Accepted: this.props.Accepted,
        Explanation: this.props.Explanation,
        [field]: values
      })
    }
  }

  updateName (values) {
    this.update('Name', values)
  }

  updateDescription (values) {
    this.update('Description', values)
  }

  updateDate (values) {
    this.update('Date', values)
  }

  updateAddress (values) {
    this.update('Address', values)
  }

  updateAccepted (values) {
    this.update('Accepted', values)
  }

  updateExplanation (values) {
    this.update('Explanation', values)
  }

  render () {
    return (
      <div className="job-offer">
        <h3>{i18n.t('foreign.business.employment.heading.name')}</h3>
        <Name name="Name"
              className="employment-name"
              onUpdate={this.updateName}
              onValidate={this.props.onValidate}
              />

        <Field title={i18n.t('foreign.business.employment.heading.description')}
               help="foreign.business.employment.help.description">
          <Textarea name="Description"
                    className="employment-description"
                    onUpdate={this.updateDescription}
                    onValidate={this.props.onValidate}
                    />
        </Field>

        <Field title={i18n.t('foreign.business.employment.heading.date')}
               help="foreign.business.employment.help.date"
               adjustFor="label">
          <DateControl name="Date"
                       className="employment-date"
                       onUpdate={this.updateDate}
                       onValidate={this.props.onValidate}
                       />
        </Field>

        <Field title={i18n.t('foreign.business.employment.heading.address')}
               help="foreign.business.employment.help.address"
               adjustFor="address">
          <Address name="Address"
                   className="employment-address"
                   onUpdate={this.updateAddress}
                   onValidate={this.props.onValidate}
                   />
        </Field>

        <Branch name="Accepted"
                label={i18n.t('foreign.business.employment.heading.accepted')}
                labelSize="h3"
                help="foreign.business.employment.help.accepted"
                className="employment-accepted"
                value={this.props.Accepted}
                onUpdate={this.updateAccepted}
                onValidate={this.props.onValidate}
                />

        <Show when={this.props.Accepted === 'Yes'}>
          <Field title={i18n.t('foreign.business.employment.label.explanation')}
                 titleSize="label">
            <Textarea name="Explanation"
                      className="employment-explanation"
                      onUpdate={this.updateExplanation}
                      onValidate={this.props.onValidate}
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
  Explanation: {}
}
