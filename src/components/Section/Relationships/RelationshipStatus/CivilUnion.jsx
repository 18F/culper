import React from 'react'
import { i18n } from '../../../../config'
import {
  Branch,
  Field,
  DateControl,
  ValidationElement,
  Show,
  NotApplicable,
  Email,
  Telephone,
  Name,
  ForeignBornDocuments,
  SSN,
  MaidenName,
  DateRange,
  Checkbox,
  Country,
  Location,
  BranchCollection,
  AccordionItem
} from '../../../Form'

export default class CivilUnion extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateBirthdate = this.updateBirthdate.bind(this)
    this.updateBirthPlace = this.updateBirthPlace.bind(this)
    this.updateForeignBornDocument = this.updateForeignBornDocument.bind(this)
    this.updateSSN = this.updateSSN.bind(this)
    this.updateOtherNames = this.updateOtherNames.bind(this)
    this.updateCitizenship = this.updateCitizenship.bind(this)
    this.updateEnteredCivilUnion = this.updateEnteredCivilUnion.bind(this)
    this.updateLocation = this.updateLocation.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateTelephone = this.updateTelephone.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
    this.updateSeparated = this.updateSeparated.bind(this)
    this.updateDateSeparated = this.updateDateSeparated.bind(this)
    this.updateAddressSeparated = this.updateAddressSeparated.bind(this)
    this.updateAddressSeparatedNotApplicable = this.updateAddressSeparatedNotApplicable.bind(
      this
    )
    this.updateDivorced = this.updateDivorced.bind(this)
    this.updateUseCurrentAddress = this.updateUseCurrentAddress.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Name: this.props.Name,
      Birthdate: this.props.Birthdate,
      BirthPlace: this.props.BirthPlace,
      ForeignBornDocument: this.props.ForeignBornDocument,
      SSN: this.props.SSN,
      OtherNames: this.props.OtherNames,
      Citizenship: this.props.Citizenship,
      EnteredCivilUnion: this.props.EnteredCivilUnion,
      Location: this.props.Location,
      Address: this.props.Address,
      Telephone: this.props.Telephone,
      Email: this.props.Email,
      Separated: this.props.Separated,
      DateSeparated: this.props.DateSeparated,
      AddressSeparated: this.props.AddressSeparated,
      AddressSeparatedNotApplicable: this.props.AddressSeparatedNotApplicable,
      Divorced: this.props.Divorced,
      UseCurrentAddress: this.props.UseCurrentAddress,
      ...queue
    })
  }

  updateName(values) {
    this.update({
      Name: values
    })

    if (this.props.onSpouseUpdate) {
      this.props.onSpouseUpdate(values)
    }
  }

  updateBirthdate(values) {
    this.update({
      Birthdate: values
    })
  }

  updateBirthPlace(values) {
    this.update({
      BirthPlace: values
    })
  }

  updateForeignBornDocument(values) {
    this.update({
      ForeignBornDocument: values
    })
  }

  updateSSN(values) {
    this.update({
      SSN: values
    })
  }

  updateOtherNames(values) {
    this.update({
      OtherNames: values
    })
  }

  updateCitizenship(values) {
    this.update({
      Citizenship: values
    })
  }

  updateEnteredCivilUnion(values) {
    this.update({
      EnteredCivilUnion: values
    })
  }

  updateAddress(values) {
    this.update({
      Address: values
    })
  }

  updateLocation(values) {
    this.update({
      Location: values
    })
  }

  updateTelephone(values) {
    this.update({
      Telephone: values
    })
  }

  updateEmail(values) {
    this.update({
      Email: values
    })
  }

  updateSeparated(values) {
    this.update({
      Separated: values
    })
  }

  updateDateSeparated(values) {
    this.update({
      DateSeparated: values
    })
  }

  updateAddressSeparated(values) {
    this.update({
      AddressSeparated: values
    })
  }

  updateAddressSeparatedNotApplicable(values) {
    this.update({
      AddressSeparatedNotApplicable: values
    })
  }

  updateDivorced(values) {
    this.update({
      Divorced: values
    })
  }

  updateUseCurrentAddress(values) {
    this.update({
      UseCurrentAddress: values,
      Address: !values.applicable ? { ...this.props.currentAddress } : {}
    })
  }

  render() {
    const showForeignBornDocumentation =
      ((this.props.BirthPlace || {}).country || {}) !== 'United States'
    return (
      <div className="civil-union">
        <div>
          <p>{i18n.t('relationships.civilUnion.para.never')}</p>

          <Field
            title={i18n.t('relationships.civilUnion.heading.name')}
            optional={true}
            filterErrors={Name.requiredErrorsOnly}
            scrollIntoView={this.props.scrollIntoView}>
            <Name
              name="Name"
              className="civil"
              {...this.props.Name}
              onUpdate={this.updateName}
              onError={this.props.onError}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Field>

          <Field
            help="relationships.civilUnion.help.birthdate"
            title={i18n.t('relationships.civilUnion.heading.birthdate')}
            scrollIntoView={this.props.scrollIntoView}
            adjustFor="datecontrol">
            <DateControl
              name="birthdate"
              className="birthdate"
              {...this.props.Birthdate}
              relationship="Other"
              onUpdate={this.updateBirthdate}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>

          <Field
            title={i18n.t('relationships.civilUnion.heading.birthplace')}
            scrollIntoView={this.props.scrollIntoView}>
            <Location
              name="birthplace"
              {...this.props.BirthPlace}
              layout={Location.BIRTHPLACE}
              className="birthplace"
              label={i18n.t('relationships.civilUnion.label.birthplace')}
              onUpdate={this.updateBirthPlace}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>

          <Show when={showForeignBornDocumentation}>
            <ForeignBornDocuments
              name="foreignBornDocument"
              {...this.props.ForeignBornDocument}
              onUpdate={this.updateForeignBornDocument}
              onError={this.props.onError}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Show>

          <Field
            title={i18n.t('relationships.civilUnion.heading.ssn')}
            help="identification.ssn.help"
            scrollIntoView={this.props.scrollIntoView}>
            <SSN
              name="ssn"
              {...this.props.SSN}
              onUpdate={this.updateSSN}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>

          <BranchCollection
            label={i18n.t('relationships.civilUnion.heading.othernames')}
            className="othername"
            appendLabel={i18n.t(
              'relationships.civilUnion.heading.appendOthernames'
            )}
            {...this.props.OtherNames}
            onError={this.props.onError}
            onUpdate={this.updateOtherNames}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}>
            <AccordionItem
              scrollIntoView={this.props.scrollIntoView}
              required={this.props.required}>
              <Field
                title={i18n.t(
                  'relationships.civilUnion.othernames.heading.name'
                )}
                optional={true}
                filterErrors={Name.requiredErrorsOnly}
                scrollIntoView={this.props.scrollIntoView}>
                <Name
                  name="Name"
                  bind={true}
                  onError={this.props.onError}
                  required={this.props.required}
                  scrollIntoView={this.props.scrollIntoView}
                />
              </Field>

              <Field
                title={i18n.t(
                  'relationships.civilUnion.othernames.heading.maiden'
                )}
                help="alias.maiden.help"
                adjustFor="buttons"
                shrink={true}
                scrollIntoView={this.props.scrollIntoView}>
                <MaidenName
                  name="MaidenName"
                  bind={true}
                  onError={this.props.onError}
                  required={this.props.required}
                  scrollIntoView={this.props.scrollIntoView}
                />
              </Field>

              <Field
                title={i18n.t(
                  'relationships.civilUnion.othernames.heading.used'
                )}
                adjustFor="daterange"
                shrink={true}
                scrollIntoView={this.props.scrollIntoView}>
                <DateRange
                  name="DatesUsed"
                  bind={true}
                  prefix="relative"
                  minDate={(this.props.Birthdate || {}).date}
                  minDateEqualTo={true}
                  className="datesused"
                  onError={this.props.onError}
                  required={this.props.required}
                />
              </Field>
            </AccordionItem>
          </BranchCollection>

          <Field
            title={i18n.t('relationships.civilUnion.heading.citizenship')}
            help="relationships.civilUnion.help.citizenship"
            scrollIntoView={this.props.scrollIntoView}
            adjustFor="country">
            <Country
              name="Citizenship"
              {...this.props.Citizenship}
              className="relationships-civilUnion-citizenship"
              multiple={true}
              onUpdate={this.updateCitizenship}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>

          <Field
            title={i18n.t('relationships.civilUnion.heading.enteredCivilUnion')}
            scrollIntoView={this.props.scrollIntoView}
            adjustFor="datecontrol">
            <DateControl
              name="enteredCivilUnion"
              className="entered"
              minDate={(this.props.Birthdate || {}).date}
              minDateEqualTo={true}
              {...this.props.EnteredCivilUnion}
              onUpdate={this.updateEnteredCivilUnion}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>

          <Field
            title={i18n.t('relationships.civilUnion.heading.location')}
            scrollIntoView={this.props.scrollIntoView}>
            <Location
              name="Location"
              className="civilunion-location"
              {...this.props.Location}
              layout={Location.BIRTHPLACE}
              label={i18n.t('relationships.civilUnion.label.location')}
              onUpdate={this.updateLocation}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>

          <Field
            title={i18n.t(
              `relationships.civilUnion.heading.address${
                this.props.currentAddress ? '' : 'WithoutCurrent'
              }`
            )}
            optional={true}
            help="relationships.civilUnion.help.address"
            scrollIntoView={this.props.scrollIntoView}
            adjustFor="address">
            <Show when={this.props.currentAddress}>
              <NotApplicable
                name="UseCurrentAddress"
                {...this.props.UseCurrentAddress}
                className="current-address"
                label={i18n.t(
                  'relationships.civilUnion.useCurrentAddress.label'
                )}
                or={i18n.m('relationships.civilUnion.useCurrentAddress.or')}
                onUpdate={this.updateUseCurrentAddress}
                onError={this.props.onError}>
                <Location
                  name="Address"
                  {...this.props.Address}
                  layout={Location.ADDRESS}
                  geocode={true}
                  addressBooks={this.props.addressBooks}
                  addressBook="Relative"
                  showPostOffice={true}
                  dispatch={this.props.dispatch}
                  onUpdate={this.updateAddress}
                  onError={this.props.onError}
                  required={this.props.required}
                />
              </NotApplicable>
            </Show>
            <Show when={!this.props.currentAddress}>
              <Location
                name="Address"
                {...this.props.Address}
                layout={Location.ADDRESS}
                geocode={true}
                addressBooks={this.props.addressBooks}
                addressBook="Relative"
                showPostOffice={true}
                dispatch={this.props.dispatch}
                onUpdate={this.updateAddress}
                onError={this.props.onError}
                required={this.props.required}
              />
            </Show>
          </Field>

          <Field
            title={i18n.t('relationships.civilUnion.heading.telephone')}
            className="override-required"
            scrollIntoView={this.props.scrollIntoView}
            adjustFor="telephone">
            <Telephone
              name="Telephone"
              {...this.props.Telephone}
              onUpdate={this.updateTelephone}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>

          <Field
            title={i18n.t('relationships.civilUnion.heading.email')}
            scrollIntoView={this.props.scrollIntoView}>
            <Email
              name="Email"
              {...this.props.Email}
              onUpdate={this.updateEmail}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>

          <Branch
            name="separated"
            className="separated"
            label={i18n.t('relationships.civilUnion.heading.separated')}
            labelSize="h3"
            {...this.props.Separated}
            onUpdate={this.updateSeparated}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
            onError={this.props.onError}
          />

          <Show when={(this.props.Separated || {}).value === 'Yes'}>
            <div>
              <Field
                title={i18n.t('relationships.civilUnion.heading.dateSeparated')}
                help="relationships.civilUnion.help.dateSeparated"
                scrollIntoView={this.props.scrollIntoView}
                adjustFor="datecontrol">
                <DateControl
                  name="DateSeparated"
                  className="dateseparated"
                  minDate={(this.props.EnteredCivilUnion || {}).date}
                  minDateEqualTo={true}
                  {...this.props.DateSeparated}
                  onUpdate={this.updateDateSeparated}
                  onError={this.props.onError}
                  required={this.props.required}
                />
              </Field>

              <Field
                title={i18n.t(
                  'relationships.civilUnion.heading.addressSeparated'
                )}
                className="address-separated"
                scrollIntoView={this.props.scrollIntoView}>
                <NotApplicable
                  name="AddressSeparatedNotApplicable"
                  {...this.props.AddressSeparatedNotApplicable}
                  label={i18n.t('relationships.civilUnion.notApplicable.label')}
                  or={i18n.m('relationships.civilUnion.notApplicable.or')}
                  onUpdate={this.updateAddressSeparatedNotApplicable}
                  onError={this.props.onError}>
                  <Location
                    name="addressSeparated"
                    {...this.props.AddressSeparated}
                    label={i18n.t(
                      'relationships.civilUnion.label.addressSeparated'
                    )}
                    layout={Location.US_CITY_STATE_ZIP_INTERNATIONAL_CITY}
                    showPostOffice={true}
                    onUpdate={this.updateAddressSeparated}
                    onError={this.props.onError}
                    required={this.props.required}
                  />
                </NotApplicable>
              </Field>
            </div>
          </Show>

          <Branch
            name="divorced"
            label={i18n.t('relationships.civilUnion.heading.divorced')}
            labelSize="h3"
            className="divorced"
            {...this.props.Divorced}
            onUpdate={this.updateDivorced}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
            onError={this.props.onError}
          />
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
  OtherNames: {},
  Citizenship: {},
  EnteredCivilUnion: {},
  Address: {},
  Location: {},
  Telephone: {},
  Email: {},
  Separated: {},
  DateSeparated: {},
  AddressSeparated: {},
  AddressSeparatedNotApplicable: {
    applicable: true
  },
  Divorced: {},
  UseCurrentAddress: {},
  addressBooks: {},
  dispatch: action => {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  defaultState: true
}
