import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { handleSubsectionUpdate } from 'actions/FormActions'

import {
  updateApplication,
  reportErrors,
} from 'actions/ApplicationActions'

const connectSubsection = (Component, {
  key, section, subsection, store, storeKey,
}) => {
  class ConnectedSubsection extends React.Component {
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
      // console.log(`UPDATE SUBSECTION`, key)
      dispatch(updateApplication(this.store, field, values))
      dispatch(handleSubsectionUpdate(key, field, values))
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

  ConnectedSubsection.propTypes = {
    dispatch: PropTypes.func,
  }

  ConnectedSubsection.defaultProps = {
    dispatch: () => {},
  }

  const mapStateToProps = (state) => {
    const { application } = state
    const { Identification } = application

    switch (storeKey) {
      case 'ApplicantName':
        return { ...Identification.ApplicantName } || {}

      case 'ApplicantBirthDate':
        return { ...Identification.ApplicantBirthDate } || {}

      case 'ApplicantBirthPlace':
        return { ...Identification.ApplicantBirthPlace } || {}

      case 'ApplicantSSN':
        return { ...Identification.ApplicantSSN } || {}

      case 'OtherNames':
        return { ...Identification.OtherNames } || {}

      case 'Contacts':
        return { ...Identification.Contacts } || {}

      case 'Physical':
        return { ...Identification.Physical } || {}

      default:
        return {}
    }
  }

  return connect(mapStateToProps)(ConnectedSubsection)
}

export default connectSubsection
