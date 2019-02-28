import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  updateApplication,
  reportErrors,
} from '../../../actions/ApplicationActions'
import {
  hideSelectiveServiceSelector,
  hideDisciplinaryProceduresSelector,
} from 'selectors/navigation'

const connectMilitarySection = (Component, {
  section, subsection, store, storeKey,
}) => {
  class ConnectedMilitarySection extends React.Component {
    constructor(props) {
      super(props)

      this.section = section
      this.subsection = subsection
      this.store = store

      this.handleError = this.handleError.bind(this)
      this.handleUpdate = this.handleUpdate.bind(this)
    }

    handleError(value, arr) {
      const { dispatch } = this.props
      const action = reportErrors(this.section, this.subsection, arr)
      dispatch(action)
      return arr
    }

    handleUpdate(field, values) {
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

  ConnectedMilitarySection.propTypes = {
    update: PropTypes.func.isRequired,
    validator: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired, // Passed in via connect (below)
  }

  const mapStateToProps = (state) => {
    const app = state.application || {}
    const military = app.Military || {}
    const errors = app.Errors || {}
    const completed = app.Completed || {}
    const addressBooks = app.AddressBooks || {}

    switch (storeKey) {
      case 'Selective':
        return { ...military.Selective } || {}

      case 'History':
        return { ...military.History } || {}

      case 'Disciplinary':
        return { ...military.Disciplinary } || {}

      case 'Foreign':
        return { ...military.Foreign, addressBooks: addressBooks } || {}

      default:
        return {
          Application: app || {},
          Military: military,
          Selective: military.Selective || {},
          History: military.History || {},
          Disciplinary: military.Disciplinary || {},
          Foreign: military.Foreign || {},
          Errors: errors.military || [],
          Completed: completed.military || [],
          AddressBooks: addressBooks,
          showSelectiveService: !hideSelectiveServiceSelector(state),
          showDisciplinaryProcedures: !hideDisciplinaryProceduresSelector(state)
        }
    }
  }

  return connect(mapStateToProps)(ConnectedMilitarySection)
}

export default connectMilitarySection
