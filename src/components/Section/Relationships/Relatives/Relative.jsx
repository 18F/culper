import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Show, Svg, BranchCollection,
         Name, Text, Textarea, Address, DateControl,
         Checkbox, CheckboxGroup, Radio, RadioGroup, Country,
         Field, NotApplicable
       } from '../../../Form'
import { RelativeValidator } from '../../../../validators'
import Alias from './Alias'

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

export default class Relative extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      Relation: props.Relation,
      Name: props.Name,
      Birthdate: props.Birthdate,
      Birthplace: props.Birthplace,
      Citizenship: props.Citizenship,
      MaidenSameAsListed: props.MaidenSameAsListed,
      MaidenName: props.MaidenName,
      Aliases: props.Aliases,
      IsDeceased: props.IsDeceased,
      Address: props.Address,
      Abroad: props.Abroad,
      Naturalized: props.Naturalized,
      Derived: props.Derived,
      DerivedComments: props.DerivedComments,
      DocumentNumber: props.DocumentNumber,
      CourtName: props.CourtName,
      CourtAddress: props.CourtAddress,
      Document: props.Document,
      DocumentComments: props.DocumentComments,
      ResidenceDocumentNumber: props.ResidenceDocumentNumber,
      Expiration: props.Expiration,
      FirstContact: props.FirstContact,
      LastContact: props.LastContact,
      Methods: props.Methods,
      MethodsComments: props.MethodsComments,
      Frequency: props.Frequency,
      FrequencyComments: props.FrequencyComments,
      EmployerNotApplicable: props.EmployerNotApplicable,
      EmployerAddressNotApplicable: props.EmployerAddressNotApplicable,
      EmployerRelationshipNotApplicable: props.EmployerRelationshipNotApplicable,
      Employer: props.Employer,
      EmployerAddress: props.EmployerAddress,
      HasAffiliation: props.HasAffiliation,
      EmployerRelationship: props.EmployerRelationship,
      errorCodes: []
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateRelation = this.updateRelation.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateBirthdate = this.updateBirthdate.bind(this)
    this.updateBirthplace = this.updateBirthplace.bind(this)
    this.updateCitizenship = this.updateCitizenship.bind(this)
    this.updateMaidenSameAsListed = this.updateMaidenSameAsListed.bind(this)
    this.updateMaidenName = this.updateMaidenName.bind(this)
    this.updateAliases = this.updateAliases.bind(this)
    this.updateIsDeceased = this.updateIsDeceased.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateAbroad = this.updateAbroad.bind(this)
    this.updateNaturalized = this.updateNaturalized.bind(this)
    this.updateDerived = this.updateDerived.bind(this)
    this.updateDerivedComments = this.updateDerivedComments.bind(this)
    this.updateDocumentNumber = this.updateDocumentNumber.bind(this)
    this.updateCourtName = this.updateCourtName.bind(this)
    this.updateCourtAddress = this.updateCourtAddress.bind(this)
    this.updateDocument = this.updateDocument.bind(this)
    this.updateDocumentComments = this.updateDocumentComments.bind(this)
    this.updateResidenceDocumentNumber = this.updateResidenceDocumentNumber.bind(this)
    this.updateExpiration = this.updateExpiration.bind(this)
    this.updateFirstContact = this.updateFirstContact.bind(this)
    this.updateLastContact = this.updateLastContact.bind(this)
    this.updateMethods = this.updateMethods.bind(this)
    this.updateMethodsComments = this.updateMethodsComments.bind(this)
    this.updateFrequency = this.updateFrequency.bind(this)
    this.updateFrequencyComments = this.updateFrequencyComments.bind(this)
    this.updateEmployerNotApplicable = this.updateEmployerNotApplicable.bind(this)
    this.updateEmployerAddressNotApplicable = this.updateEmployerAddressNotApplicable.bind(this)
    this.updateEmployerRelationshipNotApplicable = this.updateEmployerRelationshipNotApplicable.bind(this)
    this.updateEmployer = this.updateEmployer.bind(this)
    this.updateEmployerAddress = this.updateEmployerAddress.bind(this)
    this.updateHasAffiliation = this.updateHasAffiliation.bind(this)
    this.updateEmployerRelationship = this.updateEmployerRelationship.bind(this)
  }

  onUpdate (name, values, fn) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)

      if (fn) {
        fn()
      }
    })
  }

  updateRelation (event) {
    this.onUpdate('Relation', event.target.value)
  }

  updateName (values) {
    this.onUpdate('Name', values)
  }

  updateBirthdate (values) {
    this.onUpdate('Birthdate', values)
  }

  updateBirthplace (values) {
    this.onUpdate('Birthplace', values)
  }

  updateCitizenship (values) {
    this.onUpdate('Citizenship', values)
  }

  updateMaidenSameAsListed (values) {
    this.onUpdate('MaidenSameAsListed', values)
  }

  updateMaidenName (values) {
    this.onUpdate('MaidenName', values)
  }

  updateAliases (values) {
    this.onUpdate('Aliases', values)
  }

  updateIsDeceased (values) {
    this.onUpdate('IsDeceased', values)
  }

  updateAddress (values) {
    this.onUpdate('Address', values)
  }

  updateAbroad (event) {
    this.onUpdate('Abroad', event.target.value)
  }

  updateNaturalized (event) {
    this.onUpdate('Naturalized', event.target.value)
  }

  updateDerived (event) {
    this.onUpdate('Derived', event.target.value)
  }

  updateDerivedComments (values) {
    this.onUpdate('DerivedComments', values)
  }

  updateDocumentNumber (values) {
    this.onUpdate('DocumentNumber', values)
  }

  updateCourtName (values) {
    this.onUpdate('CourtName', values)
  }

  updateCourtAddress (values) {
    this.onUpdate('CourtAddress', values)
  }

  updateDocument (event) {
    this.onUpdate('Document', event.target.value)
  }

  updateDocumentComments (values) {
    this.onUpdate('DocumentComments', values)
  }

  updateResidenceDocumentNumber (values) {
    this.onUpdate('ResidenceDocumentNumber', values)
  }

  updateExpiration (values) {
    this.onUpdate('Expiration', values)
  }

  updateFirstContact (values) {
    this.onUpdate('FirstContact', values)
  }

  updateLastContact (values) {
    this.onUpdate('LastContact', values)
  }

  updateMethods (event) {
    let method = event.target.value
    let selected = [...(this.state.Methods || [])]

    if (selected.includes(method)) {
      // Remove the relation if it was previously selected
      selected.splice(selected.indexOf(method), 1)
    } else {
      // Add the relation if it wasn't already
      selected.push(method)
    }

    this.onUpdate('Methods', selected)
  }

  updateMethodsComments (values) {
    this.onUpdate('MethodsComments', values)
  }

  updateFrequency (event) {
    this.onUpdate('Frequency', event.target.value)
  }

  updateFrequencyComments (values) {
    this.onUpdate('FrequencyComments', values)
  }

  updateEmployerNotApplicable (values) {
    this.onUpdate('EmployerNotApplicable', values)
  }

  updateEmployerAddressNotApplicable (values) {
    this.onUpdate('EmployerAddressNotApplicable', values)
  }

  updateEmployerRelationshipNotApplicable (values) {
    this.onUpdate('EmployerRelationshipNotApplicable', values)
  }

  updateEmployer (values) {
    this.onUpdate('Employer', values)
  }

  updateEmployerAddress (values) {
    this.onUpdate('EmployerAddress', values)
  }

  updateHasAffiliation (values) {
    this.onUpdate('HasAffiliation', values)
  }

  updateEmployerRelationship (values) {
    this.onUpdate('EmployerRelationship', values)
  }

  render () {
    console.log('relation:', this.state.Relation)
    const validator = new RelativeValidator(this.state, null)
    const mother = this.state.Relation === 'Mother'
    const immediateFamily = ['Father', 'Mother', 'Child', 'Stepchild', 'Brother', 'Sister', 'Half-brother', 'Half-sister', 'Stepbrother', 'Stepsister', 'Stepmother', 'Stepfather'].includes(this.state.Relation)

    return (
      <div className="relative-item">
        <Field title={i18n.t('relationships.relatives.heading.relation')}
               help="relationships.relatives.help.relation"
               adjustFor="big-buttons">
          <RadioGroup className="relative-relation option-list"
                      selectedValue={this.state.Relation}>
            <Radio name="relation-mother"
                   label={i18n.m('relationships.relatives.label.relation.mother')}
                   value="Mother"
                   className="relation-mother"
                   onValidate={this.props.onValidate}
                   onChange={this.updateRelation}
                   />
            <Radio name="relation-father"
                   label={i18n.m('relationships.relatives.label.relation.father')}
                   value="Father"
                   className="relation-father"
                   onValidate={this.props.onValidate}
                   onChange={this.updateRelation}
                   />
            <Radio name="relation-stepmother"
                   label={i18n.m('relationships.relatives.label.relation.stepmother')}
                   value="Stepmother"
                   className="relation-stepmother"
                   onValidate={this.props.onValidate}
                   onChange={this.updateRelation}
                   />
            <Radio name="relation-stepfather"
                   label={i18n.m('relationships.relatives.label.relation.stepfather')}
                   value="Stepfather"
                   className="relation-stepfather"
                   onValidate={this.props.onValidate}
                   onChange={this.updateRelation}
                   />
            <Radio name="relation-fosterparent"
                   label={i18n.m('relationships.relatives.label.relation.fosterparent')}
                   value="Fosterparent"
                   className="relation-fosterparent"
                   onValidate={this.props.onValidate}
                   onChange={this.updateRelation}
                   />
            <Radio name="relation-child"
                   label={i18n.m('relationships.relatives.label.relation.child')}
                   value="Child"
                   className="relation-child"
                   onValidate={this.props.onValidate}
                   onChange={this.updateRelation}
                   />
            <Radio name="relation-stepchild"
                   label={i18n.m('relationships.relatives.label.relation.stepchild')}
                   value="Stepchild"
                   className="relation-stepchild"
                   onValidate={this.props.onValidate}
                   onChange={this.updateRelation}
                   />
            <Radio name="relation-brother"
                   label={i18n.m('relationships.relatives.label.relation.brother')}
                   value="Brother"
                   className="relation-brother"
                   onValidate={this.props.onValidate}
                   onChange={this.updateRelation}
                   />
            <Radio name="relation-sister"
                   label={i18n.m('relationships.relatives.label.relation.sister')}
                   value="Sister"
                   className="relation-sister"
                   onValidate={this.props.onValidate}
                   onChange={this.updateRelation}
                   />
            <Radio name="relation-stepbrother"
                   label={i18n.m('relationships.relatives.label.relation.stepbrother')}
                   value="Stepbrother"
                   className="relation-stepbrother"
                   onValidate={this.props.onValidate}
                   onChange={this.updateRelation}
                   />
            <Radio name="relation-stepsister"
                   label={i18n.m('relationships.relatives.label.relation.stepsister')}
                   value="Stepsister"
                   className="relation-stepsister"
                   onValidate={this.props.onValidate}
                   onChange={this.updateRelation}
                   />
            <Radio name="relation-halfbrother"
                   label={i18n.m('relationships.relatives.label.relation.halfbrother')}
                   value="Half-brother"
                   className="relation-halfbrother"
                   onValidate={this.props.onValidate}
                   onChange={this.updateRelation}
                   />
            <Radio name="relation-halfsister"
                   label={i18n.m('relationships.relatives.label.relation.halfsister')}
                   value="Half-sister"
                   className="relation-halfsister"
                   onValidate={this.props.onValidate}
                   onChange={this.updateRelation}
                   />
            <Radio name="relation-fatherinlaw"
                   label={i18n.m('relationships.relatives.label.relation.fatherinlaw')}
                   value="Father-in-law"
                   className="relation-fatherinlaw"
                   onValidate={this.props.onValidate}
                   onChange={this.updateRelation}
                   />
            <Radio name="relation-montherinlaw"
                   label={i18n.m('relationships.relatives.label.relation.montherinlaw')}
                   value="Monther-in-law"
                   className="relation-montherinlaw"
                   onValidate={this.props.onValidate}
                   onChange={this.updateRelation}
                   />
            <Radio name="relation-guardian"
                   label={i18n.m('relationships.relatives.label.relation.guardian')}
                   value="Guardian"
                   className="relation-guardian"
                   onValidate={this.props.onValidate}
                   onChange={this.updateRelation}
                   />
          </RadioGroup>
        </Field>

        <h3>{i18n.t('relationships.relatives.heading.name')}</h3>
        <Name name="Name"
              className="relative-name"
              {...this.state.Name}
              onValidate={this.props.onValidate}
              onUpdate={this.updateName}
              />

        <Field title={i18n.t('relationships.relatives.heading.birthdate')}
               help="relationships.relatives.help.birthdate"
               adjustFor="labels"
               shrink={true}>
          <DateControl name="Birthdate"
                       className="relative-birthdate"
                       {...this.state.Birthdate}
                       onValidate={this.props.onValidate}
                       onUpdate={this.updateBirthdate}
                       />
        </Field>

        <Field title={i18n.t('relationships.relatives.heading.birthplace')}
               help="relationships.relatives.help.birthplace"
               adjustFor="address">
          <Address name="Birthplace"
                   className="relative-birthplace"
                   {...this.state.Birthplace}
                   onValidate={this.props.onValidate}
                   onUpdate={this.updateBirthplace}
                   />
        </Field>

        <Field title={i18n.t('relationships.relatives.heading.citizenship')}
               help="relationships.relatives.help.citizenship">
          <Country name="Citizenship"
                   multiple={true}
                   value={this.state.Citizenship.value}
                   className="relative-citizenship"
                   onValidate={this.props.onValidate}
                   onUpdate={this.updateCitizenship}
                   />
        </Field>

        <Show when={mother}>
          <div>
            <h3>{i18n.t('relationships.relatives.heading.maiden')}</h3>
            <Branch name="maiden_diff"
                    help="relationships.relatives.help.maiden"
                    className="eapp-field-wrap relative-maiden-diff"
                    value={this.state.MaidenSameAsListed}
                    yesLabel={i18n.t('relationships.relatives.label.maiden.same')}
                    noLabel={i18n.t('relationships.relatives.label.maiden.diff')}
                    onUpdate={this.updateMaidenSameAsListed}
                    onValidate={this.props.onValidate}>
            </Branch>
            <Show when={this.state.MaidenSameAsListed === 'No'}>
              <Name name="MaidenName"
                    className="relative-maidenname eapp-field-wrap"
                    {...this.state.MaidenName}
                    onValidate={this.props.onValidate}
                    onUpdate={this.updateMaidenName}
                    />
            </Show>
          </div>
        </Show>

        <Show when={immediateFamily}>
          <div>
            <BranchCollection items={this.state.Aliases}
                              branchName="has_alias"
                              label={i18n.t('relationships.relatives.heading.alias.branch')}
                              appendLabel={i18n.t('relationships.relatives.heading.alias.branch')}
                              className="relative-alias"
                              onUpdate={this.updateAliases}
                              onValidate={this.props.onValidate}>
              <div>
                <Field title={i18n.t('relationships.relatives.heading.needmore')}
                       className="more title">
                  <Svg src="img/date-down-arrow.svg" className="more arrow" />
                </Field>
                <Alias name="Item"
                       onValidate={this.props.onValidate}
                       hideMaiden={this.state.Relation === 'Mother'}
                  bind={true} />
              </div>
            </BranchCollection>
          </div>
        </Show>

        <h3>{i18n.t('relationships.relatives.heading.deceased.branch')}</h3>
        <Branch name="is_deceased"
                className="relative-deceased"
                value={this.state.IsDeceased}
                help="relationships.relatives.help.deceased"
                onUpdate={this.updateIsDeceased}
                onValidate={this.props.onValidate}>
        </Branch>
        <Show when={this.state.IsDeceased === 'No'}>
          <Field title={i18n.t('relationships.relatives.heading.deceased.address')}
                 help="relationships.relatives.help.address"
                 adjustFor="address">
            <Address name="Address"
                     className="relative-address"
                     {...this.state.Address}
                     onUpdate={this.updateAddress}
                     onValidate={this.props.onValidate}
                     />
          </Field>
        </Show>

        <Show when={validator.requiresCitizenshipDocumentation()}>
          <div>
            <h3 className="more title">{i18n.t('relationships.relatives.heading.needmore')}</h3>
            <Svg src="img/date-down-arrow.svg" className="more arrow" />

            <h3>{i18n.t('relationships.relatives.heading.us.title')}</h3>
            <h4>{i18n.t('relationships.relatives.heading.us.documentation')}</h4>

            {i18n.m('relationships.relatives.para.abroad')}
            <Field help="relationships.relatives.help.abroad"
                   adjustFor="buttons"
                   shrink={true}>
              <RadioGroup className="relative-abroad option-list"
                          selectedValue={this.state.Abroad}>
                <Radio name="abroad-fs"
                       label={i18n.m('relationships.relatives.label.abroad.fs')}
                       value="FS"
                       className="abroad-fs"
                       onValidate={this.props.onValidate}
                       onChange={this.updateAbroad}
                       />
                <Radio name="abroad-ds"
                       label={i18n.m('relationships.relatives.label.abroad.ds')}
                       value="DS"
                       className="abroad-ds"
                       onValidate={this.props.onValidate}
                       onChange={this.updateAbroad}
                       />
              </RadioGroup>
            </Field>

            {i18n.m('relationships.relatives.para.naturalized')}
            <Field help="relationships.relatives.help.naturalized"
                   adjustFor="big-buttons">
              <RadioGroup className="relative-naturalized option-list"
                          selectedValue={this.state.Naturalized}>
                <Radio name="naturalized-alien"
                       label={i18n.m('relationships.relatives.label.naturalized.alien')}
                       value="Alien"
                       className="naturalized-alien"
                       onValidate={this.props.onValidate}
                       onChange={this.updateNaturalized}
                       />
                <Radio name="naturalized-permanent"
                       label={i18n.m('relationships.relatives.label.naturalized.permanent')}
                       value="Permanent"
                       className="naturalized-permanent"
                       onValidate={this.props.onValidate}
                       onChange={this.updateNaturalized}
                       />
                <Radio name="naturalized-certificate"
                       label={i18n.m('relationships.relatives.label.naturalized.certificate')}
                       value="Certificate"
                       className="naturalized-certificate"
                       onValidate={this.props.onValidate}
                       onChange={this.updateNaturalized}
                       />
              </RadioGroup>
            </Field>

            <Field help="relationships.relatives.help.derived"
                   adjustFor="big-buttons"
                   comments={true}
                   commentsName="DerivedComments"
                   commentsValue={this.state.DerivedComments}
                   commentsActive={this.state.Derived === 'Other'}
                   onUpdate={this.updateDerivedComments}
                   >
              <div>
                {i18n.m('relationships.relatives.para.derived')}
                <RadioGroup className="relative-derived option-list"
                            selectedValue={this.state.Derived}>
                  <Radio name="derived-alien"
                         label={i18n.m('relationships.relatives.label.derived.alien')}
                         value="Alien"
                         className="derived-alien"
                         onValidate={this.props.onValidate}
                         onChange={this.updateDerived}
                         />
                  <Radio name="derived-permanent"
                         label={i18n.m('relationships.relatives.label.derived.permanent')}
                         value="Permanent"
                         className="derived-permanent"
                         onValidate={this.props.onValidate}
                         onChange={this.updateDerived}
                         />
                  <Radio name="derived-certificate"
                         label={i18n.m('relationships.relatives.label.derived.certificate')}
                         value="Certificate"
                         className="derived-certificate"
                         onValidate={this.props.onValidate}
                         onChange={this.updateDerived}
                         />
                  <Radio name="derived-other"
                         label={i18n.m('relationships.relatives.label.derived.other')}
                         value="Other"
                         className="derived-other"
                         onValidate={this.props.onValidate}
                         onChange={this.updateDerived}
                         />
                </RadioGroup>
              </div>
            </Field>

            <Field title={i18n.t('relationships.relatives.heading.us.number')}
                   titleSize="h4"
                   help="relationships.relatives.help.documentnumber">
              <Text name="DocumentNumber"
                    className="relative-documentnumber"
                    {...this.state.DocumentNumber}
                    onValidate={this.props.onValidate}
                    onUpdate={this.updateDocumentNumber}
                    />
            </Field>

            <Field title={i18n.t('relationships.relatives.heading.us.name')}
                   titleSize="h4"
                   help="relationships.relatives.help.courtname">
              <Text name="CourtName"
                    className="relative-courtname"
                    {...this.state.CourtName}
                    onValidate={this.props.onValidate}
                    onUpdate={this.updateCourtName}
                    />
            </Field>

            <Field title={i18n.t('relationships.relatives.heading.us.address')}
                   titleSize="h4"
                   help="relationships.relatives.help.courtaddress"
                   adjustFor="address">
              <Address name="CourtAddress"
                       className="relative-courtaddress"
                       {...this.state.CourtAddress}
                       onValidate={this.props.onValidate}
                       onUpdate={this.updateCourtAddress}
                       />
            </Field>
          </div>
        </Show>

        <Show when={!validator.citizen() && this.state.IsDeceased === 'No'}>
          <div>
            <Show when={this.state.Address && this.state.Address.addressType === 'United States'}>
              <div>
                <Field title={i18n.t('relationships.relatives.heading.address.title')}
                       help="relationships.relatives.help.document"
                       comments={true}
                       commentsName="DocumentComments"
                       commentsValue={this.state.DocumentComments}
                       commentsActive={this.state.Document === 'Other'}
                       onUpdate={this.updateDocumentComments}
                       adjustFor="big-buttons">
                  <div>
                    {i18n.t('relationships.relatives.para.notcitizen')}
                    <RadioGroup className="relative-document option-list"
                                selectedValue={this.state.Document}>
                      <Radio name="document-permanent"
                             label={i18n.m('relationships.relatives.label.document.permanent')}
                             value="Permanent"
                             className="document-permanent"
                             onValidate={this.props.onValidate}
                             onChange={this.updateDocument}
                             />
                      <Radio name="document-employment"
                             label={i18n.m('relationships.relatives.label.document.employment')}
                             value="Employment"
                             className="document-employment"
                             onValidate={this.props.onValidate}
                             onChange={this.updateDocument}
                             />
                      <Radio name="document-arrival"
                             label={i18n.m('relationships.relatives.label.document.arrival')}
                             value="Arrival"
                             className="document-arrival"
                             onValidate={this.props.onValidate}
                             onChange={this.updateDocument}
                             />
                      <Radio name="document-visa"
                             label={i18n.m('relationships.relatives.label.document.visa')}
                             value="Visa"
                             className="document-visa"
                             onValidate={this.props.onValidate}
                             onChange={this.updateDocument}
                             />
                      <Radio name="document-f1"
                             label={i18n.m('relationships.relatives.label.document.f1')}
                             value="F1"
                             className="document-f1"
                             onValidate={this.props.onValidate}
                             onChange={this.updateDocument}
                             />
                      <Radio name="document-j1"
                             label={i18n.m('relationships.relatives.label.document.j1')}
                             value="J1"
                             className="document-j1"
                             onValidate={this.props.onValidate}
                             onChange={this.updateDocument}
                             />
                      <Radio name="document-other"
                             label={i18n.m('relationships.relatives.label.document.other')}
                             value="Other"
                             className="document-other"
                             onValidate={this.props.onValidate}
                             onChange={this.updateDocument}
                             />
                    </RadioGroup>
                  </div>
                </Field>

                <Field title={i18n.t('relationships.relatives.heading.address.number')}
                       help="relationships.relatives.help.residencedocumentnumber">
                  <Text name="ResidenceDocumentNumber"
                        className="relative-residence-documentnumber"
                        {...this.state.ResidenceDocumentNumber}
                        onValidate={this.props.onValidate}
                        onUpdate={this.updateResidenceDocumentNumber}
                        />
                </Field>

                <Field title={i18n.t('relationships.relatives.heading.address.expiration')}
                       help="relationships.relatives.help.expiration"
                       adjustFor="labels"
                       shrink={true}>
                  <DateControl name="Expiration"
                               className="relative-expiration"
                               {...this.state.Expiration}
                               onValidate={this.props.onValidate}
                               onUpdate={this.updateExpiration}
                               />
                </Field>
              </div>
            </Show>

            <Show when={this.state.Address && this.state.Address.addressType === 'International'}>
              <div>
                <Field title={i18n.t('relationships.relatives.heading.address.firstcontact')}
                       help="relationships.relatives.help.firstcontact"
                       adjustFor="labels"
                       shrink={true}>
                  <DateControl name="FirstContact"
                               className="relative-first-contact"
                               {...this.state.FirstContact}
                               onValidate={this.props.onValidate}
                               onUpdate={this.updateFirstContact}
                               />
                </Field>

                <Field title={i18n.t('relationships.relatives.heading.address.lastcontact')}
                       help="relationships.relatives.help.lastcontact"
                       adjustFor="labels"
                       shrink={true}>
                  <DateControl name="LastContact"
                               className="relative-last-contact"
                               {...this.state.LastContact}
                               onValidate={this.props.onValidate}
                               onUpdate={this.updateLastContact}
                               />
                </Field>

                <Field title={i18n.t('relationships.relatives.heading.address.methods')}
                       help="relationships.relatives.help.methods"
                       comments={true}
                       commentsName="MethodsComments"
                       commentsValue={this.state.MethodsComments}
                       commentsActive={(this.state.Methods || []).some(x => x === 'Other')}
                  onUpdate={this.updateMethodsComments}
                  adjustFor="big-buttons">
                  <div>
                    {i18n.m('relationships.relatives.para.checkall')}
                    <CheckboxGroup className="relative-methods option-list"
                                   selectedValues={this.state.Methods}>
                      <Checkbox name="methods-inperson"
                                label={i18n.m('relationships.relatives.label.methods.inperson')}
                                value="In person"
                                className="methods-inperson"
                                onValidate={this.props.onValidate}
                                onChange={this.updateMethods}
                                />
                      <Checkbox name="methods-telephone"
                                label={i18n.m('relationships.relatives.label.methods.telephone')}
                                value="Telephone"
                                className="methods-telephone"
                                onValidate={this.props.onValidate}
                                onChange={this.updateMethods}
                                />
                      <Checkbox name="methods-electronic"
                                label={i18n.m('relationships.relatives.label.methods.electronic')}
                                value="Electronic"
                                className="methods-electronic"
                                onValidate={this.props.onValidate}
                                onChange={this.updateMethods}
                                />
                      <Checkbox name="methods-written"
                                label={i18n.m('relationships.relatives.label.methods.written')}
                                value="Written"
                                className="methods-written"
                                onValidate={this.props.onValidate}
                                onChange={this.updateMethods}
                                />
                      <Checkbox name="methods-other"
                                label={i18n.m('relationships.relatives.label.methods.other')}
                                value="Other"
                                className="methods-other"
                                onValidate={this.props.onValidate}
                                onChange={this.updateMethods}
                                />
                    </CheckboxGroup>
                  </div>
                </Field>

                <Field title={i18n.t('relationships.relatives.heading.address.frequency')}
                       help="relationships.relatives.help.frequency"
                       comments={true}
                       commentsName="FrequencyComments"
                       commentsValue={this.state.FrequencyComments}
                       commentsActive={this.state.Frequency === 'Other'}
                       onUpdate={this.updateFrequencyComments}
                       adjustFor="big-buttons">
                  <RadioGroup className="relative-frequency option-list"
                              selectedValue={this.state.Frequency}>
                    <Radio name="frequency-daily"
                           label={i18n.m('relationships.relatives.label.frequency.daily')}
                           value="Daily"
                           className="frequency-daily"
                           onValidate={this.props.onValidate}
                           onChange={this.updateFrequency}
                           />
                    <Radio name="frequency-weekly"
                           label={i18n.m('relationships.relatives.label.frequency.weekly')}
                           value="Weekly"
                           className="frequency-weekly"
                           onValidate={this.props.onValidate}
                           onChange={this.updateFrequency}
                           />
                    <Radio name="frequency-monthly"
                           label={i18n.m('relationships.relatives.label.frequency.monthly')}
                           value="Monthly"
                           className="frequency-monthly"
                           onValidate={this.props.onValidate}
                           onChange={this.updateFrequency}
                           />
                    <Radio name="frequency-quarterly"
                           label={i18n.m('relationships.relatives.label.frequency.quarterly')}
                           value="Quarterly"
                           className="frequency-quarterly"
                           onValidate={this.props.onValidate}
                           onChange={this.updateFrequency}
                           />
                    <Radio name="frequency-annually"
                           label={i18n.m('relationships.relatives.label.frequency.annually')}
                           value="Annually"
                           className="frequency-annually"
                           onValidate={this.props.onValidate}
                           onChange={this.updateFrequency}
                           />
                    <Radio name="frequency-other"
                           label={i18n.m('relationships.relatives.label.frequency.other')}
                           value="Other"
                           className="frequency-other"
                           onValidate={this.props.onValidate}
                           onChange={this.updateFrequency}
                           />
                  </RadioGroup>
                </Field>

                <Field title={i18n.t('relationships.relatives.heading.employer.name')}
                       help="relationships.relatives.help.employer"
                       adjustFor="buttons"
                       shrink={true}>
                  <NotApplicable name="EmployerNotApplicable"
                                 label={i18n.t('relationships.relatives.label.idk')}
                                 or={i18n.m('relationships.relatives.para.or')}
                                 onValidate={this.props.onValidate}
                                 onUpdate={this.updateEmployerNotApplicable}>
                    <Text name="Employer"
                          className="relative-employer"
                          {...this.state.Employer}
                          onValidate={this.props.onValidate}
                          onUpdate={this.updateEmployer}
                          />
                  </NotApplicable>
                </Field>

                <Field title={i18n.t('relationships.relatives.heading.employer.address')}
                       help="relationships.relatives.help.employeraddress"
                       adjustFor="address">
                  <NotApplicable name="EmployerAddressNotApplicable"
                                 label={i18n.t('relationships.relatives.label.idk')}
                                 or={i18n.m('relationships.relatives.para.or')}
                                 onValidate={this.props.onValidate}
                                 onUpdate={this.updateEmployerAddressNotApplicable}>
                    <Address name="EmployerAddress"
                             className="relative-employer-address"
                             {...this.state.EmployerAddress}
                             onValidate={this.props.onValidate}
                             onUpdate={this.updateEmployerAddress}
                             />
                  </NotApplicable>
                </Field>

                <NotApplicable name="EmployerRelationshipNotApplicable"
                               label={i18n.t('relationships.relatives.label.idk')}
                               or={i18n.m('relationships.relatives.para.or')}
                               onValidate={this.props.onValidate}
                               onUpdate={this.updateEmployerRelationshipNotApplicable}>
                  <Branch name="has_affiliation"
                          label={i18n.t('relationships.relatives.heading.employer.affiliated')}
                          labelSize="h3"
                          className="relative-affiliation"
                          value={this.state.HasAffiliation}
                          help="relationships.relatives.help.affiliation"
                          onUpdate={this.updateHasAffiliation}
                          onValidate={this.props.onValidate}>
                  </Branch>
                  <Show when={this.state.HasAffiliation === 'Yes'}>
                    <Field title={i18n.t('relationships.relatives.heading.employer.relationship')}
                           help="relationships.relatives.help.employerrelationship">
                      <Textarea name="EmployerRelationship"
                                className="relative-employer-relationship"
                                {...this.state.EmployerRelationship}
                                onValidate={this.props.onValidate}
                                onUpdate={this.updateEmployerRelationship}
                                />
                    </Field>
                  </Show>
                </NotApplicable>
              </div>
            </Show>
          </div>
        </Show>
      </div>
    )
  }
}

Relative.defaultProps = {
  Relation: '',
  Name: {},
  Birthdate: {},
  Birthplace: {},
  Citizenship: [],
  MaidenSameAsListed: '',
  MaidenName: {},
  Aliases: [],
  IsDeceased: '',
  Address: {},
  Abroad: '',
  Naturalized: '',
  Derived: '',
  DerivedComments: {},
  DocumentNumber: {},
  CourtName: {},
  CourtAddress: {},
  Document: '',
  DocumentComments: {},
  ResidenceDocumentNumber: {},
  Expiration: {},
  FirstContact: {},
  LastContact: {},
  Methods: [],
  MethodsComments: {},
  Frequency: '',
  FrequencyComments: {},
  EmployerNotApplicable: {},
  EmployerAddressNotApplicable: {},
  EmployerRelationshipNotApplicable: {},
  Employer: {},
  EmployerAddress: {},
  HasAffiliation: '',
  EmployerRelationship: {}
}
