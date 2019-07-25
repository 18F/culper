import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  updateApplication,
  reportErrors,
} from 'actions/ApplicationActions'

import {
  selectLegalOtherOffensesSection,
  selectLegalNonCriminalCourtSection,
  selectLegalTechnologySection,
  selectLegalOffenseInvolvements,
  selectLegalOffenseSentenced,
  selectLegalOffenseIncarcerated,
  selectLegalInvestigationClearanceGranted,
  selectLegalPoliceFirearms,
  selectLegalPoliceDrugs,
} from 'selectors/branches'

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
    const settings = app.Settings

    switch (storeKey) {
      case 'PoliceOffenses':
        return {
          ...legal.PoliceOffenses,
          addressBooks,
          formType: settings.formType,
          ...selectLegalOffenseInvolvements(state),
          ...selectLegalOffenseSentenced(state),
          ...selectLegalOffenseIncarcerated(state),
        }

      case 'PoliceOtherOffenses':
        return {
          ...legal.PoliceOtherOffenses,
          addressBooks,
          ...selectLegalPoliceFirearms(state),
          ...selectLegalPoliceDrugs(state),
        }

      case 'PoliceDomesticViolence':
        return {
          ...legal.PoliceDomesticViolence,
          addressBooks,
        }

      case 'History':
        return {
          ...legal.History,
          formType: settings.formType,
          ...selectLegalInvestigationClearanceGranted(state),
        }

      case 'Revoked':
        return {
          ...legal.Revoked,
          formType: settings.formType,
        }

      case 'Debarred':
        return {
          ...legal.Debarred,
          formType: settings.formType,
        }

      case 'NonCriminalCourtActions':
        return {
          ...legal.NonCriminalCourtActions,
          addressBooks,
        }

      case 'Unauthorized':
        return {
          ...legal.Unauthorized,
          addressBooks,
        }

      case 'Manipulating':
        return {
          ...legal.Manipulating,
          addressBooks,
        }

      case 'Unlawful':
        return {
          ...legal.Unlawful,
          addressBooks,
        }

      case 'TerroristOrganization':
        return {
          ...legal.TerroristOrganization,
          addressBooks,
          formType: settings.formType,
        }

      case 'EngagedInTerrorism':
        return {
          ...legal.EngagedInTerrorism,
        }

      case 'Advocating':
        return {
          ...legal.Advocating,
        }

      case 'MembershipOverthrow':
        return {
          ...legal.MembershipOverthrow,
          addressBooks,
        }

      case 'MembershipViolence':
        return {
          ...legal.MembershipViolence,
          addressBooks,
        }

      case 'ActivitiesToOverthrow':
        return {
          ...legal.ActivitiesToOverthrow,
        }

      case 'TerrorismAssociation':
        return {
          ...legal.TerrorismAssociation,
        }

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
          formType: settings.formType,
          ...selectLegalOtherOffensesSection(state),
          ...selectLegalNonCriminalCourtSection(state),
          ...selectLegalTechnologySection(state),
        }
    }
  }

  return connect(mapStateToProps)(ConnectedLegalSection)
}

export default connectLegalSection
