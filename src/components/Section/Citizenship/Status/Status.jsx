import React from 'react'
import { i18n } from '../../../../config'
import { alphaNumericRegEx } from '../../../../validators/helpers'
import schema from '../../../../schema'
import validate from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
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
} from '../../../Form'

export default class Status extends SubsectionElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateCitizenshipStatus = this.updateCitizenshipStatus.bind(this)
    this.updateAbroadDocumentation = this.updateAbroadDocumentation.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
    this.updateDocumentNumber = this.updateDocumentNumber.bind(this)
    this.updateDocumentIssued = this.updateDocumentIssued.bind(this)
    this.updatePlaceIssued = this.updatePlaceIssued.bind(this)
    this.updateDocumentName = this.updateDocumentName.bind(this)
    this.updateCertificateNumber = this.updateCertificateNumber.bind(this)
    this.updateCertificateIssued = this.updateCertificateIssued.bind(this)
    this.updateCertificateName = this.updateCertificateName.bind(this)
    this.updateBornOnMilitaryInstallation = this.updateBornOnMilitaryInstallation.bind(
      this
    )
    this.updateMilitaryBase = this.updateMilitaryBase.bind(this)
    this.updateEntryDate = this.updateEntryDate.bind(this)
    this.updateEntryLocation = this.updateEntryLocation.bind(this)
    this.updatePriorCitizenship = this.updatePriorCitizenship.bind(this)
    this.updateHasAlienRegistration = this.updateHasAlienRegistration.bind(this)
    this.updateAlienRegistrationNumber = this.updateAlienRegistrationNumber.bind(
      this
    )
    this.updateAlienRegistrationExpiration = this.updateAlienRegistrationExpiration.bind(
      this
    )
    this.updateCertificateCourtName = this.updateCertificateCourtName.bind(this)
    this.updateCertificateCourtAddress = this.updateCertificateCourtAddress.bind(
      this
    )
    this.updateBasis = this.updateBasis.bind(this)
    this.updatePermanentResidentCardNumber = this.updatePermanentResidentCardNumber.bind(
      this
    )
    this.updateResidenceStatus = this.updateResidenceStatus.bind(this)
    this.updateDocumentType = this.updateDocumentType.bind(this)
    this.updateDocumentExpiration = this.updateDocumentExpiration.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
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

  updateCitizenshipStatus(values) {
    this.update({
      CitizenshipStatus: values
    })
  }

  updateAbroadDocumentation(values) {
    this.update({
      AbroadDocumentation: values
    })
  }

  updateExplanation(values) {
    this.update({
      Explanation: values
    })
  }

  updateDocumentNumber(values) {
    this.update({
      DocumentNumber: values
    })
  }

  updateDocumentIssued(values) {
    this.update({
      DocumentIssued: values
    })
  }

  updatePlaceIssued(values) {
    this.update({
      PlaceIssued: values
    })
  }

  updateDocumentName(values) {
    this.update({
      DocumentName: values
    })
  }

  updateCertificateNumber(values) {
    this.update({
      CertificateNumber: values
    })
  }

  updateCertificateIssued(values) {
    this.update({
      CertificateIssued: values
    })
  }

  updateCertificateName(values) {
    this.update({
      CertificateName: values
    })
  }

  updateBornOnMilitaryInstallation(values) {
    this.update({
      BornOnMilitaryInstallation: values
    })
  }

  updateMilitaryBase(values) {
    this.update({
      MilitaryBase: values
    })
  }

  updateEntryDate(values) {
    this.update({
      EntryDate: values
    })
  }

  updateEntryLocation(values) {
    this.update({
      EntryLocation: values
    })
  }

  updatePriorCitizenship(values) {
    this.update({
      PriorCitizenship: values
    })
  }

  updateHasAlienRegistration(values) {
    this.update({
      HasAlienRegistration: values
    })
  }

  updateAlienRegistrationNumber(values) {
    this.update({
      AlienRegistrationNumber: values
    })
  }

  updateAlienRegistrationExpiration(values) {
    this.update({
      AlienRegistrationExpiration: values
    })
  }

  updateCertificateCourtName(values) {
    this.update({
      CertificateCourtName: values
    })
  }

  updateCertificateCourtAddress(values) {
    this.update({
      CertificateCourtAddress: values
    })
  }

  updateBasis(values) {
    this.update({
      Basis: values
    })
  }

  updatePermanentResidentCardNumber(values) {
    this.update({
      PermanentResidentCardNumber: values
    })
  }

  updateResidenceStatus(values) {
    this.update({
      ResidenceStatus: values
    })
  }

  updateDocumentType(values) {
    this.update({
      DocumentType: values
    })
  }

  updateDocumentExpiration(values) {
    this.update({
      DocumentExpiration: values
    })
  }

  render() {
    return (
      <div
        className="section-content status"
        {...super.dataAttributes(this.props)}>
        <h1 className="section-header">{i18n.t('citizenship.destination.status')}</h1>
        <Field
          title={i18n.t('citizenship.status.heading.citizenshipstatus')}
          adjustFor="buttons"
          scrollIntoView={this.props.scrollIntoView}>
          <RadioGroup
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
              onUpdate={this.updateCitizenshipStatus}
              onError={this.handleError}
            />
            <Radio
              name="citizenship-status-foreignborn"
              label={i18n.m(
                'citizenship.status.label.citizenshipstatus.foreignborn'
              )}
              value="ForeignBorn"
              className="citizenship-status-foreignborn"
              onUpdate={this.updateCitizenshipStatus}
              onError={this.handleError}
            />
            <Radio
              name="citizenship-status-naturalized"
              label={i18n.m(
                'citizenship.status.label.citizenshipstatus.naturalized'
              )}
              value="Naturalized"
              className="citizenship-status-naturalized"
              onUpdate={this.updateCitizenshipStatus}
              onError={this.handleError}
            />
            <Radio
              name="citizenship-status-derived"
              label={i18n.m(
                'citizenship.status.label.citizenshipstatus.derived'
              )}
              value="Derived"
              className="citizenship-status-derived"
              onUpdate={this.updateCitizenshipStatus}
              onError={this.handleError}
            />
            <Radio
              name="citizenship-status-notcitizen"
              label={i18n.m(
                'citizenship.status.label.citizenshipstatus.notcitizen'
              )}
              value="NotCitizen"
              className="citizenship-status-notcitizen"
              onUpdate={this.updateCitizenshipStatus}
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
                  onUpdate={this.updateAbroadDocumentation}
                  onError={this.handleError}
                />
                <Radio
                  name="citizenship-abroad-ds1350"
                  label={i18n.t('citizenship.status.label.abroad.ds1350')}
                  value="DS-1350"
                  className="citizenship-abroad-ds1350"
                  onUpdate={this.updateAbroadDocumentation}
                  onError={this.handleError}
                />
                <Radio
                  name="citizenship-abroad-fs545"
                  label={i18n.t('citizenship.status.label.abroad.fs545')}
                  value="FS-545"
                  className="citizenship-abroad-fs545"
                  onUpdate={this.updateAbroadDocumentation}
                  onError={this.handleError}
                />
                <Radio
                  name="citizenship-abroad-other"
                  label={i18n.t('citizenship.status.label.abroad.other')}
                  value="Other"
                  className="citizenship-abroad-other"
                  onUpdate={this.updateAbroadDocumentation}
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
                    onUpdate={this.updateExplanation}
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
                onUpdate={this.updateDocumentNumber}
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
                onUpdate={this.updateDocumentIssued}
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
                label={'Was this issued in the United States?'}
                {...this.props.PlaceIssued}
                layout={Location.CITY_STATE_COUNTRY}
                className="place-issued"
                onUpdate={this.updatePlaceIssued}
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
                onUpdate={this.updateDocumentName}
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
                onUpdate={this.updateCertificateNumber}
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
                onUpdate={this.updateCertificateIssued}
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
                onUpdate={this.updateCertificateName}
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
              onUpdate={this.updateBornOnMilitaryInstallation}
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
                  onUpdate={this.updateMilitaryBase}
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
                onUpdate={this.updateEntryDate}
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
                onUpdate={this.updateEntryLocation}
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
                onUpdate={this.updatePriorCitizenship}
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
              onUpdate={this.updateHasAlienRegistration}
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
                  onUpdate={this.updateAlienRegistrationNumber}
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
                onUpdate={this.updateCertificateNumber}
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
                onUpdate={this.updateCertificateCourtName}
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
                onUpdate={this.updateCertificateCourtAddress}
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
                onUpdate={this.updateCertificateIssued}
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
                onUpdate={this.updateCertificateName}
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
                  onUpdate={this.updateBasis}
                  onError={this.handleError}
                />
                <Radio
                  name="citizenship-basis-other"
                  label={i18n.m('citizenship.status.label.basis.other')}
                  value="Other"
                  className="citizenship-basis-other"
                  onUpdate={this.updateBasis}
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
                    onUpdate={this.updateExplanation}
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
                onUpdate={this.updateAlienRegistrationNumber}
                onError={this.handleError}
                required={this.props.required}
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
                onUpdate={this.updatePermanentResidentCardNumber}
                onError={this.handleError}
                required={this.props.required}
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
                onUpdate={this.updateCertificateNumber}
                onError={this.handleError}
                required={this.props.required}
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
                onUpdate={this.updateCertificateName}
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
                onUpdate={this.updateCertificateIssued}
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
                  onUpdate={this.updateBasis}
                  onError={this.handleError}
                />
                <Radio
                  name="citizenship-basis-other"
                  label={i18n.m('citizenship.status.label.basis.other')}
                  value="Other"
                  className="citizenship-basis-other"
                  onUpdate={this.updateBasis}
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
                    onUpdate={this.updateExplanation}
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
                onUpdate={this.updateResidenceStatus}
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
                onUpdate={this.updateEntryDate}
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
                onUpdate={this.updatePriorCitizenship}
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
                onUpdate={this.updateEntryLocation}
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
                onUpdate={this.updateAlienRegistrationNumber}
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
                onUpdate={this.updateAlienRegistrationExpiration}
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
                  onUpdate={this.updateDocumentType}
                  onError={this.handleError}
                />
                <Radio
                  name="document-type-visa"
                  label={i18n.t('citizenship.status.label.documenttype.visa')}
                  value="U.S. Visa"
                  className="document-type-visa"
                  onUpdate={this.updateDocumentType}
                  onError={this.handleError}
                />
                <Radio
                  name="document-type-i20"
                  label={i18n.t('citizenship.status.label.documenttype.i20')}
                  value="I-20"
                  className="document-type-i20"
                  onUpdate={this.updateDocumentType}
                  onError={this.handleError}
                />
                <Radio
                  name="document-type-ds2019"
                  label={i18n.t('citizenship.status.label.documenttype.ds2019')}
                  value="DS-2019"
                  className="document-type-ds2019"
                  onUpdate={this.updateDocumentType}
                  onError={this.handleError}
                />
                <Radio
                  name="document-type-other"
                  label={i18n.t('citizenship.status.label.documenttype.other')}
                  value="Other"
                  className="document-type-other"
                  onUpdate={this.updateDocumentType}
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
                    onUpdate={this.updateExplanation}
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
                onUpdate={this.updateDocumentNumber}
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
                onUpdate={this.updateDocumentName}
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
                onUpdate={this.updateDocumentIssued}
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
                onUpdate={this.updateDocumentExpiration}
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
