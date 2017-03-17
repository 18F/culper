import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Show, Accordion, RadioGroup, Radio, DateRange, Text, Textarea, Help, HelpIcon } from '../../../Form'
import ForeignContact from './ForeignContact'
import { dateSummary } from '../../History/summaries'

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

export default class ForeignService extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      Organization: props.Organization,
      Name: props.Name,
      Dates: props.Dates,
      Country: props.Country,
      Rank: props.Rank,
      Division: props.Division,
      Circumstances: props.Circumstances,
      ReasonLeft: props.ReasonLeft,
      MaintainsContact: props.MaintainsContact,
      List: props.List
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateOrganization = this.updateOrganization.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateRank = this.updateRank.bind(this)
    this.updateDivision = this.updateDivision.bind(this)
    this.updateCircumstances = this.updateCircumstances.bind(this)
    this.updateReasonLeft = this.updateReasonLeft.bind(this)
    this.updateMaintainsContact = this.updateMaintainsContact.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)
    })
  }

  updateOrganization (event) {
    this.onUpdate('Organization', event.target.value)
  }

  updateName (value) {
    this.onUpdate('Name', value)
  }

  updateDates (value) {
    this.onUpdate('Dates', value)
  }

  updateCountry (value) {
    this.onUpdate('Country', value)
  }

  updateRank (value) {
    this.onUpdate('Rank', value)
  }

  updateDivision (value) {
    this.onUpdate('Division', value)
  }

  updateCircumstances (value) {
    this.onUpdate('Circumstances', value)
  }

  updateReasonLeft (value) {
    this.onUpdate('ReasonLeft', value)
  }

  updateMaintainsContact (value, event) {
    this.onUpdate('MaintainsContact', value)

    // If there is no history clear out any previously entered data
    if (value === 'No') {
      this.onUpdate('List', [])
    }
  }

  updateList (value) {
    this.onUpdate('List', value)
  }

  labelForMilitary () {
    return (
      <p>
        {i18n.t('military.foreign.label.organization.military')}<br />
        <span className="smaller">{i18n.t('military.foreign.label.organization.military2')}</span>
      </p>
    )
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const itemProperties = (item || {}).Item || {}
    const name = itemProperties.Name && itemProperties.Name.value
          ? itemProperties.Name.value
          : i18n.t('military.foreign.collection.contacts.summary.unknown')
    const dates = dateSummary(itemProperties)

    return (
      <span>
        <span className="index">{i18n.t('military.foreign.collection.contacts.summary.item')} {index + 1}:</span>
        <span className=""><strong>{name}</strong></span>
        <span className="dates"><strong>{dates}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="foreign-service">
        <h3>{i18n.t('military.foreign.heading.organization')}</h3>
        <div className="eapp-field-wrap no-label">
          <Help id="military.foreign.help.organization">
            <RadioGroup className="organization option-list"
                        selectedValue={this.state.Organization}>
              <Radio name="organization-military"
                     className="organization-military"
                     label={this.labelForMilitary()}
                     value="Military"
                     onChange={this.updateOrganization}
                     />
              <Radio name="organization-intelligence"
                     className="organization-intelligence"
                     label={i18n.m('military.foreign.label.organization.intelligence')}
                     value="Intelligence"
                     onChange={this.updateOrganization}
                     />
              <Radio name="organization-diplomatic"
                     className="organization-diplomatic"
                     label={i18n.m('military.foreign.label.organization.diplomatic')}
                     value="Diplomatic"
                     onChange={this.updateOrganization}
                     />
              <Radio name="organization-security"
                     className="organization-security"
                     label={i18n.m('military.foreign.label.organization.security')}
                     value="Security"
                     onChange={this.updateOrganization}
                     />
              <Radio name="organization-militia"
                     className="organization-militia"
                     label={i18n.m('military.foreign.label.organization.militia')}
                     value="Militia"
                     onChange={this.updateOrganization}
                     />
              <Radio name="organization-defense"
                     className="organization-defense"
                     label={i18n.m('military.foreign.label.organization.defense')}
                     value="Defense"
                     onChange={this.updateOrganization}
                     />
              <Radio name="organization-other"
                     className="organization-other"
                     label={i18n.m('military.foreign.label.organization.other')}
                     value="Other"
                     onChange={this.updateOrganization}
                     />
            </RadioGroup>
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t('military.foreign.heading.name')}</h3>
        <div className="eapp-field-wrap no-label">
          <Help id="military.foreign.help.name">
            <Text name="Name"
                  {...this.state.Name}
                  className="foreign-service-name"
                  maxlength="100"
                  onUpdate={this.updateName}
                  onValidate={this.props.onValidate}
                  />
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t('military.foreign.heading.dates')}</h3>
        <div className="eapp-field-wrap no-label">
          <Help id="military.foreign.help.dates">
            <DateRange name="Dates"
                       className="foreign-service-dates"
                       {...this.state.Dates}
                       onUpdate={this.updateDates}
                       onValidate={this.props.onValidate}
                       />
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t('military.foreign.heading.country')}</h3>
        <div className="eapp-field-wrap no-label">
          <Help id="military.foreign.help.country">
            <Text name="Country"
                  {...this.state.Country}
                  className="foreign-service-country"
                  maxlength="100"
                  onUpdate={this.updateCountry}
                  onValidate={this.props.onValidate}
                  />
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t('military.foreign.heading.rank')}</h3>
        <div className="eapp-field-wrap no-label">
          <Help id="military.foreign.help.rank">
            <Text name="Rank"
                  {...this.state.Rank}
                  className="foreign-service-rank"
                  maxlength="100"
                  onUpdate={this.updateRank}
                  onValidate={this.props.onValidate}
                  />
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t('military.foreign.heading.division')}</h3>
        <div className="eapp-field-wrap no-label">
          <Help id="military.foreign.help.division">
            <Text name="Division"
                  {...this.state.Division}
                  className="foreign-service-division"
                  maxlength="100"
                  onUpdate={this.updateDivision}
                  onValidate={this.props.onValidate}
                  />
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t('military.foreign.heading.circumstances')}</h3>
        <div className="eapp-field-wrap no-label">
          <Help id="military.foreign.help.circumstances">
            <Textarea name="Circumstances"
                      {...this.state.Circumstances}
                      className="foreign-service-circumstances"
                      maxlength="100"
                      onUpdate={this.updateCircumstances}
                      onValidate={this.props.onValidate}
                      />
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t('military.foreign.heading.left')}</h3>
        <div className="eapp-field-wrap no-label">
          <Help id="military.foreign.help.left">
            <Textarea name="ReasonLeft"
                      {...this.state.ReasonLeft}
                      className="foreign-service-left"
                      maxlength="100"
                      onUpdate={this.updateReasonLeft}
                      onValidate={this.props.onValidate}
                      />
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t('military.foreign.heading.maintainscontact')}</h3>
        <Branch name="has_maintainscontact"
                className="eapp-field-wrap no-label maintainscontact"
                value={this.state.MaintainsContact}
                help="military.foreign.help.maintainscontact"
                onUpdate={this.updateMaintainsContact}
                onValidate={this.props.onValidate}>
        </Branch>

        <Show when={this.state.MaintainsContact === 'Yes'}>
          <div>
            <h2>{i18n.t('military.foreign.heading.contact.details')}</h2>
            {i18n.m('military.foreign.para.contact')}
            <Accordion minimum="1"
                       className="foreign-contacts-collection"
                       items={this.state.List}
                       onUpdate={this.updateList}
                       onValidate={this.props.onValidate}
                       summary={this.summary}
                       description={i18n.t('military.foreign.collection.contacts.summary.title')}
                       appendTitle={i18n.t('military.foreign.collection.contacts.appendTitle')}
                       appendMessage={i18n.m('military.foreign.collection.contacts.appendMessage')}
                       appendLabel={i18n.t('military.foreign.collection.contacts.append')}>
              <ForeignContact name="Item"
                              bind={true}
                              />
            </Accordion>
          </div>
        </Show>
      </div>
    )
  }
}
