import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  updateApplication,
  reportErrors,
} from 'actions/ApplicationActions'

import {
  selectDrugWhileSafety,
  selectDrugWithClearance,
  selectDrugInFuture,
} from 'selectors/branches'

const connectSubstanceUseSection = (Component, {
  section, subsection, store, storeKey,
}) => {
  class ConnectedSubstanceUseSection extends React.Component {
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

  ConnectedSubstanceUseSection.propTypes = {
    dispatch: PropTypes.func, // Passed in via connect (below)
  }

  ConnectedSubstanceUseSection.defaultProps = {
    dispatch: () => {},
  }

  const mapStateToProps = (state) => {
    const app = state.application || {}
    const substance = app.Substance || {}
    const errors = app.Errors || {}
    const completed = app.Completed || {}
    const addressBooks = app.AddressBooks || {}
    const { authentication } = state

    switch (storeKey) {
      case 'DrugUses':
        return {
          ...substance.DrugUses,
          formType: authentication.formType,
          ...selectDrugWhileSafety(state),
          ...selectDrugWithClearance(state),
          ...selectDrugInFuture(state),
        }

      case 'DrugInvolvements':
        return {
          ...substance.DrugInvolvements,
          formType: authentication.formType,
          ...selectDrugWhileSafety(state),
          ...selectDrugWithClearance(state),
          ...selectDrugInFuture(state),
        }

      case 'DrugClearanceUses':
        return {
          ...substance.DrugClearanceUses,
        }

      case 'DrugPublicSafetyUses':
        return {
          ...substance.DrugPublicSafetyUses,
        }

      case 'PrescriptionUses':
        return {
          ...substance.PrescriptionUses,
          formType: authentication.formType,
        }

      case 'OrderedTreatments':
        return {
          ...substance.OrderedTreatments,
          formType: authentication.formType,
          addressBooks,
        }

      case 'VoluntaryTreatments':
        return {
          ...substance.VoluntaryTreatments,
          addressBooks,
          formType: authentication.formType,
        }

      case 'NegativeImpacts':
        return {
          ...substance.NegativeImpacts,
        }

      case 'OrderedCounselings':
        return {
          ...substance.OrderedCounselings,
          addressBooks,
        }

      case 'VoluntaryCounselings':
        return {
          ...substance.VoluntaryCounselings,
          addressBooks,
        }

      case 'ReceivedCounselings':
        return {
          ...substance.ReceivedCounselings,
        }

      default:
        return {
          Substance: substance,
          NegativeImpacts: substance.NegativeImpacts || {},
          OrderedCounselings: substance.OrderedCounselings || {},
          VoluntaryCounselings: substance.VoluntaryCounselings || {},
          ReceivedCounselings: substance.ReceivedCounselings || {},
          DrugUses: substance.DrugUses || {},
          DrugInvolvements: substance.DrugInvolvements || {},
          DrugClearanceUses: substance.DrugClearanceUses || {},
          DrugPublicSafetyUses: substance.DrugPublicSafetyUses || {},
          PrescriptionUses: substance.PrescriptionUses || {},
          OrderedTreatments: substance.OrderedTreatments || {},
          VoluntaryTreatments: substance.VoluntaryTreatments || {},
          Errors: errors.identification || [],
          Completed: completed.identification || [],
          AddressBooks: addressBooks,
          formType: authentication.formType,
        }
    }
  }

  return connect(mapStateToProps)(ConnectedSubstanceUseSection)
}

export default connectSubstanceUseSection
