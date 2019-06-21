// TODO: tmp since destructuring causes some naming conflicts with components
/* eslint react/destructuring-assignment: 0 */

import React from 'react'

import i18n from 'util/i18n'

import {
  Name,
  DateRange,
  Field,
  NotApplicable,
  Telephone,
  Email,
  Text,
  Location,
  Show,
  CheckboxGroup,
  Checkbox,
} from 'components/Form'

export default class Person extends React.Component {
  update = (queue) => {
    const { onUpdate } = this.props

    onUpdate({
      Name: this.props.Name,
      Dates: this.props.Dates,
      Rank: this.props.Rank,
      RankNotApplicable: this.props.RankNotApplicable,
      Relationship: this.props.Relationship,
      RelationshipOther: this.props.RelationshipOther,
      MobileTelephone: this.props.MobileTelephone,
      OtherTelephone: this.props.OtherTelephone,
      Email: this.props.Email,
      EmailNotApplicable: this.props.EmailNotApplicable,
      Address: this.props.Address,
      ...queue,
    })
  }

  updateName = (values) => {
    this.update({
      Name: values,
    })
  }

  updateDates = (values) => {
    this.update({
      Dates: values,
    })
  }

  updateRank = (values) => {
    this.update({
      Rank: values,
    })
  }

  updateRankNotApplicable = (values) => {
    this.update({
      Rank: values.applicable ? this.props.Rank : {},
      RankNotApplicable: values,
    })
  }

  updateRelationship = (values) => {
    const relations = values.value
    const currentRelationships = (this.props.Relationship || {}).values || []
    const selected = [...currentRelationships]

    if (selected.includes(relations)) {
      // Remove the relationship if it was previously selected
      selected.splice(selected.indexOf(relations), 1)
    } else {
      // Add the new relationship
      selected.push(relations)
    }

    this.update({
      Relationship: {
        values: selected,
      },
    })
  }

  updateRelationshipOther = (values) => {
    this.update({
      RelationshipOther: values,
    })
  }

  updateMobileTelephone = (values) => {
    this.update({
      MobileTelephone: values,
    })
  }

  updateOtherTelephone = (values) => {
    this.update({
      OtherTelephone: values,
    })
  }

  updateEmail = (values) => {
    this.update({
      Email: values,
    })
  }

  updateEmailNotApplicable = (values) => {
    this.update({
      Email: {},
      EmailNotApplicable: values,
    })
  }

  updateAddress = (values) => {
    this.update({
      Address: values,
    })
  }

  render() {
    return (
      <div className="person">
        <Field
          title={i18n.t('relationships.people.person.heading.knownDates')}
          help="relationships.people.person.help.knownDates"
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="daterange"
        >
          <DateRange
            name="Dates"
            className="known-dates"
            minDateEqualTo
            {...this.props.Dates}
            onUpdate={this.updateDates}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('relationships.people.person.heading.name')}
          optional
          filterErrors={Name.requiredErrorsOnly}
          scrollIntoView={this.props.scrollIntoView}
        >
          <Name
            name="Name"
            className="name"
            {...this.props.Name}
            onUpdate={this.updateName}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Field>

        <Field
          title={i18n.t('relationships.people.person.heading.rank')}
          scrollIntoView={this.props.scrollIntoView}
        >
          <NotApplicable
            name="RankNotApplicable"
            className="rank-notapplicable"
            {...this.props.RankNotApplicable}
            label={i18n.t(
              'relationships.people.person.label.idk'
            )}
            or={i18n.m('relationships.people.person.label.or')}
            onError={this.props.onError}
            onUpdate={this.updateRankNotApplicable}
          >
            <Text
              name="Rank"
              className="rank"
              {...this.props.Rank}
              onUpdate={this.updateRank}
              onError={this.props.onError}
              required={
                (this.props.RankNotApplicable || {}).applicable
                && this.props.required
              }
            />
          </NotApplicable>
        </Field>

        <Field
          title={i18n.t('relationships.people.person.heading.relationship')}
          className="relationships"
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="labels"
        >
          {/* eslint jsx-a11y/label-has-associated-control: 0 */}
          {/* eslint jsx-a11y/label-has-for: 0 */}
          <label>
            {i18n.t('relationships.people.person.label.relationship.title')}
          </label>
          <CheckboxGroup
            className="relationship option-list eapp-extend-labels option-list-vertical"
            required={this.props.required}
            onError={this.props.onError}
            selectedValues={this.props.Relationship.values}
          >
            <Checkbox
              name="relationship-neighbor"
              label={i18n.t(
                'relationships.people.person.label.relationship.neighbor'
              )}
              value="Neighbor"
              onError={this.props.onError}
              onUpdate={this.updateRelationship}
            />
            <Checkbox
              name="relationship-friend"
              label={i18n.t('relationships.people.person.label.relationship.friend')}
              value="Friend"
              onError={this.props.onError}
              onUpdate={this.updateRelationship}
            />
            <Checkbox
              name="relationship-landlord"
              label={i18n.t('relationships.people.person.label.relationship.workAssociate')}
              value="WorkAssociate"
              onError={this.props.onError}
              onUpdate={this.updateRelationship}
            />
            <Checkbox
              name="relationship-business"
              label={i18n.t('relationships.people.person.label.relationship.schoolmate')}
              value="Schoolmate"
              onError={this.props.onError}
              onUpdate={this.updateRelationship}
            />
            <Checkbox
              name="relationship-other"
              label={i18n.t('relationships.people.person.label.relationship.other')}
              value="Other"
              onError={this.props.onError}
              onUpdate={this.updateRelationship}
            />
          </CheckboxGroup>

          <Show
            when={((this.props.Relationship || {}).values || []).includes(
              'Other'
            )}
          >
            <Field
              title={i18n.t('relationships.people.person.label.relationship.explanation')}
              titleSize="label"
              adjustFor="text"
              scrollIntoView={this.props.scrollIntoView}
            >
              <Text
                name="RelationshipOther"
                maxlength="100"
                className="relationship-other"
                {...this.props.RelationshipOther}
                onUpdate={this.updateRelationshipOther}
                onError={this.props.onError}
                required={this.props.required}
              />
            </Field>
          </Show>
        </Field>

        <Field
          title={i18n.t('relationships.people.person.heading.mobileTelephone')}
          className="mobile-telephone override-required"
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="telephone"
        >
          <Telephone
            name="MobileTelephone"
            {...this.props.MobileTelephone}
            onUpdate={this.updateMobileTelephone}
            onError={this.props.onError}
            required={this.props.required}
            allowNotApplicable={this.props.OtherTelephone && !this.props.OtherTelephone.noNumber}
          />
        </Field>

        <Field
          title={i18n.t('relationships.people.person.heading.otherTelephone')}
          className="other-telephone override-required"
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="telephone"
        >
          <Telephone
            name="OtherTelephone"
            {...this.props.OtherTelephone}
            onUpdate={this.updateOtherTelephone}
            onError={this.props.onError}
            required={this.props.required}
            allowNotApplicable={this.props.MobileTelephone && !this.props.MobileTelephone.noNumber}
          />
        </Field>

        <Field
          title={i18n.t('relationships.people.person.heading.email')}
          scrollIntoView={this.props.scrollIntoView}
        >
          <NotApplicable
            name="EmailNotApplicable"
            className="email-notapplicable"
            {...this.props.EmailNotApplicable}
            label={i18n.t(
              'relationships.people.person.label.idk'
            )}
            or={i18n.m('relationships.people.person.label.or')}
            onError={this.props.onError}
            onUpdate={this.updateEmailNotApplicable}
          >
            <Email
              name="Email"
              className="email"
              {...this.props.Email}
              onUpdate={this.updateEmail}
              onError={this.props.onError}
              required={
                (this.props.EmailNotApplicable || {}).applicable
                && this.props.required
              }
            />
          </NotApplicable>
        </Field>

        <Field
          title={i18n.t('relationships.people.person.heading.address')}
          optional
          help="relationships.people.person.help.address"
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="address"
        >
          <Location
            name="Address"
            label={i18n.t('relationships.people.person.label.address')}
            className="address"
            {...this.props.Address}
            addressBooks={this.props.addressBooks}
            addressBook={this.props.addressBook}
            dispatch={this.props.dispatch}
            layout={Location.ADDRESS}
            geocode
            showPostOffice
            onUpdate={this.updateAddress}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>
      </div>
    )
  }
}

Person.defaultProps = {
  Relationship: { values: [] },
  RankNotApplicable: { applicable: true },
  EmailNotApplicable: { applicable: true },
  addressBooks: {},
  addressBook: 'Reference',
  dispatch: () => {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
}
