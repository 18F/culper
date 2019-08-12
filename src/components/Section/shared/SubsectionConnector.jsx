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
  selectFinancialBankruptcySection, // fail
  selectFinancialGamblingSection, // fail
  selectFinancialTaxesSection,
  selectFinancialCardSection, // fail
  selectFinancialCreditSection,
  selectFinancialDelinquentSection,
  selectFinancialDelinquentName,
  selectFinancialDelinquentNonFederal,
  selectFinancialNonpaymentSection, // fail
  selectFinancialCardDisciplinaryDate,
  selectForeignContactsSection,
  selectForeignActivitiesSection,
  selectForeignBusinessSection,
  selectForeignTravelSection,
  selectForeignCounterIntelligence,
  selectForeignExcessiveKnowledge,
  selectForeignSensitiveInformation,
  selectForeignThreatened,
  selectLegalOtherOffensesSection,
  selectLegalNonCriminalCourtSection,
  selectLegalTechnologySection,
  selectLegalOffenseInvolvements,
  selectLegalOffenseSentenced,
  selectLegalOffenseIncarcerated,
  selectLegalInvestigationClearanceGranted,
  selectLegalPoliceFirearms,
  selectLegalPoliceDrugs,
  selectForeignMilitaryMaintainsContact,
  selectRelationshipMaritalForeignBornDocExpiration,
  selectRelationshipMaritalDivorcePhoneNumber,
  selectRelationshipRelativesUSResidenceDoc,
  selectRelationshipRelativesForeignGovtAffExplanation,
  selectDrugWhileSafetySection,
  selectDrugWithClearanceSection,
  selectAlcoholSections,
  selectDrugWhileSafety,
  selectDrugWithClearance,
  selectDrugInFuture,
  selectAlcoholOrderedCounselingParty,
  selectAlcoholReceivedCounselingsSection,
} from 'selectors/branches'
import { selectValidUSPassport } from 'selectors/misc'
import {
  hideSelectiveServiceSelector,
  hideDisciplinaryProceduresSelector,
  hideExistingConditionsSelector,
} from 'selectors/navigation'
import { formStatusSelector } from 'selectors/validation'

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

  const extractSpouse = (marital) => {
    if (!marital || !marital.CivilUnion || !marital.CivilUnion.Name) {
      return null
    }

    return marital.CivilUnion.Name
  }

  const mapStateToProps = (state) => {
    console.log('state: ', state)
    const { form } = state
    const sectionData = form[key]

    const app = state.application || {}
    const identification = app.Identification || {}
    const history = app.History || {}
    const errors = app.Errors || {}
    const completed = app.Completed || {}
    const addressBooks = app.AddressBooks || {}
    const emptyItems = { items: [] }
    const emptyList = { List: emptyItems }
    const { formType } = app.Settings
    const settings = app.Settings || {}

    const names = extractOtherNames(app)

    const financial = app.Financial || {}

    const foreign = app.Foreign || {}
    const applicantBirthdate = (identification.ApplicantBirthDate || {}).Date

    const legal = app.Legal || {}

    const military = app.Military || {}

    const psychological = app.Psychological

    const relationships = app.Relationships
    const spouse = relationships && extractSpouse(relationships.Marital)

    const substance = app.Substance || {}


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

        ...selectFinancialDelinquentName(state),
        ...selectFinancialBankruptcySection(state),
        ...selectFinancialGamblingSection(state),
        ...selectFinancialTaxesSection(state),
        ...selectFinancialCardSection(state),
        ...selectFinancialCreditSection(state),
        ...selectFinancialDelinquentSection(state),
        ...selectFinancialNonpaymentSection(state),
        ...selectFinancialCardDisciplinaryDate(state),

        ...selectForeignCounterIntelligence(state),
        ...selectForeignExcessiveKnowledge(state),
        ...selectForeignSensitiveInformation(state),
        ...selectForeignThreatened(state),
        ...selectForeignContactsSection(state),
        ...selectForeignActivitiesSection(state),
        ...selectForeignBusinessSection(state),
        ...selectForeignTravelSection(state),
        ...selectForeignCounterIntelligence(state),
        ...selectForeignSensitiveInformation(state),
        ...selectForeignThreatened(state),

        ...selectLegalOffenseInvolvements(state),
        ...selectLegalOffenseSentenced(state),
        ...selectLegalOffenseIncarcerated(state),
        ...selectLegalPoliceFirearms(state),
        ...selectLegalPoliceDrugs(state),
        ...selectLegalInvestigationClearanceGranted(state),
        ...selectLegalOtherOffensesSection(state),
        ...selectLegalNonCriminalCourtSection(state),
        ...selectLegalTechnologySection(state),

        ...selectForeignMilitaryMaintainsContact(state),
        showSelectiveService: !hideSelectiveServiceSelector(state),
        showDisciplinaryProcedures: !hideDisciplinaryProceduresSelector(state),

        ...formStatusSelector(state),

        showExistingConditions: !hideExistingConditionsSelector(state),

        ...selectRelationshipMaritalForeignBornDocExpiration(state),
        ...selectRelationshipMaritalDivorcePhoneNumber(state),
        ...selectRelationshipRelativesUSResidenceDoc(state),
        ...selectRelationshipRelativesForeignGovtAffExplanation(state),

        ...selectDrugWhileSafety(state),
        ...selectDrugWithClearance(state),
        ...selectDrugInFuture(state),
        ...selectAlcoholOrderedCounselingParty(state),
        ...selectAlcoholSections(state),
        ...selectAlcoholReceivedCounselingsSection(state),

      }
    } catch (e) {
      console.log(key, e)

      return {}
    }
  }
  return connect(mapStateToProps)(ConnectedSubsection)
}

export default connectSubsection
