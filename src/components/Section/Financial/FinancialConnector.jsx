import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  updateApplication,
  reportErrors,
} from 'actions/ApplicationActions'

const connectFinancialSection = (Component, {
  section, subsection, store, storeKey,
}) => {
  class ConnectedFinancialSection extends React.Component {
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

  ConnectedFinancialSection.propTypes = {
    dispatch: PropTypes.func.isRequired, // Passed in via connect (below)
  }

  const mapStateToProps = (state) => {
    const app = state.application || {}
    const financial = app.Financial || {}
    const errors = app.Errors || {}
    const completed = app.Completed || {}
    const addressBooks = app.AddressBooks || {}

    switch (storeKey) {
      case 'Bankruptcy':
        return {
          ...financial.Bankruptcy,
          addressBooks,
        }

      case 'Gambling':
        return {
          ...financial.Gambling,
        }

      case 'Taxes':
        return {
          ...financial.Taxes,
        }

      case 'Card':
        return {
          ...financial.Card,
          addressBooks,
        }

      case 'Credit':
        return {
          ...financial.Credit,
          addressBooks,
        }

      case 'Delinquent':
        return {
          ...financial.Delinquent,
          addressBooks,
        }

      case 'Nonpayment':
        return {
          ...financial.Nonpayment,
        }

      default:
        return {
          Financial: financial,
          Gambling: financial.Gambling || {},
          Bankruptcy: financial.Bankruptcy || {},
          Taxes: financial.Taxes || {},
          Card: financial.Card || {},
          Credit: financial.Credit || {},
          Delinquent: financial.Delinquent || {},
          Nonpayment: financial.Nonpayment || {},
          Errors: errors.financial || [],
          Completed: completed.financial || [],
          AddressBooks: addressBooks,
        }
    }
  }

  return connect(mapStateToProps)(ConnectedFinancialSection)
}

export default connectFinancialSection
