import React from 'react'
import { i18n } from '../../../../config'
import { CitizenshipValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Field, RadioGroup, Radio,
         Text, Name, Address, DateControl, Country, Location } from '../../../Form'

export default class Status extends SubsectionElement {
  constructor (props) {
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
    this.updateBornOnMilitaryInstallation = this.updateBornOnMilitaryInstallation.bind(this)
    this.updateMilitaryBase = this.updateMilitaryBase.bind(this)
    this.updateEntryDate = this.updateEntryDate.bind(this)
    this.updateEntryLocation = this.updateEntryLocation.bind(this)
    this.updatePriorCitizenship = this.updatePriorCitizenship.bind(this)
    this.updateHasAlienRegistration = this.updateHasAlienRegistration.bind(this)
    this.updateAlienRegistrationNumber = this.updateAlienRegistrationNumber.bind(this)
    this.updateAlienRegistrationExpiration = this.updateAlienRegistrationExpiration.bind(this)
    this.updateCertificateCourtName = this.updateCertificateCourtName.bind(this)
    this.updateCertificateCourtAddress = this.updateCertificateCourtAddress.bind(this)
    this.updateBasis = this.updateBasis.bind(this)
    this.updatePermanentResidentCardNumber = this.updatePermanentResidentCardNumber.bind(this)
    this.updateResidenceStatus = this.updateResidenceStatus.bind(this)
    this.updateDocumentType = this.updateDocumentType.bind(this)
    this.updateDocumentExpiration = this.updateDocumentExpiration.bind(this)
  }

  update (queue) {
    if (this.props.onUpdate) {
      let obj = {
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
        DocumentExpiration: this.props.DocumentExpiration
      }

      for (const q of queue) {
        obj = { ...obj, [q.name]: q.value }
      }

      this.props.onUpdate(obj)
    }
  }

  updateCitizenshipStatus (event) {
    this.update([
      { name: 'CitizenshipStatus', value: event.target.value }
    ])
  }

  updateAbroadDocumentation (event) {
    this.update([
      { name: 'AbroadDocumentation', value: event.target.value }
    ])
  }

  updateExplanation (values) {
    this.update([
      { name: 'Explanation', value: values }
    ])
  }

  updateDocumentNumber (values) {
    this.update([
      { name: 'DocumentNumber', value: values }
    ])
  }

  updateDocumentIssued (values) {
    this.update([
      { name: 'DocumentIssued', value: values }
    ])
  }

  updatePlaceIssued (values) {
    this.update([
      { name: 'PlaceIssued', value: values }
    ])
  }

  updateDocumentName (values) {
    this.update([
      { name: 'DocumentName', value: values }
    ])
  }

  updateCertificateNumber (values) {
    this.update([
      { name: 'CertificateNumber', value: values }
    ])
  }

  updateCertificateIssued (values) {
    this.update([
      { name: 'CertificateIssued', value: values }
    ])
  }

  updateCertificateName (values) {
    this.update([
      { name: 'CertificateName', value: values }
    ])
  }

  updateBornOnMilitaryInstallation (values) {
    this.update([
      { name: 'BornOnMilitaryInstallation', value: values }
    ])
  }

  updateMilitaryBase (values) {
    this.update([
      { name: 'MilitaryBase', value: values }
    ])
  }

  updateEntryDate (values) {
    this.update([
      { name: 'EntryDate', value: values }
    ])
  }

  updateEntryLocation (values) {
    this.update([
      { name: 'EntryLocation', value: values }
    ])
  }

  updatePriorCitizenship (values) {
    this.update([
      { name: 'PriorCitizenship', value: values }
    ])
  }

  updateHasAlienRegistration (values) {
    this.update([
      { name: 'HasAlienRegistration', value: values }
    ])
  }

  updateAlienRegistrationNumber (values) {
    this.update([
      { name: 'AlienRegistrationNumber', value: values }
    ])
  }

  updateAlienRegistrationExpiration (values) {
    this.update([
      { name: 'AlienRegistrationExpiration', value: values }
    ])
  }

  updateCertificateCourtName (values) {
    this.update([
      { name: 'CertificateCourtName', value: values }
    ])
  }

  updateCertificateCourtAddress (values) {
    this.update([
      { name: 'CertificateCourtAddress', value: values }
    ])
  }

  updateBasis (event) {
    this.update([
      { name: 'Basis', value: event.target.value }
    ])
  }

  updatePermanentResidentCardNumber (values) {
    this.update([
      { name: 'PermanentResidentCardNumber', value: values }
    ])
  }

  updateResidenceStatus (values) {
    this.update([
      { name: 'ResidenceStatus', value: values }
    ])
  }

  updateDocumentType (event) {
    this.update([
      { name: 'DocumentType', value: event.target.value }
    ])
  }

  updateDocumentExpiration (values) {
    this.update([
      { name: 'DocumentExpiration', value: values }
    ])
  }

  render () {
    return (
      <div className="status">
        <Field title={i18n.t('citizenship.status.heading.citizenshipstatus')}
               adjustFor="buttons">
          <RadioGroup className="citizenship-status"
                      selectedValue={this.props.CitizenshipStatus}>
            <Radio name="citizenship-status-citizen"
                   label={i18n.m('citizenship.status.label.citizenshipstatus.citizen')}
                   value="Citizen"
                   className="citizenship-status-citizen"
                   onChange={this.updateCitizenshipStatus}
                   onError={this.handleError}
                   />
            <Radio name="citizenship-status-foreignborn"
                   label={i18n.m('citizenship.status.label.citizenshipstatus.foreignborn')}
                   value="ForeignBorn"
                   className="citizenship-status-foreignborn"
                   onChange={this.updateCitizenshipStatus}
                   onError={this.handleError}
                   />
            <Radio name="citizenship-status-naturalized"
                   label={i18n.m('citizenship.status.label.citizenshipstatus.naturalized')}
                   value="Naturalized"
                   className="citizenship-status-naturalized"
                   onChange={this.updateCitizenshipStatus}
                   onError={this.handleError}
                   />
            <Radio name="citizenship-status-derived"
                   label={i18n.m('citizenship.status.label.citizenshipstatus.derived')}
                   value="Derived"
                   className="citizenship-status-derived"
                   onChange={this.updateCitizenshipStatus}
                   onError={this.handleError}
                   />
            <Radio name="citizenship-status-notcitizen"
                   label={i18n.m('citizenship.status.label.citizenshipstatus.notcitizen')}
                   value="NotCitizen"
                   className="citizenship-status-notcitizen"
                   onChange={this.updateCitizenshipStatus}
                   onError={this.handleError}
                   />
          </RadioGroup>
        </Field>

        <Show when={this.props.CitizenshipStatus === 'ForeignBorn'}>
          <div>
            <Field title={i18n.t('citizenship.status.heading.abroad')}
                   adjustFor="buttons"
                   comments={true}
                   commentsName="Explanation"
                   commentsValue={this.props.Explanation}
                   commentsActive={this.props.AbroadDocumentation === 'Other'}
                   onUpdate={this.updateExplanation}
                   onError={this.handleError}>
              <RadioGroup className="citizenship-abroad"
                          selectedValue={this.props.AbroadDocumentation}>
                <Radio name="citizenship-abroad-fs240"
                       label={i18n.t('citizenship.status.label.abroad.fs240')}
                       value="FS-240"
                       className="citizenship-abroad-fs240"
                       onChange={this.updateAbroadDocumentation}
                       onError={this.handleError}
                       />
                <Radio name="citizenship-abroad-ds1350"
                       label={i18n.t('citizenship.status.label.abroad.ds1350')}
                       value="DS-1350"
                       className="citizenship-abroad-ds1350"
                       onChange={this.updateAbroadDocumentation}
                       onError={this.handleError}
                       />
                <Radio name="citizenship-abroad-fs545"
                       label={i18n.t('citizenship.status.label.abroad.fs545')}
                       value="FS-545"
                       className="citizenship-abroad-fs545"
                       onChange={this.updateAbroadDocumentation}
                       onError={this.handleError}
                       />
                <Radio name="citizenship-abroad-other"
                       label={i18n.t('citizenship.status.label.abroad.other')}
                       value="Other"
                       className="citizenship-abroad-other"
                       onChange={this.updateAbroadDocumentation}
                       onError={this.handleError}
                       />
              </RadioGroup>
            </Field>

            <Field title={i18n.t('citizenship.status.heading.documentnumber.foreignborn')}>
              <Text name="DocumentNumber"
                    className="document-number"
                    {...this.props.DocumentNumber}
                    onUpdate={this.updateDocumentNumber}
                    onError={this.handleError}
                    />
            </Field>

            <Field title={i18n.t('citizenship.status.heading.documentissued')}
                   adjustFor="labels"
                   shrink={true}>
              <DateControl name="DocumentIssued"
                           className="document-issued"
                           {...this.props.DocumentIssued}
                           onUpdate={this.updateDocumentIssued}
                           onError={this.handleError}
                           />
            </Field>

            <Field title={i18n.t('citizenship.status.heading.placeissued')}
                   adjustFor="address"
                   shrink={true}>
              <Location name="PlaceIssued"
                       label={'Was this issued in the United States?'}
                       layout={Location.CITY_STATE_COUNTRY}
                       className="place-issued"
                       {...this.props.PlaceIssued}
                       onUpdate={this.updatePlaceIssued}
                       onError={this.handleError}
                       />
            </Field>

            <h3>{i18n.t('citizenship.status.heading.documentname')}</h3>
            <Name name="DocumentName"
                  className="document-name"
                  {...this.props.DocumentName}
                  onUpdate={this.updateDocumentName}
                  onError={this.handleError}
                  />

            <Field title={i18n.t('citizenship.status.heading.certificatenumber.foreignborn')}>
              <Text name="CertificateNumber"
                    className="certificate-number"
                    {...this.props.CertificateNumber}
                    onUpdate={this.updateCertificateNumber}
                    onError={this.handleError}
                    />
            </Field>

            <Field title={i18n.t('citizenship.status.heading.certificateissued.foreignborn')}
                   adjustFor="labels"
                   shrink={true}>
              <DateControl name="CertificateIssued"
                           className="certificate-issued"
                           {...this.props.CertificateIssued}
                           onUpdate={this.updateCertificateIssued}
                           onError={this.handleError}
                           />
            </Field>

            <h3>{i18n.t('citizenship.status.heading.certificatename.foreignborn')}</h3>
            <Name name="CertificateName"
                  className="certificate-name"
                  {...this.props.CertificateName}
                  onUpdate={this.updateCertificateName}
                  onError={this.handleError}
                  />

            <Branch name="born_on_military_installation"
                    label={i18n.t('citizenship.status.heading.bornonmilitaryinstallation')}
                    labelSize="h3"
                    className="born-on-military-installation"
                    value={this.props.BornOnMilitaryInstallation}
                    onUpdate={this.updateBornOnMilitaryInstallation}
                    onError={this.handleError}
                    />

            <Show when={this.props.BornOnMilitaryInstallation === 'Yes'}>
              <Field title={i18n.t('citizenship.status.heading.militarybase')}>
                <Text name="MilitaryBase"
                      className="military-base"
                      {...this.props.MilitaryBase}
                      onUpdate={this.updateMilitaryBase}
                      onError={this.handleError}
                      />
              </Field>
            </Show>
          </div>
        </Show>

        <Show when={this.props.CitizenshipStatus === 'Naturalized'}>
          <div>
            <Field title={i18n.t('citizenship.status.heading.entrydate')}
                   help="citizenship.status.help.entrydate"
                   adjustFor="labels"
                   shrink={true}>
              <DateControl name="EntryDate"
                           className="entry-date"
                           {...this.props.EntryDate}
                           onUpdate={this.updateEntryDate}
                           onError={this.handleError}
                           />
            </Field>

            <Field title={i18n.t('citizenship.status.heading.entrylocation')}
                   adjustFor="address"
                   shrink={true}>
              <Location name="EntryLocation"
                       layout={Location.CITY_STATE}
                       className="entry-location"
                       {...this.props.EntryLocation}
                       onUpdate={this.updateEntryLocation}
                       onError={this.handleError}
                       />
            </Field>

            <Field title={i18n.t('citizenship.status.heading.priorcitizenship.naturalized')}
                   help="citizenship.status.help.priorcitizenship">
              <Country name="PriorCitizenship"
                       className="prior-citizenship"
                       value={this.props.PriorCitizenship.first}
                       multiple={true}
                       onUpdate={this.updatePriorCitizenship}
                       onError={this.handleError}
                       />
            </Field>

            <Branch name="has_alien_registration"
                    label={i18n.t('citizenship.status.heading.hasalienregistration')}
                    labelSize="h3"
                    className="has-alien-registration"
                    value={this.props.HasAlienRegistration}
                    onUpdate={this.updateHasAlienRegistration}
                    onError={this.handleError}
                    />

            <Show when={this.props.HasAlienRegistration === 'Yes'}>
              <Field title={i18n.t('citizenship.status.heading.alienregistrationnumber.naturalized')}>
                <Text name="AlienRegistrationNumber"
                      className="alien-registration-number"
                      {...this.props.AlienRegistrationNumber}
                      onUpdate={this.updateAlienRegistrationNumber}
                      onError={this.handleError}
                      />
              </Field>
            </Show>

            <Field title={i18n.t('citizenship.status.heading.certificatenumber.naturalized')}>
              <Text name="CertificateNumber"
                    className="certificate-number"
                    {...this.props.CertificateNumber}
                    onUpdate={this.updateCertificateNumber}
                    onError={this.handleError}
                    />
            </Field>

            <Field title={i18n.t('citizenship.status.heading.certificatecourtname')}>
              <Text name="CertificateCourtName"
                    className="certificate-court-name"
                    {...this.props.CertificateCourtName}
                    onUpdate={this.updateCertificateCourtName}
                    onError={this.handleError}
                    />
            </Field>

            <Field title={i18n.t('citizenship.status.heading.certificatecourtaddress')}
                   help="citizenship.status.help.certificatecourtaddress"
                   adjustFor="address"
                   shrink={true}>
              <Location name="CertificateCourtAddress"
                       layout={Location.US_ADDRESS}
                       className="certificate-court-address"
                       {...this.props.CertificateCourtAddress}
                       onUpdate={this.updateCertificateCourtAddress}
                       onError={this.handleError}
                       />
            </Field>

            <Field title={i18n.t('citizenship.status.heading.certificateissued.naturalized')}
                   help="citizenship.status.help.certificateissued"
                   adjustFor="labels"
                   shrink={true}>
              <DateControl name="CertificateIssued"
                           className="certificate-issued"
                           {...this.props.CertificateIssued}
                           onUpdate={this.updateCertificateIssued}
                           onError={this.handleError}
                           />
            </Field>

            <h3>{i18n.t('citizenship.status.heading.certificatename.naturalized')}</h3>
            <Name name="CertificateName"
                  className="certificate-name"
                  {...this.props.CertificateName}
                  onUpdate={this.updateCertificateName}
                  onError={this.handleError}
                  />

            <Field title={i18n.t('citizenship.status.heading.basis.naturalized')}
                   adjustFor="big-buttons"
                   comments={true}
                   commentsName="Explanation"
                   commentsValue={this.props.Explanation}
                   commentsActive={this.props.Basis === 'Other'}
                   onUpdate={this.updateExplanation}
                   onError={this.handleError}>
              <RadioGroup className="citizenship-basis"
                          selectedValue={this.props.Basis}>
                <Radio name="citizenship-basis-individual"
                       label={i18n.m('citizenship.status.label.basis.naturalized')}
                       value="Individual"
                       className="citizenship-basis-individual"
                       onChange={this.updateBasis}
                       onError={this.handleError}
                       />
                <Radio name="citizenship-basis-other"
                       label={i18n.m('citizenship.status.label.basis.other')}
                       value="Other"
                       className="citizenship-basis-other"
                       onChange={this.updateBasis}
                       onError={this.handleError}
                       />
              </RadioGroup>
            </Field>
          </div>
        </Show>

        <Show when={this.props.CitizenshipStatus === 'Derived'}>
          <div>
            <Field title={i18n.t('citizenship.status.heading.alienregistrationnumber.derived')}>
              <Text name="AlienRegistrationNumber"
                    className="alien-registration-number"
                    {...this.props.AlienRegistrationNumber}
                    onUpdate={this.updateAlienRegistrationNumber}
                    onError={this.handleError}
                    />
            </Field>

            <Field title={i18n.t('citizenship.status.heading.permanentresidentcardnumber')}>
              <Text name="PermanentResidentCardNumber"
                    className="permanent-resident-card-number"
                    {...this.props.PermanentResidentCardNumber}
                    onUpdate={this.updatePermanentResidentCardNumber}
                    onError={this.handleError}
                    />
            </Field>

            <Field title={i18n.t('citizenship.status.heading.certificatenumber.derived')}>
              <Text name="CertificateNumber"
                    className="certificate-number"
                    {...this.props.CertificateNumber}
                    onUpdate={this.updateCertificateNumber}
                    onError={this.handleError}
                    />
            </Field>

            <h3>{i18n.t('citizenship.status.heading.certificatename.derived')}</h3>
            <Name name="CertificateName"
                  className="certificate-name"
                  {...this.props.CertificateName}
                  onUpdate={this.updateCertificateName}
                  onError={this.handleError}
                  />

            <Field title={i18n.t('citizenship.status.heading.certificateissued.derived')}
                   help="citizenship.status.help.certificateissued"
                   adjustFor="labels"
                   shrink={true}>
              <DateControl name="CertificateIssued"
                           className="certificate-issued"
                           {...this.props.CertificateIssued}
                           onUpdate={this.updateCertificateIssued}
                           onError={this.handleError}
                           />
            </Field>

            <Field title={i18n.t('citizenship.status.heading.basis.derived')}
                   adjustFor="big-buttons"
                   comments={true}
                   commentsName="Explanation"
                   commentsValue={this.props.Explanation}
                   commentsActive={this.props.Basis === 'Other'}
                   onUpdate={this.updateExplanation}
                   onError={this.handleError}>
              <RadioGroup className="citizenship-basis"
                          selectedValue={this.props.Basis}>
                <Radio name="citizenship-basis-individual"
                       label={i18n.m('citizenship.status.label.basis.derived')}
                       value="Individual"
                       className="citizenship-basis-individual"
                       onChange={this.updateBasis}
                       onError={this.handleError}
                       />
                <Radio name="citizenship-basis-other"
                       label={i18n.m('citizenship.status.label.basis.other')}
                       value="Other"
                       className="citizenship-basis-other"
                       onChange={this.updateBasis}
                       onError={this.handleError}
                       />
              </RadioGroup>
            </Field>
          </div>
        </Show>

        <Show when={this.props.CitizenshipStatus === 'NotCitizen'}>
          <div>
            <Field title={i18n.t('citizenship.status.heading.residencestatus')}>
              <Text name="ResidenceStatus"
                    className="residence-status"
                    {...this.props.ResidenceStatus}
                    onUpdate={this.updateResidenceStatus}
                    onError={this.handleError}
                    />
            </Field>

            <Field title={i18n.t('citizenship.status.heading.entrydate')}
                   help="citizenship.status.help.entrydate"
                   adjustFor="labels"
                   shrink={true}>
              <DateControl name="EntryDate"
                           className="entry-date"
                           {...this.props.EntryDate}
                           onUpdate={this.updateEntryDate}
                           onError={this.handleError}
                           />
            </Field>

            <Field title={i18n.t('citizenship.status.heading.entrylocation')}
                   adjustFor="address"
                   shrink={true}>
              <Address name="EntryLocation"
                       className="entry-location"
                       {...this.props.EntryLocation}
                       onUpdate={this.updateEntryLocation}
                       onError={this.handleError}
                       />
            </Field>

            <Field title={i18n.t('citizenship.status.heading.priorcitizenship.notcitizen')}
                   help="citizenship.status.help.priorcitizenship">
              <Country name="PriorCitizenship"
                       className="prior-citizenship"
                       value={this.props.PriorCitizenship.first}
                       multiple={true}
                       onUpdate={this.updatePriorCitizenship}
                       onError={this.handleError}
                       />
            </Field>

            <Field title={i18n.t('citizenship.status.heading.alienregistrationnumber.notcitizen')}>
              <Text name="AlienRegistrationNumber"
                    className="alien-registration-number"
                    {...this.props.AlienRegistrationNumber}
                    onUpdate={this.updateAlienRegistrationNumber}
                    onError={this.handleError}
                    />
            </Field>

            <Field title={i18n.t('citizenship.status.heading.alienregistrationexpiration')}
                   adjustFor="labels"
                   shrink={true}>
              <DateControl name="AlienRegistrationExpiration"
                           className="alien-registration-expiration"
                           {...this.props.AlienRegistrationExpiration}
                           onUpdate={this.updateAlienRegistrationExpiration}
                           onError={this.handleError}
                           />
            </Field>

            <Field title={i18n.t('citizenship.status.heading.documenttype')}
                   adjustFor="buttons"
                   comments={true}
                   commentsName="Explanation"
                   commentsValue={this.props.Explanation}
                   commentsActive={this.props.DocumentType === 'Other'}
                   onUpdate={this.updateExplanation}
                   onError={this.handleError}>
              <RadioGroup className="citizenship-document-type"
                          selectedValue={this.props.DocumentType}>
                <Radio name="document-type-i94"
                       label={i18n.t('citizenship.status.label.documenttype.i94')}
                       value="I-94"
                       className="document-type-i94"
                       onChange={this.updateDocumentType}
                       onError={this.handleError}
                       />
                <Radio name="document-type-visa"
                       label={i18n.t('citizenship.status.label.documenttype.visa')}
                       value="U.S. Visa"
                       className="document-type-visa"
                       onChange={this.updateDocumentType}
                       onError={this.handleError}
                       />
                <Radio name="document-type-i20"
                       label={i18n.t('citizenship.status.label.documenttype.i20')}
                       value="I-20"
                       className="document-type-i20"
                       onChange={this.updateDocumentType}
                       onError={this.handleError}
                       />
                <Radio name="document-type-ds2019"
                       label={i18n.t('citizenship.status.label.documenttype.ds2019')}
                       value="DS-2019"
                       className="document-type-ds2019"
                       onChange={this.updateDocumentType}
                       onError={this.handleError}
                       />
                <Radio name="document-type-other"
                       label={i18n.t('citizenship.status.label.documenttype.other')}
                       value="Other"
                       className="document-type-other"
                       onChange={this.updateDocumentType}
                       onError={this.handleError}
                       />
              </RadioGroup>
            </Field>

            <Field title={i18n.t('citizenship.status.heading.documentnumber.notcitizen')}>
              <Text name="DocumentNumber"
                    className="document-number"
                    {...this.props.DocumentNumber}
                    onUpdate={this.updateDocumentNumber}
                    onError={this.handleError}
                    />
            </Field>

            <h3>{i18n.t('citizenship.status.heading.documentname')}</h3>
            <Name name="DocumentName"
                  className="document-name"
                  {...this.props.DocumentName}
                  onUpdate={this.updateDocumentName}
                  onError={this.handleError}
                  />

            <Field title={i18n.t('citizenship.status.heading.documentissued')}
                   adjustFor="labels"
                   shrink={true}>
              <DateControl name="DocumentIssued"
                           className="document-issued"
                           {...this.props.DocumentIssued}
                           onUpdate={this.updateDocumentIssued}
                           onError={this.handleError}
                           />
            </Field>

            <Field title={i18n.t('citizenship.status.heading.documentexpiration')}
                   adjustFor="labels"
                   shrink={true}>
              <DateControl name="DocumentExpiration"
                           className="document-expiration"
                           {...this.props.DocumentExpiration}
                           onUpdate={this.updateDocumentExpiration}
                           onError={this.handleError}
                           />
            </Field>
          </div>
        </Show>
      </div>
    )
  }
}

Status.defaultProps = {
  CitizenshipStatus: '',
  AbroadDocumentation: '',
  Explanation: {},
  DocumentNumber: {},
  DocumentIssued: {},
  PlaceIssued: {},
  DocumentName: {},
  CertificateNumber: {},
  CertificateIssued: {},
  CertificateName: {},
  BornOnMilitaryInstallation: '',
  MilitaryBase: {},
  EntryDate: {},
  EntryLocation: {},
  PriorCitizenship: {},
  HasAlienRegistration: '',
  AlienRegistrationNumber: {},
  AlienRegistrationExpiration: {},
  CertificateCourtName: {},
  CertificateCourtAddress: {},
  Basis: '',
  PermanentResidentCardNumber: {},
  ResidenceStatus: {},
  DocumentType: '',
  DocumentExpiration: {},
  onError: (value, arr) => { return arr },
  section: 'citizenship',
  subsection: 'status',
  dispatch: () => {},
  validator: (state, props) => {
    return new CitizenshipValidator(props, props).isValid()
  }
}
