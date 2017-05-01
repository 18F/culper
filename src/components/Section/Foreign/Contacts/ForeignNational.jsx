import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Field, Name, Textarea, DateControl,
         CheckboxGroup, Checkbox, RadioGroup, Radio, Country, BirthPlace,
         Address, Text, NotApplicable, Show } from '../../../Form'

export default class ForeignNational extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      Name: props.Name,
      NameNotApplicable: props.NameNotApplicable,
      NameExplanation: props.NameExplanation,
      FirstContact: props.FirstContact,
      LastContact: props.LastContact,
      Methods: props.Methods,
      MethodsExplanation: props.MethodsExplanation,
      Frequency: props.Frequency,
      FrequencyExplanation: props.FrequencyExplanation,
      Relationship: props.Relationship,
      RelationshipExplanation: props.RelationshipExplanation,
      Aliases: props.Aliases,
      Citizenship: props.Citizenship,
      Birthplace: props.Birthplace,
      BirthplaceNotApplicable: props.BirthplaceNotApplicable,
      Address: props.Address,
      AddressNotApplicable: props.AddressNotApplicable,
      Employer: props.Employer,
      EmployerNotApplicable: props.EmployerNotApplicable,
      EmployerAddress: props.EmployerAddress,
      EmployerAddressNotApplicable: props.EmployerAddressNotApplicable,
      HasAffiliations: props.HasAffiliations,
      Affiliations: props.Affiliations,
      error: false,
      valid: false,
      errorCodes: []
    }

    this.onUpdate = this.onUpdate.bind(this)
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

  onUpdate (name, value) {
    this.setState({ [name]: value }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          Name: this.state.Name,
          NameNotApplicable: this.state.NameNotApplicable,
          NameExplanation: this.state.NameExplanation,
          FirstContact: this.state.FirstContact,
          LastContact: this.state.LastContact,
          Methods: this.state.Methods,
          MethodsExplanation: this.state.MethodsExplanation,
          Frequency: this.state.Frequency,
          FrequencyExplanation: this.state.FrequencyExplanation,
          Relationship: this.state.Relationship,
          RelationshipExplanation: this.state.RelationshipExplanation,
          Aliases: this.state.Aliases,
          Citizenship: this.state.Citizenship,
          Birthplace: this.state.Birthplace,
          BirthplaceNotApplicable: this.state.BirthplaceNotApplicable,
          Address: this.state.Address,
          AddressNotApplicable: this.state.AddressNotApplicable,
          Employer: this.state.Employer,
          EmployerNotApplicable: this.state.EmployerNotApplicable,
          EmployerAddress: this.state.EmployerAddress,
          EmployerAddressNotApplicable: this.state.EmployerAddressNotApplicable,
          HasAffiliations: this.state.HasAffiliations,
          Affiliations: this.state.Affiliations
        })
      }
    })
  }

  updateName (value) {
    this.onUpdate('Name', value)
  }

  updateNameNotApplicable (value) {
    this.onUpdate('NameNotApplicable', value)
  }

  updateNameExplanation (value) {
    this.onUpdate('NameExplanation', value)
  }

  updateFirstContact (value) {
    this.onUpdate('FirstContact', value)
  }

  updateLastContact (value) {
    this.onUpdate('LastContact', value)
  }

  updateMethods (value) {
    this.onUpdate('Methods', value)
  }

  updateMethodsExplanation (value) {
    this.onUpdate('MethodsExplanation', value)
  }

  updateFrequency (value) {
    this.onUpdate('Frequency', value)
  }

  updateFrequencyExplanation (value) {
    this.onUpdate('FrequencyExplanation', value)
  }

  updateRelationship (value) {
    this.onUpdate('Relationship', value)
  }

  updateRelationshipExplanation (value) {
    this.onUpdate('RelationshipExplanation', value)
  }

  updateAliases (value) {
    this.onUpdate('Aliases', value)
  }

  updateCitizenship (value) {
    this.onUpdate('Citizenship', value)
  }

  updateBirthplace (value) {
    this.onUpdate('Birthplace', value)
  }

  updateBirthplaceNotApplicable (value) {
    this.onUpdate('BirthplaceNotApplicable', value)
  }

  updateAddress (value) {
    this.onUpdate('Address', value)
  }

  updateAddressNotApplicable (value) {
    this.onUpdate('AddressNotApplicable', value)
  }

  updateEmployer (value) {
    this.onUpdate('Employer', value)
  }

  updateEmployerNotApplicable (value) {
    this.onUpdate('EmployerNotApplicable', value)
  }

  updateEmployerAddress (value) {
    this.onUpdate('EmployerAddress', value)
  }

  updateEmployerAddressNotApplicable (value) {
    this.onUpdate('EmployerAddressNotApplicable', value)
  }

  updateHasAffiliations (value) {
    this.onUpdate('HasAffiliations', value)
  }

  updateAffiliations (value) {
    this.onUpdate('Affiliations', value)
  }

  render () {
    return (
      <div className="foreign-national">
        <h3>{i18n.t('foreign.contacts.heading.name')}</h3>
        <NotApplicable name="NameNotApplicable">
          <Name name="Name"
                {...this.state.Name}
                onUpdate={this.updateName}
                onValidate={this.props.onValidate}
                />
        </NotApplicable>
        <span>Need NameExplanation</span>

        <Field title={i18n.t('foreign.contacts.heading.firstcontact')}
               help="foreign.contacts.help.firstcontact">
          <DateControl name="FirstContact"
                       {...this.state.FirstContact}
                       onUpdate={this.updateFirstContact}
                       onValidate={this.props.onValidate}
                       />
        </Field>

        <Field title={i18n.t('foreign.contacts.heading.lastcontact')}
               help="foreign.contacts.help.lastcontact">
          <DateControl name="LastContact"
                       {...this.state.LastContact}
                       onUpdate={this.updateLastContact}
                       onValidate={this.props.onValidate}
                       />
        </Field>

        <Field title={i18n.t('foreign.contacts.heading.methods')}
               help="foreign.contacts.help.methods">
          <CheckboxGroup className="methods"
                         selectedValue={this.state.Methods}>
            <Checkbox name="methods-inperson"
                      label={i18n.m('foreign.contacts.label.methods.inperson')}
                      value="In person"
                      className="methods-inperson"
                      onChange={this.updateMethods}
                      />
            <Checkbox name="methods-telephone"
                      label={i18n.m('foreign.contacts.label.methods.telephone')}
                      value="Telephone"
                      className="methods-telephone"
                      onChange={this.updateMethods}
                      />
            <Checkbox name="methods-electronic"
                      label={i18n.m('foreign.contacts.label.methods.electronic')}
                      value="Electronic"
                      className="methods-electronic"
                      onChange={this.updateMethods}
                      />
            <Checkbox name="methods-written"
                      label={i18n.m('foreign.contacts.label.methods.written')}
                      value="Written"
                      className="methods-written"
                      onChange={this.updateMethods}
                      />
            <Checkbox name="methods-other"
                      label={i18n.m('foreign.contacts.label.methods.other')}
                      value="Other"
                      className="methods-other"
                      onChange={this.updateMethods}
                      />
          </CheckboxGroup>
        </Field>

        <Field title={i18n.t('foreign.contacts.heading.frequency')}
               help="foreign.contacts.help.frequency">
          <RadioGroup className="frequency"
                      selectedValue={this.state.Frequency}>
            <Radio name="frequency-daily"
                   label={i18n.m('foreign.contacts.label.frequency.daily')}
                   value="Daily"
                   className="frequency-daily"
                   onChange={this.updateFrequency}
                   />
            <Radio name="frequency-weekly"
                   label={i18n.m('foreign.contacts.label.frequency.weekly')}
                   value="Weekly"
                   className="frequency-weekly"
                   onChange={this.updateFrequency}
                   />
            <Radio name="frequency-monthly"
                   label={i18n.m('foreign.contacts.label.frequency.monthly')}
                   value="Monthly"
                   className="frequency-monthly"
                   onChange={this.updateFrequency}
                   />
            <Radio name="frequency-quarterly"
                   label={i18n.m('foreign.contacts.label.frequency.quarterly')}
                   value="Quarterly"
                   className="frequency-quarterly"
                   onChange={this.updateFrequency}
                   />
            <Radio name="frequency-annually"
                   label={i18n.m('foreign.contacts.label.frequency.annually')}
                   value="Annually"
                   className="frequency-annually"
                   onChange={this.updateFrequency}
                   />
            <Radio name="frequency-other"
                   label={i18n.m('foreign.contacts.label.frequency.other')}
                   value="Other"
                   className="frequency-other"
                   onChange={this.updateFrequency}
                   />
          </RadioGroup>
        </Field>

        <Field title={i18n.t('foreign.contacts.heading.relationship')}
               help="foreign.contacts.help.relationship">
          <CheckboxGroup className="relationship"
                         selectedValue={this.state.Relationship}>
            <Checkbox name="relationship-professional"
                      label={i18n.m('foreign.contacts.label.relationship.professional')}
                      value="Professional"
                      className="relationship-professional"
                      onChange={this.updateRelationship}
                      />
            <Checkbox name="relationship-personal"
                      label={i18n.m('foreign.contacts.label.relationship.personal')}
                      value="Personal"
                      className="relationship-personal"
                      onChange={this.updateRelationship}
                      />
            <Checkbox name="relationship-obligation"
                      label={i18n.m('foreign.contacts.label.relationship.obligation')}
                      value="Obligation"
                      className="relationship-obligation"
                      onChange={this.updateRelationship}
                      />
            <Checkbox name="relationship-other"
                      label={i18n.m('foreign.contacts.label.relationship.other')}
                      value="Other"
                      className="relationship-other"
                      onChange={this.updateRelationship}
                      />
          </CheckboxGroup>
        </Field>

        <Field title={i18n.t('foreign.contacts.heading.aliases')}
               help="foreign.contacts.help.aliases">
        </Field>

        <Field title={i18n.t('foreign.contacts.heading.citizenship')}
               help="foreign.contacts.help.citizenship">
          <Country name="Citizenship"
                   multiple={true}
                   className="citizenship"
                   value={this.state.Citizenship}
                   onUpdate={this.updateCitizenship}
                   onValidate={this.props.onValidate}
                   />
        </Field>

        <Field title={i18n.t('foreign.contacts.heading.birthplace')}
               help="foreign.contacts.help.birthplace">
          <NotApplicable name="BirthplaceNotApplicable">
            <BirthPlace name="Birthplace"
                        className="birthplace"
                        {...this.state.Birthplace}
                        onUpdate={this.updateBirthplace}
                        onValidate={this.props.onValidate}
                        />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('foreign.contacts.heading.address')}
               help="foreign.contacts.help.address">
          <NotApplicable name="AddressNotApplicable">
            <Address name="Address"
                     className="current-address"
                     {...this.state.Address}
                     onUpdate={this.updateAddress}
                     onValidate={this.props.onValidate}
                     />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('foreign.contacts.heading.employer')}
               help="foreign.contacts.help.employer">
          <NotApplicable name="EmployerNotApplicable">
            <Text name="Employer"
                  className="employer"
                  {...this.state.Employer}
                  onUpdate={this.updateEmployer}
                  onValidate={this.props.onValidate}
                  />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('foreign.contacts.heading.employeraddress')}
               help="foreign.contacts.help.employeraddress">
          <NotApplicable name="EmployerAddressNotApplicable">
            <Address name="EmployerAddress"
                     className="employer-address"
                     {...this.state.EmployerAddress}
                     onUpdate={this.updateEmployerAddress}
                     onValidate={this.props.onValidate}
                     />
          </NotApplicable>
        </Field>

        <Branch name="has_affiliations"
                label={i18n.t('foreign.contacts.heading.hasaffiliations')}
                labelSize="h3"
                className="has-affiliations"
                value={this.state.HasAffiliations}
                help="foreign.contacts.help.hasaffiliations"
                onUpdate={this.updateHasAffiliations}
                onValidate={this.props.onValidate}
                />
        <Show when={this.state.HasAffiliations === 'Yes'}>
          <Field title={i18n.t('foreign.contacts.heading.affiliations')}
                 help="foreign.contacts.help.affiliations">
            <Textarea name="Affiliations"
                      className="affiliations"
                      {...this.state.Affiliations}
                      onUpdate={this.updateAffiliations}
                      onValidate={this.props.onValidate}
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
  Birthplace: {},
  BirthplaceNotApplicable: {},
  Address: {},
  AddressNotApplicable: {},
  Employer: {},
  EmployerNotApplicable: {},
  EmployerAddress: {},
  HasAffiliations: '',
  Affiliations: {}
}
