import React from 'react'
import { i18n } from '../../../../config'
import { Name, DateRange, Field, NotApplicable, Telephone, Email, Text, Address, Show, CheckboxGroup, Checkbox, Svg } from '../../../Form'

export default class Person extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      Name: props.Name,
      KnownDates: props.KnownDates,
      Rank: props.Rank,
      RankNotApplicable: props.RankNotApplicable,
      Relationship: props.Relationship,
      RelationshipOther: props.RelationshipOther,
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
    this.updateRelationship = this.updateRelationship.bind(this)
    this.updateRelationshipOther = this.updateRelationshipOther.bind(this)
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
          Name: this.state.Name,
          KnownDates: this.state.KnownDates,
          Rank: this.state.Rank,
          RankNotApplicable: this.state.RankNotApplicable,
          Relationship: this.state.Relationship,
          RelationshipOther: this.state.RelationshipOther,
          MobileTelephone: this.state.MobileTelephone,
          OtherTelephone: this.state.OtherTelephone,
          Email: this.state.Email,
          EmailNotApplicable: this.state.EmailNotApplicable,
          Address: this.state.Address
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

  updateRelationship (event) {
    let relations = event.target.value
    let selected = [...this.state.Relationship]

    if (selected.includes(relations)) {
      // Remove the relationship if it was previously selected
      selected.splice(selected.indexOf(relations), 1)
    } else {
      // Add the new relationship
      selected.push(relations)
    }
    this.update('Relationship', selected)
  }

  updateRelationshipOther (values) {
    this.update('RelationshipOther', values)
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
        <Field title={i18n.t('relationships.people.person.heading.knownDates')}
               help="relationships.people.person.help.knownDates"
               >
          <DateRange name="KnownDates"
                     className="known-dates"
                     {...this.state.KnownDates}
                     onUpdate={this.updateKnownDates}
                     onValidate={this.props.onValidate}
                     />
        </Field>

        <h3>{i18n.t('relationships.people.person.heading.name')}</h3>
        <Name name="Name"
              className="name"
              {...this.state.Name}
              onUpdate={this.updateName}
              onValidate={this.props.onValidate}
              />

        <Field title={i18n.t('relationships.people.person.heading.rank')}
               help="relationships.people.person.help.rank"
               >
          <NotApplicable name="RankNotApplicable"
                         className="rank-notapplicable"
                         {...this.state.RankNotApplicable}
                         label={i18n.t('relationships.people.person.label.rankNotApplicable')}
                         or={i18n.m('relationships.people.person.label.or')}
                         onValidate={this.props.onValidate}
                         onUpdate={this.updateRankNotApplicable}>
            <Text name="Rank"
                  className="rank"
                  {...this.state.Rank}
                  onUpdate={this.updateRank}
                  onValidate={this.props.onValidate}
                  />
          </NotApplicable>
        </Field>

        <Field title={i18n.t(`relationships.people.person.heading.relationship`)}
               className="relationships"
               help={`relationships.people.person.help.relationship`}
               adjustFor="labels"
               shrink={true}>
          <label>{i18n.t(`relationships.people.person.label.relationship.title`)}</label>
          <CheckboxGroup className="relationship option-list eapp-extend-labels"
                         selectedValues={this.state.Relationship}>
            <Checkbox name="relationship-neighbor"
                      label={i18n.t(`relationships.people.person.label.relationship.neighbor`)}
                      value="Neighbor"
                      onValidate={this.props.onValidate}
                      onChange={this.updateRelationship}>
              <div className="relationship-icon neighbor">
                <Svg src="img/neighbor-icon.svg" />
              </div>
            </Checkbox>
            <Checkbox name="relationship-friend"
                      label={i18n.t(`relationships.people.person.label.relationship.friend`)}
                      value="Friend"
                      onValidate={this.props.onValidate}
                      onChange={this.updateRelationship}>
              <div className="relationship-icon friend">
                <Svg src="img/friend-icon.svg" />
              </div>
            </Checkbox>
            <Checkbox name="relationship-landlord"
                      label={i18n.t(`relationships.people.person.label.relationship.landlord`)}
                      value="Landlord"
                      onValidate={this.props.onValidate}
                      onChange={this.updateRelationship}>
              <div className="relationship-icon landlord">
                <Svg src="img/landlord-icon.svg" />
              </div>
            </Checkbox>
            <Checkbox name="relationship-business"
                      label={i18n.t(`relationships.people.person.label.relationship.business`)}
                      value="Business"
                      onValidate={this.props.onValidate}
                      onChange={this.updateRelationship}>
              <div className="relationship-icon business">
                <Svg src="img/business-associate-icon.svg" />
              </div>
            </Checkbox>
            <Checkbox name="relationship-other"
                      label={i18n.t(`relationships.people.person.label.relationship.other`)}
                      value="Other"
                      onValidate={this.props.onValidate}
                      onChange={this.updateRelationship}>
              <div className="relationship-icon other">
                <Svg src="img/other-icon.svg" />
              </div>
            </Checkbox>
          </CheckboxGroup>

          <Show when={this.state.Relationship.includes('Other')}>
            <Text name="RelationshipOther"
                  label={i18n.t(`relationships.people.person.label.relationship.explanation`)}
                  maxlength="100"
                  className="relationship-other"
                  {...this.state.RelationshipOther}
                  onUpdate={this.updateRelationshipOther}
                  onValidate={this.props.onValidate}
                  />
          </Show>
        </Field>

        <Field title={i18n.t('relationships.people.person.heading.mobileTelephone')}
               help={`relationships.people.person.help.mobileTelephone`}
               className="mobile-telephone">
          <Telephone name="MobileTelephone"
                     {...this.state.MobileTelephone}
                     onUpdate={this.updateMobileTelephone}
                     onValidate={this.props.onValidate}
                     />
        </Field>

        <Field title={i18n.t('relationships.people.person.heading.otherTelephone')}
               help={`relationships.people.person.help.otherTelephone`}
               className="other-telephone">
          <Telephone name="OtherTelephone"
                     {...this.state.OtherTelephone}
                     onUpdate={this.updateOtherTelephone}
                     onValidate={this.props.onValidate}
                     />
        </Field>

        <Field title={i18n.t('relationships.people.person.heading.email')}
               help={`relationships.people.person.help.email`}
               >
          <NotApplicable name="EmailNotApplicable"
                         className="email-notapplicable"
                         {...this.state.EmailNotApplicable}
                         label={i18n.t('relationships.people.person.label.emailNotApplicable')}
                         or={i18n.m('relationships.people.person.label.or')}
                         onValidate={this.props.onValidate}
                         onUpdate={this.updateEmailNotApplicable}>
            <Email name="Email"
                   className="email"
                   {...this.state.Email}
                   onUpdate={this.updateEmail}
                   onValidate={this.props.onValidate}
                   />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('relationships.people.person.heading.address')}
               help={`relationships.people.person.help.address`}
               adjustFor="address"
               >
          <Address name="Address"
                   label={i18n.t('relationships.people.person.label.address')}
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

Person.defaultProps = {
  Relationship: []
}
