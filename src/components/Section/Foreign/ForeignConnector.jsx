import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  selectForeignContactsSection,
  selectForeignActivitiesSection,
  selectForeignBusinessSection,
  selectForeignTravelSection,
  selectForeignCounterIntelligence,
  selectForeignExcessiveKnowledge,
  selectForeignSensitiveInformation,
  selectForeignThreatened,
} from 'selectors/branches'

import {
  updateApplication,
  reportErrors,
} from 'actions/ApplicationActions'

const connectForeignSection = (Component, {
  section, subsection, store, storeKey,
}) => {
  class ConnectedForeignSection extends React.Component {
    constructor(props) {
      super(props)

      this.section = section
      this.subsection = subsection
      this.store = store
    }

    handleError = (value, arr) => {
      const { dispatch } = this.props
      const action = reportErrors(this.section, this.subsection, arr)
      dispatch(action)
      return arr
    }

    handleUpdate = (field, values) => {
      const { dispatch } = this.props
      dispatch(updateApplication(this.store, field, values))
    }

    render() {
      return (
        <Component
          onUpdate={this.handleUpdate}
          onError={this.handleError}
          {...this.props}
        />
      )
    }
  }

  ConnectedForeignSection.propTypes = {
    dispatch: PropTypes.func.isRequired, // Passed in via connect (below)
  }

  const mapStateToProps = (state) => {
    const app = state.application || {}
    const identification = app.Identification || {}
    const foreign = app.Foreign || {}
    const errors = app.Errors || {}
    const completed = app.Completed || {}

    const applicantBirthdate = (identification.ApplicantBirthDate || {}).Date

    switch (storeKey) {
      case 'Contacts':
        return {
          ...foreign.Contacts,
          applicantBirthdate,
        }

      case 'DirectActivity':
        return { ...foreign.DirectActivity } || {}
      case 'IndirectActivity':
        return { ...foreign.IndirectActivity } || {}
      case 'RealEstateActivity':
        return { ...foreign.RealEstateActivity } || {}
      case 'BenefitActivity':
        return { ...foreign.BenefitActivity } || {}
      case 'Support':
        return { ...foreign.Support } || {}
      case 'Advice':
        return { ...foreign.Advice } || {}
      case 'Family':
        return { ...foreign.Family } || {}
      case 'Employment':
        return { ...foreign.Employment } || {}
      case 'Ventures':
        return { ...foreign.Ventures } || {}
      case 'Conferences':
        return { ...foreign.Conferences } || {}
      case 'Contact':
        return { ...foreign.Contact } || {}
      case 'Sponsorship':
        return {
          ...foreign.Sponsorship,
          applicantBirthdate,
        }

      case 'Political':
        return { ...foreign.Political } || {}
      case 'Voting':
        return { ...foreign.Voting } || {}
      case 'Travel':
        return {
          ...foreign.Travel,
          ...selectForeignCounterIntelligence(state),
          ...selectForeignExcessiveKnowledge(state),
          ...selectForeignSensitiveInformation(state),
          ...selectForeignThreatened(state),
        } || {}
      default:
        return {
          Application: app,
          Foreign: foreign,
          Contacts: foreign.Contacts,
          DirectActivity: foreign.DirectActivity,
          IndirectActivity: foreign.IndirectActivity,
          RealEstateActivity: foreign.RealEstateActivity,
          BenefitActivity: foreign.BenefitActivity,
          Support: foreign.Support,
          Advice: foreign.Advice,
          Family: foreign.Family,
          Employment: foreign.Employment,
          Ventures: foreign.Ventures,
          Conferences: foreign.Ventures,
          Contact: foreign.Contact,
          Sponsorship: foreign.Sponsorship,
          Political: foreign.Political,
          Voting: foreign.Voting,
          Travel: foreign.Travel,
          Errors: errors.foreign || [],
          Completed: completed.foreign || [],
          ...selectForeignContactsSection(state),
          ...selectForeignActivitiesSection(state),
          ...selectForeignBusinessSection(state),
          ...selectForeignTravelSection(state),
          ...selectForeignCounterIntelligence(state),
          ...selectForeignExcessiveKnowledge(state),
          ...selectForeignSensitiveInformation(state),
          ...selectForeignThreatened(state),
        }
    }
  }

  return connect(mapStateToProps)(ConnectedForeignSection)
}

export default connectForeignSection
