import React from 'react'
import { Link } from 'react-router-dom'
import { i18n } from '../../../config'
import { updateSection } from '../../../actions/SectionActions'
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
  primaryName () {
    const identification = this.props.Identification || {}
    return NameSummary((identification.ApplicantName || {}).Name, i18n.t('releases.verify.label.none'))
  }

  secondaryNames () {
    const identification = this.props.Identification || {}
    const items = ((identification.OtherNames || {}).List || { items: [] }).items || []
    return items.length
      ? items.map(n => { return NameSummary(n.Item.Name, i18n.t('releases.verify.label.none')) })
      : i18n.t('releases.verify.label.none')
  }

  dateOfBirth () {
    const identification = this.props.Identification || {}
    const date = (identification.ApplicantBirthDate || {}).Date
    return DateSummary(date, i18n.t('releases.verify.label.none'), true) || <span>{i18n.t('releases.verify.label.none')}</span>
  }

  social () {
    const identification = this.props.Identification || {}
    const ssn = identification.ApplicantSSN || {}
    return SSN(ssn, i18n.t('releases.verify.label.none'))
  }

  telephone () {
    const identification = this.props.Identification || {}
    const items = ((identification.Contacts || {}).PhoneNumbers || {}).items || []
    const filtered = items.filter(x => {
      const item = x.Item || {}
      return (item.Telephone && (item.Telephone.number || '').trim()) || item.noNumber
    })
    return filtered.length
      ? filtered.map(n => {
        return <div>{ TelephoneSummary(n.Item.Telephone, i18n.t('releases.verify.label.none')) }</div>
      })
      : i18n.t('releases.verify.label.none')
  }

  residence () {
    const history = this.props.History || {}
    const items = ((history.Residence || {}).List || {}).items || []
    const residences = items
          .filter(n => !n.Item.type || (n.Item.type && n.Item.type !== 'Gap'))
          .sort(sort)
          .map(n => {
            return AddressSummary(n.Item.Address, i18n.t('releases.verify.label.none'))
          })
    return residences.length === 0
      ? <span>{i18n.t('releases.verify.label.none')}</span>
      : residences[0]
  }

  clicked (section, subsection, event) {
    this.props.dispatch(updateSection(section, subsection))
  }

  render () {
    const identification = this.props.Identification || {}
    const name = this.primaryName()
    const othernames = this.secondaryNames()
    const dob = this.dateOfBirth()
    const ssn = this.social()
    const phoneNumbers = this.telephone()
    const currentResidence = this.residence()

    return (
      <div className="verify">
        <Field title={i18n.t('releases.verify.heading.title')}
               titleSize="h2"
               optional={true}
               className="release-title no-margin-bottom" />

        <Field title={i18n.t('releases.verify.heading.name')}
               titleSize="h5"
               optional={true}
               className="release-name verify-data no-margin-bottom">
          {wrapSpans(name)}
        </Field>

        <Field title={i18n.t('releases.verify.heading.otherNamesUsed')}
               titleSize="h5"
               optional={true}
               className="release-aliases verify-data no-margin-bottom">
          {wrapSpans(othernames)}
        </Field>

        <Field title={i18n.t('releases.verify.heading.dateOfBirth')}
               titleSize="h5"
               optional={true}
               className="release-dob verify-data no-margin-bottom">
          {wrapSpans(dob)}
        </Field>

        <Field title={i18n.t('releases.verify.heading.ssn')}
               titleSize="h5"
               optional={true}
               className="release-ssn verify-data no-margin-bottom">
          {wrapSpans(ssn)}
        </Field>

        <Field title={i18n.t('releases.verify.heading.telephoneNumber')}
               titleSize="h5"
               optional={true}
               className="release-telephone verify-data no-margin-bottom">
          {wrapSpans(phoneNumbers)}
        </Field>

        <Field optional={true}
               className="release-fix-information">
          <Link to="/form/identification" className="usa-button" onClick={this.clicked.bind(this, 'identification', 'intro')}>
            <span>{i18n.t('releases.verify.label.changeInformation')}</span>
            <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
          </Link>
        </Field>

        <Field title={i18n.t('releases.verify.heading.currentAddress')}
               optional={true}
               className="release-current-address verify-data no-margin-bottom">
          {wrapSpans(currentResidence)}
        </Field>

        <Field optional={true}
               className="release-fix-current-address">
          <Link to="/form/history/residence" className="usa-button" onClick={this.clicked.bind(this, 'history', 'residence')}>
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
  history: {},
  dispatch: (action) => {}
}
