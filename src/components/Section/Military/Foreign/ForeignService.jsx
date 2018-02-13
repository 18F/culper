import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Show, Accordion, RadioGroup, Radio, DateRange, Text, Textarea, Field, Country } from '../../../Form'
import ForeignContact from './ForeignContact'
import { Summary, DateSummary, NameSummary } from '../../../Summary'
import { ForeignContactValidator } from '../../../../validators'

export default class ForeignService extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
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

  update (queue) {
    this.props.onUpdate({
      Organization: this.props.Organization,
      Name: this.props.Name,
      Dates: this.props.Dates,
      Country: this.props.Country,
      Rank: this.props.Rank,
      Division: this.props.Division,
      Circumstances: this.props.Circumstances,
      ReasonLeft: this.props.ReasonLeft,
      MaintainsContact: this.props.MaintainsContact,
      List: this.props.List,
      ...queue
    })
  }

  updateOrganization (cb) {
    this.update({
      Organization: cb
    })
  }

  updateName (value) {
    this.update({
      Name: value
    })
  }

  updateDates (value) {
    this.update({
      Dates: value
    })
  }

  updateCountry (value) {
    this.update({
      Country: value
    })
  }

  updateRank (value) {
    this.update({
      Rank: value
    })
  }

  updateDivision (value) {
    this.update({
      Division: value
    })
  }

  updateCircumstances (value) {
    this.update({
      Circumstances: value
    })
  }

  updateReasonLeft (value) {
    this.update({
      ReasonLeft: value
    })
  }

  updateMaintainsContact (values) {
    // If there is no history clear out any previously entered data
    this.update({
      MaintainsContact: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  updateList (values) {
    this.update({
      List: values
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const itemProperties = (item || {}).Item || {}
    const dates = DateSummary(itemProperties.Dates)
    const name = NameSummary(itemProperties.Name)

    return Summary({
      type: i18n.t('military.foreign.collection.contacts.summary.item'),
      index: index,
      left: name,
      right: dates,
      placeholder: i18n.m('military.foreign.collection.contacts.summary.unknown')
    })
  }

  render () {
    return (
      <div className="foreign-service">
        <Field title={i18n.t('military.foreign.heading.organization')}
               adjustFor="big-buttons"
               shrink={true}
               scrollIntoView={this.props.scrollIntoView}>
          <RadioGroup className="organization option-list"
                      onError={this.props.onError}
                      required={this.props.required}
                      selectedValue={(this.props.Organization || {}).value}>
            <Radio name="organization-military"
                   className="organization-military"
                   label={i18n.m('military.foreign.label.organization.military')}
                   value="Military"
                   onUpdate={this.updateOrganization}
                   onError={this.props.onError}
                   />
            <Radio name="organization-intelligence"
                   className="organization-intelligence"
                   label={i18n.m('military.foreign.label.organization.intelligence')}
                   value="Intelligence"
                   onUpdate={this.updateOrganization}
                   onError={this.props.onError}
                   />
            <Radio name="organization-diplomatic"
                   className="organization-diplomatic"
                   label={i18n.m('military.foreign.label.organization.diplomatic')}
                   value="Diplomatic"
                   onUpdate={this.updateOrganization}
                   onError={this.props.onError}
                   />
            <Radio name="organization-security"
                   className="organization-security"
                   label={i18n.m('military.foreign.label.organization.security')}
                   value="Security"
                   onUpdate={this.updateOrganization}
                   onError={this.props.onError}
                   />
            <Radio name="organization-militia"
                   className="organization-militia"
                   label={i18n.m('military.foreign.label.organization.militia')}
                   value="Militia"
                   onUpdate={this.updateOrganization}
                   onError={this.props.onError}
                   />
            <Radio name="organization-defense"
                   className="organization-defense"
                   label={i18n.m('military.foreign.label.organization.defense')}
                   value="Defense"
                   onUpdate={this.updateOrganization}
                   onError={this.props.onError}
                   />
            <Radio name="organization-other"
                   className="organization-other"
                   label={i18n.m('military.foreign.label.organization.other')}
                   value="Other"
                   onUpdate={this.updateOrganization}
                   onError={this.props.onError}
                   />
          </RadioGroup>
        </Field>

        <Field title={i18n.t('military.foreign.heading.name')}
               scrollIntoView={this.props.scrollIntoView}>
          <Text name="Name"
                {...this.props.Name}
                className="foreign-service-name"
                maxlength="100"
                onUpdate={this.updateName}
                onError={this.props.onError}
                required={this.props.required}
                />
        </Field>

        <Field title={i18n.t('military.foreign.heading.dates')}
               help="military.foreign.help.dates"
               adjustFor="daterange"
               shrink={true}
               scrollIntoView={this.props.scrollIntoView}>
          <DateRange name="Dates"
                     className="foreign-service-dates"
                     {...this.props.Dates}
                     onUpdate={this.updateDates}
                     onError={this.props.onError}
                     required={this.props.required}
                     />
        </Field>

        <Field title={i18n.t('military.foreign.heading.country')}
               adjustFor="country"
               scrollIntoView={this.props.scrollIntoView}>
          <Country name="Country"
                   {...this.props.Country}
                   className="foreign-service-country"
                   maxlength="100"
                   onUpdate={this.updateCountry}
                   onError={this.props.onError}
                   required={this.props.required}
                   />
        </Field>

        <Field title={i18n.t('military.foreign.heading.rank')}
               scrollIntoView={this.props.scrollIntoView}>
          <Text name="Rank"
                {...this.props.Rank}
                className="foreign-service-rank"
                maxlength="100"
                onUpdate={this.updateRank}
                onError={this.props.onError}
                required={this.props.required}
                />
        </Field>

        <Field title={i18n.t('military.foreign.heading.division')}
               scrollIntoView={this.props.scrollIntoView}>
          <Text name="Division"
                {...this.props.Division}
                className="foreign-service-division"
                maxlength="100"
                onUpdate={this.updateDivision}
                onError={this.props.onError}
                required={this.props.required}
                />
        </Field>

        <Field title={i18n.t('military.foreign.heading.circumstances')}
               scrollIntoView={this.props.scrollIntoView}>
          <Textarea name="Circumstances"
                    {...this.props.Circumstances}
                    className="foreign-service-circumstances"
                    maxlength="100"
                    onUpdate={this.updateCircumstances}
                    onError={this.props.onError}
                    required={this.props.required}
                    />
        </Field>

        <Field title={i18n.t('military.foreign.heading.left')}
               scrollIntoView={this.props.scrollIntoView}>
          <Textarea name="ReasonLeft"
                    {...this.props.ReasonLeft}
                    className="foreign-service-left"
                    maxlength="100"
                    onUpdate={this.updateReasonLeft}
                    onError={this.props.onError}
                    required={this.props.required}
                    />
        </Field>

        <Branch name="has_maintainscontact"
                label={i18n.t('military.foreign.heading.maintainscontact')}
                labelSize="h3"
                className="maintainscontact"
                {...this.props.MaintainsContact}
                help="military.foreign.help.maintainscontact"
                onUpdate={this.updateMaintainsContact}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                onError={this.props.onError}>
        </Branch>

        <Show when={this.props.MaintainsContact.value === 'Yes'}>
          <div>
            <Field title={i18n.t('military.foreign.heading.contact.details')}
                   titleSize="h2"
                   optional={true}
                   className="no-margin-bottom">
              {i18n.m('military.foreign.para.contact')}
            </Field>

            <Accordion className="foreign-contacts-collection"
                       {...this.props.List}
                       defaultState={this.props.defaultState}
                       onUpdate={this.updateList}
                       onError={this.props.onError}
                       validator={ForeignContactValidator}
                       summary={this.summary}
                       description={i18n.t('military.foreign.collection.contacts.summary.title')}
                       appendTitle={i18n.t('military.foreign.collection.contacts.appendTitle')}
                       appendLabel={i18n.t('military.foreign.collection.contacts.append')}
                       required={this.props.required}
                       scrollIntoView={this.props.scrollIntoView}>
              <ForeignContact name="Item"
                              bind={true}
                              addressBooks={this.props.addressBooks}
                              dispatch={this.props.dispatch}
                              required={this.props.required}
                              scrollIntoView={this.props.scrollIntoView}
                              />
            </Accordion>
          </div>
        </Show>
      </div>
    )
  }
}

ForeignService.defaultProps = {
  MaintainsContact: {},
  addressBooks: {},
  dispatch: (action) => {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  defaultState: true
}
