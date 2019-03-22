import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  updateApplication,
  reportErrors,
} from 'actions/ApplicationActions'

const connectLegalSection = (Component, {
  section, subsection, store, storeKey,
}) => {
  class ConnectedLegalSection extends React.Component {
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

  ConnectedLegalSection.propTypes = {
    dispatch: PropTypes.func, // Passed in via connect (below)
  }

  ConnectedLegalSection.defaultProps = {
    dispatch: () => {},
  }

  const mapStateToProps = (state) => {
    const app = state.application || {}
    const legal = app.Legal || {}
    const errors = app.Errors || {}
    const completed = app.Completed || {}
    const addressBooks = app.AddressBooks || {}

    switch (storeKey) {
      case 'PoliceOffenses':
        return { ...legal.PoliceOffenses, addressBooks } || {}
      case 'PoliceOtherOffenses':
        return { ...legal.PoliceOtherOffenses, addressBooks } || {}
      case 'PoliceDomesticViolence':
        return { ...legal.PoliceDomesticViolence, addressBooks } || {}
      case 'History':
        return { ...legal.History } || {}
      case 'Revoked':
        return { ...legal.Revoked } || {}
      case 'Debarred':
        return { ...legal.Debarred } || {}
      case 'NonCriminalCourtActions':
        return { ...legal.NonCriminalCourtActions, addressBooks } || {}
      case 'Unauthorized':
        return { ...legal.Unauthorized, addressBooks } || {}
      case 'Manipulating':
        return { ...legal.Manipulating, addressBooks } || {}
      case 'Unlawful':
        return { ...legal.Unlawful, addressBooks } || {}
      case 'TerroristOrganization':
        return { ...legal.TerroristOrganization, addressBooks } || {}
      case 'EngagedInTerrorism':
        return { ...legal.EngagedInTerrorism } || {}
      case 'Advocating':
        return { ...legal.Advocating } || {}
      case 'MembershipOverthrow':
        return { ...legal.MembershipOverthrow, addressBooks } || {}
      case 'MembershipViolence':
        return { ...legal.MembershipViolence, addressBooks } || {}
      case 'ActivitiesToOverthrow':
        return { ...legal.ActivitiesToOverthrow } || {}
      case 'TerrorismAssociation':
        return { ...legal.TerrorismAssociation } || {}

      default:
        return {
          Legal: legal,
          PoliceOffenses: legal.PoliceOffenses || {},
          PoliceOtherOffenses: legal.PoliceOtherOffenses || {},
          PoliceDomesticViolence: legal.PoliceDomesticViolence || {},
          History: legal.History || {},
          Revoked: legal.Revoked || {},
          Debarred: legal.Debarred || {},
          NonCriminalCourtActions: legal.NonCriminalCourtActions || {},
          Unauthorized: legal.Unauthorized || {},
          Manipulating: legal.Manipulating || {},
          Unlawful: legal.Unlawful || {},
          TerroristOrganization: legal.TerroristOrganization || {},
          EngagedInTerrorism: legal.EngagedInTerrorism || {},
          Advocating: legal.Advocating || {},
          MembershipOverthrow: legal.MembershipOverthrow || {},
          MembershipViolence: legal.MembershipViolence || {},
          ActivitiesToOverthrow: legal.ActivitiesToOverthrow || {},
          TerrorismAssociation: legal.TerrorismAssociation || {},
          Errors: errors.legal || [],
          Completed: completed.legal || [],
          AddressBooks: addressBooks || [],
        }
    }
  }

  return connect(mapStateToProps)(ConnectedLegalSection)
}

export default connectLegalSection
