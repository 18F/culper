import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'

import ApplicantName from '../Identification/ApplicantName'
import ApplicantSSN from '../Identification/ApplicantSSN'
import ApplicantBirthPlace from '../Identification/ApplicantBirthPlace'
import ApplicantBirthDate from '../Identification/ApplicantBirthDate'
import OtherNames from '../Identification/OtherNames'
import Physical from '../Identification/Physical'
import ContactInformation from '../Identification/ContactInformation'
import AuthenticatedView from '../../../views/AuthenticatedView'

// Financial
import Gambling from '../Financial/Gambling'
import Bankruptcies from '../Financial/Bankruptcy'
import Taxes from '../Financial/Taxes'
import Card from '../Financial/Card'
import Credit from '../Financial/Credit'
import Delinquent from '../Financial/Delinquent'
import Nonpayment from '../Financial/Nonpayment'

import Relatives from '../Relationships/Relatives'
import Marital from '../Relationships/RelationshipStatus/Marital'
import Cohabitants from '../Relationships/RelationshipStatus/Cohabitants'
import People from '../Relationships/People'

class Print extends SectionElement {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name=""
            back=""
            backLabel=""
            next=""
            nextLabel={ i18n.t('releases.destination.generalMedical') }>
            <ApplicantName name="name"
              value={this.props.ApplicantName}
              required={true}
              scrollIntoView={false}
            />
            <hr />
            <ContactInformation name="contacts"
              {...this.props.Contacts}
              onUpdate={this.handleUpdate.bind(this, 'Contacts')}
              required={true}
              scrollIntoView={false}
              dispatch={this.props.dispatch}
              onError={this.handleError}
            />
            <hr />
            <OtherNames name="othernames"
              {...this.props.OtherNames}
              defaultState={false}
              required={true}
              scrollIntoView={false}
            />
            <hr />
            <ApplicantBirthDate name="birthdate"
              value={this.props.ApplicantBirthDate}
              required={true}
              scrollIntoView={false}
            />
            <hr />
            <ApplicantBirthPlace name="birthplace"
              value={this.props.ApplicantBirthPlace}
              required={true}
              scrollIntoView={false}
            />
            <hr />
            <ApplicantSSN name="ssn"
              {...this.props.ApplicantSSN}
              required={true}
              scrollIntoView={false}
            />
            <hr />
            <Physical name="physical"
              {...this.props.Physical}
              required={true}
              scrollIntoView={false}
            />

          { this.relationships() }
          { this.financial() }
          </SectionView>
        </SectionViews>
      </div>
    )
  }

  relationships () {
    return (
      <div>
        <Marital name="marital"
          {...this.props.Marital}
          defaultState={false}
          addressBooks={this.props.AddressBooks}
          dispatch={this.props.dispatch}
          onUpdate={this.updateMarital}
          onError={this.handleError}
          onSpouseUpdate={this.updateSpouse}
          currentAddress={this.props.CurrentAddress}
          required={true}
          scrollIntoView={false}
        />
        <hr/>
        <Cohabitants name="cohabitants"
          {...this.props.Cohabitants}
          defaultState={false}
          spouse={this.props.Spouse}
          dispatch={this.props.dispatch}
          onUpdate={this.updateCohabitants}
          onError={this.handleError}
          required={true}
          scrollIntoView={false}
        />
        <hr/>
        <People name="people"
          {...this.props.People}
          defaultState={false}
          addressBooks={this.props.AddressBooks}
          dispatch={this.props.dispatch}
          onUpdate={this.updatePeople}
          onError={this.handleError}
          required={true}
          scrollIntoView={false}
        />
        <hr/>
        <Relatives name="relatives"
          {...this.props.Relatives}
          defaultState={false}
          addressBooks={this.props.AddressBooks}
          dispatch={this.props.dispatch}
          onUpdate={this.updateRelatives}
          onError={this.handleError}
          required={true}
          scrollIntoView={false}
        />
      </div>
    )
  }

  history () {
    return (
      <div>
      </div>
    )
  }

  financial () {
    return (
      <div>
        <Bankruptcies name="bankruptcy"
          {...this.props.Bankruptcy}
          addressBooks={this.props.AddressBooks}
          dispatch={this.props.dispatch}
          onUpdate={this.handleUpdate.bind(this, 'Bankruptcy')}
          onError={this.handleError}
          defaultState={true}
          required={true}
          scrollIntoView={false}
        />
        <hr />
        <Gambling name="gambling"
          {...this.props.Gambling}
          dispatch={this.props.dispatch}
          onUpdate={this.handleUpdate.bind(this, 'Gambling')}
          onError={this.handleError}
          defaultState={true}
          required={true}
          scrollIntoView={false}
        />

      <hr />
      <Taxes name="taxes"
        {...this.props.Taxes}
        dispatch={this.props.dispatch}
        onUpdate={this.handleUpdate.bind(this, 'Taxes')}
        onError={this.handleError}
        defaultState={true}
        required={true}
        scrollIntoView={false}
      />
      <hr />
      <Card name="card"
        {...this.props.Card}
        addressBooks={this.props.AddressBooks}
        dispatch={this.props.dispatch}
        onUpdate={this.handleUpdate.bind(this, 'Card')}
        onError={this.handleError}
        defaultState={true}
        required={true}
        scrollIntoView={false}
      />

      <hr />
      <Credit name="credit"
        {...this.props.Credit}
        addressBooks={this.props.AddressBooks}
        dispatch={this.props.dispatch}
        onUpdate={this.handleUpdate.bind(this, 'Credit')}
        onError={this.handleError}
        defaultState={true}
        required={true}
        scrollIntoView={false}
      />

    <hr />
    <Delinquent name="delinquent"
      {...this.props.Delinquent}
      addressBooks={this.props.AddressBooks}
      dispatch={this.props.dispatch}
      onUpdate={this.handleUpdate.bind(this, 'Delinquent')}
      onError={this.handleError}
      defaultState={true}
      required={true}
      scrollIntoView={false}
    />

    <hr />
    <Nonpayment name="nonpayment"
      {...this.props.Nonpayment}
      dispatch={this.props.dispatch}
      onUpdate={this.handleUpdate.bind(this, 'Nonpayment')}
      onError={this.handleError}
      defaultState={true}
      required={true}
      scrollIntoView={false}
    />
    </div>
    )
  }
}

function mapStateToProps (state) {
  const app = state.application || {}
  const identification = app.Identification || {}
  const relationships = app.Relationships || {}
  const financial = app.Financial || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Application: app || {},
    Identification: identification,
    ApplicantName: identification.ApplicantName || {},
    ApplicantBirthPlace: identification.ApplicantBirthPlace || {},
    ApplicantSSN: identification.ApplicantSSN || {},
    OtherNames: identification.OtherNames || {},
    Contacts: identification.Contacts || {},
    Physical: identification.Physical || {},

    // Relationships
    Relationships: relationships,
    Relatives: relationships.Relatives || {},
    Marital: relationships.Marital || {},
    Cohabitants: relationships.Cohabitants || {},
    People: relationships.People || {},

    // Financial
    Financial: financial,
    Gambling: financial.Gambling || {},
    Bankruptcy: financial.Bankruptcy || {},
    Taxes: financial.Taxes || {},
    Card: financial.Card || {},
    Credit: financial.Credit || {},
    Delinquent: financial.Delinquent || {},
    Nonpayment: financial.Nonpayment || {},
    Errors: errors.releases || [],
    Completed: completed.releases || []
  }
}

Print.defaultProps = {
  section: 'print',
  store: 'Print'
}

export default connect(mapStateToProps)(AuthenticatedView(Print))
