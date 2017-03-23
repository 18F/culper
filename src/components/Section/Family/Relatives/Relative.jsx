import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Show, Svg, BranchCollection,
         Name, Text, Textarea, Address, DateControl, DateRange,
         Checkbox, CheckboxGroup, Radio, RadioGroup, Country
       } from '../../../Form'
import { RelativeValidator } from '../../../../validators'

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
      DocumentNumber: props.DocumentNumber,
      CourtName: props.CourtName,
      CourtAddress: props.CourtAddress,
      Document: props.Document,
      ResidenceDocumentNumber: props.ResidenceDocumentNumber,
      Expiration: props.Expiration,
      FirstContact: props.FirstContact,
      LastContact: props.LastContact,
      Methods: props.Methods,
      Frequency: props.Frequency,
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
    this.updateDocumentNumber = this.updateDocumentNumber.bind(this)
    this.updateCourtName = this.updateCourtName.bind(this)
    this.updateCourtAddress = this.updateCourtAddress.bind(this)
    this.updateDocument = this.updateDocument.bind(this)
    this.updateResidenceDocumentNumber = this.updateResidenceDocumentNumber.bind(this)
    this.updateExpiration = this.updateExpiration.bind(this)
    this.updateFirstContact = this.updateFirstContact.bind(this)
    this.updateLastContact = this.updateLastContact.bind(this)
    this.updateMethods = this.updateMethods.bind(this)
    this.updateFrequency = this.updateFrequency.bind(this)
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

  updateFrequency (values) {
    this.onUpdate('Frequency', values)
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

    return (
      <div className="relative-item">
        <h3>{i18n.t('family.relatives.heading.relation')}</h3>
        <CheckboxGroup className="relative-relation"
                       selectedValues={this.state.Relations}>
          <Checkbox name="relation-mother"
                    label={i18n.t('family.relatives.label.relation.mother')}
                    value="Mother"
                    className="relation-mother"
                    onChange={this.updateRelations}
                    />
          <Checkbox name="relation-father"
                    label={i18n.t('family.relatives.label.relation.father')}
                    value="Father"
                    className="relation-father"
                    onChange={this.updateRelations}
                    />
          <Checkbox name="relation-stepmother"
                    label={i18n.t('family.relatives.label.relation.stepmother')}
                    value="Stepmother"
                    className="relation-stepmother"
                    onChange={this.updateRelations}
                    />
          <Checkbox name="relation-stepfather"
                    label={i18n.t('family.relatives.label.relation.stepfather')}
                    value="Stepfather"
                    className="relation-stepfather"
                    onChange={this.updateRelations}
                    />
          <Checkbox name="relation-fosterparent"
                    label={i18n.t('family.relatives.label.relation.fosterparent')}
                    value="Fosterparent"
                    className="relation-fosterparent"
                    onChange={this.updateRelations}
                    />
          <Checkbox name="relation-child"
                    label={i18n.t('family.relatives.label.relation.child')}
                    value="Child"
                    className="relation-child"
                    onChange={this.updateRelations}
                    />
          <Checkbox name="relation-stepchild"
                    label={i18n.t('family.relatives.label.relation.stepchild')}
                    value="Stepchild"
                    className="relation-stepchild"
                    onChange={this.updateRelations}
                    />
          <Checkbox name="relation-brother"
                    label={i18n.t('family.relatives.label.relation.brother')}
                    value="Brother"
                    className="relation-brother"
                    onChange={this.updateRelations}
                    />
          <Checkbox name="relation-sister"
                    label={i18n.t('family.relatives.label.relation.sister')}
                    value="Sister"
                    className="relation-sister"
                    onChange={this.updateRelations}
                    />
          <Checkbox name="relation-stepbrother"
                    label={i18n.t('family.relatives.label.relation.stepbrother')}
                    value="Stepbrother"
                    className="relation-stepbrother"
                    onChange={this.updateRelations}
                    />
          <Checkbox name="relation-stepsister"
                    label={i18n.t('family.relatives.label.relation.stepsister')}
                    value="Stepsister"
                    className="relation-stepsister"
                    onChange={this.updateRelations}
                    />
          <Checkbox name="relation-halfbrother"
                    label={i18n.t('family.relatives.label.relation.halfbrother')}
                    value="Half-brother"
                    className="relation-halfbrother"
                    onChange={this.updateRelations}
                    />
          <Checkbox name="relation-halfsister"
                    label={i18n.t('family.relatives.label.relation.halfsister')}
                    value="Half-sister"
                    className="relation-halfsister"
                    onChange={this.updateRelations}
                    />
          <Checkbox name="relation-fatherinlaw"
                    label={i18n.t('family.relatives.label.relation.fatherinlaw')}
                    value="Father-in-law"
                    className="relation-fatherinlaw"
                    onChange={this.updateRelations}
                    />
          <Checkbox name="relation-montherinlaw"
                    label={i18n.t('family.relatives.label.relation.montherinlaw')}
                    value="Monther-in-law"
                    className="relation-montherinlaw"
                    onChange={this.updateRelations}
                    />
          <Checkbox name="relation-guardian"
                    label={i18n.t('family.relatives.label.relation.guardian')}
                    value="Guardian"
                    className="relation-guardian"
                    onChange={this.updateRelations}
                    />
        </CheckboxGroup>

        <h3>{i18n.t('family.relatives.heading.name')}</h3>
        <Name name="Name"
              className="relative-name"
              {...this.state.Name}
              onUpdate={this.updateName}
              />

        <h3>{i18n.t('family.relatives.heading.birthdate')}</h3>
        <DateControl name="Birthdate"
                     className="relative-birthdate"
                     {...this.state.Birthdate}
                     onUpdate={this.updateBirthdate}
                     />

        <h3>{i18n.t('family.relatives.heading.birthplace')}</h3>
        <Address name="Birthplace"
                 className="relative-birthplace eapp-field-wrap"
                 {...this.state.Birthplace}
                 onUpdate={this.updateBirthplace}
                 />

        <h3>{i18n.t('family.relatives.heading.citizenship')}</h3>
        <Country name="Citizenship"
                 value={this.state.Citizenship.first}
                 className="relative-citizenship"
                 onUpdate={this.updateCitizenship}
                 />

        <Show when={mother}>
          <div>
            <h3>{i18n.t('family.relatives.heading.maiden')}</h3>
            <Text name="MaidenName"
                  className="relative-maidenname"
                  {...this.state.MaidenName}
                  onUpdate={this.updateMaidenName}
                  />
          </div>
        </Show>

        <Show when={immediateFamily}>
          <div>
            <h3>{i18n.t('family.relatives.heading.alias.branch')}</h3>

            <BranchCollection items={this.state.Aliases}
                              branchName="has_alias"
                              className="relative-alias eapp-field-wrap"
                              onUpdate={this.updateAliases}
                              onValidate={this.props.onValidate}>
              <div>
                <h3>{i18n.t('family.relatives.heading.alias.title')}</h3>
                {i18n.m('family.relatives.para.alias')}
                <Name name="Name"
                      className="alias-name"
                      bind={true}
                      />

                <h4>{i18n.t('family.relatives.heading.alias.maiden')}</h4>
                <Branch name="MaidenName"
                        className="alias-maiden"
                        bind={true}>
                </Branch>

                <DateRange name="Dates"
                           className="alias-dates"
                           bind={true}
                           />
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
            <Address name="Address"
                     className="relative-address eapp-field-wrap"
                     {...this.state.Address}
                     onUpdate={this.updateAddress}
                     />
          </div>
        </Show>

        <Show when={validator.requiresCitizenshipDocumentation()}>
          <div>
            <Svg src="img/date-down-arrow.svg" className="more arrow" />

            <h3>{i18n.t('family.relatives.heading.us.title')}</h3>
            <h4>{i18n.t('family.relatives.heading.us.documentation')}</h4>

            {i18n.m('family.relatives.para.abroad')}
            <RadioGroup className="relative-abroad"
                        selectedValue={this.state.Abroad}>
              <Radio name="abroad-fs"
                     label={i18n.t('family.relatives.label.abroad.fs')}
                     value="FS"
                     className="abroad-fs"
                     onChange={this.updateAbroad}
                     />
              <Radio name="abroad-ds"
                     label={i18n.t('family.relatives.label.abroad.ds')}
                     value="DS"
                     className="abroad-ds"
                     onChange={this.updateAbroad}
                     />
            </RadioGroup>

            {i18n.m('family.relatives.para.naturalized')}
            <RadioGroup className="relative-naturalized"
                        selectedValue={this.state.Naturalized}>
              <Radio name="naturalized-alien"
                     label={i18n.t('family.relatives.label.naturalized.alien')}
                     value="Alien"
                     className="naturalized-alien"
                     onChange={this.updateNaturalized}
                     />
              <Radio name="naturalized-permanent"
                     label={i18n.t('family.relatives.label.naturalized.permanent')}
                     value="Permanent"
                     className="naturalized-permanent"
                     onChange={this.updateNaturalized}
                     />
              <Radio name="naturalized-certificate"
                     label={i18n.t('family.relatives.label.naturalized.certificate')}
                     value="Certificate"
                     className="naturalized-certificate"
                     onChange={this.updateNaturalized}
                     />
            </RadioGroup>

            {i18n.m('family.relatives.para.derived')}
            <RadioGroup className="relative-derived"
                        selectedValue={this.state.Derived}>
              <Radio name="derived-alien"
                     label={i18n.t('family.relatives.label.derived.alien')}
                     value="Alien"
                     className="derived-alien"
                     onChange={this.updateDerived}
                     />
              <Radio name="derived-permanent"
                     label={i18n.t('family.relatives.label.derived.permanent')}
                     value="Permanent"
                     className="derived-permanent"
                     onChange={this.updateDerived}
                     />
              <Radio name="derived-certificate"
                     label={i18n.t('family.relatives.label.derived.certificate')}
                     value="Certificate"
                     className="derived-certificate"
                     onChange={this.updateDerived}
                     />
              <Radio name="derived-other"
                     label={i18n.t('family.relatives.label.derived.other')}
                     value="Other"
                     className="derived-other"
                     onChange={this.updateDerived}
                     />
            </RadioGroup>

            <h4>{i18n.t('family.relatives.heading.us.number')}</h4>
            <Text name="DocumentNumber"
                  className="relative-documentnumber"
                  {...this.state.DocumentNumber}
                  onUpdate={this.updateDocumentNumber}
                  />

            <h4>{i18n.t('family.relatives.heading.us.name')}</h4>
            <Text name="CourtName"
                  className="relative-courtname"
                  {...this.state.CourtName}
                  onUpdate={this.updateCourtName}
                  />

            <h4>{i18n.t('family.relatives.heading.us.address')}</h4>
            <Address name="CourtAddress"
                     className="relative-courtaddress eapp-field-wrap"
                     {...this.state.CourtAddress}
                     onUpdate={this.updateCourtAddress}
                     />
          </div>
        </Show>

        <Show when={!validator.citizen() && this.state.IsDeceased === 'No'}>
          <div>
            <Show when={this.state.Address && this.state.Address.addressType === 'United States'}>
              <div>
                <h3>{i18n.t('family.relatives.heading.address.title')}</h3>
                {i18n.t('family.relatives.para.notcitizen')}
                <RadioGroup className="relative-document"
                            selectedValue={this.state.Document}>
                  <Radio name="document-permanent"
                         label={i18n.t('family.relatives.label.document.permanent')}
                         value="Permanent"
                         className="document-permanent"
                         onChange={this.updateDocument}
                         />
                  <Radio name="document-employment"
                         label={i18n.t('family.relatives.label.document.employment')}
                         value="Employment"
                         className="document-employment"
                         onChange={this.updateDocument}
                         />
                  <Radio name="document-arrival"
                         label={i18n.t('family.relatives.label.document.arrival')}
                         value="Arrival"
                         className="document-arrival"
                         onChange={this.updateDocument}
                         />
                  <Radio name="document-visa"
                         label={i18n.t('family.relatives.label.document.visa')}
                         value="Visa"
                         className="document-visa"
                         onChange={this.updateDocument}
                         />
                  <Radio name="document-f1"
                         label={i18n.t('family.relatives.label.document.f1')}
                         value="F1"
                         className="document-f1"
                         onChange={this.updateDocument}
                         />
                  <Radio name="document-j1"
                         label={i18n.t('family.relatives.label.document.j1')}
                         value="J1"
                         className="document-j1"
                         onChange={this.updateDocument}
                         />
                  <Radio name="document-other"
                         label={i18n.t('family.relatives.label.document.other')}
                         value="Other"
                         className="document-other"
                         onChange={this.updateDocument}
                         />
                </RadioGroup>

                <h3>{i18n.t('family.relatives.heading.address.number')}</h3>
                <Text name="ResidenceDocumentNumber"
                      className="relative-residence-documentnumber"
                      {...this.state.ResidenceDocumentNumber}
                      onUpdate={this.updateResidenceDocumentNumber}
                      />

                <h3>{i18n.t('family.relatives.heading.address.expiration')}</h3>
                <DateControl name="Expiration"
                             className="relative-expiration"
                             {...this.state.Expiration}
                             onUpdate={this.updateExpiration}
                             />
              </div>
            </Show>

            <Show when={this.state.Address && this.state.Address.addressType === 'International'}>
              <div>
                <h3>{i18n.t('family.relatives.heading.address.title')}</h3>
                <h3>{i18n.t('family.relatives.heading.address.firstcontact')}</h3>
                <DateControl name="FirstContact"
                             className="relative-first-contact"
                             {...this.state.FirstContact}
                             onUpdate={this.updateFirstContact}
                             />

                <h3>{i18n.t('family.relatives.heading.address.lastcontact')}</h3>
                <DateControl name="LastContact"
                             className="relative-last-contact"
                             {...this.state.LastContact}
                             onUpdate={this.updateLastContact}
                             />

                <h3>{i18n.t('family.relatives.heading.address.methods')}</h3>
                {i18n.m('family.relatives.para.checkall')}
                <CheckboxGroup className="relative-methods"
                               selectedValues={this.state.Methods}>
                  <Checkbox name="methods-inperson"
                            label={i18n.t('family.relatives.label.methods.inperson')}
                            value="In person"
                            className="methods-inperson"
                            onChange={this.updateMethods}
                            />
                  <Checkbox name="methods-telephone"
                            label={i18n.t('family.relatives.label.methods.telephone')}
                            value="Telephone"
                            className="methods-telephone"
                            onChange={this.updateMethods}
                            />
                  <Checkbox name="methods-electronic"
                            label={i18n.t('family.relatives.label.methods.electronic')}
                            value="Electronic"
                            className="methods-electronic"
                            onChange={this.updateMethods}
                            />
                  <Checkbox name="methods-written"
                            label={i18n.t('family.relatives.label.methods.written')}
                            value="Written"
                            className="methods-written"
                            onChange={this.updateMethods}
                            />
                  <Checkbox name="methods-other"
                            label={i18n.t('family.relatives.label.methods.other')}
                            value="Other"
                            className="methods-other"
                            onChange={this.updateMethods}
                            />
                </CheckboxGroup>

                <h3>{i18n.t('family.relatives.heading.address.frequency')}</h3>
                <RadioGroup className="relative-frequency"
                            selectedValue={this.state.Frequency}>
                  <Radio name="frequency-daily"
                         label={i18n.t('family.relatives.label.frequency.daily')}
                         value="Daily"
                         className="frequency-daily"
                         onUpdate={this.updateFrequency}
                         />
                  <Radio name="frequency-weekly"
                         label={i18n.t('family.relatives.label.frequency.weekly')}
                         value="Weekly"
                         className="frequency-weekly"
                         onUpdate={this.updateFrequency}
                         />
                  <Radio name="frequency-monthly"
                         label={i18n.t('family.relatives.label.frequency.monthly')}
                         value="Monthly"
                         className="frequency-monthly"
                         onUpdate={this.updateFrequency}
                         />
                  <Radio name="frequency-quarterly"
                         label={i18n.t('family.relatives.label.frequency.quarterly')}
                         value="Quarterly"
                         className="frequency-quarterly"
                         onUpdate={this.updateFrequency}
                         />
                  <Radio name="frequency-annually"
                         label={i18n.t('family.relatives.label.frequency.annually')}
                         value="Annually"
                         className="frequency-annually"
                         onUpdate={this.updateFrequency}
                         />
                  <Radio name="frequency-other"
                         label={i18n.t('family.relatives.label.frequency.other')}
                         value="Other"
                         className="frequency-other"
                         onUpdate={this.updateFrequency}
                         />
                </RadioGroup>

                <h3>{i18n.t('family.relatives.heading.employer.name')}</h3>
                <Text name="Employer"
                      className="relative-employer"
                      {...this.state.Employer}
                      onUpdate={this.updateEmployer}
                      />

                <h3>{i18n.t('family.relatives.heading.employer.address')}</h3>
                <Address name="EmployerAddress"
                         className="relative-employer-address eapp-field-wrap"
                         {...this.state.EmployerAddress}
                         onUpdate={this.updateEmployerAddress}
                         />

                <h3>{i18n.t('family.relatives.heading.employer.affiliated')}</h3>
                <Branch name="has_affiliation"
                        className="eapp-field-wrap no-label relative-affiliation"
                        value={this.state.HasAffiliation}
                        help="family.relatives.help.affiliation"
                        onUpdate={this.updateHasAffiliation}
                        onValidate={this.props.onValidate}>
                </Branch>
                <Show when={this.state.HasAffiliation === 'Yes'}>
                  <div>
                    <h3>{i18n.t('family.relatives.heading.employer.relationship')}</h3>
                    <Textarea name="EmployerRelationship"
                              className="relative-employer-relationship"
                              {...this.state.EmployerRelationship}
                              onUpdate={this.updateEmployerRelationship}
                              />
                  </div>
                </Show>
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
  DocumentNumber: {},
  CourtName: {},
  CourtAddress: {},
  Document: '',
  ResidenceDocumentNumber: {},
  Expiration: {},
  FirstContact: {},
  LastContact: {},
  Methods: [],
  Frequency: '',
  Employer: {},
  EmployerAddress: {},
  HasAffiliation: '',
  EmployerRelationship: {}
}
