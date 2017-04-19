import React from 'react'
import { i18n } from '../../../../config'
import { Accordion, Address, Branch, Field, DateControl, ValidationElement, Show, NotApplicable, Email, Telephone, Name, BirthPlace, ForeignBornDocuments, SSN, MaidenName, DateRange } from '../../../Form'
import Divorce from './Divorce'
import { CivilUnionValidator } from '../../../../validators'

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
      OtherNameNotApplicable: props.OtherNameNotApplicable,
      DatesUsed: props.DatesUsed,
      EnteredCivilUnion: props.EnteredCivilUnion,
      Address: props.Address,
      Telephone: props.Telephone,
      Email: props.Email,
      Separated: props.Separated,
      DateSeparated: props.DateSeparated,
      AddressSeparated: props.AddressSeparated,
      AddressSeparatedNotApplicable: props.AddressSeparatedNotApplicable,
      Divorced: props.Divorced,
      DivorcedList: props.DivorcedList,
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
    this.updateOtherNameNotApplicable = this.updateOtherNameNotApplicable.bind(this)
    this.updateDatesUsed = this.updateDatesUsed.bind(this)
    this.updateEnteredCivilUnion = this.updateEnteredCivilUnion.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateTelephone = this.updateTelephone.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
    this.updateSeparated = this.updateSeparated.bind(this)
    this.updateDateSeparated = this.updateDateSeparated.bind(this)
    this.updateAddressSeparated = this.updateAddressSeparated.bind(this)
    this.updateAddressSeparatedNotApplicable = this.updateAddressSeparatedNotApplicable.bind(this)
    this.updateDivorced = this.updateDivorced.bind(this)
    this.updateDivorcedList = this.updateDivorcedList.bind(this)
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
          OtherNameNotApplicable: this.state.OtherNameNotApplicable,
          DatesUsed: this.state.DatesUsed,
          EnteredCivilUnion: this.state.EnteredCivilUnion,
          Address: this.state.Address,
          Telephone: this.state.Telephone,
          Email: this.state.Email,
          Separated: this.state.Separated,
          DateSeparated: this.state.DateSeparated,
          AddressSeparated: this.state.AddressSeparated,
          AddressSeparatedNotApplicable: this.state.AddressSeparatedNotApplicable,
          Divorced: this.state.Divorced,
          DivorcedList: this.state.DivorcedList
        })
      }
    })
  }

  isValid () {
    return new CivilUnionValidator(this.state).isValid()
  }

  updateName (values) {
    this.update('Name', values)
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

  updateOtherNameNotApplicable (value) {
    this.update('OtherNameNotApplicable', value.applicable)
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

  updateAddressSeparatedNotApplicable (values) {
    this.update('AddressSeparatedNotApplicable', !values.applicable)
  }

  updateDivorced (values) {
    this.update('Divorced', values)
  }

  updateDivorcedList (values) {
    this.update('DivorcedList', values)
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

  divorceSummary (item, index) {
    const itemType = i18n.t('relationships.status.divorce.collection.itemType')
    const o = (item || {}).Divorce || {}
    const date = (o.DateDivorced || {}).date ? `${o.DateDivorced.month}/${o.DateDivorced.year}` : ''
    const status = o.Status || ''
    const name = o.Name
      ? `${o.Name.first || ''} ${o.Name.middle || ''} ${o.Name.last || ''}`.trim()
      : i18n.t('relationships.relatives.collection.summary.unknown')
    return (
      <span>
        <span className="index">{itemType}</span>
        <span className="info"><strong>{name} {date} {status}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="civil-union">
          <div>
            <p>{i18n.t('relationships.status.para.never')}</p>

            <Field title={i18n.t('relationships.status.heading.name')}
              adjustFor="labels">
              <Name name="Name"
                className="civil"
                {...this.state.Name}
                onUpdate={this.updateName}
                onValidate={this.handleValidation}
              />
            </Field>

            <Field help="relationships.status.help.birthdate"
              title={i18n.t('relationships.status.heading.birthdate')}
              shrink={true}
              adjustFor="labels">
              <DateControl name="birthdate"
                className="birthdate"
                {...this.state.Birthdate}
                onUpdate={this.updateBirthdate}
                onValidate={this.handleValidation}
              />
            </Field>

            <Field help="relationships.status.help.birthplace"
              title={i18n.t('relationships.status.heading.birthplace')}>
              <BirthPlace name="birthplace"
                className="birthplace"
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
                {...this.state.SSN}
                onUpdate={this.updateSSN}
                onValidate={this.handleValidation}
              />
            </Field>

            <Field help="relationships.status.help.othernames"
              className="othername"
              title={i18n.t('relationships.status.heading.othernames')}>
              <p>{i18n.t('relationships.status.para.othernames')}</p>
              <NotApplicable name="OtherNameNotApplicable"
                applicable={this.state.OtherNameNotApplicable}
                label={i18n.t('reference.label.idk')}
                or={i18n.m('reference.para.or')}
                onUpdate={this.updateOtherNameNotApplicable}>
                <Name name="othername"
                  value={this.state.Othername}
                  onUpdate={this.updateOtherName}
                  onValidate={this.handleValidation}
                />
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
                    className="datesused"
                    {...this.DatesUsed}
                    onUpdate={this.updateDatesUsed}
                    onValidate={this.handleValidation}
                  />
                </Field>
              </NotApplicable>
            </Field>

            <Field title={i18n.t('relationships.status.heading.enteredCivilUnion')}>
              <DateControl name="enteredCivilUnion"
                className="entered"
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
                    className="dateseparated"
                    {...this.state.DateSeparated}
                    onUpdate={this.updateDateSeparated}
                    onValidate={this.props.onValidate}
                  />
                </Field>

                <Field title={i18n.t('relationships.status.heading.addressSeparated')}
                  adjustFor="address"
                  className="address-separated"
                  help="alias.used.help">
                  <NotApplicable name="OtherNameNotApplicable"
                    applicable={this.state.AddressSeparatedNotApplicable}
                    label={i18n.t('reference.label.idk')}
                    or={i18n.m('reference.para.or')}
                    onUpdate={this.updateAddressSeparatedNotApplicable}>
                    <Address name="addressSeparated"
                      {...this.state.AddressSeparated}
                      onUpdate={this.updateAddressSeparated}
                      onValidate={this.props.onValidate}
                    />
                  </NotApplicable>
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
                summary={this.divorceSummary}
                onValidate={this.handleValidation}
                description={i18n.t('relationships.status.divorce.collection.description')}
                appendTitle={i18n.t('relationships.status.divorce.collection.appendTitle')}
                appendMessage={i18n.m('relationships.status.divorce.collection.appendMessage')}
                appendLabel={i18n.t('relationships.status.divorce.collection.appendLabel')}>
                <Divorce name="Divorce"
                  bind={true}
                />
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

