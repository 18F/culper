import React from 'react'
import { Link } from 'react-router'
import { i18n } from '../../../config'
import { FullName, OtherNames, DateOfBirth, SSN, Telephone } from './helpers'

export default class Verify extends React.Component {
  render () {
    const identification = this.props.identification || {}
    const fullname = identification.ApplicantName || {}
    const otherNames = identification.OtherNames || {}
    const dateOfBirth = identification.ApplicantBirthDate || {}
    const ssn = identification.ApplicantSSN || {}
    const phoneNumbers = (identification.Contacts || {}).PhoneNumbers

    return (
      <div className="verify">
        <h2>{ i18n.t('releases.verify.heading.title') }</h2>

        <div className="verify-data">
          <FullName Name={fullname} />
        </div>

        <div className="verify-data">
          <OtherNames OtherNames={otherNames} />
        </div>

        <div className="verify-data">
          <DateOfBirth Date={dateOfBirth} />
        </div>

        <div className="verify-data">
          <SSN SSN={ssn} />
        </div>

        <div className="verify-data">
          <Telephone Numbers={phoneNumbers} />
        </div>

        <div className="change-info">
          <h2>{ i18n.t('releases.verify.heading.changeInformation') }</h2>
          <Link to="/form/identification">
            <button>
              {i18n.t('releases.verify.label.changeInformation')}
              <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
            </button>

          </Link>

          <h2>{ i18n.t('releases.verify.heading.changeAddress') }</h2>
          <Link to="/form/history/residence">
            <button>{i18n.t('releases.verify.label.changeAddress')}</button>
          </Link>
        </div>

      </div>
    )
  }
}

Verify.defaultProps = {}

