import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  updateApplication,
  reportErrors,
} from '../../../actions/ApplicationActions'

const connectIdentificationSection = (Component, { section, subsection, store, storeKey }) => {
  class ConnectedIdentificationSection extends React.Component {
    constructor(props) {
      super(props)
  
      this.section = section
      this.subsection = subsection
      this.store = store

      this.handleError = this.handleError.bind(this)
      this.handleUpdate = this.handleUpdate.bind(this)
    }

    handleError(value, arr) {
      const action = reportErrors(this.section, this.subsection, arr)
      this.props.dispatch(action)
      return arr
    }
  
    handleUpdate(field, values) {
      this.props.dispatch(updateApplication(this.store, field, values))
    }

    render () {
      return (
        <Component
          onUpdate={this.handleUpdate}
          onError={this.handleError}
          {...this.props} />
      )
    }
  }

  ConnectedIdentificationSection.propTypes = {
    Comments: PropTypes.object,
    update: PropTypes.func,
    validator: PropTypes.func,
    dispatch: PropTypes.func, // Passed in via connect (below)
  }

  const mapStateToProps = (state) => {
    const app = state.application || {}
    const identification = app.Identification || {}
    const errors = app.Errors || {}
    const completed = app.Completed || {}

    switch (storeKey) {
      case 'ApplicantName':
        return { ...identification.ApplicantName } || {}

      case 'ApplicantBirthDate':
        return { ...identification.ApplicantBirthDate } || {}

      case 'ApplicantBirthPlace':
        return { ...identification.ApplicantBirthPlace } || {}

      case 'ApplicantSSN':
        return { ...identification.ApplicantSSN } || {}

      case 'OtherNames':
        return { ...identification.OtherNames } || {}

      case 'Contacts':
        return { ...identification.Contacts } || {}

      case 'Physical':
        return { ...identification.Physical } || {}

      default:
        return {
          Identification: identification,
          ApplicantName: identification.ApplicantName || {},
          ApplicantBirthDate: identification.ApplicantBirthDate || {},
          ApplicantBirthPlace: identification.ApplicantBirthPlace || {},
          ApplicantSSN: identification.ApplicantSSN || {},
          OtherNames: identification.OtherNames || {},
          Contacts: identification.Contacts || {},
          Physical: identification.Physical || {},
          Errors: errors.identification || [],
          Completed: completed.identification || []
        }
    }
  }

  return connect(mapStateToProps)(ConnectedIdentificationSection)
}

export default connectIdentificationSection
