import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  updateApplication,
  reportErrors,
} from 'actions/ApplicationActions'

import { extractOtherNames } from 'components/Section/extractors'

import {
  selectMultipleCitizenshipRenounced,
  selectCitizenshipForeignPassportsSection,
} from 'selectors/branches'

const connectCitizenshipSection = (Component, {
  section, subsection, store, storeKey,
}) => {
  class ConnectedCitizenshipSection extends React.Component {
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

  ConnectedCitizenshipSection.propTypes = {
    dispatch: PropTypes.func.isRequired, // Passed in via connect (below)
  }

  const mapStateToProps = (state) => {
    const { authentication } = state
    const { formType } = authentication
    const app = state.application || {}
    const citizenship = app.Citizenship || {}
    const foreign = app.Foreign || {}
    const errors = app.Errors || {}
    const completed = app.Completed || {}

    const names = extractOtherNames(app)

    switch (storeKey) {
      // TODO: We are keeping U.S. passport information inside of Foreign temporary
      // solution. Future iteration will be moving it to Citizenship on frontend, backend, XMl, etc.
      case 'Passport':
        return {
          ...foreign.Passport,
          suggestedNames: names,
        }
      case 'Status':
        return {
          ...citizenship.Status,
          Passport: foreign.Passport,
        }

      case 'Multiple':
        return {
          ...citizenship.Multiple,
          ...selectMultipleCitizenshipRenounced(state),
          formType,
        }

      case 'Passports':
        return { ...citizenship.Passports } || {}

      default:
        return {
          Application: app,
          Citizenship: citizenship,
          Passport: foreign.Passport || {},
          Status: citizenship.Status || {},
          Multiple: citizenship.Multiple || {},
          Passports: citizenship.Passports || {},
          Errors: errors.citizenship || [],
          Completed: completed.citizenship || [],
          ...selectCitizenshipForeignPassportsSection(state),
        }
    }
  }

  return connect(mapStateToProps)(ConnectedCitizenshipSection)
}

export default connectCitizenshipSection
