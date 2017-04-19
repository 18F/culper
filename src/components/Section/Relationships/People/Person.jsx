import React from 'react'
import { i18n } from '../../../../config'
import { Name, DateRange, Field, NotApplicable, Telephone, Email, Text, Address } from '../../../Form'

export default class Person extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      Name: props.Name,
      KnownDates: props.KnownDates,
      Rank: props.Rank,
      RankNotApplicable: props.RankNotApplicable,
      MobileTelephone: props.MobileTelephone,
      OtherTelephone: props.OtherTelephone,
      Email: props.Email,
      EmailNotApplicable: props.EmailNotApplicable,
      Address: props.Address
    }

    this.update = this.update.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateKnownDates = this.updateKnownDates.bind(this)
    this.updateRank = this.updateRank.bind(this)
    this.updateRankNotApplicable = this.updateRankNotApplicable.bind(this)
    this.updateMobileTelephone = this.updateMobileTelephone.bind(this)
    this.updateOtherTelephone = this.updateOtherTelephone.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
    this.updateEmailNotApplicable = this.updateEmailNotApplicable.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
  }

  update (name, values, fn) {
    this.setState({ [name]: values }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.name,
          ...this.state
        })
      }
    })
  }

  updateName (values) {
    this.update('Name', values)
  }

  updateKnownDates (values) {
    this.update('KnownDates', values)
  }

  updateRank (values) {
    this.update('Rank', values)
  }

  updateRankNotApplicable (values) {
    this.update('RankNotApplicable', values)
  }

  updateMobileTelephone (values) {
    this.update('MobileTelephone', values)
  }

  updateOtherTelephone (values) {
    this.update('OtherTelephone', values)
  }

  updateEmail (values) {
    this.update('Email', values)
  }

  updateEmailNotApplicable (values) {
    this.update('EmailNotApplicable', values)
  }

  updateAddress (values) {
    this.update('Address', values)
  }

  render () {
    return (
      <div className="person">
        <Field title={i18n.t('relationships.person.heading.knownDates')}>
          {i18n.m('relationships.relatives.para.alias')}
          <DateRange name="KnownDates"
            className="known-dates"
            {...this.state.KnownDates}
            onUpdate={this.updateKnownDates}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t('relationships.person.heading.name')}>
          <Name name="Name"
            className="name"
            {...this.state.Name}
            onUpdate={this.updateName}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t('relationships.person.heading.rank')}>
          <NotApplicable name="RankNotApplicable"
            className="rank-notapplicable"
            {...this.state.RankNotApplicable}
            label={i18n.t('relationships.person.label.rankNotApplicable')}
            or={i18n.m('relationships.person.label.or')}
            onUpdate={this.updateRankNotApplicable}>
            <Text name="Rank"
              className="rank"
              {...this.state.Rank}
              onUpdate={this.updateRank}
              onValidate={this.props.onValidate}
            />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('relationships.person.heading.mobileTelephone')} className="mobile-telephone">
          <Telephone name="MobileTelephone"
            {...this.state.MobileTelephone}
            onUpdate={this.updateMobileTelephone}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t('relationships.person.heading.otherTelephone')} className="other-telephone">
          <Telephone name="OtherTelephone"
            {...this.state.OtherTelephone}
            onUpdate={this.updateOtherTelephone}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t('relationships.person.heading.email')}>
          <NotApplicable name="EmailNotApplicable"
            className="email-notapplicable"
            {...this.state.EmailNotApplicable}
            label={i18n.t('relationships.person.label.emailNotApplicable')}
            or={i18n.m('relationships.person.label.or')}
            onUpdate={this.updateEmailNotApplicable}>
            <Email name="Email"
              className="email"
              {...this.state.Email}
              onUpdate={this.updateEmail}
              onValidate={this.props.onValidate}
            />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('relationships.person.heading.address')}>
          <Address name="Address"
            className="address"
            {...this.state.Address}
            onUpdate={this.updateAddress}
            onValidate={this.props.onValidate}
          />
        </Field>
      </div>
    )
  }
}

Person.defaultProps = {}
