import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Show, Accordion, RadioGroup, Radio, DateRange, Text, Textarea, Field } from '../../../Form'
import ForeignContact from './ForeignContact'
import { DateSummary, NameSummary } from '../../../Summary'

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
      List: props.List,
      ListBranch: props.ListBranch
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
      this.onUpdate('ListBranch', '')
    }
  }

  updateList (values) {
    this.onUpdate('List', values.items)
    this.onUpdate('ListBranch', values.branch)
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const itemProperties = (item || {}).Item || {}
    const name = NameSummary(itemProperties.Name, i18n.t('military.foreign.collection.contacts.summary.unknown'))
    const dates = DateSummary(itemProperties.Dates)

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
        <Field title={i18n.t('military.foreign.heading.organization')}
               help="military.foreign.help.organization"
               adjustFor="big-buttons"
               shrink={true}>
          <RadioGroup className="organization option-list"
                      selectedValue={this.state.Organization}>
            <Radio name="organization-military"
                   className="organization-military"
                   label={i18n.m('military.foreign.label.organization.military')}
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
        </Field>

        <Field title={i18n.t('military.foreign.heading.name')}
               help="military.foreign.help.name">
          <Text name="Name"
                {...this.state.Name}
                className="foreign-service-name"
                maxlength="100"
                onUpdate={this.updateName}
                onValidate={this.props.onValidate}
                />
        </Field>

        <Field title={i18n.t('military.foreign.heading.dates')}
               help="military.foreign.help.dates"
               adjustFor="daterange"
               shrink={true}>
          <DateRange name="Dates"
                     className="foreign-service-dates"
                     {...this.state.Dates}
                     onUpdate={this.updateDates}
                     onValidate={this.props.onValidate}
                     />
        </Field>

        <Field title={i18n.t('military.foreign.heading.country')}
               help="military.foreign.help.country">
          <Text name="Country"
                {...this.state.Country}
                className="foreign-service-country"
                maxlength="100"
                onUpdate={this.updateCountry}
                onValidate={this.props.onValidate}
                />
        </Field>

        <Field title={i18n.t('military.foreign.heading.rank')}
               help="military.foreign.help.rank">
          <Text name="Rank"
                {...this.state.Rank}
                className="foreign-service-rank"
                maxlength="100"
                onUpdate={this.updateRank}
                onValidate={this.props.onValidate}
                />
        </Field>

        <Field title={i18n.t('military.foreign.heading.division')}
               help="military.foreign.help.division">
          <Text name="Division"
                {...this.state.Division}
                className="foreign-service-division"
                maxlength="100"
                onUpdate={this.updateDivision}
                onValidate={this.props.onValidate}
                />
        </Field>

        <Field title={i18n.t('military.foreign.heading.circumstances')}
               help="military.foreign.help.circumstances">
          <Textarea name="Circumstances"
                    {...this.state.Circumstances}
                    className="foreign-service-circumstances"
                    maxlength="100"
                    onUpdate={this.updateCircumstances}
                    onValidate={this.props.onValidate}
                    />
        </Field>

        <Field title={i18n.t('military.foreign.heading.left')}
               help="military.foreign.help.left">
          <Textarea name="ReasonLeft"
                    {...this.state.ReasonLeft}
                    className="foreign-service-left"
                    maxlength="100"
                    onUpdate={this.updateReasonLeft}
                    onValidate={this.props.onValidate}
                    />
        </Field>

        <h3>{i18n.t('military.foreign.heading.maintainscontact')}</h3>
        <Branch name="has_maintainscontact"
                className="maintainscontact"
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
                       branch={this.state.ListBranch}
                       onUpdate={this.updateList}
                       onValidate={this.props.onValidate}
                       summary={this.summary}
                       description={i18n.t('military.foreign.collection.contacts.summary.title')}
                       appendTitle={i18n.t('military.foreign.collection.contacts.appendTitle')}
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
