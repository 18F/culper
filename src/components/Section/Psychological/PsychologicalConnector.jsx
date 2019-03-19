import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  updateApplication,
  reportErrors,
} from 'actions/ApplicationActions'

import { hideExistingConditionsSelector } from 'selectors/navigation'

const connectPsychologicalSection = (Component, {
  section, subsection, store, storeKey,
}) => {
  class ConnectedPsychologicalSection extends React.Component {
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

  ConnectedPsychologicalSection.propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  const mapStateToProps = (state) => {
    const { application } = state
    const {
      Psychological, Errors, Completed, AddressBooks,
    } = application

    switch (storeKey) {
      case 'Competence':
        return {
          ...Psychological && Psychological.Competence,
          addressBooks: AddressBooks,
        }

      case 'Consultations':
        return {
          ...Psychological && Psychological.Consultations,
          addressBooks: AddressBooks,
        }

      case 'Hospitalizations':
        return {
          ...Psychological && Psychological.Hospitalizations,
        }

      case 'Diagnoses':
        return {
          ...Psychological && Psychological.Diagnoses,
          addressBooks: AddressBooks,
        }

      case 'ExistingConditions':
        return {
          ...Psychological && Psychological.ExistingConditions,
        }

      default: {
        return {
          Psychological,
          ...Psychological,
          Errors: Errors.psychological || [],
          Completed: Completed.psychological || [],
          showExistingConditions: !hideExistingConditionsSelector(state),
          AddressBooks,
        }
      }
    }
  }

  return connect(mapStateToProps)(ConnectedPsychologicalSection)
}

export default connectPsychologicalSection
