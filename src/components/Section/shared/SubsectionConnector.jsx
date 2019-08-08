import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { handleSubsectionUpdate } from 'actions/FormActions'

import {
  updateApplication,
  reportErrors,
} from 'actions/ApplicationActions'

import { 
  selectHistoryFederalSection,
  selectMultipleCitizenshipRenounced,
  selectCitizenshipForeignPassportsSection,
} from 'selectors/branches'
import { selectValidUSPassport } from 'selectors/misc'

import { extractOtherNames } from 'components/Section/extractors'
import { totalYears, sort } from 'components/Section/History/helpers'
import { utc } from 'components/Section/History/dateranges'

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

  ConnectedSubsection.propTypes = {
    dispatch: PropTypes.func,
  }

  ConnectedSubsection.defaultProps = {
    dispatch: () => {},
  }

  const mapStateToProps = (state) => {
    const { form } = state
    const sectionData = form[key]

    const app = state.application || {}
    const identification = app.Identification || {}
    const history = app.History || {}
    const citizenship = app.Citizenship || {}
    const foreign = app.Foreign || {}
    const errors = app.Errors || {}
    const completed = app.Completed || {}
    const addressBooks = app.AddressBooks || {}
    const emptyItems = { items: [] }
    const emptyList = { List: emptyItems }
    const { formType } = app.Settings

    try {
      return {
        ...sectionData.data,
        ...sectionData,

        Birthdate: processDate(identification.ApplicantBirthDate),
        addressBooks,
        ...selectHistoryFederalSection(state),
        formType,

        ...selectValidUSPassport(state),
        ...selectMultipleCitizenshipRenounced(state),
        ...selectCitizenshipForeignPassportsSection(state),

      }
    } catch (e) {
      console.log(key, e)

      return {}
    }   
  }
  return connect(mapStateToProps)(ConnectedSubsection)
}

export default connectSubsection
