import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Field, Name, Textarea, DateControl,
         CheckboxGroup, Checkbox, RadioGroup, Radio, Country,
         Address, Text, NotApplicable, Show, BranchCollection, Location } from '../../../Form'

export default class ForeignNational extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateNameNotApplicable = this.updateNameNotApplicable.bind(this)
    this.updateNameExplanation = this.updateNameExplanation.bind(this)
    this.updateFirstContact = this.updateFirstContact.bind(this)
    this.updateLastContact = this.updateLastContact.bind(this)
    this.updateMethods = this.updateMethods.bind(this)
    this.updateMethodsExplanation = this.updateMethodsExplanation.bind(this)
    this.updateFrequency = this.updateFrequency.bind(this)
    this.updateFrequencyExplanation = this.updateFrequencyExplanation.bind(this)
    this.updateRelationship = this.updateRelationship.bind(this)
    this.updateRelationshipExplanation = this.updateRelationshipExplanation.bind(this)
    this.updateAliases = this.updateAliases.bind(this)
    this.updateCitizenship = this.updateCitizenship.bind(this)
    this.updateBirthdate = this.updateBirthdate.bind(this)
    this.updateBirthdateNotApplicable = this.updateBirthdateNotApplicable.bind(this)
    this.updateBirthplace = this.updateBirthplace.bind(this)
    this.updateBirthplaceNotApplicable = this.updateBirthplaceNotApplicable.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateAddressNotApplicable = this.updateAddressNotApplicable.bind(this)
    this.updateEmployer = this.updateEmployer.bind(this)
    this.updateEmployerNotApplicable = this.updateEmployerNotApplicable.bind(this)
    this.updateEmployerAddress = this.updateEmployerAddress.bind(this)
    this.updateEmployerAddressNotApplicable = this.updateEmployerAddressNotApplicable.bind(this)
    this.updateHasAffiliations = this.updateHasAffiliations.bind(this)
    this.updateAffiliations = this.updateAffiliations.bind(this)
  }

  update (queue) {
    if (this.props.onUpdate) {
      let obj = {
        Name: this.props.Name,
        NameNotApplicable: this.props.NameNotApplicable,
        NameExplanation: this.props.NameExplanation,
        FirstContact: this.props.FirstContact,
        LastContact: this.props.LastContact,
        Methods: this.props.Methods,
        MethodsExplanation: this.props.MethodsExplanation,
        Frequency: this.props.Frequency,
        FrequencyExplanation: this.props.FrequencyExplanation,
        Relationship: this.props.Relationship,
        RelationshipExplanation: this.props.RelationshipExplanation,
        Aliases: this.props.Aliases,
        Citizenship: this.props.Citizenship,
        Birthdate: this.props.Birthdate,
        BirthdateNotApplicable: this.props.BirthdateNotApplicable,
        Birthplace: this.props.Birthplace,
        BirthplaceNotApplicable: this.props.BirthplaceNotApplicable,
        Address: this.props.Address,
        AddressNotApplicable: this.props.AddressNotApplicable,
        Employer: this.props.Employer,
        EmployerNotApplicable: this.props.EmployerNotApplicable,
        EmployerAddress: this.props.EmployerAddress,
        EmployerAddressNotApplicable: this.props.EmployerAddressNotApplicable,
        HasAffiliations: this.props.HasAffiliations,
        Affiliations: this.props.Affiliations
      }

      for (const q of queue) {
        obj = { ...obj, [q.name]: q.value }
      }

      this.props.onUpdate(obj)
    }
  }

  updateName (value) {
    this.update([
      { name: 'Name', value: value }
    ])
  }

  updateNameNotApplicable (value) {
    this.update([
      { name: 'NameNotApplicable', value: value }
    ])
  }

  updateNameExplanation (value) {
    this.update([
      { name: 'NameExplanation', value: value }
    ])
  }

  updateFirstContact (value) {
    this.update([
      { name: 'FirstContact', value: value }
    ])
  }

  updateLastContact (value) {
    this.update([
      { name: 'LastContact', value: value }
    ])
  }

  updateMethods (response) {
    let selected = response.value
    let list = [...(this.props.Methods || [])]

    if (list.includes(selected)) {
      list.splice(list.indexOf(selected), 1)
    } else {
      list.push(selected)
    }

    this.update([
      { name: 'Methods', value: list }
    ])
  }

  updateMethodsExplanation (value) {
    this.update([
      { name: 'MethodsExplanation', value: value }
    ])
  }

  updateFrequency (response) {
    this.update([
      { name: 'Frequency', value: response.value }
    ])
  }

  updateFrequencyExplanation (value) {
    this.update([
      { name: 'FrequencyExplanation', value: value }
    ])
  }

  updateRelationship (response) {
    let selected = response.value
    let list = [...(this.props.Relationship || [])]

    if (list.includes(selected)) {
      list.splice(list.indexOf(selected), 1)
    } else {
      list.push(selected)
    }

    this.update([
      { name: 'Relationship', value: list }
    ])
  }

  updateRelationshipExplanation (value) {
    this.update([
      { name: 'RelationshipExplanation', value: value }
    ])
  }

  updateAliases (value) {
    this.update([
      { name: 'Aliases', value: value }
    ])
  }

  updateCitizenship (value) {
    this.update([
      { name: 'Citizenship', value: value }
    ])
  }

  updateBirthdate (value) {
    this.update([
      { name: 'Birthdate', value: value }
    ])
  }

  updateBirthdateNotApplicable (value) {
    this.update([
      { name: 'BirthdateNotApplicable', value: value }
    ])
  }

  updateBirthplace (value) {
    this.update([
      { name: 'Birthplace', value: value }
    ])
  }

  updateBirthplaceNotApplicable (value) {
    this.update([
      { name: 'BirthplaceNotApplicable', value: value }
    ])
  }

  updateAddress (value) {
    this.update([
      { name: 'Address', value: value }
    ])
  }

  updateAddressNotApplicable (value) {
    this.update([
      { name: 'AddressNotApplicable', value: value }
    ])
  }

  updateEmployer (value) {
    this.update([
      { name: 'Employer', value: value }
    ])
  }

  updateEmployerNotApplicable (value) {
    this.update([
      { name: 'EmployerNotApplicable', value: value }
    ])
  }

  updateEmployerAddress (value) {
    this.update([
      { name: 'EmployerAddress', value: value }
    ])
  }

  updateEmployerAddressNotApplicable (value) {
    this.update([
      { name: 'EmployerAddressNotApplicable', value: value }
    ])
  }

  updateHasAffiliations (response) {
    this.update([
      { name: 'HasAffiliations', value: response.value }
    ])
  }

  updateAffiliations (value) {
    this.update([
      { name: 'Affiliations', value: value }
    ])
  }

  render () {
    return (
      <div className="foreign-national">
        <h3>{i18n.t('foreign.contacts.heading.name')}</h3>
        <NotApplicable name="NameNotApplicable"
                       className="na-name"
                       label={i18n.t('foreign.contacts.label.idk')}
                       or={i18n.m('foreign.contacts.para.or')}
                       onUpdate={this.updateNameNotApplicable}
                       onError={this.props.onError}>
          <Name name="Name"
                {...this.props.Name}
                onUpdate={this.updateName}
                onError={this.props.onError}
                />
        </NotApplicable>

        <Show when={this.props.NameNotApplicable.applicable === false}>
          <Field title={i18n.t('foreign.contacts.heading.explanation')}>
            <Textarea name="NameExplanation"
                      className="name-explanation"
                      {...this.props.NameExplanation}
                      onUpdate={this.updateNameExplanation}
                      onError={this.props.onError}
                      />
          </Field>
        </Show>

        <Field title={i18n.t('foreign.contacts.heading.firstcontact')}
               help="foreign.contacts.help.firstcontact"
               adjustFor="label">
          <DateControl name="FirstContact"
                       className="first-contact"
                       {...this.props.FirstContact}
                       onUpdate={this.updateFirstContact}
                       onError={this.props.onError}
                       />
        </Field>

        <Field title={i18n.t('foreign.contacts.heading.lastcontact')}
               help="foreign.contacts.help.lastcontact"
               adjustFor="label">
          <DateControl name="LastContact"
                       className="last-contact"
                       {...this.props.LastContact}
                       onUpdate={this.updateLastContact}
                       onError={this.props.onError}
                       />
        </Field>

        <Field title={i18n.t('foreign.contacts.heading.methods')}
               help="foreign.contacts.help.methods"
               adjustFor="p">
          {i18n.m('foreign.contacts.para.checkall')}
          <CheckboxGroup className="methods"
                         selectedValues={this.props.Methods}>
            <Checkbox name="methods-inperson"
                      label={i18n.m('foreign.contacts.label.inperson')}
                      value="In person"
                      className="methods-inperson"
                      onUpdate={this.updateMethods}
                      onError={this.props.onError}
                      />
            <Checkbox name="methods-telephone"
                      label={i18n.m('foreign.contacts.label.telephone')}
                      value="Telephone"
                      className="methods-telephone"
                      onUpdate={this.updateMethods}
                      onError={this.props.onError}
                      />
            <Checkbox name="methods-electronic"
                      label={i18n.m('foreign.contacts.label.electronic')}
                      value="Electronic"
                      className="methods-electronic"
                      onUpdate={this.updateMethods}
                      onError={this.props.onError}
                      />
            <Checkbox name="methods-written"
                      label={i18n.m('foreign.contacts.label.written')}
                      value="Written"
                      className="methods-written"
                      onUpdate={this.updateMethods}
                      onError={this.props.onError}
                      />
            <Checkbox name="methods-other"
                      label={i18n.m('foreign.contacts.label.other')}
                      value="Other"
                      className="methods-other"
                      onUpdate={this.updateMethods}
                      onError={this.props.onError}
                      />
          </CheckboxGroup>
        </Field>

        <Show when={this.props.Methods.some(x => x === 'Other')}>
          <Field title={i18n.t('foreign.contacts.heading.explanation')}>
            <Textarea name="MethodsExplanation"
                      className="methods-explanation"
                      {...this.props.MethodsExplanation}
                      onUpdate={this.updateMethodsExplanation}
                      onError={this.props.onError}
                      />
          </Field>
        </Show>

        <Field title={i18n.t('foreign.contacts.heading.frequency')}
               adjustFor="big-buttons">
          <RadioGroup className="frequency"
                      selectedValue={this.props.Frequency}>
            <Radio name="frequency-daily"
                   label={i18n.m('foreign.contacts.label.daily')}
                   value="Daily"
                   className="frequency-daily"
                   onUpdate={this.updateFrequency}
                   onError={this.props.onError}
                   />
            <Radio name="frequency-weekly"
                   label={i18n.m('foreign.contacts.label.weekly')}
                   value="Weekly"
                   className="frequency-weekly"
                   onUpdate={this.updateFrequency}
                   onError={this.props.onError}
                   />
            <Radio name="frequency-monthly"
                   label={i18n.m('foreign.contacts.label.monthly')}
                   value="Monthly"
                   className="frequency-monthly"
                   onUpdate={this.updateFrequency}
                   onError={this.props.onError}
                   />
            <Radio name="frequency-quarterly"
                   label={i18n.m('foreign.contacts.label.quarterly')}
                   value="Quarterly"
                   className="frequency-quarterly"
                   onUpdate={this.updateFrequency}
                   onError={this.props.onError}
                   />
            <Radio name="frequency-annually"
                   label={i18n.m('foreign.contacts.label.annually')}
                   value="Annually"
                   className="frequency-annually"
                   onUpdate={this.updateFrequency}
                   onError={this.props.onError}
                   />
            <Radio name="frequency-other"
                   label={i18n.m('foreign.contacts.label.other')}
                   value="Other"
                   className="frequency-other"
                   onUpdate={this.updateFrequency}
                   onError={this.props.onError}
                   />
          </RadioGroup>
        </Field>

        <Show when={this.props.Frequency === 'Other'}>
          <Field title={i18n.t('foreign.contacts.heading.explanation')}>
            <Textarea name="FrequencyExplanation"
                      className="frequency-explanation"
                      {...this.props.FrequencyExplanation}
                      onUpdate={this.updateFrequencyExplanation}
                      onError={this.props.onError}
                      />
          </Field>
        </Show>

        <Field title={i18n.t('foreign.contacts.heading.relationship')}
               adjustFor="p">
          {i18n.m('foreign.contacts.para.checkall')}
          <CheckboxGroup className="relationship"
                         selectedValues={this.props.Relationship}>
            <Checkbox name="relationship-professional"
                      label={i18n.m('foreign.contacts.label.professional')}
                      value="Professional"
                      className="relationship-professional"
                      onUpdate={this.updateRelationship}
                      onError={this.props.onError}
                      />
            <Checkbox name="relationship-personal"
                      label={i18n.m('foreign.contacts.label.personal')}
                      value="Personal"
                      className="relationship-personal"
                      onUpdate={this.updateRelationship}
                      onError={this.props.onError}
                      />
            <Checkbox name="relationship-obligation"
                      label={i18n.m('foreign.contacts.label.obligation')}
                      value="Obligation"
                      className="relationship-obligation"
                      onUpdate={this.updateRelationship}
                      onError={this.props.onError}
                      />
            <Checkbox name="relationship-other"
                      label={i18n.m('foreign.contacts.label.other')}
                      value="Other"
                      className="relationship-other"
                      onUpdate={this.updateRelationship}
                      onError={this.props.onError}
                      />
          </CheckboxGroup>
        </Field>

        <Show when={this.props.Relationship.some(x => x === 'Other' || x === 'Obligation')}>
          <Field title={i18n.t('foreign.contacts.heading.explanation')}>
            <Textarea name="RelationshipExplanation"
                      className="relationship-explanation"
                      {...this.props.RelationshipExplanation}
                      onUpdate={this.updateRelationshipExplanation}
                      onError={this.props.onError}
                      />
          </Field>
        </Show>

        <BranchCollection label={i18n.t('foreign.contacts.heading.aliases')}
                          appendLabel={i18n.t('foreign.contacts.heading.aliases2')}
                          help="foreign.contacts.help.aliases"
                          className="aliases"
                          items={this.props.Aliases}
                          onUpdate={this.updateAliases}
                          onError={this.props.onError}>
          <h4>{i18n.t('foreign.contacts.heading.aliasname')}</h4>
          <Name name="Alias" bind={true} />
        </BranchCollection>

        <Field title={i18n.t('foreign.contacts.heading.citizenship')}
               help="foreign.contacts.help.citizenship">
          <Country name="Citizenship"
                   multiple={true}
                   className="citizenship"
                   value={this.props.Citizenship}
                   onUpdate={this.updateCitizenship}
                   onError={this.props.onError}
                   />
        </Field>

        <Field title={i18n.t('foreign.contacts.heading.birthdate')}
               adjustFor="label">
          <NotApplicable name="BirthdateNotApplicable"
                         className="na-birthdate"
                         label={i18n.t('foreign.contacts.label.idk')}
                         or={i18n.m('foreign.contacts.para.or')}
                         onUpdate={this.updateBirthdateNotApplicable}
                         onError={this.props.onError}>
            <DateControl name="Birthdate"
                         {...this.props.Birthdate}
                         onUpdate={this.updateBirthdate}
                         onError={this.props.onError}
                         />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('foreign.contacts.heading.birthplace')}
               adjustFor="label">
          <NotApplicable name="BirthplaceNotApplicable"
                         className="na-birthplace"
                         label={i18n.t('foreign.contacts.label.idk')}
                         or={i18n.m('foreign.contacts.para.or')}
                         onUpdate={this.updateBirthplaceNotApplicable}
                         onError={this.props.onError}>
            <Location name="Birthplace"
                        className="birthplace"
                        layout={Location.CITY_COUNTRY}
                        {...this.props.Birthplace}
                        onUpdate={this.updateBirthplace}
                        onError={this.props.onError}
                        />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('foreign.contacts.heading.address')}
               adjustFor="address">
          <NotApplicable name="AddressNotApplicable"
                         className="na-address"
                         label={i18n.t('foreign.contacts.label.idk')}
                         or={i18n.m('foreign.contacts.para.or')}
                         onUpdate={this.updateAddressNotApplicable}
                         onError={this.props.onError}>
            <Address name="Address"
                     className="current-address"
                     {...this.props.Address}
                     onUpdate={this.updateAddress}
                     onError={this.props.onError}
                     />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('foreign.contacts.heading.employer')}>
          <NotApplicable name="EmployerNotApplicable"
                         className="na-employer"
                         label={i18n.t('foreign.contacts.label.idk')}
                         or={i18n.m('foreign.contacts.para.or')}
                         onUpdate={this.updateEmployerNotApplicable}
                         onError={this.props.onError}>
            <Text name="Employer"
                  className="employer"
                  {...this.props.Employer}
                  onUpdate={this.updateEmployer}
                  onError={this.props.onError}
                  />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('foreign.contacts.heading.employeraddress')}
               adjustFor="address">
          <NotApplicable name="EmployerAddressNotApplicable"
                         className="na-employer-address"
                         label={i18n.t('foreign.contacts.label.idk')}
                         or={i18n.m('foreign.contacts.para.or')}
                         onUpdate={this.updateEmployerAddressNotApplicable}
                         onError={this.props.onError}>
            <Address name="EmployerAddress"
                     className="employer-address"
                     {...this.props.EmployerAddress}
                     onUpdate={this.updateEmployerAddress}
                     onError={this.props.onError}
                     />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('foreign.contacts.heading.hasaffiliations')}
               adjustFor="buttons">
          <RadioGroup className="has-affiliations"
                      selectedValue={this.props.HasAffiliations}>
            <Radio name="affiliation_yes"
                   label={i18n.t('foreign.contacts.label.yes')}
                   value="Yes"
                   className="yes"
                   onUpdate={this.updateHasAffiliations}
                   onError={this.props.onError}
                   />
            <Radio name="affiliation_no"
                   label={i18n.t('foreign.contacts.label.no')}
                   value="No"
                   className="no"
                   onUpdate={this.updateHasAffiliations}
                   onError={this.props.onError}
                   />
            <Radio name="affiliation_idk"
                   label={i18n.t('foreign.contacts.label.idk')}
                   value="I don't know"
                   className="idk"
                   onUpdate={this.updateHasAffiliations}
                   onError={this.props.onError}
                   />
          </RadioGroup>
        </Field>

        <Show when={this.props.HasAffiliations === 'Yes'}>
          <Field title={i18n.t('foreign.contacts.heading.affiliations')}>
            <Textarea name="Affiliations"
                      className="affiliations"
                      {...this.props.Affiliations}
                      onUpdate={this.updateAffiliations}
                      onError={this.props.onError}
                      />
          </Field>
        </Show>
      </div>
    )
  }
}

ForeignNational.defaultProps = {
  Name: {},
  NameNotApplicable: {},
  NameExplanation: {},
  FirstContact: {},
  LastContact: {},
  Methods: [],
  MethodsNotApplicable: {},
  MethodsExplanation: {},
  Frequency: [],
  FrequencyExplanation: {},
  Relationship: [],
  RelationshipExplanation: {},
  Aliases: [],
  Citizenship: [],
  Birthdate: {},
  BirthdateNotApplicable: {},
  Birthplace: {},
  BirthplaceNotApplicable: {},
  Address: {},
  AddressNotApplicable: {},
  Employer: {},
  EmployerNotApplicable: {},
  EmployerAddress: {},
  HasAffiliations: '',
  Affiliations: {},
  onError: (value, arr) => { return arr }
}
