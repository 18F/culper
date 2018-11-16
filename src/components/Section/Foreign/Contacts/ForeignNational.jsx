import React from 'react'
import { i18n } from '../../../../config'
import { pickDate } from '../../../../validators/helpers'
import {
  ValidationElement,
  Field,
  Name,
  Textarea,
  DateControl,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  Country,
  Text,
  NotApplicable,
  Show,
  BranchCollection,
  Location,
  AccordionItem
} from '../../../Form'

export default class ForeignNational extends ValidationElement {
  constructor(props) {
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
    this.updateRelationshipExplanation = this.updateRelationshipExplanation.bind(
      this
    )
    this.updateAliases = this.updateAliases.bind(this)
    this.updateCitizenship = this.updateCitizenship.bind(this)
    this.updateBirthdate = this.updateBirthdate.bind(this)
    this.updateBirthdateNotApplicable = this.updateBirthdateNotApplicable.bind(
      this
    )
    this.updateBirthplace = this.updateBirthplace.bind(this)
    this.updateBirthplaceNotApplicable = this.updateBirthplaceNotApplicable.bind(
      this
    )
    this.updateAddress = this.updateAddress.bind(this)
    this.updateAddressNotApplicable = this.updateAddressNotApplicable.bind(this)
    this.updateEmployer = this.updateEmployer.bind(this)
    this.updateEmployerNotApplicable = this.updateEmployerNotApplicable.bind(
      this
    )
    this.updateEmployerAddress = this.updateEmployerAddress.bind(this)
    this.updateEmployerAddressNotApplicable = this.updateEmployerAddressNotApplicable.bind(
      this
    )
    this.updateHasAffiliations = this.updateHasAffiliations.bind(this)
    this.updateAffiliations = this.updateAffiliations.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
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
      Affiliations: this.props.Affiliations,
      ...queue
    })
  }

  updateName(value) {
    this.update({
      Name: value
    })
  }

  updateNameNotApplicable(value) {
    this.update({
      Name: null,
      NameNotApplicable: value
    })
  }

  updateNameExplanation(value) {
    this.update({
      NameExplanation: value
    })
  }

  updateFirstContact(value) {
    this.update({
      FirstContact: value
    })
  }

  updateLastContact(value) {
    this.update({
      LastContact: value
    })
  }

  updateMethods(values) {
    const list = Checkbox.select(values, this.props.Methods)

    this.update({
      Methods: { values: list }
    })
  }

  updateMethodsExplanation(value) {
    this.update({
      MethodsExplanation: value
    })
  }

  updateFrequency(values) {
    this.update({
      Frequency: values
    })
  }

  updateFrequencyExplanation(value) {
    this.update({
      FrequencyExplanation: value
    })
  }

  updateRelationship(values) {
    const list = Checkbox.select(values, this.props.Relationship)
    this.update({
      Relationship: { values: list }
    })
  }

  updateRelationshipExplanation(value) {
    this.update({
      RelationshipExplanation: value
    })
  }

  updateAliases(value) {
    this.update({
      Aliases: value
    })
  }

  updateCitizenship(value) {
    this.update({
      Citizenship: value
    })
  }

  updateBirthdate(value) {
    this.update({
      Birthdate: value
    })
  }

  updateBirthdateNotApplicable(value) {
    this.update({
      BirthdateNotApplicable: value
    })
  }

  updateBirthplace(value) {
    this.update({
      Birthplace: value
    })
  }

  updateBirthplaceNotApplicable(value) {
    this.update({
      BirthplaceNotApplicable: value
    })
  }

  updateAddress(value) {
    this.update({
      Address: value
    })
  }

  updateAddressNotApplicable(value) {
    this.update({
      AddressNotApplicable: value
    })
  }

  updateEmployer(value) {
    this.update({
      Employer: value
    })
  }

  updateEmployerNotApplicable(value) {
    this.update({
      EmployerNotApplicable: value
    })
  }

  updateEmployerAddress(value) {
    this.update({
      EmployerAddress: value
    })
  }

  updateEmployerAddressNotApplicable(value) {
    this.update({
      EmployerAddressNotApplicable: value
    })
  }

  updateHasAffiliations(response) {
    this.update({
      HasAffiliations: response
    })
  }

  updateAffiliations(value) {
    this.update({
      Affiliations: value
    })
  }

  render() {
    const foreignContactMinDate = pickDate([this.props.applicantBirthdate, this.props.Birthdate])
    return (
      <div className="foreign-national">
        <Field
          title={i18n.t('foreign.contacts.heading.name')}
          optional={true}
          filterErrors={Name.requiredErrorsOnly}
          className={
            this.props.NameNotApplicable.applicable ? '' : 'no-margin-bottom'
          }
          scrollIntoView={this.props.scrollIntoView}>
          <NotApplicable
            name="NameNotApplicable"
            className="na-name"
            label={i18n.t('foreign.contacts.label.idk')}
            or={i18n.m('foreign.contacts.para.or')}
            {...this.props.NameNotApplicable}
            onUpdate={this.updateNameNotApplicable}
            onError={this.props.onError}>
            <Name
              name="Name"
              {...this.props.Name}
              onUpdate={this.updateName}
              onError={this.props.onError}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </NotApplicable>
        </Field>

        <Show when={(this.props.NameNotApplicable || {}).applicable === false}>
          <Field
            title={i18n.t('foreign.contacts.heading.explanation')}
            titleSize="label"
            scrollIntoView={this.props.scrollIntoView}>
            <Textarea
              name="NameExplanation"
              className="name-explanation"
              {...this.props.NameExplanation}
              onUpdate={this.updateNameExplanation}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
        </Show>

        <Field
          title={i18n.t('foreign.contacts.heading.birthdate')}
          adjustFor="label"
          scrollIntoView={this.props.scrollIntoView}>
          <NotApplicable
            name="BirthdateNotApplicable"
            className="na-birthdate"
            label={i18n.t('foreign.contacts.label.idk')}
            or={i18n.m('foreign.contacts.para.or')}
            {...this.props.BirthdateNotApplicable}
            onUpdate={this.updateBirthdateNotApplicable}
            required={this.props.required}
            onError={this.props.onError}>
            <DateControl
              name="Birthdate"
              {...this.props.Birthdate}
              relationship="Other"
              onUpdate={this.updateBirthdate}
              onError={this.props.onError}
              required={this.props.required}
            />
          </NotApplicable>
        </Field>

        <Field
          title={i18n.t('foreign.contacts.heading.firstcontact')}
          help="foreign.contacts.help.firstcontact"
          adjustFor="label"
          scrollIntoView={this.props.scrollIntoView}>
          <DateControl
            name="FirstContact"
            className="first-contact"
            minDateEqualTo={true}
            prefix="foreignContact"
            minDate={foreignContactMinDate}
            {...this.props.FirstContact}
            onUpdate={this.updateFirstContact}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.contacts.heading.lastcontact')}
          help="foreign.contacts.help.lastcontact"
          adjustFor="label"
          scrollIntoView={this.props.scrollIntoView}>
          <DateControl
            name="LastContact"
            className="last-contact"
            {...this.props.LastContact}
            prefix="contact.last"
            minDate={(this.props.FirstContact || {}).date}
            minDateEqualTo={true}
            onUpdate={this.updateLastContact}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.contacts.heading.methods')}
          className={
            ((this.props.Methods || {}).values || []).some(x => x === 'Other')
              ? 'no-margin-bottom'
              : ''
          }
          help="foreign.contacts.help.methods"
          adjustFor="p"
          scrollIntoView={this.props.scrollIntoView}>
          {i18n.m('foreign.contacts.para.checkall')}
          <CheckboxGroup
            className="methods"
            onError={this.props.onError}
            required={this.props.required}
            selectedValues={(this.props.Methods || {}).values}>
            <Checkbox
              name="methods-inperson"
              label={i18n.m('foreign.contacts.label.inperson')}
              value="In person"
              className="methods-inperson"
              onUpdate={this.updateMethods}
              onError={this.props.onError}
            />
            <Checkbox
              name="methods-telephone"
              label={i18n.m('foreign.contacts.label.telephone')}
              value="Telephone"
              className="methods-telephone"
              onUpdate={this.updateMethods}
              onError={this.props.onError}
            />
            <Checkbox
              name="methods-electronic"
              label={i18n.m('foreign.contacts.label.electronic')}
              value="Electronic"
              className="methods-electronic"
              onUpdate={this.updateMethods}
              onError={this.props.onError}
            />
            <Checkbox
              name="methods-written"
              label={i18n.m('foreign.contacts.label.written')}
              value="Written"
              className="methods-written"
              onUpdate={this.updateMethods}
              onError={this.props.onError}
            />
            <Checkbox
              name="methods-other"
              label={i18n.m('foreign.contacts.label.other')}
              value="Other"
              className="methods-other"
              onUpdate={this.updateMethods}
              onError={this.props.onError}
            />
          </CheckboxGroup>
        </Field>

        <Show
          when={((this.props.Methods || {}).values || []).some(
            x => x === 'Other'
          )}>
          <Field
            title={i18n.t('foreign.contacts.heading.explanation')}
            titleSize="label"
            scrollIntoView={this.props.scrollIntoView}>
            <Textarea
              name="MethodsExplanation"
              className="methods-explanation"
              {...this.props.MethodsExplanation}
              onUpdate={this.updateMethodsExplanation}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
        </Show>

        <Field
          title={i18n.t('foreign.contacts.heading.frequency')}
          className={
            (this.props.Frequency || {}).value === 'Other'
              ? 'no-margin-bottom'
              : ''
          }
          adjustFor="big-buttons"
          scrollIntoView={this.props.scrollIntoView}>
          <RadioGroup
            className="frequency"
            required={this.props.required}
            onError={this.props.onError}
            selectedValue={(this.props.Frequency || {}).value}>
            <Radio
              name="frequency-daily"
              label={i18n.m('foreign.contacts.label.daily')}
              value="Daily"
              className="frequency-daily"
              onUpdate={this.updateFrequency}
              onError={this.props.onError}
            />
            <Radio
              name="frequency-weekly"
              label={i18n.m('foreign.contacts.label.weekly')}
              value="Weekly"
              className="frequency-weekly"
              onUpdate={this.updateFrequency}
              onError={this.props.onError}
            />
            <Radio
              name="frequency-monthly"
              label={i18n.m('foreign.contacts.label.monthly')}
              value="Monthly"
              className="frequency-monthly"
              onUpdate={this.updateFrequency}
              onError={this.props.onError}
            />
            <Radio
              name="frequency-quarterly"
              label={i18n.m('foreign.contacts.label.quarterly')}
              value="Quarterly"
              className="frequency-quarterly"
              onUpdate={this.updateFrequency}
              onError={this.props.onError}
            />
            <Radio
              name="frequency-annually"
              label={i18n.m('foreign.contacts.label.annually')}
              value="Annually"
              className="frequency-annually"
              onUpdate={this.updateFrequency}
              onError={this.props.onError}
            />
            <Radio
              name="frequency-other"
              label={i18n.m('foreign.contacts.label.other')}
              value="Other"
              className="frequency-other"
              onUpdate={this.updateFrequency}
              onError={this.props.onError}
            />
          </RadioGroup>
        </Field>

        <Show when={(this.props.Frequency || {}).value === 'Other'}>
          <Field
            title={i18n.t('foreign.contacts.heading.explanation')}
            titleSize="label"
            adjustFor="textarea"
            scrollIntoView={this.props.scrollIntoView}>
            <Textarea
              name="FrequencyExplanation"
              className="frequency-explanation"
              {...this.props.FrequencyExplanation}
              onUpdate={this.updateFrequencyExplanation}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
        </Show>

        <Field
          title={i18n.t('foreign.contacts.heading.relationship')}
          className={
            ((this.props.Relationship || {}).values || []).some(
              x => x === 'Other' || x === 'Obligation'
            )
              ? 'no-margin-bottom'
              : ''
          }
          adjustFor="p"
          scrollIntoView={this.props.scrollIntoView}>
          {i18n.m('foreign.contacts.para.checkall')}
          <CheckboxGroup
            className="relationship"
            required={this.props.required}
            onError={this.props.onError}
            selectedValues={(this.props.Relationship || {}).values}>
            <Checkbox
              name="relationship-professional"
              label={i18n.m('foreign.contacts.label.professional')}
              value="Professional"
              className="relationship-professional"
              onUpdate={this.updateRelationship}
              onError={this.props.onError}
            />
            <Checkbox
              name="relationship-personal"
              label={i18n.m('foreign.contacts.label.personal')}
              value="Personal"
              className="relationship-personal"
              onUpdate={this.updateRelationship}
              onError={this.props.onError}
            />
            <Checkbox
              name="relationship-obligation"
              label={i18n.m('foreign.contacts.label.obligation')}
              value="Obligation"
              className="relationship-obligation"
              onUpdate={this.updateRelationship}
              onError={this.props.onError}
            />
            <Checkbox
              name="relationship-other"
              label={i18n.m('foreign.contacts.label.other')}
              value="Other"
              className="relationship-other"
              onUpdate={this.updateRelationship}
              onError={this.props.onError}
            />
          </CheckboxGroup>
        </Field>

        <Show
          when={((this.props.Relationship || {}).values || []).some(
            x => x === 'Other' || x === 'Obligation'
          )}>
          <Field
            title={i18n.t('foreign.contacts.heading.explanation')}
            titleSize="label"
            adjustFor="textarea"
            scrollIntoView={this.props.scrollIntoView}>
            <Textarea
              name="RelationshipExplanation"
              className="relationship-explanation"
              {...this.props.RelationshipExplanation}
              onUpdate={this.updateRelationshipExplanation}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
        </Show>

        <BranchCollection
          label={i18n.t('foreign.contacts.heading.aliases')}
          appendLabel={i18n.t('foreign.contacts.heading.aliases2')}
          help="foreign.contacts.help.aliases"
          className="aliases"
          {...this.props.Aliases}
          onUpdate={this.updateAliases}
          required={this.props.required}
          onError={this.props.onError}
          scrollIntoView={this.props.scrollIntoView}>
          <AccordionItem scrollIntoView={this.props.scrollIntoView}>
            <Field
              title={i18n.t('foreign.contacts.heading.aliasname')}
              optional={true}
              filterErrors={Name.requiredErrorsOnly}
              scrollIntoView={this.props.scrollIntoView}>
              <Name
                name="Alias"
                bind={true}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
              />
            </Field>
          </AccordionItem>
        </BranchCollection>

        <Field
          title={i18n.t('foreign.contacts.heading.citizenship')}
          help="foreign.contacts.help.citizenship"
          scrollIntoView={this.props.scrollIntoView}>
          <Country
            name="Citizenship"
            multiple={true}
            className="citizenship"
            {...this.props.Citizenship}
            onUpdate={this.updateCitizenship}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.contacts.heading.birthplace')}
          adjustFor="label"
          scrollIntoView={this.props.scrollIntoView}>
          <NotApplicable
            name="BirthplaceNotApplicable"
            className="na-birthplace"
            label={i18n.t('foreign.contacts.label.idk')}
            or={i18n.m('foreign.contacts.para.or')}
            {...this.props.BirthplaceNotApplicable}
            onUpdate={this.updateBirthplaceNotApplicable}
            required={this.props.required}
            onError={this.props.onError}>
            <Location
              name="Birthplace"
              className="birthplace"
              {...this.props.Birthplace}
              layout={Location.CITY_COUNTRY}
              addressBooks={this.props.addressBooks}
              addressBook="ForeignNational"
              dispatch={this.props.dispatch}
              onUpdate={this.updateBirthplace}
              onError={this.props.onError}
              required={this.props.required}
            />
          </NotApplicable>
        </Field>

        <Field
          title={i18n.t('foreign.contacts.heading.address')}
          optional={true}
          adjustFor="address"
          scrollIntoView={this.props.scrollIntoView}>
          <NotApplicable
            name="AddressNotApplicable"
            className="na-address"
            label={i18n.t('foreign.contacts.label.idk')}
            or={i18n.m('foreign.contacts.para.or')}
            {...this.props.AddressNotApplicable}
            onUpdate={this.updateAddressNotApplicable}
            required={this.props.required}
            onError={this.props.onError}>
            <Location
              name="Address"
              className="current-address"
              {...this.props.Address}
              layout={Location.ADDRESS}
              geocode
              addressBooks={this.props.addressBooks}
              addressBook="ForeignNational"
              dispatch={this.props.dispatch}
              onUpdate={this.updateAddress}
              onError={this.props.onError}
              required={this.props.required}
            />
          </NotApplicable>
        </Field>

        {this.props.render({
          address: this.props.AlternateAddress,
          addressBook: 'ForeignNational',
          belongingTo: 'AlternateAddress',
          country: this.props.Address.country,
          forceAPO: true,
          militaryAddressLabel: i18n.t('address.militaryAddress.other'),
          onUpdate: this.update
        })}

        <Field
          title={i18n.t('foreign.contacts.heading.employer')}
          scrollIntoView={this.props.scrollIntoView}>
          <NotApplicable
            name="EmployerNotApplicable"
            className="na-employer"
            label={i18n.t('foreign.contacts.label.idk')}
            or={i18n.m('foreign.contacts.para.or')}
            {...this.props.EmployerNotApplicable}
            onUpdate={this.updateEmployerNotApplicable}
            required={this.props.required}
            onError={this.props.onError}>
            <Text
              name="Employer"
              className="employer"
              {...this.props.Employer}
              onUpdate={this.updateEmployer}
              onError={this.props.onError}
              required={this.props.required}
            />
          </NotApplicable>
        </Field>

        <Field
          title={i18n.t('foreign.contacts.heading.employeraddress')}
          optional={true}
          adjustFor="address"
          scrollIntoView={this.props.scrollIntoView}>
          <NotApplicable
            name="EmployerAddressNotApplicable"
            className="na-employer-address"
            label={i18n.t('foreign.contacts.label.idk')}
            or={i18n.m('foreign.contacts.para.or')}
            {...this.props.EmployerAddressNotApplicable}
            onUpdate={this.updateEmployerAddressNotApplicable}
            required={this.props.required}
            onError={this.props.onError}>
            <Location
              name="EmployerAddress"
              className="employer-address"
              {...this.props.EmployerAddress}
              layout={Location.ADDRESS}
              geocode={true}
              addressBooks={this.props.addressBooks}
              addressBook="Company"
              showPostOffice={true}
              dispatch={this.props.dispatch}
              onUpdate={this.updateEmployerAddress}
              onError={this.props.onError}
              required={this.props.required}
            />
          </NotApplicable>
        </Field>

        <Field
          title={i18n.t('foreign.contacts.heading.hasaffiliations')}
          adjustFor="buttons"
          scrollIntoView={this.props.scrollIntoView}>
          <RadioGroup
            className="has-affiliations"
            required={this.props.required}
            onError={this.props.onError}
            selectedValue={(this.props.HasAffiliations || {}).value}>
            <Radio
              name="affiliation_yes"
              label={i18n.t('foreign.contacts.label.yes')}
              value="Yes"
              className="yes"
              onUpdate={this.updateHasAffiliations}
              onError={this.props.onError}
            />
            <Radio
              name="affiliation_no"
              label={i18n.t('foreign.contacts.label.no')}
              value="No"
              className="no"
              onUpdate={this.updateHasAffiliations}
              onError={this.props.onError}
            />
            <Radio
              name="affiliation_idk"
              label={i18n.t('foreign.contacts.label.idk')}
              value="I don't know"
              className="idk"
              onUpdate={this.updateHasAffiliations}
              onError={this.props.onError}
            />
          </RadioGroup>
        </Field>

        <Show when={(this.props.HasAffiliations || {}).value === 'Yes'}>
          <Field
            title={i18n.t('foreign.contacts.heading.affiliations')}
            scrollIntoView={this.props.scrollIntoView}>
            <Textarea
              name="Affiliations"
              className="affiliations"
              {...this.props.Affiliations}
              onUpdate={this.updateAffiliations}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
        </Show>
      </div>
    )
  }
}

ForeignNational.defaultProps = {
  Name: {},
  NameNotApplicable: {
    applicable: true
  },
  NameExplanation: {},
  FirstContact: {},
  LastContact: {},
  Methods: {},
  MethodsNotApplicable: { applicable: true },
  MethodsExplanation: {},
  Frequency: {},
  FrequencyExplanation: {},
  Relationship: {},
  RelationshipExplanation: {},
  Aliases: {},
  Citizenship: {},
  Birthdate: {},
  BirthdateNotApplicable: { applicable: true },
  Birthplace: {},
  BirthplaceNotApplicable: { applicable: true },
  Address: {},
  AddressNotApplicable: { applicable: true },
  Employer: {},
  EmployerNotApplicable: { applicable: true },
  EmployerAddress: {},
  EmployerAddressNotApplicable: { applicable: true },
  OrganizationNotApplicable: { applicable: true },
  OrganizationAddressNotApplicable: { applicable: true },
  HasAffiliations: {},
  Affiliations: {},
  addressBooks: {},
  dispatch: action => {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
