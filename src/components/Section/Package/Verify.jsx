import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { i18n } from 'config'
import { Field } from 'components/Form'
import {
  NameSummary,
  DateSummary,
  AddressSummary,
  TelephoneSummary,
} from 'components/Summary'

import { SSN } from './helpers'
import { sort } from '../History/helpers'

const wrapSpans = (text) => {
  if (text === '') {
    return <span />
  }

  const typeOf = Object.prototype.toString.call(text)
  if (typeOf === '[object String]') {
    return <span>{text}</span>
  }

  if (typeOf === '[object Array]') {
    return text.map(t => wrapSpans(t))
  }

  return text
}

export default class Verify extends React.Component {
  primaryName() {
    const { Identification } = this.props
    return NameSummary(
      (Identification.ApplicantName || {}).Name,
      i18n.t('releases.verify.label.none')
    )
  }

  secondaryNames() {
    const { Identification } = this.props
    const items = ((Identification.OtherNames || {}).List || { items: [] }).items || []
    return items.length
      ? items.map(n => NameSummary(n.Item.Name, i18n.t('releases.verify.label.none')))
      : i18n.t('releases.verify.label.none')
  }

  dateOfBirth() {
    const { Identification } = this.props
    const date = (Identification.ApplicantBirthDate || {}).Date
    return (
      DateSummary(date, i18n.t('releases.verify.label.none'), true) || (
        <span>{i18n.t('releases.verify.label.none')}</span>
      )
    )
  }

  social() {
    const { Identification } = this.props
    const ssn = Identification.ApplicantSSN || {}
    return SSN(ssn, i18n.t('releases.verify.label.none'))
  }

  telephone() {
    const { Identification } = this.props
    const items = ((Identification.Contacts || {}).PhoneNumbers || {}).items || []

    const filtered = items.filter((x) => {
      const item = x.Item || {}
      return (
        (item.Telephone && (item.Telephone.number || '').trim())
        || item.noNumber
      )
    })

    return filtered.length
      ? filtered.map((n, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i}>
          {TelephoneSummary(
            n.Item.Telephone,
            i18n.t('releases.verify.label.none')
          )}
        </div>
      ))
      : i18n.t('releases.verify.label.none')
  }

  residence() {
    const { History } = this.props
    const items = ((History.Residence || {}).List || {}).items || []
    const residences = items
      .sort(sort)
      .map(n => AddressSummary(
        n.Item.Address,
        i18n.t('releases.verify.label.none')
      ))

    return residences.length === 0 ? (
      <span>{i18n.t('releases.verify.label.none')}</span>
    ) : (
      residences[0]
    )
  }

  render() {
    const name = this.primaryName()
    const othernames = this.secondaryNames()
    const dob = this.dateOfBirth()
    const ssn = this.social()
    const phoneNumbers = this.telephone()
    const currentResidence = this.residence()

    return (
      <div className="verify">
        <Field
          title={i18n.t('releases.verify.heading.title')}
          titleSize="h4"
          optional={true}
          className="release-title no-margin-bottom"
        />

        <Field
          title={i18n.t('releases.verify.heading.name')}
          titleSize="h5"
          optional={true}
          className="release-name verify-data no-margin-bottom"
        >
          {wrapSpans(name)}
        </Field>

        <Field
          title={i18n.t('releases.verify.heading.otherNamesUsed')}
          titleSize="h5"
          optional={true}
          className="release-aliases verify-data no-margin-bottom"
        >
          {wrapSpans(othernames)}
        </Field>

        <Field
          title={i18n.t('releases.verify.heading.dateOfBirth')}
          titleSize="h5"
          optional={true}
          className="release-dob verify-data no-margin-bottom"
        >
          {wrapSpans(dob)}
        </Field>

        <Field
          title={i18n.t('releases.verify.heading.ssn')}
          titleSize="h5"
          optional={true}
          className="release-ssn verify-data no-margin-bottom"
        >
          {wrapSpans(ssn)}
        </Field>

        <Field
          title={i18n.t('releases.verify.heading.telephoneNumber')}
          titleSize="h5"
          optional={true}
          className="release-telephone verify-data no-margin-bottom"
        >
          {wrapSpans(phoneNumbers)}
        </Field>

        <Field optional={true} className="release-fix-information">
          <Link to="/form/identification/intro" className="usa-button">
            <span>{i18n.t('releases.verify.label.changeInformation')}</span>
            <i className="fa fa-arrow-circle-right" aria-hidden="true" />
          </Link>
        </Field>

        <Field
          title={i18n.t('releases.verify.heading.currentAddress')}
          optional={true}
          className="release-current-address verify-data no-margin-bottom"
        >
          {wrapSpans(currentResidence)}
        </Field>

        <Field optional={true} className="release-fix-current-address">
          <Link to="/form/history/residence" className="usa-button">
            <span>{i18n.t('releases.verify.label.changeAddress')}</span>
            <i className="fa fa-arrow-circle-right" aria-hidden="true" />
          </Link>
        </Field>
      </div>
    )
  }
}

Verify.propTypes = {
  Identification: PropTypes.object,
  History: PropTypes.object,
}

Verify.defaultProps = {
  Identification: {},
  History: {},
}
