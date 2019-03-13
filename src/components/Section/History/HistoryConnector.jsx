import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  updateApplication,
  reportErrors,
} from 'actions/ApplicationActions'

import { totalYears, sort } from 'components/Section/History/helpers'
import { utc } from 'components/Section/History/dateranges'

const connectHistorySection = (Component, {
  section, subsection, store, storeKey,
}) => {
  class ConnectedHistorySection extends React.Component {
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
      const { Birthdate } = this.props

      const totalYearsProp = totalYears(Birthdate)

      return (
        <Component
          onUpdate={this.handleUpdate}
          onError={this.handleError}
          totalYears={totalYearsProp}
          sort={sort}
          {...this.props}
        />
      )
    }
  }

  /* eslint react/forbid-prop-types: 0 */
  ConnectedHistorySection.propTypes = {
    Birthdate: PropTypes.any,
    dispatch: PropTypes.func, // Passed in via connect (below)
  }

  ConnectedHistorySection.defaultProps = {
    Birthdate: null,
    dispatch: () => {},
  }

  const processDate = (date) => {
    if (!date) {
      return null
    }

    let d = null
    const { month, day, year } = date.Date
    if (month && day && year) {
      d = utc(new Date(year, month - 1, day))
    }
    return d
  }

  const mapStateToProps = (state) => {
    const { authentication } = state
    const { formType } = authentication

    const app = state.application || {}
    const identification = app.Identification || {}
    const history = app.History || {}
    const errors = app.Errors || {}
    const completed = app.Completed || {}
    const addressBooks = app.AddressBooks || {}

    const emptyItems = { items: [] }
    const emptyList = { List: emptyItems }

    switch (storeKey) {
      case 'Residence':
        return {
          ...history.Residence || emptyList,
          Birthdate: processDate(identification.ApplicantBirthDate),
          addressBooks,
          formType,
        }

      case 'Employment':
        return {
          ...history.Employment || emptyItems,
          Birthdate: processDate(identification.ApplicantBirthDate),
          addressBooks,
          formType,
        }

      case 'Education':
        return {
          ...history.Education || {
            HasAttended: '',
            HasDegree10: '',
            ...emptyList,
          },
          Birthdate: processDate(identification.ApplicantBirthDate),
          addressBooks,
          formType,
        }

      case 'Federal':
        return {
          ...history.Federal || {},
          addressBooks,
          formType,
        }

      default:
        return {
          History: history,
          Residence: history.Residence || emptyList,
          Employment: history.Employment || emptyItems,
          Education: history.Education || {
            HasAttended: '',
            HasDegree10: '',
            ...emptyList,
          },
          Federal: history.Federal || {},

          Errors: errors.history || [],
          Completed: completed.history || [],
          Birthdate: processDate(identification.ApplicantBirthDate),
          AddressBooks: addressBooks,
          formType,
        }
    }
  }

  return connect(mapStateToProps)(ConnectedHistorySection)
}

export default connectHistorySection
