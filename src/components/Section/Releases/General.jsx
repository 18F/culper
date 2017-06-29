import React from 'react'
import { Link } from 'react-router'
import { i18n } from '../../../config'
import { DateRange, ValidationElement, Text, Field, Textarea, DateControl } from '../../Form'
import { FullName, OtherNames, DateOfBirth, SSN, Telephone } from './helpers'

export default class General extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateDate = this.updateDate.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        Name: this.props.Name,
        Date: this.props.Date,
        ...updateValues
      })
    }
  }

  updateName (values) {
    this.update({ Name: values })
  }

  updateDate (values) {
    this.update({ Date: values })
  }

  render () {
    const fullname = this.props.identification.ApplicantName || {}
    const otherNames = this.props.identification.OtherNames || {}
    const dateOfBirth = this.props.identification.ApplicantBirthDate || {}
    const ssn = this.props.identification.ApplicantSSN || {}
    const phoneNumbers = (this.props.identification.Contacts || {}).PhoneNumbers

    return (
      <div className="credit-release">

        <h2>{ i18n.t('releases.verify.heading.title') }</h2>
        <FullName Name={fullname} />
        <OtherNames OtherNames={otherNames} />
        <DateOfBirth Date={dateOfBirth} />
        <SSN SSN={ssn} />
        <Telephone Numbers={phoneNumbers} />

        <h2>{ i18n.t('releases.verify.heading.changeInformation') }</h2>
        <Link to="/form/identification">
          <button>{i18n.t('releases.verify.label.changeInformation')}</button>
        </Link>

        { i18n.m('releases.general.contents') }

        <Text name="fullname"
          className="fullname"
          label={i18n.t('releases.verify.label.name')}
          onUpdate={this.updateName}
        />

        <DateControl name="date"
          className="date"
          onUpdate={this.updateDate}
        />
      </div>
    )
  }
}

General.defaultProps = {
  onError: (value, arr) => { return arr }
}
