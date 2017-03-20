import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Show, Svg, BranchCollection,
         Name, Text, Textarea, Address, DateControl, DateRange,
         Checkbox, CheckboxGroup, Radio, RadioGroup
       } from '../../../Form'

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
      Citizen: props.Citizen,
      MaidenName: props.MaidenName,
      HasAlias: props.HasAlias,
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
      EmployerRelationship: props.EmployerRelationship,
      errorCodes: []
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateRelations = this.updateRelations.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateBirthdate = this.updateBirthdate.bind(this)
    this.updateBirthplace = this.updateBirthplace.bind(this)
    this.updateCitizen = this.updateCitizen.bind(this)
    this.updateMaidenName = this.updateMaidenName.bind(this)
    this.updateHasAlias = this.updateHasAlias.bind(this)
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

  updateRelations (values) {
    this.onUpdate('Relations', values)
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

  updateCitizen (values) {
    this.onUpdate('Citizen', values)
  }

  updateMaidenName (values) {
    this.onUpdate('MaidenName', values)
  }

  updateHasAlias (values) {
    this.onUpdate('HasAlias', values)
  }

  updateIsDeceased (values) {
    this.onUpdate('IsDeceased', values)
  }

  updateAddress (values) {
    this.onUpdate('Address', values)
  }

  updateAbroad (values) {
    this.onUpdate('Abroad', values)
  }

  updateNaturalized (values) {
    this.onUpdate('Naturalized', values)
  }

  updateDerived (values) {
    this.onUpdate('Derived', values)
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

  updateDocument (values) {
    this.onUpdate('Document', values)
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

  updateMethods (values) {
    this.onUpdate('Methods', values)
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

  updateEmployerRelationship (values) {
    this.onUpdate('EmployerRelationship', values)
  }

  needCitizenshipDocumentation () {
    const relations = ['Father', 'Mother', 'Child', 'Stepchild', 'Brother', 'Sister', 'Half-brother', 'Half-sister', 'Stepbrother', 'Stepsister', 'Stepmother', 'Stepfather']
    if (this.state.Relations && this.state.Relations.some(x => relations.includes(x)) && this.state.Citizen && this.state.Birthplace.type === 'international' && this.state.IsDeceased === 'Yes') {
      return true
    }

    if (this.state.Address && this.state.Address.type === 'domestic' && this.state.Birthplace.type === 'international' && this.state.Citizen) {
      return true
    }

    if (this.state.Address && this.state.Address.type === 'apofpo' && this.state.Birthplace.type === 'international' && this.state.Citizen) {
      return true
    }

    if (this.state.Birthplace && this.state.Birthplace.type === 'international' && this.state.Citizen) {
      return true
    }

    return false
  }

  render () {
    return (
      <div className="relative-item">
        <h3>{i18n.t('family.relatives.heading.relation')}</h3>
        <CheckboxGroup className=""
                       selectedValues={this.state.Relations}>
          <Checkbox name="relation-mother"
                    label={i18n.t('family.relatives.label.relation.mother')}
                    value="Mother"
                    className="relation-mother"
                    />
          <Checkbox name="relation-father"
                    label={i18n.t('family.relatives.label.relation.father')}
                    value="Father"
                    className="relation-father"
                    />
          <Checkbox name="relation-stepmother"
                    label={i18n.t('family.relatives.label.relation.stepmother')}
                    value="Stepmother"
                    className="relation-stepmother"
                    />
          <Checkbox name="relation-stepfather"
                    label={i18n.t('family.relatives.label.relation.stepfather')}
                    value="Stepfather"
                    className="relation-stepfather"
                    />
          <Checkbox name="relation-fosterparent"
                    label={i18n.t('family.relatives.label.relation.fosterparent')}
                    value="Fosterparent"
                    className="relation-fosterparent"
                    />
          <Checkbox name="relation-child"
                    label={i18n.t('family.relatives.label.relation.child')}
                    value="Child"
                    className="relation-child"
                    />
          <Checkbox name="relation-stepchild"
                    label={i18n.t('family.relatives.label.relation.stepchild')}
                    value="Stepchild"
                    className="relation-stepchild"
                    />
          <Checkbox name="relation-brother"
                    label={i18n.t('family.relatives.label.relation.brother')}
                    value="Brother"
                    className="relation-brother"
                    />
          <Checkbox name="relation-sister"
                    label={i18n.t('family.relatives.label.relation.sister')}
                    value="Sister"
                    className="relation-sister"
                    />
          <Checkbox name="relation-stepbrother"
                    label={i18n.t('family.relatives.label.relation.stepbrother')}
                    value="Stepbrother"
                    className="relation-stepbrother"
                    />
          <Checkbox name="relation-stepsister"
                    label={i18n.t('family.relatives.label.relation.stepsister')}
                    value="Stepsister"
                    className="relation-stepsister"
                    />
          <Checkbox name="relation-halfbrother"
                    label={i18n.t('family.relatives.label.relation.halfbrother')}
                    value="Half-brother"
                    className="relation-halfbrother"
                    />
          <Checkbox name="relation-halfsister"
                    label={i18n.t('family.relatives.label.relation.halfsister')}
                    value="Half-sister"
                    className="relation-halfsister"
                    />
          <Checkbox name="relation-fatherinlaw"
                    label={i18n.t('family.relatives.label.relation.fatherinlaw')}
                    value="Father-in-law"
                    className="relation-fatherinlaw"
                    />
          <Checkbox name="relation-montherinlaw"
                    label={i18n.t('family.relatives.label.relation.montherinlaw')}
                    value="Monther-in-law"
                    className="relation-montherinlaw"
                    />
          <Checkbox name="relation-guardian"
                    label={i18n.t('family.relatives.label.relation.guardian')}
                    value="Guardian"
                    className="relation-guardian"
                    />
        </CheckboxGroup>

        <h3>{i18n.t('family.relatives.heading.name')}</h3>
        <Name name="Name"
              {...this.state.Name}
              />

        <h3>{i18n.t('family.relatives.heading.birthdate')}</h3>
        <DateControl name="Birthdate"
                     {...this.state.Birthdate}
                     />

        <h3>{i18n.t('family.relatives.heading.birthplace')}</h3>
        <Address name="Birthplace"
                 {...this.state.Birthplace}
                 />

        <h3>{i18n.t('family.relatives.heading.citizenship')}</h3>

        <Show when={this.state.Relations.some(x => x === 'Maiden')}>
          <div>
            <h3>{i18n.t('family.relatives.heading.maiden')}</h3>
            <Text name="MaidenName"
                  {...this.state.MaidenName}
                  />
          </div>
        </Show>

        <Show when={this.state.Relations.some(x => ['Father', 'Mother', 'Child', 'Stepchild', 'Brother', 'Sister', 'Half-brother', 'Half-sister', 'Stepbrother', 'Stepsister', 'Stepmother', 'Stepfather'].includes(x))}>
          <div>
            <h3>{i18n.t('family.relatives.heading.alias.branch')}</h3>

            <BranchCollection items={this.props.List}
                              branchName="has_alias"
                              onUpdate={this.updateAliases}
                              onValidate={this.props.onValidate}>
              <div>
                <h3>{i18n.t('family.relatives.heading.alias.title')}</h3>
                {i18n.m('family.relatives.para.alias')}
                <Name name="Alias"
                      {...this.state.Alias}
                      bind={true}
                      />

                <h4>{i18n.t('family.relatives.heading.alias.maiden')}</h4>
                <Branch name="MaidenName"
                        bind={true}>
                </Branch>

                <DateRange name="Dates"
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
                     {...this.state.Address}
                     />
          </div>
        </Show>

        <Show when={this.needCitizenshipDocumentation()}>
          <div>
            <Svg src="img/date-down-arrow.svg" className="more arrow" />

            <h3>{i18n.t('family.relatives.heading.us.title')}</h3>
            <h4>{i18n.t('family.relatives.heading.us.documentation')}</h4>

            {i18n.m('family.relatives.para.abroad')}
            <RadioGroup className=""
                        selectedValue={this.state.Abroad}>
              <Radio name="abroad-fs"
                     label={i18n.t('family.relatives.label.abroad.fs')}
                     value="FS"
                     className="abroad-fs"
                     />
              <Radio name="abroad-ds"
                     label={i18n.t('family.relatives.label.abroad.ds')}
                     value="DS"
                     className="abroad-ds"
                     />
            </RadioGroup>

            {i18n.m('family.relatives.para.naturalized')}
            <RadioGroup className=""
                        selectedValue={this.state.Naturalized}>
              <Radio name="naturalized-alien"
                     label={i18n.t('family.relatives.label.naturalized.alien')}
                     value="Alien"
                     className="naturalized-alien"
                     />
              <Radio name="naturalized-permanent"
                     label={i18n.t('family.relatives.label.naturalized.permanent')}
                     value="Permanent"
                     className="naturalized-permanent"
                     />
              <Radio name="naturalized-certificate"
                     label={i18n.t('family.relatives.label.naturalized.certificate')}
                     value="Certificate"
                     className="naturalized-certificate"
                     />
            </RadioGroup>

            {i18n.m('family.relatives.para.derived')}
            <RadioGroup className=""
                        selectedValue={this.state.Derived}>
              <Radio name="derived-alien"
                     label={i18n.t('family.relatives.label.derived.alien')}
                     value="Alien"
                     className="derived-alien"
                     />
              <Radio name="derived-permanent"
                     label={i18n.t('family.relatives.label.derived.permanent')}
                     value="Permanent"
                     className="derived-permanent"
                     />
              <Radio name="derived-certificate"
                     label={i18n.t('family.relatives.label.derived.certificate')}
                     value="Certificate"
                     className="derived-certificate"
                     />
              <Radio name="derived-other"
                     label={i18n.t('family.relatives.label.derived.other')}
                     value="Other"
                     className="derived-other"
                     />
            </RadioGroup>

            <h4>{i18n.t('family.relatives.heading.us.number')}</h4>
            <Text name="DocumentNumber"
                  {...this.state.DocumentNumber}
                  />

            <h4>{i18n.t('family.relatives.heading.us.name')}</h4>
            <Text name="CourtName"
                  {...this.state.CourtName}
                  />

            <h4>{i18n.t('family.relatives.heading.us.address')}</h4>
            <Address name="CourtAddress"
                     {...this.state.CourtAddress}
                     />
          </div>
        </Show>

        <Show when={!this.state.Citizen && this.state.IsDeceased === 'No'}>
          <div>
            <Show when={this.state.Address && this.state.Address.type === 'domestic'}>
              <h3>{i18n.t('family.relatives.heading.address.title')}</h3>
              {i18n.t('family.relatives.para.notcitizen')}
              <RadioGroup className=""
                          selectedValue={this.state.Document}>
                <Radio name="document-permanent"
                       label={i18n.t('family.relatives.label.document.permanent')}
                       value="Permanent"
                       className="document-permanent"
                       />
                <Radio name="document-employment"
                       label={i18n.t('family.relatives.label.document.employment')}
                       value="Employment"
                       className="document-employment"
                       />
                <Radio name="document-arrival"
                       label={i18n.t('family.relatives.label.document.arrival')}
                       value="Arrival"
                       className="document-arrival"
                       />
                <Radio name="document-visa"
                       label={i18n.t('family.relatives.label.document.visa')}
                       value="Visa"
                       className="document-visa"
                       />
                <Radio name="document-f1"
                       label={i18n.t('family.relatives.label.document.f1')}
                       value="F1"
                       className="document-f1"
                       />
                <Radio name="document-j1"
                       label={i18n.t('family.relatives.label.document.j1')}
                       value="J1"
                       className="document-j1"
                       />
                <Radio name="document-other"
                       label={i18n.t('family.relatives.label.document.other')}
                       value="Other"
                       className="document-other"
                       />
              </RadioGroup>

              <h3>{i18n.t('family.relatives.heading.address.number')}</h3>
              <Text name="ResidenceDocumentNumber"
                    {...this.state.ResidenceDocumentNumber}
                    />

              <h3>{i18n.t('family.relatives.heading.address.expiration')}</h3>
              <DateControl name="Expiration"
                           {...this.state.Expiration}
                           />
            </Show>

            <Show when={this.state.Address && this.state.Address.type === 'international'}>
              <h3>{i18n.t('family.relatives.heading.address.title')}</h3>
              <h3>{i18n.t('family.relatives.heading.address.firstcontact')}</h3>
              <DateControl name="FirstContact"
                           {...this.state.FirstContact}
                           />

              <h3>{i18n.t('family.relatives.heading.address.lastcontact')}</h3>
              <DateControl name="LastContact"
                           {...this.state.LastContact}
                           />

              <h3>{i18n.t('family.relatives.heading.address.methods')}</h3>
              {i18n.m('family.relatives.para.checkall')}
              <CheckboxGroup className=""
                             selectedValues={this.state.Methods}>
                <Checkbox name="methods-inperson"
                          label={i18n.t('family.relatives.label.methods.inperson')}
                          value="In person"
                          className="methods-inperson"
                          />
                <Checkbox name="methods-telephone"
                          label={i18n.t('family.relatives.label.methods.telephone')}
                          value="Telephone"
                          className="methods-telephone"
                          />
                <Checkbox name="methods-electronic"
                          label={i18n.t('family.relatives.label.methods.electronic')}
                          value="Electronic"
                          className="methods-electronic"
                          />
                <Checkbox name="methods-written"
                          label={i18n.t('family.relatives.label.methods.written')}
                          value="Written"
                          className="methods-written"
                          />
                <Checkbox name="methods-other"
                          label={i18n.t('family.relatives.label.methods.other')}
                          value="Other"
                          className="methods-other"
                          />
              </CheckboxGroup>

              <h3>{i18n.t('family.relatives.heading.address.frequency')}</h3>
              <RadioGroup className=""
                          selectedValue={this.state.Frequency}>
                <Radio name="frequency-daily"
                       label={i18n.t('family.relatives.label.frequency.daily')}
                       value="Daily"
                       className="frequency-daily"
                       />
                <Radio name="frequency-weekly"
                       label={i18n.t('family.relatives.label.frequency.weekly')}
                       value="Weekly"
                       className="frequency-weekly"
                       />
                <Radio name="frequency-monthly"
                       label={i18n.t('family.relatives.label.frequency.monthly')}
                       value="Monthly"
                       className="frequency-monthly"
                       />
                <Radio name="frequency-quarterly"
                       label={i18n.t('family.relatives.label.frequency.quarterly')}
                       value="Quarterly"
                       className="frequency-quarterly"
                       />
                <Radio name="frequency-annually"
                       label={i18n.t('family.relatives.label.frequency.annually')}
                       value="Annually"
                       className="frequency-annually"
                       />
                <Radio name="frequency-other"
                       label={i18n.t('family.relatives.label.frequency.other')}
                       value="Other"
                       className="frequency-other"
                       />
                <Radio name="frequency-daily"
                       label={i18n.t('family.relatives.label.frequency.daily')}
                       value="daily"
                       className="frequency-daily"
                       />
              </RadioGroup>

              <h3>{i18n.t('family.relatives.heading.employer.name')}</h3>
              <Text name="Employer"
                    {...this.state.Employer}
                    />

              <h3>{i18n.t('family.relatives.heading.employer.address')}</h3>
              <Address name="EmployerAddress"
                       {...this.state.EmployerAddress}
                       />

              <h3>{i18n.t('family.relatives.heading.employer.affiliated')}</h3>
              <Branch name="has_affiliation"
                      className="eapp-field-wrap no-label foreign-affiliation"
                      value={this.state.HasAffiliation}
                      help="family.relatives.help.affiliation"
                      onUpdate={this.updateHasAffiliation}
                      onValidate={this.props.onValidate}>
              </Branch>
              <Show when={this.state.HasAffiliation}>
                <div>
                  <h3>{i18n.t('family.relatives.heading.employer.relationship')}</h3>
                  <Textarea name="EmployerRelationship"
                            {...this.state.EmployerRelationship}
                            />
                </div>
              </Show>

            </Show>
          </div>
        </Show>
      </div>
    )
  }
}

Relative.defaultProp = {
  Relations: [],
  Name: {},
  Birthdate: {},
  Birthplace: {},
  Citizen: {},
  MaidenName: '',
  HasAlias: '',
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
  EmployerRelationship: {}
}
