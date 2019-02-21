import React from 'react'
import { i18n } from '@config'
import { alphaNumericRegEx, validGenericTextfield } from '@validators/helpers'
import schema from '@schema'
import validate from '@validators'
import Subsection from '@components/Section/shared/Subsection'
import {
  Branch,
  Show,
  Field,
  RadioGroup,
  Radio,
  Textarea,
  Text,
  Name,
  DateControl,
  Country,
  Location
} from '@components/Form'

import {
  CITIZENSHIP,
  CITIZENSHIP_STATUS
} from '@config/formSections/citizenship'
import connectCitizenshipSection from '../CitizenshipConnector';

const sectionConfig = {
  section: CITIZENSHIP.name,
  store: CITIZENSHIP.store,
  subsection: CITIZENSHIP_STATUS.name,
  storeKey: CITIZENSHIP_STATUS.storeKey
}

class Status extends Subsection {
  constructor(props) {
    super(props)

    const { section, subsection, store, storeKey } = sectionConfig

    this.section = section
    this.subsection = subsection
    this.store = store
    this.storeKey = storeKey

  }

  update = (queue) => {
    this.props.onUpdate(this.storeKey, {
      CitizenshipStatus: this.props.CitizenshipStatus,
      AbroadDocumentation: this.props.AbroadDocumentation,
      Explanation: this.props.Explanation,
      DocumentNumber: this.props.DocumentNumber,
      DocumentIssued: this.props.DocumentIssued,
      PlaceIssued: this.props.PlaceIssued,
      DocumentName: this.props.DocumentName,
      CertificateNumber: this.props.CertificateNumber,
      CertificateIssued: this.props.CertificateIssued,
      CertificateName: this.props.CertificateName,
      BornOnMilitaryInstallation: this.props.BornOnMilitaryInstallation,
      MilitaryBase: this.props.MilitaryBase,
      EntryDate: this.props.EntryDate,
      EntryLocation: this.props.EntryLocation,
      PriorCitizenship: this.props.PriorCitizenship,
      HasAlienRegistration: this.props.HasAlienRegistration,
      AlienRegistrationNumber: this.props.AlienRegistrationNumber,
      AlienRegistrationExiration: this.props.AlienRegistrationExiration,
      CertificateCourtName: this.props.CertificateCourtName,
      CertificateCourtAddress: this.props.CertificateCourtAddress,
      Basis: this.props.Basis,
      PermanentResidentCardNumber: this.props.PermanentResidentCardNumber,
      ResidenceStatus: this.props.ResidenceStatus,
      DocumentType: this.props.DocumentType,
      DocumentExpiration: this.props.DocumentExpiration,
      ...queue
    })
  }

  updateField = (field, values) =>  {
    this.update({
      [field]: values
    })
  }

  derivedAlienRegistrationNumberRequired = () => {
    return this.props.required &&
      !validGenericTextfield(this.props.PermanentResidentCardNumber) &&
      !validGenericTextfield(this.props.CertificateNumber)
  }

  derivedPermanentResidentCardNumberRequired = () => {
    return this.props.required &&
      !validGenericTextfield(this.props.AlienRegistrationNumber) &&
      !validGenericTextfield(this.props.CertificateNumber)
  }

  derivedCertificateNumberRequired = () => {
    return this.props.required &&
      !validGenericTextfield(this.props.AlienRegistrationNumber) &&
      !validGenericTextfield(this.props.PermanentResidentCardNumber)
  }

  render() {
    return (
      <div
        className="section-content status"
        {...super.dataAttributes()}>
        <h1 className="section-header">{i18n.t('citizenship.destination.status')}</h1>
        <Field
          title={i18n.t('citizenship.status.heading.citizenshipstatus')}
          adjustFor="buttons"
          scrollIntoView={this.props.scrollIntoView}>
          <RadioGroup
            name="citizenship-status"
            className="citizenship-status option-list option-list-vertical"
            required={this.props.required}
            onError={this.handleError}
            selectedValue={(this.props.CitizenshipStatus || {}).value}>
            <Radio
              name="citizenship-status-citizen"
              label={i18n.m(
                'citizenship.status.label.citizenshipstatus.citizen'
              )}
              value="Citizen"
              className="citizenship-status-citizen"
              onUpdate={value => { this.updateField('CitizenshipStatus', value) }}
              onError={this.handleError}
            />
            <Radio
              name="citizenship-status-foreignborn"
              label={i18n.m(
                'citizenship.status.label.citizenshipstatus.foreignborn'
              )}
              value="ForeignBorn"
              className="citizenship-status-foreignborn"
              onUpdate={value => { this.updateField('CitizenshipStatus', value) }}
              onError={this.handleError}
            />
            <Radio
              name="citizenship-status-naturalized"
              label={i18n.m(
                'citizenship.status.label.citizenshipstatus.naturalized'
              )}
              value="Naturalized"
              className="citizenship-status-naturalized"
              onUpdate={value => { this.updateField('CitizenshipStatus', value) }}
              onError={this.handleError}
            />
            <Radio
              name="citizenship-status-derived"
              label={i18n.m(
                'citizenship.status.label.citizenshipstatus.derived'
              )}
              value="Derived"
              className="citizenship-status-derived"
              onUpdate={value => { this.updateField('CitizenshipStatus', value) }}
              onError={this.handleError}
            />
            <Radio
              name="citizenship-status-notcitizen"
              label={i18n.m(
                'citizenship.status.label.citizenshipstatus.notcitizen'
              )}
              value="NotCitizen"
              className="citizenship-status-notcitizen"
              onUpdate={value => { this.updateField('CitizenshipStatus', value) }}
              onError={this.handleError}
            />
          </RadioGroup>
        </Field>

        <Show
          when={(this.props.CitizenshipStatus || {}).value === 'ForeignBorn'}>
          <div>
            <Field
              title={i18n.t('citizenship.status.heading.abroad')}
              adjustFor="buttons"
              scrollIntoView={this.props.scrollIntoView}>
              <RadioGroup
                className="citizenship-abroad"
                required={this.props.required}
                onError={this.handleError}
                selectedValue={(this.props.AbroadDocumentation || {}).value}>
                <Radio
                  name="citizenship-abroad-fs240"
                  label={i18n.t('citizenship.status.label.abroad.fs240')}
                  value="FS-240"
                  className="citizenship-abroad-fs240"
                  onUpdate={value => { this.updateField('AbroadDocumentation', value) }}
                  onError={this.handleError}
                />
                <Radio
                  name="citizenship-abroad-ds1350"
                  label={i18n.t('citizenship.status.label.abroad.ds1350')}
                  value="DS-1350"
                  className="citizenship-abroad-ds1350"
                  onUpdate={value => { this.updateField('AbroadDocumentation', value) }}
                  onError={this.handleError}
                />
                <Radio
                  name="citizenship-abroad-fs545"
                  label={i18n.t('citizenship.status.label.abroad.fs545')}
                  value="FS-545"
                  className="citizenship-abroad-fs545"
                  onUpdate={value => { this.updateField('AbroadDocumentation', value) }}
                  onError={this.handleError}
                />
                <Radio
                  name="citizenship-abroad-other"
                  label={i18n.t('citizenship.status.label.abroad.other')}
                  value="Other"
                  className="citizenship-abroad-other"
                  onUpdate={value => { this.updateField('AbroadDocumentation', value) }}
                  onError={this.handleError}
                />
              </RadioGroup>

              <Show
                when={(this.props.AbroadDocumentation || {}).value === 'Other'}>
                <Field
                  title={i18n.t('citizenship.status.label.explanation')}
                  titleSize="label"
                  adjustFor="textarea">
                  <Textarea
                    name="Explanation"
                    className="citizenship-abroad-explanation"
                    {...this.props.Explanation}
                    onUpdate={value => { this.updateField('Explanation', value) }}
                    onError={this.handleError}
                    required={this.props.required}
                  />
                </Field>
              </Show>
            </Field>

            <Field
              title={i18n.t(
                'citizenship.status.heading.documentnumber.foreignborn'
              )}
              scrollIntoView={this.props.scrollIntoView}>
              <Text
                name="DocumentNumber"
                className="document-number"
                maxlength="30"
                pattern={alphaNumericRegEx}
                prefix="alphanumeric"
                {...this.props.DocumentNumber}
                onUpdate={value => { this.updateField('DocumentNumber', value) }}
                onError={this.handleError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t('citizenship.status.heading.documentissued')}
              adjustFor="datecontrol"
              scrollIntoView={this.props.scrollIntoView}>
              <DateControl
                name="DocumentIssued"
                className="document-issued"
                minDateEqualTo={true}
                {...this.props.DocumentIssued}
                onUpdate={value => { this.updateField('DocumentIssued', value) }}
                onError={this.handleError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t('citizenship.status.heading.placeissued')}
              adjustFor="label"
              scrollIntoView={this.props.scrollIntoView}>
              <Location
                name="PlaceIssued"
                {...this.props.PlaceIssued}
                layout={Location.BIRTHPLACE_WITHOUT_COUNTY}
                className="place-issued"
                onUpdate={value => { this.updateField('PlaceIssued', value) }}
                onError={this.handleError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t('citizenship.status.heading.documentname')}
              optional={true}
              filterErrors={Name.requiredErrorsOnly}
              scrollIntoView={this.props.scrollIntoView}>
              <Name
                name="DocumentName"
                className="document-name"
                {...this.props.DocumentName}
                onUpdate={value => { this.updateField('DocumentName', value) }}
                onError={this.handleError}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
              />
            </Field>

            <Field
              title={i18n.t(
                'citizenship.status.heading.certificatenumber.foreignborn'
              )}
              scrollIntoView={this.props.scrollIntoView}>
              <Text
                name="CertificateNumber"
                className="certificate-number"
                {...this.props.CertificateNumber}
                maxlength="30"
                pattern={alphaNumericRegEx}
                prefix="alphanumeric"
                onUpdate={value => { this.updateField('CertificateNumber', value) }}
                onError={this.handleError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t(
                'citizenship.status.heading.certificateissued.foreignborn'
              )}
              adjustFor="datecontrol"
              scrollIntoView={this.props.scrollIntoView}>
              <DateControl
                name="CertificateIssued"
                className="certificate-issued"
                {...this.props.CertificateIssued}
                minDateEqualTo={true}
                onUpdate={value => { this.updateField('CertificateIssued', value) }}
                onError={this.handleError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t(
                'citizenship.status.heading.certificatename.foreignborn'
              )}
              optional={true}
              filterErrors={Name.requiredErrorsOnly}
              scrollIntoView={this.props.scrollIntoView}>
              <Name
                name="CertificateName"
                className="certificate-name"
                {...this.props.CertificateName}
                onUpdate={value => { this.updateField('CertificateName', value) }}
                onError={this.handleError}
                required={this.props.required}
              />
            </Field>
            <Branch
              name="born_on_military_installation"
              label={i18n.t(
                'citizenship.status.heading.bornonmilitaryinstallation'
              )}
              labelSize="h4"
              className="born-on-military-installation"
              {...this.props.BornOnMilitaryInstallation}
              onUpdate={value => { this.updateField('BornOnMilitaryInstallation', value) }}
              onError={this.handleError}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />

            <Show
              when={
                (this.props.BornOnMilitaryInstallation || {}).value === 'Yes'
              }>
              <Field
                title={i18n.t('citizenship.status.heading.militarybase')}
                scrollIntoView={this.props.scrollIntoView}>
                <Text
                  name="MilitaryBase"
                  className="military-base"
                  {...this.props.MilitaryBase}
                  onUpdate={value => { this.updateField('MilitaryBase', value) }}
                  onError={this.handleError}
                  required={this.props.required}
                />
              </Field>
            </Show>
          </div>
        </Show>

        <Show
          when={(this.props.CitizenshipStatus || {}).value === 'Naturalized'}>
          <div>
            <Field
              title={i18n.t('citizenship.status.heading.entrydate')}
              help="citizenship.status.help.entrydate"
              adjustFor="datecontrol"
              scrollIntoView={this.props.scrollIntoView}>
              <DateControl
                name="EntryDate"
                className="entry-date"
                {...this.props.EntryDate}
                minDateEqualTo={true}
                onUpdate={value => { this.updateField('EntryDate', value) }}
                onError={this.handleError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t('citizenship.status.heading.entrylocation')}
              adjustFor="label"
              scrollIntoView={this.props.scrollIntoView}>
              <Location
                name="EntryLocation"
                {...this.props.EntryLocation}
                layout={Location.CITY_STATE}
                className="entry-location"
                onUpdate={value => { this.updateField('EntryLocation', value) }}
                onError={this.handleError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t(
                'citizenship.status.heading.priorcitizenship.naturalized'
              )}
              help="citizenship.status.help.priorcitizenship"
              scrollIntoView={this.props.scrollIntoView}>
              <Country
                name="PriorCitizenship"
                className="prior-citizenship"
                {...this.props.PriorCitizenship}
                multiple={true}
                onUpdate={value => { this.updateField('PriorCitizenship', value) }}
                onError={this.handleError}
                required={this.props.required}
              />
            </Field>

            <Branch
              name="has_alien_registration"
              label={i18n.t('citizenship.status.heading.hasalienregistration')}
              labelSize="h4"
              className="has-alien-registration"
              {...this.props.HasAlienRegistration}
              onUpdate={value => { this.updateField('HasAlienRegistration', value) }}
              onError={this.handleError}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />

            <Show
              when={(this.props.HasAlienRegistration || {}).value === 'Yes'}>
              <Field
                title={i18n.t(
                  'citizenship.status.heading.alienregistrationnumber.naturalized'
                )}
                scrollIntoView={this.props.scrollIntoView}>
                <Text
                  name="AlienRegistrationNumber"
                  className="alien-registration-number"
                  maxlength="30"
                  pattern={alphaNumericRegEx}
                  prefix="alphanumeric"
                  {...this.props.AlienRegistrationNumber}
                  onUpdate={value => { this.updateField('AlienRegistrationNumber', value) }}
                  onError={this.handleError}
                  required={this.props.required}
                />
              </Field>
            </Show>

            <Field
              title={i18n.t(
                'citizenship.status.heading.certificatenumber.naturalized'
              )}
              scrollIntoView={this.props.scrollIntoView}>
              <Text
                name="CertificateNumber"
                className="certificate-number"
                maxlength="30"
                pattern={alphaNumericRegEx}
                prefix="alphanumeric"
                {...this.props.CertificateNumber}
                onUpdate={value => { this.updateField('CertificateNumber', value) }}
                onError={this.handleError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t('citizenship.status.heading.certificatecourtname')}
              scrollIntoView={this.props.scrollIntoView}>
              <Text
                name="CertificateCourtName"
                className="certificate-court-name"
                {...this.props.CertificateCourtName}
                onUpdate={value => { this.updateField('CertificateCourtName', value) }}
                onError={this.handleError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t(
                'citizenship.status.heading.certificatecourtaddress'
              )}
              optional={true}
              help="citizenship.status.help.certificatecourtaddress"
              scrollIntoView={this.props.scrollIntoView}
              adjustFor="label">
              <Location
                name="CertificateCourtAddress"
                {...this.props.CertificateCourtAddress}
                layout={Location.US_ADDRESS}
                geocode={true}
                className="certificate-court-address"
                onUpdate={value => { this.updateField('CertificateCourtAddress', value) }}
                onError={this.handleError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t(
                'citizenship.status.heading.certificateissued.naturalized'
              )}
              help="citizenship.status.help.certificateissued"
              scrollIntoView={this.props.scrollIntoView}
              adjustFor="datecontrol">
              <DateControl
                name="CertificateIssued"
                className="certificate-issued"
                {...this.props.CertificateIssued}
                minDateEqualTo={true}
                onUpdate={value => { this.updateField('CertificateIssued', value) }}
                onError={this.handleError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t(
                'citizenship.status.heading.certificatename.naturalized'
              )}
              optional={true}
              filterErrors={Name.requiredErrorsOnly}
              scrollIntoView={this.props.scrollIntoView}>
              <Name
                name="CertificateName"
                className="certificate-name"
                {...this.props.CertificateName}
                onUpdate={value => { this.updateField('CertificateName', value) }}
                onError={this.handleError}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
              />
            </Field>

            <Field
              title={i18n.t('citizenship.status.heading.basis.naturalized')}
              adjustFor="big-buttons"
              scrollIntoView={this.props.scrollIntoView}>
              <RadioGroup
                className="citizenship-basis option-list option-list-vertical"
                required={this.props.required}
                onError={this.handleError}
                selectedValue={(this.props.Basis || {}).value}>
                <Radio
                  name="citizenship-basis-individual"
                  label={i18n.m('citizenship.status.label.basis.naturalized')}
                  value="Individual"
                  className="citizenship-basis-individual"
                  onUpdate={value => { this.updateField('Basis', value) }}
                  onError={this.handleError}
                />
                <Radio
                  name="citizenship-basis-other"
                  label={i18n.m('citizenship.status.label.basis.other')}
                  value="Other"
                  className="citizenship-basis-other"
                  onUpdate={value => { this.updateField('Basis', value) }}
                  onError={this.handleError}
                />
              </RadioGroup>

              <Show when={(this.props.Basis || {}).value === 'Other'}>
                <Field
                  title={i18n.t('citizenship.status.label.explanation')}
                  titleSize="label"
                  adjustFor="textarea"
                  scrollIntoView={this.props.scrollIntoView}>
                  <Textarea
                    name="Explanation"
                    className="citizenship-basis-explanation"
                    {...this.props.Explanation}
                    onUpdate={value => { this.updateField('Explanation', value) }}
                    onError={this.handleError}
                    required={this.props.required}
                  />
                </Field>
              </Show>
            </Field>
          </div>
        </Show>

        <Show when={(this.props.CitizenshipStatus || {}).value === 'Derived'}>
          <div>
            <Field
              title={i18n.t(
                'citizenship.status.heading.alienregistrationnumber.derived'
              )}
              scrollIntoView={this.props.scrollIntoView}>
              <Text
                name="AlienRegistrationNumber"
                className="alien-registration-number"
                maxlength="30"
                pattern={alphaNumericRegEx}
                prefix="alphanumeric"
                {...this.props.AlienRegistrationNumber}
                onUpdate={value => { this.updateField('AlienRegistrationNumber', value) }}
                onError={this.handleError}
                required={this.derivedAlienRegistrationNumberRequired()}
              />
            </Field>

            <Field
              title={i18n.t(
                'citizenship.status.heading.permanentresidentcardnumber'
              )}
              scrollIntoView={this.props.scrollIntoView}>
              <Text
                name="PermanentResidentCardNumber"
                className="permanent-resident-card-number"
                maxlength="30"
                pattern={alphaNumericRegEx}
                prefix="alphanumeric"
                {...this.props.PermanentResidentCardNumber}
                onUpdate={value => { this.updateField('PermanentResidentCardNumber', value) }}
                onError={this.handleError}
                required={this.derivedPermanentResidentCardNumberRequired()}
              />
            </Field>

            <Field
              title={i18n.t(
                'citizenship.status.heading.certificatenumber.derived'
              )}
              scrollIntoView={this.props.scrollIntoView}>
              <Text
                name="CertificateNumber"
                className="certificate-number"
                {...this.props.CertificateNumber}
                maxlength="30"
                pattern={alphaNumericRegEx}
                prefix="alphanumeric"
                onUpdate={value => { this.updateField('CertificateNumber', value) }}
                onError={this.handleError}
                required={this.derivedCertificateNumberRequired()}
              />
            </Field>

            <Field
              title={i18n.t(
                'citizenship.status.heading.certificatename.derived'
              )}
              optional={true}
              filterErrors={Name.requiredErrorsOnly}
              scrollIntoView={this.props.scrollIntoView}>
              <Name
                name="CertificateName"
                className="certificate-name"
                {...this.props.CertificateName}
                onUpdate={value => { this.updateField('CertificateName', value) }}
                onError={this.handleError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t(
                'citizenship.status.heading.certificateissued.derived'
              )}
              help="citizenship.status.help.certificateissued"
              scrollIntoView={this.props.scrollIntoView}
              adjustFor="datecontrol">
              <DateControl
                name="CertificateIssued"
                className="certificate-issued"
                {...this.props.CertificateIssued}
                minDateEqualTo={true}
                onUpdate={value => { this.updateField('CertificateIssued', value) }}
                onError={this.handleError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t('citizenship.status.heading.basis.derived')}
              scrollIntoView={this.props.scrollIntoView}
              adjustFor="big-buttons">
              <RadioGroup
                className="citizenship-basis option-list option-list-vertical"
                required={this.props.required}
                onError={this.props.onError}
                selectedValue={(this.props.Basis || {}).value}>
                <Radio
                  name="citizenship-basis-individual"
                  label={i18n.m('citizenship.status.label.basis.derived')}
                  value="Individual"
                  className="citizenship-basis-individual"
                  onUpdate={value => { this.updateField('Basis', value) }}
                  onError={this.handleError}
                />
                <Radio
                  name="citizenship-basis-other"
                  label={i18n.m('citizenship.status.label.basis.other')}
                  value="Other"
                  className="citizenship-basis-other"
                  onUpdate={value => { this.updateField('Basis', value) }}
                  onError={this.handleError}
                />
              </RadioGroup>

              <Show when={(this.props.Basis || {}).value === 'Other'}>
                <Field
                  title={i18n.t('citizenship.status.label.explanation')}
                  titleSize="label"
                  adjustFor="textarea"
                  scrollIntoView={this.props.scrollIntoView}>
                  <Textarea
                    name="Explanation"
                    className="citizenship-basis-explanation"
                    {...this.props.Explanation}
                    onUpdate={value => { this.updateField('Explanation', value) }}
                    onError={this.handleError}
                    required={this.props.required}
                  />
                </Field>
              </Show>
            </Field>
          </div>
        </Show>

        <Show
          when={(this.props.CitizenshipStatus || {}).value === 'NotCitizen'}>
          <div>
            <Field
              title={i18n.t('citizenship.status.heading.residencestatus')}
              scrollIntoView={this.props.scrollIntoView}>
              <Text
                name="ResidenceStatus"
                className="residence-status"
                {...this.props.ResidenceStatus}
                onUpdate={value => { this.updateField('ResidenceStatus', value) }}
                onError={this.handleError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t('citizenship.status.heading.entrydate')}
              help="citizenship.status.help.entrydate"
              scrollIntoView={this.props.scrollIntoView}
              adjustFor="datecontrol">
              <DateControl
                name="EntryDate"
                className="entry-date"
                {...this.props.EntryDate}
                minDateEqualTo={true}
                onUpdate={value => { this.updateField('EntryDate', value) }}
                onError={this.handleError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t(
                'citizenship.status.heading.priorcitizenship.notcitizen'
              )}
              help="citizenship.status.help.priorcitizenship"
              scrollIntoView={this.props.scrollIntoView}>
              <Country
                name="PriorCitizenship"
                className="prior-citizenship"
                {...this.props.PriorCitizenship}
                multiple={true}
                onUpdate={value => { this.updateField('PriorCitizenship', value) }}
                onError={this.handleError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t('citizenship.status.heading.entrylocation')}
              adjustFor="address"
              scrollIntoView={this.props.scrollIntoView}>
              <Location
                name="EntryLocation"
                className="entry-location"
                {...this.props.EntryLocation}
                layout={Location.CITY_STATE}
                onUpdate={value => { this.updateField('EntryLocation', value) }}
                onError={this.handleError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t(
                'citizenship.status.heading.alienregistrationnumber.notcitizen'
              )}
              scrollIntoView={this.props.scrollIntoView}>
              <Text
                name="AlienRegistrationNumber"
                className="alien-registration-number"
                maxlength="30"
                pattern={alphaNumericRegEx}
                prefix="alphanumeric"
                {...this.props.AlienRegistrationNumber}
                onUpdate={value => { this.updateField('AlienRegistrationNumber', value) }}
                onError={this.handleError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t(
                'citizenship.status.heading.alienregistrationexpiration'
              )}
              adjustFor="datecontrol"
              scrollIntoView={this.props.scrollIntoView}>
              <DateControl
                name="AlienRegistrationExpiration"
                className="alien-registration-expiration"
                {...this.props.AlienRegistrationExpiration}
                noMaxDate={true}
                onUpdate={value => { this.updateField('AlienRegistrationExpiration', value) }}
                onError={this.handleError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t('citizenship.status.heading.documenttype')}
              adjustFor="buttons"
              scrollIntoView={this.props.scrollIntoView}>
              <RadioGroup
                className="citizenship-document-type"
                required={this.props.required}
                onError={this.handleError}
                selectedValue={(this.props.DocumentType || {}).value}>
                <Radio
                  name="document-type-i94"
                  label={i18n.t('citizenship.status.label.documenttype.i94')}
                  value="I-94"
                  className="document-type-i94"
                  onUpdate={value => { this.updateField('DocumentType', value) }}
                  onError={this.handleError}
                />
                <Radio
                  name="document-type-visa"
                  label={i18n.t('citizenship.status.label.documenttype.visa')}
                  value="U.S. Visa"
                  className="document-type-visa"
                  onUpdate={value => { this.updateField('DocumentType', value) }}
                  onError={this.handleError}
                />
                <Radio
                  name="document-type-i20"
                  label={i18n.t('citizenship.status.label.documenttype.i20')}
                  value="I-20"
                  className="document-type-i20"
                  onUpdate={value => { this.updateField('DocumentType', value) }}
                  onError={this.handleError}
                />
                <Radio
                  name="document-type-ds2019"
                  label={i18n.t('citizenship.status.label.documenttype.ds2019')}
                  value="DS-2019"
                  className="document-type-ds2019"
                  onUpdate={value => { this.updateField('DocumentType', value) }}
                  onError={this.handleError}
                />
                <Radio
                  name="document-type-other"
                  label={i18n.t('citizenship.status.label.documenttype.other')}
                  value="Other"
                  className="document-type-other"
                  onUpdate={value => { this.updateField('DocumentType', value) }}
                  onError={this.handleError}
                />
              </RadioGroup>

              <Show when={(this.props.DocumentType || {}).value === 'Other'}>
                <Field
                  title={i18n.t('citizenship.status.label.explanation')}
                  titleSize="label"
                  adjustFor="textarea"
                  scrollIntoView={this.props.scrollIntoView}>
                  <Textarea
                    name="Explanation"
                    className="citizenship-document-type-explanation"
                    {...this.props.Explanation}
                    onUpdate={value => { this.updateField('Explanation', value) }}
                    onError={this.handleError}
                    required={this.props.required}
                  />
                </Field>
              </Show>
            </Field>

            <Field
              title={i18n.t(
                'citizenship.status.heading.documentnumber.notcitizen'
              )}
              scrollIntoView={this.props.scrollIntoView}>
              <Text
                name="DocumentNumber"
                className="document-number"
                maxlength="30"
                pattern={alphaNumericRegEx}
                prefix="alphanumeric"
                {...this.props.DocumentNumber}
                onUpdate={value => { this.updateField('DocumentNumber', value) }}
                onError={this.handleError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t('citizenship.status.heading.documentname')}
              filterErrors={Name.requiredErrorsOnly}
              optional={true}>
              <Name
                name="DocumentName"
                className="document-name"
                {...this.props.DocumentName}
                onUpdate={value => { this.updateField('DocumentName', value) }}
                onError={this.handleError}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
              />
            </Field>

            <Field
              title={i18n.t('citizenship.status.heading.documentissued')}
              adjustFor="datecontrol"
              scrollIntoView={this.props.scrollIntoView}>
              <DateControl
                name="DocumentIssued"
                className="document-issued"
                {...this.props.DocumentIssued}
                minDateEqualTo={true}
                onUpdate={value => { this.updateField('DocumentIssued', value) }}
                onError={this.handleError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t('citizenship.status.heading.documentexpiration')}
              adjustFor="datecontrol"
              scrollIntoView={this.props.scrollIntoView}>
              <DateControl
                name="DocumentExpiration"
                className="document-expiration"
                {...this.props.DocumentExpiration}
                noMaxDate={true}
                minDateEqualTo={true}
                onUpdate={value => { this.updateField('DocumentExpiration', value) }}
                onError={this.handleError}
                required={this.props.required}
              />
            </Field>
          </div>
        </Show>
      </div>
    )
  }
}

Status.defaultProps = {
  CitizenshipStatus: {},
  AbroadDocumentation: {},
  Explanation: {},
  DocumentNumber: {},
  DocumentIssued: {},
  PlaceIssued: {},
  DocumentName: {},
  CertificateNumber: {},
  CertificateIssued: {},
  CertificateName: {},
  BornOnMilitaryInstallation: {},
  MilitaryBase: {},
  EntryDate: {},
  EntryLocation: {},
  PriorCitizenship: {},
  HasAlienRegistration: {},
  AlienRegistrationNumber: {},
  AlienRegistrationExpiration: {},
  CertificateCourtName: {},
  CertificateCourtAddress: {},
  Basis: {},
  PermanentResidentCardNumber: {},
  ResidenceStatus: {},
  DocumentType: {},
  DocumentExpiration: {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'citizenship',
  subsection: 'status',
  dispatch: () => {},
  validator: data => {
    return validate(schema('citizenship.status', data))
  }
}

export default connectCitizenshipSection(Status, sectionConfig)
