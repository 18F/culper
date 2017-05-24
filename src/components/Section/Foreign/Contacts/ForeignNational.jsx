import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Field, Name, Textarea, DateControl,
         CheckboxGroup, Checkbox, RadioGroup, Radio, Country, BirthPlace,
         Address, Text, NotApplicable, Show, BranchCollection } from '../../../Form'

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
      Birthdate: props.Birthdate,
      BirthdateNotApplicable: props.BirthdateNotApplicable,
      Birthplace: props.Birthplace,
      BirthplaceNotApplicable: props.BirthplaceNotApplicable,
      Address: props.Address,
      AddressNotApplicable: props.AddressNotApplicable,
      Employer: props.Employer,
      EmployerNotApplicable: props.EmployerNotApplicable,
      EmployerAddress: props.EmployerAddress,
      EmployerAddressNotApplicable: props.EmployerAddressNotApplicable,
      HasAffiliations: props.HasAffiliations,
      Affiliations: props.Affiliations
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

  updateMethods (response) {
    let selected = response.value
    let list = [...(this.state.Methods || [])]

    if (list.includes(selected)) {
      list.splice(list.indexOf(selected), 1)
    } else {
      list.push(selected)
    }

    this.onUpdate('Methods', list)
  }

  updateMethodsExplanation (value) {
    this.onUpdate('MethodsExplanation', value)
  }

  updateFrequency (response) {
    this.onUpdate('Frequency', response.value)
  }

  updateFrequencyExplanation (value) {
    this.onUpdate('FrequencyExplanation', value)
  }

  updateRelationship (response) {
    let selected = response.value
    let list = [...(this.state.Relationship || [])]

    if (list.includes(selected)) {
      list.splice(list.indexOf(selected), 1)
    } else {
      list.push(selected)
    }

    this.onUpdate('Relationship', list)
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

  updateBirthdate (value) {
    this.onUpdate('Birthdate', value)
  }

  updateBirthdateNotApplicable (value) {
    this.onUpdate('BirthdateNotApplicable', value)
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

  updateHasAffiliations (response) {
    this.onUpdate('HasAffiliations', response.value)
  }

  updateAffiliations (value) {
    this.onUpdate('Affiliations', value)
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
                {...this.state.Name}
                onUpdate={this.updateName}
                onError={this.props.onError}
                />
        </NotApplicable>

        <Show when={this.state.NameNotApplicable.applicable === false}>
          <Field title={i18n.t('foreign.contacts.heading.explanation')}>
            <Textarea name="NameExplanation"
                      className="name-explanation"
                      {...this.state.NameExplanation}
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
                       {...this.state.FirstContact}
                       onUpdate={this.updateFirstContact}
                       onError={this.props.onError}
                       />
        </Field>

        <Field title={i18n.t('foreign.contacts.heading.lastcontact')}
               help="foreign.contacts.help.lastcontact"
               adjustFor="label">
          <DateControl name="LastContact"
                       className="last-contact"
                       {...this.state.LastContact}
                       onUpdate={this.updateLastContact}
                       onError={this.props.onError}
                       />
        </Field>

        <Field title={i18n.t('foreign.contacts.heading.methods')}
               help="foreign.contacts.help.methods"
               adjustFor="p">
          {i18n.m('foreign.contacts.para.checkall')}
          <CheckboxGroup className="methods"
                         selectedValues={this.state.Methods}>
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

        <Show when={this.state.Methods.some(x => x === 'Other')}>
          <Field title={i18n.t('foreign.contacts.heading.explanation')}>
            <Textarea name="MethodsExplanation"
                      className="methods-explanation"
                      {...this.state.MethodsExplanation}
                      onUpdate={this.updateMethodsExplanation}
                      onError={this.props.onError}
                      />
          </Field>
        </Show>

        <Field title={i18n.t('foreign.contacts.heading.frequency')}
               help="foreign.contacts.help.frequency"
               adjustFor="big-buttons">
          <RadioGroup className="frequency"
                      selectedValue={this.state.Frequency}>
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

        <Show when={this.state.Frequency === 'Other'}>
          <Field title={i18n.t('foreign.contacts.heading.explanation')}>
            <Textarea name="FrequencyExplanation"
                      className="frequency-explanation"
                      {...this.state.FrequencyExplanation}
                      onUpdate={this.updateFrequencyExplanation}
                      onError={this.props.onError}
                      />
          </Field>
        </Show>

        <Field title={i18n.t('foreign.contacts.heading.relationship')}
               help="foreign.contacts.help.relationship"
               adjustFor="p">
          {i18n.m('foreign.contacts.para.checkall')}
          <CheckboxGroup className="relationship"
                         selectedValues={this.state.Relationship}>
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

        <Show when={this.state.Relationship.some(x => x === 'Other' || x === 'Obligation')}>
          <Field title={i18n.t('foreign.contacts.heading.explanation')}>
            <Textarea name="RelationshipExplanation"
                      className="relationship-explanation"
                      {...this.state.RelationshipExplanation}
                      onUpdate={this.updateRelationshipExplanation}
                      onError={this.props.onError}
                      />
          </Field>
        </Show>

        <BranchCollection label={i18n.t('foreign.contacts.heading.aliases')}
                          appendLabel={i18n.t('foreign.contacts.heading.aliases2')}
                          help="foreign.contacts.help.aliases"
                          className="aliases"
                          items={this.state.Aliases}
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
                   value={this.state.Citizenship}
                   onUpdate={this.updateCitizenship}
                   onError={this.props.onError}
                   />
        </Field>

        <Field title={i18n.t('foreign.contacts.heading.birthdate')}
               help="foreign.contacts.help.birthdate"
               adjustFor="label">
          <NotApplicable name="BirthdateNotApplicable"
                         className="na-birthdate"
                         label={i18n.t('foreign.contacts.label.idk')}
                         or={i18n.m('foreign.contacts.para.or')}
                         onUpdate={this.updateBirthdateNotApplicable}
                         onError={this.props.onError}>
            <DateControl name="Birthdate"
                         {...this.state.Birthdate}
                         onUpdate={this.updateBirthdate}
                         onError={this.props.onError}
                         />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('foreign.contacts.heading.birthplace')}
               help="foreign.contacts.help.birthplace"
               adjustFor="label">
          <NotApplicable name="BirthplaceNotApplicable"
                         className="na-birthplace"
                         label={i18n.t('foreign.contacts.label.idk')}
                         or={i18n.m('foreign.contacts.para.or')}
                         onUpdate={this.updateBirthplaceNotApplicable}
                         onError={this.props.onError}>
            <BirthPlace name="Birthplace"
                        help=""
                        branch={false}
                        disabledState={true}
                        className="birthplace"
                        {...this.state.Birthplace}
                        onUpdate={this.updateBirthplace}
                        onError={this.props.onError}
                        />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('foreign.contacts.heading.address')}
               help="foreign.contacts.help.address"
               adjustFor="address">
          <NotApplicable name="AddressNotApplicable"
                         className="na-address"
                         label={i18n.t('foreign.contacts.label.idk')}
                         or={i18n.m('foreign.contacts.para.or')}
                         onUpdate={this.updateAddressNotApplicable}
                         onError={this.props.onError}>
            <Address name="Address"
                     className="current-address"
                     {...this.state.Address}
                     onUpdate={this.updateAddress}
                     onError={this.props.onError}
                     />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('foreign.contacts.heading.employer')}
               help="foreign.contacts.help.employer">
          <NotApplicable name="EmployerNotApplicable"
                         className="na-employer"
                         label={i18n.t('foreign.contacts.label.idk')}
                         or={i18n.m('foreign.contacts.para.or')}
                         onUpdate={this.updateEmployerNotApplicable}
                         onError={this.props.onError}>
            <Text name="Employer"
                  className="employer"
                  {...this.state.Employer}
                  onUpdate={this.updateEmployer}
                  onError={this.props.onError}
                  />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('foreign.contacts.heading.employeraddress')}
               help="foreign.contacts.help.employeraddress"
               adjustFor="address">
          <NotApplicable name="EmployerAddressNotApplicable"
                         className="na-employer-address"
                         label={i18n.t('foreign.contacts.label.idk')}
                         or={i18n.m('foreign.contacts.para.or')}
                         onUpdate={this.updateEmployerAddressNotApplicable}
                         onError={this.props.onError}>
            <Address name="EmployerAddress"
                     className="employer-address"
                     {...this.state.EmployerAddress}
                     onUpdate={this.updateEmployerAddress}
                     onError={this.props.onError}
                     />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('foreign.contacts.heading.hasaffiliations')}
               help="foreign.contacts.help.hasaffiliations"
               adjustFor="buttons">
          <RadioGroup className="has-affiliations"
                      selectedValue={this.state.HasAffiliations}>
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

        <Show when={this.state.HasAffiliations === 'Yes'}>
          <Field title={i18n.t('foreign.contacts.heading.affiliations')}
                 help="foreign.contacts.help.affiliations">
            <Textarea name="Affiliations"
                      className="affiliations"
                      {...this.state.Affiliations}
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
