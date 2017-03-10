import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Show, Address, DateControl, Textarea, Text, Help, HelpIcon } from '../../../Form'

/**
 * Convenience function to send updates along their merry way
 */
const sendUpdate = (fn, name, props) => {
  if (fn) {
    fn({
      name: name,
      ...props
    })
  }
}

export default class Offense extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      Date: props.Date,
      Description: props.Description,
      InvolvedViolence: props.InvolvedViolence,
      InvolvedFirearms: props.InvolvedFirearms,
      InvolvedSubstances: props.InvolvedSubstances,
      Address: props.Address,
      WasCited: props.WasCited,
      CitedBy: props.CitedBy,
      AgencyAddress: props.AgencyAddress,
      WasCharged: props.WasCharged
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateDate = this.updateDate.bind(this)
    this.updateDescription = this.updateDescription.bind(this)
    this.updateInvolvedViolence = this.updateInvolvedViolence.bind(this)
    this.updateInvolvedFirearms = this.updateInvolvedFirearms.bind(this)
    this.updateInvolvedSubstances = this.updateInvolvedSubstances.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateWasCited = this.updateWasCited.bind(this)
    this.updateCitedBy = this.updateCitedBy.bind(this)
    this.updateAgencyAddress = this.updateAgencyAddress.bind(this)
    this.updateWasCharged = this.updateWasCharged.bind(this)
  }

  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)
    })
  }

  updateDate (values) {
    this.onUpdate('Date', values)
  }

  updateDescription (values) {
    this.onUpdate('Description', values)
  }

  updateInvolvedViolence (value, event) {
    this.onUpdate('InvolvedViolence', value)
  }

  updateInvolvedFirearms (value, event) {
    this.onUpdate('InvolvedFirearms', value)
  }

  updateInvolvedSubstances (value, event) {
    this.onUpdate('InvolvedSubstances', value)
  }

  updateAddress (value) {
    this.onUpdate('Address', value)
  }

  updateWasCited (value, event) {
    this.onUpdate('WasCited', value)
  }

  updateCitedBy (values) {
    this.onUpdate('CitedBy', values)
  }

  updateAgencyAddress (value) {
    this.onUpdate('AgencyAddress', value)
  }

  updateWasCharged (value, event) {
    this.onUpdate('WasCharged', value)
  }

  render () {
    return (
      <div className="offense">
        <h3>{i18n.t('legal.police.heading.date')}</h3>
        <div className="eapp-field-wrap">
          <Help id="legal.police.help.date">
            <DateControl name="Date"
                         {...this.state.Date}
                         className="offense-date"
                         onUpdate={this.updateDate}
                         onValidate={this.props.onValidate}
                         />
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t('legal.police.heading.description')}</h3>
        <div className="eapp-field-wrap no-label">
          <Help id="legal.police.help.description">
            <Textarea name="Description"
                      {...this.state.Description}
                      className="offense-description"
                      onUpdate={this.updateDescription}
                      onValidate={this.props.onValidate}
                      />
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t('legal.police.heading.involvement')}</h3>
        <Branch name="involved_violence"
                className="eapp-field-wrap no-label offense-violence"
                value={this.state.InvolvedViolence}
                help="legal.police.help.violence"
                onUpdate={this.updateInvolvedViolence}
                onValidate={this.props.onValidate}>
          {i18n.m('legal.police.label.violence')}
        </Branch>

        <Branch name="involved_firearms"
                className="eapp-field-wrap no-label offense-firearms"
                value={this.state.InvolvedFirearms}
                help="legal.police.help.firearms"
                onUpdate={this.updateInvolvedFirearms}
                onValidate={this.props.onValidate}>
          {i18n.m('legal.police.label.firearms')}
        </Branch>

        <Branch name="involved_substances"
                className="eapp-field-wrap no-label offense-substances"
                value={this.state.InvolvedSubstances}
                help="legal.police.help.substances"
                onUpdate={this.updateInvolvedSubstances}
                onValidate={this.props.onValidate}>
          {i18n.m('legal.police.label.substances')}
        </Branch>

        <h3>{i18n.t('legal.police.heading.address')}</h3>
        <div className="eapp-field-wrap">
          <Help id="legal.police.help.address">
            <Address name="Address"
                     {...this.state.Address}
                     className="offense-address"
                     label={i18n.t('legal.police.label.address')}
                     onUpdate={this.updateAddress}
                     onValidate={this.props.onValidate}
                     />
            <HelpIcon className="address-help-icon" />
          </Help>
        </div>

        <h3>{i18n.t('legal.police.heading.cited')}</h3>
        <Branch name="was_cited"
                className="eapp-field-wrap no-label offense-cited"
                value={this.state.WasCited}
                help="legal.police.help.cited"
                onUpdate={this.updateWasCited}
                onValidate={this.props.onValidate}>
        </Branch>

        <Show when={this.state.WasCited === 'Yes'}>
          <div>
            <h2>{i18n.t('legal.police.heading.citedagency')}</h2>
            <h3>{i18n.t('legal.police.heading.citedby')}</h3>
            <div className="eapp-field-wrap no-label">
              <Help id="legal.police.help.citedby">
                <Text name="CitedBy"
                      {...this.state.CitedBy}
                      className="offense-citedby"
                      onUpdate={this.updateCitedBy}
                      onValidate={this.props.onValidate}
                      />
                <HelpIcon />
              </Help>
            </div>

            <h3>{i18n.t('legal.police.heading.agencyaddress')}</h3>
            <div className="eapp-field-wrap">
              <Help id="legal.police.help.agencyaddress">
                <Address name="AgencyAddress"
                        {...this.state.AgencyAddress}
                        className="offense-agencyaddress"
                        label={i18n.t('legal.police.label.address')}
                        onUpdate={this.updateAgencyAddress}
                        onValidate={this.props.onValidate}
                        />
                <HelpIcon className="address-help-icon" />
              </Help>
            </div>

            <h3>{i18n.t('legal.police.heading.charged')}</h3>
            <Branch name="was_charged"
                    className="eapp-field-wrap no-label offense-charged"
                    value={this.state.WasCharged}
                    help="legal.police.help.charged"
                    onUpdate={this.updateWasCharged}
                    onValidate={this.props.onValidate}>
            </Branch>
          </div>
        </Show>
      </div>
    )
  }
}
