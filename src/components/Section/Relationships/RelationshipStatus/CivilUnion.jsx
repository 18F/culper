import React from 'react'
import { i18n } from '../../../../config'
import { Address, Branch, Field, DateControl, ValidationElement, Show, NotApplicable,
         Email, Telephone, Name, ForeignBornDocuments, SSN, MaidenName, DateRange,
         Checkbox, Country, Location } from '../../../Form'

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
      Citizenship: props.Citizenship,
      EnteredCivilUnion: props.EnteredCivilUnion,
      Address: props.Address,
      Telephone: props.Telephone,
      Email: props.Email,
      Separated: props.Separated,
      DateSeparated: props.DateSeparated,
      AddressSeparated: props.AddressSeparated,
      AddressSeparatedNotApplicable: props.AddressSeparatedNotApplicable,
      Divorced: props.Divorced,
      UseCurrentAddress: props.UseCurrentAddress
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
    this.updateCitizenship = this.updateCitizenship.bind(this)
    this.updateEnteredCivilUnion = this.updateEnteredCivilUnion.bind(this)
    this.updateLocation = this.updateLocation.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateTelephone = this.updateTelephone.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
    this.updateSeparated = this.updateSeparated.bind(this)
    this.updateDateSeparated = this.updateDateSeparated.bind(this)
    this.updateAddressSeparated = this.updateAddressSeparated.bind(this)
    this.updateAddressSeparatedNotApplicable = this.updateAddressSeparatedNotApplicable.bind(this)
    this.updateDivorced = this.updateDivorced.bind(this)
    this.updateUseCurrentAddress = this.updateUseCurrentAddress.bind(this)
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
          Citizenship: this.state.Citizenship,
          EnteredCivilUnion: this.state.EnteredCivilUnion,
          Address: this.state.Address,
          Telephone: this.state.Telephone,
          Email: this.state.Email,
          Separated: this.state.Separated,
          DateSeparated: this.state.DateSeparated,
          AddressSeparated: this.state.AddressSeparated,
          AddressSeparatedNotApplicable: this.state.AddressSeparatedNotApplicable,
          Divorced: this.state.Divorced,
          DivorcedList: this.state.DivorcedList,
          DivorcedListBranch: this.state.DivorcedListBranch,
          UseCurrentAddress: this.state.UseCurrentAddress
        })
      }
    })
  }

  updateName (values) {
    this.update('Name', values)
    if (this.props.onSpouseUpdate) {
      this.props.onSpouseUpdate(values)
    }
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

  updateCitizenship (values) {
    this.update('Citizenship', values)
  }

  updateOtherNameNotApplicable (value) {
    this.update('OtherNameNotApplicable', value.applicable)
  }

  updateEnteredCivilUnion (values) {
    this.update('EnteredCivilUnion', values)
  }

  updateAddress (values) {
    this.update('UseCurrentAddress', false)
    this.update('Address', values)
  }

  updateLocation (values) {
    this.update('Location', values)
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

  updateUseCurrentAddress (cb) {
    if (cb.checked) {
      this.updateAddress(this.props.currentAddress)
    } else {
      this.updateAddress({})
    }
    this.update('UseCurrentAddress', cb.checked)
  }

  render () {
    return (
      <div className="civil-union">
        <div>
          <p>{i18n.t('relationships.civilUnion.para.never')}</p>

          <h3>{i18n.t('relationships.civilUnion.heading.name')}</h3>
          <Name name="Name"
                className="civil"
                {...this.state.Name}
                onUpdate={this.updateName}
                onError={this.props.onError}
                />

          <Field help="relationships.civilUnion.help.birthdate"
                 title={i18n.t('relationships.civilUnion.heading.birthdate')}
                 shrink={true}
                 adjustFor="labels">
            <DateControl name="birthdate"
                         className="birthdate"
                         {...this.state.Birthdate}
                         onUpdate={this.updateBirthdate}
                         onError={this.props.onError}
                         />
          </Field>

          <h3>{i18n.t('relationships.civilUnion.heading.birthplace')}</h3>
          <Location name="birthplace"
                      layout={Location.BIRTHPLACE}
                      className="birthplace"
                      label={i18n.t('relationships.civilUnion.label.birthplace')}
                      {...this.state.BirthPlace}
                      onUpdate={this.updateBirthPlace}
                      onError={this.props.onError}
                      />

          <Show when={this.state.BirthPlace && this.state.BirthPlace.country !== 'United States'}>
            <Field help="relationships.civilUnion.help.foreignBornDocument"
                   title={i18n.t('relationships.civilUnion.heading.foreignBornDocument')}>
              <ForeignBornDocuments name="foreignBornDocument"
                                    {...this.state.ForeignBornDocument}
                                    onUpdate={this.updateForeignBornDocument}
                                    onError={this.props.onError}
                                    />
            </Field>
          </Show>

          <h3>{i18n.t('relationships.civilUnion.heading.ssn')}</h3>
          <Field help="identification.ssn.help">
            <SSN name="ssn"
                 {...this.state.SSN}
                 onUpdate={this.updateSSN}
                 onError={this.props.onError}
                 />
          </Field>

          <h3>{i18n.t('relationships.civilUnion.heading.othernames')}</h3>
          <p>{i18n.t('relationships.civilUnion.para.othernames')}</p>
          <NotApplicable name="OtherNameNotApplicable"
                         className="othername"
                         applicable={this.state.OtherNameNotApplicable}
                         label={i18n.t('relationships.civilUnion.notApplicable.label')}
                         or={i18n.m('relationships.civilUnion.notApplicable.or')}
                         onUpdate={this.updateOtherNameNotApplicable}
                         onError={this.props.onError}>
            <Name name="othername"
                  {...this.state.OtherName}
                  onUpdate={this.updateOtherName}
                  onError={this.props.onError}
                  />
            <Field title={i18n.t('relationships.civilUnion.othernames.heading.maiden')}
                   help="alias.maiden.help"
                   adjustFor="buttons"
                   shrink={true}>
              <MaidenName name="MaidenName"
                          {...this.state.OtherNameMaiden}
                          onUpdate={this.updateOtherNameMaiden}
                          onError={this.props.onError}
                          />
            </Field>

            <Field title={i18n.t('relationships.civilUnion.othernames.heading.used')}
                   adjustFor="daterange"
                   shrink={true}>
              <DateRange name="DatesUsed"
                         className="datesused"
                         {...this.state.DatesUsed}
                         onUpdate={this.updateDatesUsed}
                         onError={this.props.onError}
                         />
            </Field>
          </NotApplicable>

          <Field title={i18n.t('relationships.civilUnion.heading.citizenship')}
                 help="relationships.civilUnion.help.citizenship"
                 adjustFor="country">
            <Country name="Citizenship"
                     {...this.state.Citizenship}
                     className="relationships-civilUnion-citizenship"
                     multiple={true}
                     onUpdate={this.updateCitizenship}
                     onError={this.props.onError}
                     />
          </Field>

          <Field title={i18n.t('relationships.civilUnion.heading.enteredCivilUnion')}>
            <DateControl name="enteredCivilUnion"
                         className="entered"
                         {...this.state.EnteredCivilUnion}
                         onUpdate={this.updateEnteredCivilUnion}
                         onError={this.props.onError}
                         />
          </Field>

          <Field title={i18n.t('relationships.civilUnion.heading.location')}>
            <Location name="Location"
                     className="civilunion-location"
                     layout={Location.BIRTHPLACE}
                     label={i18n.t('relationships.civilUnion.label.location')}
                     {...this.state.Location}
                     onUpdate={this.updateLocation}
                     onError={this.props.onError}
                     />
          </Field>

          <Field title={i18n.t('relationships.civilUnion.heading.address')}
                 help="relationships.civilUnion.help.address"
                 adjustFor="address"
                 shrink={true}>
            <Show when={this.props.currentAddress}>
              <Checkbox name="current_address"
                        className="current-address"
                        label="Use current address"
                        checked={this.state.UseCurrentAddress}
                        onUpdate={this.updateUseCurrentAddress}
                        onError={this.props.onError}
                        />
            </Show>
            <Address name="Address"
                     {...this.state.Address}
                     onUpdate={this.updateAddress}
                     onError={this.props.onError}
                     />
          </Field>

          <Field title={i18n.t('relationships.civilUnion.heading.telephone')}
                 help="relationships.civilUnion.help.telephone"
                 adjustFor="telephone"
                 shrink={true}>
            <Telephone name="Telephone"
                       {...this.state.Telephone}
                       onUpdate={this.updateTelephone}
                       onError={this.props.onError}
                       />
          </Field>

          <Field title={i18n.t('relationships.civilUnion.heading.email')}
                 help="relationships.civilUnion.help.email"
                 adjustFor="email">
            <Email name="Email"
                   {...this.state.Email}
                   onUpdate={this.updateEmail}
                   onError={this.props.onError}
                   />
          </Field>

          <Branch name="separated"
                  className="separated"
                  label={i18n.t('relationships.civilUnion.heading.separated')}
                  labelSize="h3"
                  value={this.state.Separated}
                  help="relationships.civilUnion.help.separated"
                  onUpdate={this.updateSeparated}
                  onError={this.props.onError}>
          </Branch>

          <Show when={this.state.Separated === 'Yes'}>
            <div>
              <Field title={i18n.t('relationships.civilUnion.heading.dateSeparated')}
                     help="relationships.civilUnion.help.dateSeparated">
                <DateControl name="DateSeparated"
                             className="dateseparated"
                             {...this.state.DateSeparated}
                             onUpdate={this.updateDateSeparated}
                             onError={this.props.onError}
                             />
              </Field>

              <Field title={i18n.t('relationships.civilUnion.heading.addressSeparated')}
                     className="address-separated"
                     help="relationships.civilUnion.help.addressSeparated">
                <NotApplicable name="OtherNameNotApplicable"
                               applicable={this.state.AddressSeparatedNotApplicable}
                               label={i18n.t('relationships.civilUnion.notApplicable.label')}
                               or={i18n.m('relationships.civilUnion.notApplicable.or')}
                               onUpdate={this.updateAddressSeparatedNotApplicable}
                               onError={this.props.onError}>
                  <Location name="addressSeparated"
                           label={i18n.t('relationships.civilUnion.label.addressSeparated')}
                           layout={Location.US_CITY_STATE_ZIP_INTERNATIONAL_CITY}
                           {...this.state.AddressSeparated}
                           onUpdate={this.updateAddressSeparated}
                           onError={this.props.onError}
                           />
                </NotApplicable>
              </Field>
            </div>
          </Show>

          <Branch name="divorced"
                  label={i18n.t('relationships.civilUnion.heading.divorced')}
                  labelSize="h3"
                  className="divorced"
                  value={this.state.Divorced}
                  help="relationships.civilUnion.help.divorced"
                  onUpdate={this.updateDivorced}
                  onError={this.props.onError}>
          </Branch>
        </div>
      </div>
    )
  }
}

CivilUnion.defaultProps = {
  Name: {},
  Birthdate: {},
  BirthPlace: {},
  ForeignBornDocument: {},
  SSN: {},
  OtherName: {},
  OtherNameMaiden: {},
  OtherNameNotApplicable: {},
  DatesUsed: {},
  Citizenship: {},
  EnteredCivilUnion: {},
  Address: {},
  Telephone: {},
  Email: {},
  Separated: '',
  DateSeparated: {},
  AddressSeparated: {},
  AddressSeparatedNotApplicable: {},
  Divorced: '',
  UseCurrentAddress: false,
  onError: (value, arr) => { return arr },
  defaultState: true
}
