import React from 'react'
import { i18n } from '../../../../config'
import { Accordion, Address, Branch, Field, DateControl, ValidationElement, Show, RadioGroup, Radio, Email, Telephone, Name, BirthPlace, ForeignBornDocuments, SSN, MaidenName, DateRange } from '../../../Form'
import EndedDetails from './EndedDetails'

export default class CivilUnion extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      Name: props.Name,
      Birthdate: props.Birthdate,
      BirthPlace: props.BirthPlace,
      ForeignBornDocument: props.ForeignBornDocument,
      SSN: props.SSN,
      OtherName: props.OtherName,
      OtherNameMaiden: props.OtherNameMaiden,
      DatesUsed: props.DatesUsed,
      EnteredCivilUnion: props.EnteredCivilUnion,
      Address: props.Address,
      Telephone: props.Telephone,
      Email: props.Email,
      Separated: props.Separated,
      DateSeparated: props.DateSeparated,
      AddressSeparated: props.AddressSeparated,
      Divorced: props.Divorced,
      DivorcedList: props.DivorcedList,
      HasCohabitant: props.HasCohabitant,
      CohabitantList: props.CohabitantList,
      errorCodes: []
    }

    this.update = this.update.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateBirthdate = this.updateBirthdate.bind(this)
    this.updateBirthPlace = this.updateBirthPlace.bind(this)
    this.updateForeignBornDocument = this.updateForeignBornDocument.bind(this)
    this.updateSSN = this.updateSSN.bind(this)
    this.updateOtherName = this.updateOtherName.bind(this)
    this.updateOtherNameMaiden = this.updateOtherNameMaiden.bind(this)
    this.updateDatesUsed = this.updateDatesUsed.bind(this)
    this.updateEnteredCivilUnion = this.updateEnteredCivilUnion.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateTelephone = this.updateTelephone.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
    this.updateSeparated = this.updateSeparated.bind(this)
    this.updateDateSeparated = this.updateDateSeparated.bind(this)
    this.updateAddressSeparated = this.updateAddressSeparated.bind(this)
    this.updateDivorced = this.updateDivorced.bind(this)
    this.updateDivorcedList = this.updateDivorcedList.bind(this)
    this.updateHasCohabitant = this.updateHasCohabitant.bind(this)
  }

  update (field, values) {
    this.setState({[field]: values}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          Name: this.state.Name,
          Birthdate: this.state.Birthdate,
          BirthPlace: this.state.BirthPlace,
          ForeignBornDocument: this.state.ForeignBornDocument,
          SSN: this.state.SSN,
          OtherName: this.state.OtherName,
          OtherNameMaiden: this.state.OtherNameMaiden,
          DatesUsed: this.state.DatesUsed,
          EnteredCivilUnion: this.state.EnteredCivilUnion,
          Address: this.state.Address,
          Telephone: this.state.Telephone,
          Email: this.state.Email,
          Separated: this.state.Separated,
          DateSeparated: this.state.DateSeparated,
          AddressSeparated: this.state.AddressSeparated,
          Divorced: this.state.Divorced,
          DivorcedList: this.state.DivorcedList
        })
      }
    })
  }

  isValid () {
    return true
  }

  updateName (values) {
    this.update('Name', values)
  }

  updateStatus (values) {
    this.update('Status', values.target.value)
  }

  updateBirthdate (values) {
    this.update('Birthdate', values)
  }

  updateBirthPlace (values) {
    this.update('BirthPlace', values)
  }

  updateForeignBornDocument (values) {
    this.update('ForeignBornDocument', values)
  }

  updateSSN (values) {
    this.update('SSN', values)
  }

  updateOtherName (values) {
    this.update('OtherName', values)
  }

  updateOtherNameMaiden (values) {
    this.update('OtherNameMaiden', values)
  }

  updateDatesUsed (values) {
    this.update('DatesUsed', values)
  }

  updateEnteredCivilUnion (values) {
    this.update('EnteredCivilUnion', values)
  }

  updateAddress (values) {
    this.update('Address', values)
  }

  updateTelephone (values) {
    this.update('Telephone', values)
  }

  updateEmail (values) {
    this.update('Email', values)
  }

  updateSeparated (values) {
    this.update('Separated', values)
  }

  updateDateSeparated (values) {
    this.update('DateSeparated', values)
  }

  updateAddressSeparated (values) {
    this.update('AddressSeparated', values)
  }

  updateDivorced (values) {
    this.update('Divorced', values)
  }

  updateDivorcedList (values) {
    this.update('DivorcedList', values)
  }

  updateHasCohabitant (values) {
    this.update('HasCohabitant', values)
  }

  updateCohabitantList (values) {
    this.update('CohabitantList', values)
  }

  handleValidation (event, status, error) {
    if (!event) {
      return
    }

    let codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.isValid()) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      const errorObject = { [this.props.name]: codes }
      const statusObject = { [this.props.name]: { status: complexStatus } }
      super.handleValidation(event, statusObject, errorObject)
    })
  }

  render () {
    return (
      <div className="relationship-status">
          <div>
            <p>{i18n.t('relationships.status.para.never')}</p>

            <Field title={i18n.t('relationships.status.heading.name')}
              adjustFor="labels">
              <Name name="Name"
                {...this.state.Name}
                onUpdate={this.updateName}
              />
            </Field>

            <Field help="relationships.status.help.birthdate"
              title={i18n.t('relationships.status.heading.birthdate')}
              shrink={true}
              adjustFor="labels">
              <DateControl name="birthdate"
                {...this.state.Birthdate}
                onUpdate={this.updateBirthdate}
                onValidate={this.handleValidation}
              />
            </Field>

            <Field help="relationships.status.help.birthplace"
              title={i18n.t('relationships.status.heading.birthplace')}
            >
              <BirthPlace name="birthplace"
                {...this.state.BirthPlace}
                onUpdate={this.updateBirthPlace}
                onValidate={this.handleValidation}
              />
            </Field>

            <Field help="relationships.status.help.foreignBornDocument"
              title={i18n.t('relationships.status.heading.foreignBornDocument')}>
              <ForeignBornDocuments name="foreignBornDocument"
                {...this.state.ForeignBornDocument}
                onUpdate={this.updateForeignBornDocument}
                onValidate={this.handleValidation}
              />
            </Field>

            <Field help="relationships.status.help.ssn"
              title={i18n.t('relationships.status.heading.ssn')}>
              <SSN name="ssn"
                value={this.state.SSN}
                onUpdate={this.updateSSN}
                onValidate={this.handleValidation}
              />
            </Field>

            <Field help="relationships.status.help.othernames"
              title={i18n.t('relationships.status.heading.othernames')}>
              <p>{i18n.t('relationships.status.para.othernames')}</p>
              <Name name="othername"
                value={this.state.Othername}
                onUpdate={this.updateOtherName}
                onValidate={this.handleValidation}
              />
            </Field>

            <Field title={i18n.t('relationships.status.othernames.heading.maiden')}
              help="alias.maiden.help"
              adjustFor="buttons"
              shrink={true}>
              <MaidenName name="MaidenName"
                {...this.OtherNameMaiden}
                onUpdate={this.updateOtherNameMaiden}
                onValidate={this.handleValidation}
              />
            </Field>

            <Field title={i18n.t('relationships.status.othernames.heading.used')}
              help="alias.used.help"
              adjustFor="daterange"
              shrink={true}>
              <DateRange name="DatesUsed"
                {...this.DatesUsed}
                onUpdate={this.updateDatesUsed}
                onValidate={this.handleValidation}
              />
            </Field>

            <Field title={i18n.t('relationships.status.heading.enteredCivilUnion')}>
              <DateControl name="enteredCivilUnion"
                {...this.state.EnteredCivilUnion}
                onUpdate={this.updateEnteredCivilUnion}
                onValidate={this.handleValidation}
              />
            </Field>

            <Field title={i18n.t('relationships.status.heading.address')}
              help="alias.used.help"
              adjustFor="address"
              shrink={true}>
              <Address name="Address"
                {...this.state.Address}
                onUpdate={this.updateAddress}
                onValidate={this.handleValidation}
              />
            </Field>

            <Field title={i18n.t('relationships.status.heading.telephone')}
              help="alias.used.help"
              adjustFor="telephone"
              shrink={true}>
              <Telephone name="Telephone"
                {...this.state.Telephone}
                onUpdate={this.updateTelephone}
                onValidate={this.handleValidation}
              />
            </Field>

            <Field title={i18n.t('relationships.status.heading.email')}
              help="alias.used.help"
              adjustFor="email">
              <Email name="Email"
                {...this.state.Email}
                onUpdate={this.updateEmail}
                onValidate={this.handleValidation}
              />
            </Field>

            <Field title={i18n.t('relationships.status.heading.separated')}>
              <Branch name="separated"
                className="separated"
                value={this.state.Separated}
                help="relationships.status.heading.separated"
                onUpdate={this.updateSeparated}
                onValidate={this.props.onValidate}>
              </Branch>
            </Field>

            <Show when={this.state.Separated === 'Yes'}>
              <div>
                <Field title={i18n.t('relationships.status.heading.dateSeparated')}
                  help="alias.used.help">
                  <DateControl name="DateSeparated"
                    {...this.state.DateSeparated}
                    onUpdate={this.updateDateSeparated}
                    onValidate={this.props.onValidate}
                  />
                </Field>

                <Field title={i18n.t('relationships.status.heading.addressSeparated')}
                  adjustFor="address"
                  help="alias.used.help">
                  <Address name="addressSeparated"
                    {...this.state.AddressSeparated}
                    onUpdate={this.updateAddressSeparated}
                    onValidate={this.props.onValidate}
                  />
                </Field>
              </div>
            </Show>
            <Field title={i18n.t('relationships.status.heading.divorced')}>
              <Branch name="divorced"
                className="divorced"
                value={this.state.Divorced}
                help="relationships.status.heading.divorced"
                onUpdate={this.updateDivorced}
                onValidate={this.props.onValidate}>
              </Branch>
            </Field>

            <Show when={this.state.Divorced === 'Yes'}>
              <Accordion minimum="1"
                items={this.state.DivorcedList}
                onUpdate={this.updateDivorcedList}
                summary={() => { return <span>Hello</span> }}
                onValidate={this.handleValidation}
                description={i18n.t('psychological.competence.collection.description')}
                appendTitle={i18n.t('psychological.competence.collection.appendTitle')}
                appendMessage={i18n.m('psychological.competence.collection.appendMessage')}
                appendLabel={i18n.t('psychological.competence.collection.appendLabel')}>
                <EndedDetails Name="Details" />
              </Accordion>
            </Show>
          </div>
      </div>
    )
  }
}

CivilUnion.defaultProps = {
  List: []
}

