import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Show, Svg, BranchCollection,
         Name, Text, Textarea, Address, DateControl, DateRange,
         Checkbox, CheckboxGroup, Radio, RadioGroup, Country,
         Help, HelpIcon, NotApplicable, Comments
       } from '../../../Form'
import { RelativeValidator } from '../../../../validators'
import { subtext } from './Relatives'
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
      Relations: props.Relations,
      Name: props.Name,
      Birthdate: props.Birthdate,
      Birthplace: props.Birthplace,
      Citizenship: props.Citizenship, // Needs new component
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
    this.updateRelations = this.updateRelations.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateBirthdate = this.updateBirthdate.bind(this)
    this.updateBirthplace = this.updateBirthplace.bind(this)
    this.updateCitizenship = this.updateCitizenship.bind(this)
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

  updateRelations (event) {
    let relation = event.target.value
    let selected = [...(this.state.Relations || [])]

    if (selected.includes(relation)) {
      // Remove the relation if it was previously selected
      selected.splice(selected.indexOf(relation), 1)
    } else {
      // Add the relation if it wasn't already
      selected.push(relation)
    }

    this.onUpdate('Relations', selected)
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
    this.onUpdate('Citizenship', [values.value])
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

  updateDocumentComments (event) {
    this.onUpdate('DocumentComments', event.target.value)
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
    let selected = [...(this.state.Relations || [])]

    if (selected.includes(method)) {
      // Remove the relation if it was previously selected
      selected.splice(selected.indexOf(method), 1)
    } else {
      // Add the relation if it wasn't already
      selected.push(method)
    }

    this.onUpdate('Methods', selected)
  }

  updateMethodsComments (event) {
    this.onUpdate('MethodsComments', event.target.value)
  }

  updateFrequency (event) {
    this.onUpdate('Frequency', event.target.value)
  }

  updateFrequencyComments (event) {
    this.onUpdate('FrequencyComments', event.target.value)
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
    const validator = new RelativeValidator(this.state, null)
    const mother = this.state.Relations.some(x => x === 'Mother')
    const immediateFamily = this.state.Relations.some(x => ['Father', 'Mother', 'Child', 'Stepchild', 'Brother', 'Sister', 'Half-brother', 'Half-sister', 'Stepbrother', 'Stepsister', 'Stepmother', 'Stepfather'].includes(x))
    const aliasTitle = (<h3>{i18n.t('family.relatives.heading.alias.branch')}</h3>)

    return (
      <div className="relative-item">
        <h3>{i18n.t('family.relatives.heading.relation')}</h3>
        <div className="eapp-field-wrap no-label">
          <Help id="family.relatives.help.relation">
            <CheckboxGroup className="relative-relation option-list"
                           selectedValues={this.state.Relations}>
              <Checkbox name="relation-mother"
                        label={i18n.m('family.relatives.label.relation.mother')}
                        value="Mother"
                        className="relation-mother"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-father"
                        label={i18n.m('family.relatives.label.relation.father')}
                        value="Father"
                        className="relation-father"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-stepmother"
                        label={i18n.m('family.relatives.label.relation.stepmother')}
                        value="Stepmother"
                        className="relation-stepmother"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-stepfather"
                        label={i18n.m('family.relatives.label.relation.stepfather')}
                        value="Stepfather"
                        className="relation-stepfather"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-fosterparent"
                        label={i18n.m('family.relatives.label.relation.fosterparent')}
                        value="Fosterparent"
                        className="relation-fosterparent"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-child"
                        label={subtext('family.relatives.label.relation.child.text', 'family.relatives.label.relation.child.subtext')}
                        value="Child"
                        className="relation-child"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-stepchild"
                        label={i18n.m('family.relatives.label.relation.stepchild')}
                        value="Stepchild"
                        className="relation-stepchild"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-brother"
                        label={i18n.m('family.relatives.label.relation.brother')}
                        value="Brother"
                        className="relation-brother"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-sister"
                        label={i18n.m('family.relatives.label.relation.sister')}
                        value="Sister"
                        className="relation-sister"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-stepbrother"
                        label={i18n.m('family.relatives.label.relation.stepbrother')}
                        value="Stepbrother"
                        className="relation-stepbrother"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-stepsister"
                        label={i18n.m('family.relatives.label.relation.stepsister')}
                        value="Stepsister"
                        className="relation-stepsister"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-halfbrother"
                        label={i18n.m('family.relatives.label.relation.halfbrother')}
                        value="Half-brother"
                        className="relation-halfbrother"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-halfsister"
                        label={i18n.m('family.relatives.label.relation.halfsister')}
                        value="Half-sister"
                        className="relation-halfsister"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-fatherinlaw"
                        label={i18n.m('family.relatives.label.relation.fatherinlaw')}
                        value="Father-in-law"
                        className="relation-fatherinlaw"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-montherinlaw"
                        label={i18n.m('family.relatives.label.relation.montherinlaw')}
                        value="Monther-in-law"
                        className="relation-montherinlaw"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-guardian"
                        label={i18n.m('family.relatives.label.relation.guardian')}
                        value="Guardian"
                        className="relation-guardian"
                        onChange={this.updateRelations}
                        />
            </CheckboxGroup>
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t('family.relatives.heading.name')}</h3>
        <Name name="Name"
              className="relative-name eapp-field-wrap"
              {...this.state.Name}
              onUpdate={this.updateName}
              />

        <h3>{i18n.t('family.relatives.heading.birthdate')}</h3>
        <div className="eapp-field-wrap">
          <Help id="family.relatives.help.birthdate">
            <DateControl name="Birthdate"
                         className="relative-birthdate"
                         {...this.state.Birthdate}
                         onUpdate={this.updateBirthdate}
                         />
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t('family.relatives.heading.birthplace')}</h3>
        <div className="eapp-field-wrap no-label">
          <Help id="family.relatives.help.birthplace">
            <Address name="Birthplace"
                     className="relative-birthplace"
                     {...this.state.Birthplace}
                     onUpdate={this.updateBirthplace}
                     />
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t('family.relatives.heading.citizenship')}</h3>
        <div className="eapp-field-wrap no-label">
          <Help id="family.relatives.help.citizenship">
            <Country name="Citizenship"
                     value={this.state.Citizenship.first}
                     className="relative-citizenship"
                     onUpdate={this.updateCitizenship}
                     />
            <HelpIcon />
          </Help>
        </div>

        <Show when={mother}>
          <div>
            <h3>{i18n.t('family.relatives.heading.maiden')}</h3>
            <div className="eapp-field-wrap no-label">
              <Help id="family.relatives.help.maiden">
                <Text name="MaidenName"
                      className="relative-maidenname"
                      {...this.state.MaidenName}
                      onUpdate={this.updateMaidenName}
                      />
                <HelpIcon />
              </Help>
            </div>
          </div>
        </Show>

        <Show when={immediateFamily}>
          <div>
            <BranchCollection items={this.state.Aliases}
                              branchName="has_alias"
                              branch={aliasTitle}
                              className="relative-alias eapp-field-wrap help"
                              onUpdate={this.updateAliases}
                              onValidate={this.props.onValidate}>
              <div>
                <h3 className="more title">{i18n.t('family.relatives.heading.needmore')}</h3>
                <Svg src="img/date-down-arrow.svg" className="more arrow" />
                <Alias name="Item" bind={true} />
              </div>
            </BranchCollection>
          </div>
        </Show>

        <h3>{i18n.t('family.relatives.heading.deceased.branch')}</h3>
        <Branch name="is_deceased"
                className="eapp-field-wrap no-label relative-deceased"
                value={this.state.IsDeceased}
                help="family.relatives.help.deceased"
                onUpdate={this.updateIsDeceased}
                onValidate={this.props.onValidate}>
        </Branch>
        <Show when={this.state.IsDeceased === 'No'}>
          <div>
            <h3>{i18n.t('family.relatives.heading.deceased.address')}</h3>
            <div className="eapp-field-wrap no-label">
              <Help id="family.relatives.help.address">
                <Address name="Address"
                         className="relative-address"
                         {...this.state.Address}
                         onUpdate={this.updateAddress}
                         />
                <HelpIcon />
              </Help>
            </div>
          </div>
        </Show>

        <Show when={validator.requiresCitizenshipDocumentation()}>
          <div>
            <h3 className="more title">{i18n.t('family.relatives.heading.needmore')}</h3>
            <Svg src="img/date-down-arrow.svg" className="more arrow" />

            <h3>{i18n.t('family.relatives.heading.us.title')}</h3>
            <h4>{i18n.t('family.relatives.heading.us.documentation')}</h4>

            {i18n.m('family.relatives.para.abroad')}
            <div className="eapp-field-wrap no-label">
              <Help id="family.relatives.help.abroad">
                <RadioGroup className="relative-abroad option-list"
                            selectedValue={this.state.Abroad}>
                  <Radio name="abroad-fs"
                         label={i18n.m('family.relatives.label.abroad.fs')}
                         value="FS"
                         className="abroad-fs"
                         onChange={this.updateAbroad}
                         />
                  <Radio name="abroad-ds"
                         label={i18n.m('family.relatives.label.abroad.ds')}
                         value="DS"
                         className="abroad-ds"
                         onChange={this.updateAbroad}
                         />
                </RadioGroup>
                <HelpIcon />
              </Help>
            </div>

            {i18n.m('family.relatives.para.naturalized')}
            <div className="eapp-field-wrap no-label">
              <Help id="family.relatives.help.naturalized">
                <RadioGroup className="relative-naturalized option-list"
                            selectedValue={this.state.Naturalized}>
                  <Radio name="naturalized-alien"
                         label={subtext('family.relatives.label.naturalized.alien.text', 'family.relatives.label.naturalized.alien.subtext')}
                         value="Alien"
                         className="naturalized-alien"
                         onChange={this.updateNaturalized}
                         />
                  <Radio name="naturalized-permanent"
                         label={subtext('family.relatives.label.naturalized.permanent.text', 'family.relatives.label.naturalized.permanent.subtext')}
                         value="Permanent"
                         className="naturalized-permanent"
                         onChange={this.updateNaturalized}
                         />
                  <Radio name="naturalized-certificate"
                         label={subtext('family.relatives.label.naturalized.certificate.text', 'family.relatives.label.naturalized.certificate.subtext')}
                         value="Certificate"
                         className="naturalized-certificate"
                         onChange={this.updateNaturalized}
                         />
                </RadioGroup>
                <HelpIcon />
              </Help>
            </div>

            <Comments name="DerivedComments"
                      value={this.state.DerivedComments}
                      visible={this.state.Derived === 'Other'}
                      onUpdate={this.updateDerivedComments}>
              {i18n.m('family.relatives.para.derived')}
              <div className="eapp-field-wrap no-label">
                <Help id="family.relatives.help.derived">
                  <RadioGroup className="relative-derived option-list"
                              selectedValue={this.state.Derived}>
                    <Radio name="derived-alien"
                           label={subtext('family.relatives.label.derived.alien.text', 'family.relatives.label.derived.alien.subtext')}
                           value="Alien"
                           className="derived-alien"
                           onChange={this.updateDerived}
                           />
                    <Radio name="derived-permanent"
                           label={subtext('family.relatives.label.derived.permanent.text', 'family.relatives.label.derived.permanent.subtext')}
                           value="Permanent"
                           className="derived-permanent"
                           onChange={this.updateDerived}
                           />
                    <Radio name="derived-certificate"
                           label={subtext('family.relatives.label.derived.certificate.text', 'family.relatives.label.derived.certificate.subtext')}
                           value="Certificate"
                           className="derived-certificate"
                           onChange={this.updateDerived}
                           />
                    <Radio name="derived-other"
                           label={subtext('family.relatives.label.derived.other.text', 'family.relatives.label.derived.other.subtext')}
                           value="Other"
                           className="derived-other"
                           onChange={this.updateDerived}
                           />
                  </RadioGroup>
                  <HelpIcon />
                </Help>
              </div>
            </Comments>

            <h4>{i18n.t('family.relatives.heading.us.number')}</h4>
            <div className="eapp-field-wrap no-label">
              <Help id="family.relatives.help.documentnumber">
                <Text name="DocumentNumber"
                      className="relative-documentnumber"
                      {...this.state.DocumentNumber}
                      onUpdate={this.updateDocumentNumber}
                      />
                <HelpIcon />
              </Help>
            </div>

            <h4>{i18n.t('family.relatives.heading.us.name')}</h4>
            <div className="eapp-field-wrap no-label">
              <Help id="family.relatives.help.courtname">
                <Text name="CourtName"
                      className="relative-courtname"
                      {...this.state.CourtName}
                      onUpdate={this.updateCourtName}
                      />
                <HelpIcon />
              </Help>
            </div>

            <h4>{i18n.t('family.relatives.heading.us.address')}</h4>
            <div className="eapp-field-wrap no-label">
              <Help id="family.relatives.help.courtaddress">
                <Address name="CourtAddress"
                         className="relative-courtaddress"
                         {...this.state.CourtAddress}
                         onUpdate={this.updateCourtAddress}
                         />
                <HelpIcon />
              </Help>
            </div>
          </div>
        </Show>

        <Show when={!validator.citizen() && this.state.IsDeceased === 'No'}>
          <div>
            <Show when={this.state.Address && this.state.Address.addressType === 'United States'}>
              <div>
                <Comments name="DocumentComments"
                          value={this.state.DocumentComments}
                          visible={this.state.Document === 'Other'}
                          onUpdate={this.updateDocumentComments}>
                  <h3>{i18n.t('family.relatives.heading.address.title')}</h3>
                  {i18n.t('family.relatives.para.notcitizen')}
                  <div className="eapp-field-wrap no-label">
                    <Help id="family.relatives.help.document">
                      <RadioGroup className="relative-document option-list"
                                  selectedValue={this.state.Document}>
                        <Radio name="document-permanent"
                               label={i18n.m('family.relatives.label.document.permanent')}
                               value="Permanent"
                               className="document-permanent"
                               onChange={this.updateDocument}
                               />
                        <Radio name="document-employment"
                               label={i18n.m('family.relatives.label.document.employment')}
                               value="Employment"
                               className="document-employment"
                               onChange={this.updateDocument}
                               />
                        <Radio name="document-arrival"
                               label={i18n.m('family.relatives.label.document.arrival')}
                               value="Arrival"
                               className="document-arrival"
                               onChange={this.updateDocument}
                               />
                        <Radio name="document-visa"
                               label={subtext('family.relatives.label.document.visa.text', 'family.relatives.label.document.visa.subtext')}
                               value="Visa"
                               className="document-visa"
                               onChange={this.updateDocument}
                               />
                        <Radio name="document-f1"
                               label={subtext('family.relatives.label.document.f1.text', 'family.relatives.label.document.f1.subtext')}
                               value="F1"
                               className="document-f1"
                               onChange={this.updateDocument}
                               />
                        <Radio name="document-j1"
                               label={subtext('family.relatives.label.document.j1.text', 'family.relatives.label.document.j1.subtext')}
                               value="J1"
                               className="document-j1"
                               onChange={this.updateDocument}
                               />
                        <Radio name="document-other"
                               label={subtext('family.relatives.label.document.other.text', 'family.relatives.label.document.other.subtext')}
                               value="Other"
                               className="document-other"
                               onChange={this.updateDocument}
                               />
                      </RadioGroup>
                      <HelpIcon />
                    </Help>
                  </div>
                </Comments>

                <h3>{i18n.t('family.relatives.heading.address.number')}</h3>
                <div className="eapp-field-wrap no-label">
                  <Help id="family.relatives.help.residencedocumentnumber">
                    <Text name="ResidenceDocumentNumber"
                          className="relative-residence-documentnumber"
                          {...this.state.ResidenceDocumentNumber}
                          onUpdate={this.updateResidenceDocumentNumber}
                          />
                    <HelpIcon />
                  </Help>
                </div>

                <h3>{i18n.t('family.relatives.heading.address.expiration')}</h3>
                <div className="eapp-field-wrap">
                  <Help id="family.relatives.help.expiration">
                    <DateControl name="Expiration"
                                 className="relative-expiration"
                                 {...this.state.Expiration}
                                 onUpdate={this.updateExpiration}
                                 />
                    <HelpIcon />
                  </Help>
                </div>
              </div>
            </Show>

            <Show when={this.state.Address && this.state.Address.addressType === 'International'}>
              <div>
                <h3>{i18n.t('family.relatives.heading.address.firstcontact')}</h3>
                <div className="eapp-field-wrap">
                  <Help id="family.relatives.help.firstcontact">
                    <DateControl name="FirstContact"
                                 className="relative-first-contact"
                                 {...this.state.FirstContact}
                                 onUpdate={this.updateFirstContact}
                                 />
                    <HelpIcon />
                  </Help>
                </div>

                <h3>{i18n.t('family.relatives.heading.address.lastcontact')}</h3>
                <div className="eapp-field-wrap">
                  <Help idn="family.relatives.help.lastcontact">
                    <DateControl name="LastContact"
                                 className="relative-last-contact"
                                 {...this.state.LastContact}
                                 onUpdate={this.updateLastContact}
                                 />
                    <HelpIcon />
                  </Help>
                </div>

                <Comments name="MethodsComments"
                          value={this.state.MethodsComments}
                          visible={this.state.Methods.some(x => x === 'Other')}
                  onUpdate={this.updateMethodsComments}>
                  <h3>{i18n.t('family.relatives.heading.address.methods')}</h3>
                  {i18n.m('family.relatives.para.checkall')}
                  <div className="eapp-field-wrap no-label">
                    <Help id="family.relatives.help.methods">
                      <CheckboxGroup className="relative-methods option-list"
                                     selectedValues={this.state.Methods}>
                        <Checkbox name="methods-inperson"
                                  label={i18n.m('family.relatives.label.methods.inperson')}
                                  value="In person"
                                  className="methods-inperson"
                                  onChange={this.updateMethods}
                                  />
                        <Checkbox name="methods-telephone"
                                  label={i18n.m('family.relatives.label.methods.telephone')}
                                  value="Telephone"
                                  className="methods-telephone"
                                  onChange={this.updateMethods}
                                  />
                        <Checkbox name="methods-electronic"
                                  label={subtext('family.relatives.label.methods.electronic.text', 'family.relatives.label.methods.electronic.subtext')}
                                  value="Electronic"
                                  className="methods-electronic"
                                  onChange={this.updateMethods}
                                  />
                        <Checkbox name="methods-written"
                                  label={i18n.m('family.relatives.label.methods.written')}
                                  value="Written"
                                  className="methods-written"
                                  onChange={this.updateMethods}
                                  />
                        <Checkbox name="methods-other"
                                  label={subtext('family.relatives.label.methods.other.text', 'family.relatives.label.methods.other.subtext')}
                                  value="Other"
                                  className="methods-other"
                                  onChange={this.updateMethods}
                                  />
                      </CheckboxGroup>
                      <HelpIcon />
                    </Help>
                  </div>
                </Comments>

                <Comments name="FrequencyComments"
                          value={this.state.FrequencyComments}
                          visible={this.state.Frequency === 'Other'}
                          onUpdate={this.updateFrequencyComments}>
                  <h3>{i18n.t('family.relatives.heading.address.frequency')}</h3>
                  <div className="eapp-field-wrap no-label">
                    <Help id="family.relatives.help.frequency">
                      <RadioGroup className="relative-frequency option-list"
                                  selectedValue={this.state.Frequency}>
                        <Radio name="frequency-daily"
                               label={i18n.m('family.relatives.label.frequency.daily')}
                               value="Daily"
                               className="frequency-daily"
                               onChange={this.updateFrequency}
                               />
                        <Radio name="frequency-weekly"
                               label={i18n.m('family.relatives.label.frequency.weekly')}
                               value="Weekly"
                               className="frequency-weekly"
                               onChange={this.updateFrequency}
                               />
                        <Radio name="frequency-monthly"
                               label={i18n.m('family.relatives.label.frequency.monthly')}
                               value="Monthly"
                               className="frequency-monthly"
                               onChange={this.updateFrequency}
                               />
                        <Radio name="frequency-quarterly"
                               label={i18n.m('family.relatives.label.frequency.quarterly')}
                               value="Quarterly"
                               className="frequency-quarterly"
                               onChange={this.updateFrequency}
                               />
                        <Radio name="frequency-annually"
                               label={i18n.m('family.relatives.label.frequency.annually')}
                               value="Annually"
                               className="frequency-annually"
                               onChange={this.updateFrequency}
                               />
                        <Radio name="frequency-other"
                               label={subtext('family.relatives.label.frequency.other.text', 'family.relatives.label.frequency.other.subtext')}
                               value="Other"
                               className="frequency-other"
                               onChange={this.updateFrequency}
                               />
                      </RadioGroup>
                      <HelpIcon />
                    </Help>
                  </div>
                </Comments>

                <h3>{i18n.t('family.relatives.heading.employer.name')}</h3>
                <div className="eapp-field-wrap no-label">
                  <Help id="family.relatives.help.employer">
                    <NotApplicable name="EmployerNotApplicable"
                                   label={i18n.t('family.relatives.label.idk')}
                                   or={i18n.m('family.relatives.para.or')}
                                   onUpdate={this.updateEmployerNotApplicable}>
                      <Text name="Employer"
                            className="relative-employer"
                            {...this.state.Employer}
                            onUpdate={this.updateEmployer}
                            />
                    </NotApplicable>
                    <HelpIcon />
                  </Help>
                </div>

                <h3>{i18n.t('family.relatives.heading.employer.address')}</h3>
                <div className="eapp-field-wrap no-label">
                  <Help id="family.relatives.help.employeraddress">
                    <NotApplicable name="EmployerAddressNotApplicable"
                                   label={i18n.t('family.relatives.label.idk')}
                                   or={i18n.m('family.relatives.para.or')}
                                   onUpdate={this.updateEmployerAddressNotApplicable}>
                      <Address name="EmployerAddress"
                               className="relative-employer-address"
                               {...this.state.EmployerAddress}
                               onUpdate={this.updateEmployerAddress}
                               />
                    </NotApplicable>
                    <HelpIcon className="help-icon-employer-address" />
                  </Help>
                </div>

                <h3>{i18n.t('family.relatives.heading.employer.affiliated')}</h3>
                <div className="eapp-field-wrap">
                  <Help id="family.relatives.help.affiliation">
                    <NotApplicable name="EmployerRelationshipNotApplicable"
                                   label={i18n.t('family.relatives.label.idk')}
                                   or={i18n.m('family.relatives.para.or')}
                                   onUpdate={this.updateEmployerRelationshipNotApplicable}>
                      <Branch name="has_affiliation"
                              className="no-label relative-affiliation"
                              value={this.state.HasAffiliation}
                              help="family.relatives.help.affiliation"
                              onUpdate={this.updateHasAffiliation}
                              onValidate={this.props.onValidate}>
                      </Branch>
                      <Show when={this.state.HasAffiliation === 'Yes'}>
                        <div>
                          <h3>{i18n.t('family.relatives.heading.employer.relationship')}</h3>
                          <div className="eapp-field-wrap no-label">
                            <Help id="family.relatives.help.employerrelationship">
                              <Textarea name="EmployerRelationship"
                                        className="relative-employer-relationship"
                                        {...this.state.EmployerRelationship}
                                        onUpdate={this.updateEmployerRelationship}
                                        />
                              <HelpIcon />
                            </Help>
                          </div>
                        </div>
                      </Show>
                    </NotApplicable>
                  </Help>
                </div>
              </div>
            </Show>
          </div>
        </Show>
      </div>
    )
  }
}

Relative.defaultProps = {
  Relations: [],
  Name: {},
  Birthdate: {},
  Birthplace: {},
  Citizenship: [],
  MaidenName: '',
  Aliases: [],
  IsDeceased: '',
  Address: {},
  Abroad: '',
  Naturalized: '',
  Derived: '',
  DerivedComments: '',
  DocumentNumber: {},
  CourtName: {},
  CourtAddress: {},
  Document: '',
  DocumentComments: '',
  ResidenceDocumentNumber: {},
  Expiration: {},
  FirstContact: {},
  LastContact: {},
  Methods: [],
  MethodsComments: '',
  Frequency: '',
  FrequencyComments: '',
  EmployerNotApplicable: {},
  EmployerAddressNotApplicable: {},
  EmployerRelationshipNotApplicable: {},
  Employer: {},
  EmployerAddress: {},
  HasAffiliation: '',
  EmployerRelationship: {}
}
