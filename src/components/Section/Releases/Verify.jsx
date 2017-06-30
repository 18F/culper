import React from 'react'
import { Link } from 'react-router'
import { i18n } from '../../../config'
import { SSN } from './helpers'
import { Field } from '../../Form'
import { NameSummary, DateSummary, AddressSummary, TelephoneSummary } from '../../Summary'

export default class Verify extends React.Component {
  render () {
    // Identification section
    const identification = this.props.identification || {}
    const name = NameSummary(identification.ApplicantName || {}, i18n.t('releases.verify.label.none'))
    const othernames = ((identification.OtherNames || {}).List || [{}]).map(n => { return NameSummary(n, i18n.t('releases.verify.label.none')) })
    const dob = DateSummary(identification.ApplicantBirthDate || {}, i18n.t('releases.verify.label.none'), true) || <span>{i18n.t('releases.verify.label.none')}</span>
    const ssn = SSN(identification.ApplicantSSN || {}, i18n.t('releases.verify.label.none'))
    const phoneNumbers = ((identification.Contacts || {}).PhoneNumbers || [{}]).map(n => { return TelephoneSummary(n, i18n.t('releases.verify.label.none')) })

    // History section
    const residence = ((this.props.history || {}).Residence || [{ Item: {} }])
          .filter(n => !n.type || (n.type && n.type !== 'Gap'))
          .sort((a, b) => {
            // Helper to find the date value or default it to 0
            const getOptionalDate = (obj) => {
              return ((((obj || {}).Item || {}).Dates || {}).to || {}).date || 0
            }

            const first = getOptionalDate(a)
            const second = getOptionalDate(b)

            if (first < second) {
              return 1
            } else if (first > second) {
              return -1
            }

            return 0
          })
          .map(n => {
            return AddressSummary(n.Item.Address, i18n.t('releases.verify.label.none'))
          })

    return (
      <div className="verify">
        <Field title={i18n.t('releases.verify.heading.title')} titleSize="h2" className="no-margin-bottom" />

        <Field title={i18n.t('releases.verify.heading.name')} className="verify-data no-margin-bottom">
          {name}
        </Field>

        <Field title={i18n.t('releases.verify.heading.otherNamesUsed')} className="verify-data no-margin-bottom">
          {othernames}
        </Field>

        <Field title={i18n.t('releases.verify.heading.dateOfBirth')} className="verify-data no-margin-bottom">
          {dob}
        </Field>

        <Field title={i18n.t('releases.verify.heading.ssn')} className="verify-data no-margin-bottom">
          {ssn}
        </Field>

        <Field title={i18n.t('releases.verify.heading.telephoneNumber')} className="verify-data no-margin-bottom">
          {phoneNumbers}
        </Field>

        <Field title={i18n.t('releases.verify.heading.changeInformation')} titleSize="h2">
          <Link to="/form/identification" className="usa-button">
            <span>{i18n.t('releases.verify.label.changeInformation')}</span>
            <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
          </Link>
        </Field>

        <Field title={i18n.t('releases.verify.heading.currentAddress')} className="verify-data no-margin-bottom">
          {residence}
        </Field>

        <Field title={i18n.t('releases.verify.heading.changeAddress')}
                titleSize="h2">
          <Link to="/form/history/residence" className="usa-button">
            <span>{i18n.t('releases.verify.label.changeAddress')}</span>
            <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
          </Link>
        </Field>
      </div>
    )
  }
}

Verify.defaultProps = {
  identification: {},
  history: {}
}
