import React from 'react'
import { Link } from 'react-router-dom'
import { i18n } from '../../../config'
import { SSN } from './helpers'
import { Field } from '../../Form'
import { sort } from '../History/History'
import { NameSummary, DateSummary, AddressSummary, TelephoneSummary } from '../../Summary'

const wrapSpans = (text) => {
  if (text === '') {
    return <span></span>
  }

  const typeOf = Object.prototype.toString.call(text)
  if (typeOf === '[object String]') {
    return <span>{text}</span>
  } else if (typeOf === '[object Array]') {
    return text.map(t => wrapSpans(t))
  }

  return text
}

export default class Verify extends React.Component {
  render () {
    // Identification section
    const identification = this.props.Identification || {}
    const name = NameSummary((identification.ApplicantName || {}).Name, i18n.t('releases.verify.label.none'))
    const othernamesList = (identification.OtherNames || {}).List || []
    const othernames = othernamesList.length
          ? othernamesList.map(n => { return NameSummary(n.Name, i18n.t('releases.verify.label.none')) })
          : i18n.t('releases.verify.label.none')
    const dob = DateSummary(identification.ApplicantBirthDate || {}, i18n.t('releases.verify.label.none'), true) || <span>{i18n.t('releases.verify.label.none')}</span>
    const ssn = SSN(identification.ApplicantSSN || {}, i18n.t('releases.verify.label.none'))
    const phoneNumbersList = (identification.Contacts || {}).PhoneNumbers || []
    const phoneNumbers = phoneNumbersList.length
          ? phoneNumbersList.filter(x => {
            const item = x.Item || {}
            return item.number || item.noNumber
          })
          .map(n => {
            return TelephoneSummary(n, i18n.t('releases.verify.label.none'))
          })
          : i18n.t('releases.verify.label.none')

    // History section
    const residence = ((this.props.History || {}).Residence || [{ Item: {} }])
          .filter(n => !n.type || (n.type && n.type !== 'Gap'))
          .sort(sort)
          .map(n => {
            return AddressSummary(n.Item.Address, i18n.t('releases.verify.label.none'))
          })
    const currentResidence = residence.length === 0
          ? <span>{i18n.t('releases.verify.label.none')}</span>
          : residence[0]

    return (
      <div className="verify">
        <Field title={i18n.t('releases.verify.heading.title')}
               titleSize="h2"
               optional={true}
               className="release-title no-margin-bottom" />

        <Field title={i18n.t('releases.verify.heading.name')}
               optional={true}
               className="release-name verify-data no-margin-bottom">
          {wrapSpans(name)}
        </Field>

        <Field title={i18n.t('releases.verify.heading.otherNamesUsed')}
               optional={true}
               className="release-aliases verify-data no-margin-bottom">
          {wrapSpans(othernames)}
        </Field>

        <Field title={i18n.t('releases.verify.heading.dateOfBirth')}
               optional={true}
               className="release-dob verify-data no-margin-bottom">
          {wrapSpans(dob)}
        </Field>

        <Field title={i18n.t('releases.verify.heading.ssn')}
               optional={true}
               className="release-ssn verify-data no-margin-bottom">
          {wrapSpans(ssn)}
        </Field>

        <Field title={i18n.t('releases.verify.heading.telephoneNumber')}
               optional={true}
               className="release-telephone verify-data no-margin-bottom">
          {wrapSpans(phoneNumbers)}
        </Field>

        <Field title={i18n.t('releases.verify.heading.changeInformation')}
               titleSize="h2"
               optional={true}
               className="release-fix-information">
          <Link to="/form/identification" className="usa-button">
            <span>{i18n.t('releases.verify.label.changeInformation')}</span>
            <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
          </Link>
        </Field>

        <Field title={i18n.t('releases.verify.heading.currentAddress')}
               optional={true}
               className="release-current-address verify-data no-margin-bottom">
          {wrapSpans(currentResidence)}
        </Field>

        <Field title={i18n.t('releases.verify.heading.changeAddress')}
               titleSize="h2"
               optional={true}
               className="release-fix-current-address">
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
