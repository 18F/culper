import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  updateApplication,
  reportErrors,
} from 'actions/ApplicationActions'

import {
  selectDrugWhileSafetySection,
  selectDrugWithClearanceSection,
  selectAlcoholSections,
  selectDrugWhileSafety,
  selectDrugWithClearance,
  selectDrugInFuture,
  selectAlcoholOrderedCounselingParty,
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
    const settings = app.Settings || {}

    switch (storeKey) {
      case 'DrugUses':
        return {
          ...substance.DrugUses,
          formType: settings.formType,
          ...selectDrugWhileSafety(state),
          ...selectDrugWithClearance(state),
          ...selectDrugInFuture(state),
        }

      case 'DrugInvolvements':
        return {
          ...substance.DrugInvolvements,
          formType: settings.formType,
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
          ...selectDrugWhileSafety(state),
          ...selectDrugWithClearance(state),
          formType: settings.formType,
        }

      case 'OrderedTreatments':
        return {
          ...substance.OrderedTreatments,
          formType: settings.formType,
          addressBooks,
        }

      case 'VoluntaryTreatments':
        return {
          ...substance.VoluntaryTreatments,
          addressBooks,
          formType: settings.formType,
        }

      case 'NegativeImpacts':
        return {
          ...substance.NegativeImpacts,
        }

      case 'OrderedCounselings':
        return {
          ...substance.OrderedCounselings,
          addressBooks,
          formType: settings.formType,
          ...selectAlcoholOrderedCounselingParty(state),
        }

      case 'VoluntaryCounselings':
        return {
          ...substance.VoluntaryCounselings,
          formType: settings.formType,
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
          formType: settings.formType,
          ...selectDrugWhileSafetySection(state),
          ...selectDrugWithClearanceSection(state),
          ...selectAlcoholSections(state),
        }
    }
  }

  return connect(mapStateToProps)(ConnectedSubstanceUseSection)
}

export default connectSubstanceUseSection
