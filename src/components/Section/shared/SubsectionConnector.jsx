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
  selectFinancialBankruptcySection,
  selectFinancialGamblingSection,
  selectFinancialTaxesSection,
  selectFinancialCardSection,
  selectFinancialCreditSection,
  selectFinancialDelinquentSection,
  selectFinancialDelinquentName,
  selectFinancialDelinquentNonFederal,
  selectFinancialNonpaymentSection,
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

import { extractOtherNames } from 'components/Section/extractors'

import { totalYears, sort } from 'components/Section/History/helpers'
import { utc } from 'components/Section/History/dateranges'


const connectSubsection = (Component, {
  key, section, subsection, store,
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
    Birthdate: PropTypes.instanceOf(Date),
  }

  ConnectedSubsection.defaultProps = {
    dispatch: () => {},
    Birthdate: null,
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
    const { form = {}, application = {} } = state

    // New section data & errors (state.form)
    const sectionData = form[key]

    // Legacy form data (state.application)
    const {
      AddressBooks = {},
      Identification = {},
      History = {},
      Settings = {},
      Relationships = {},
    } = application

    const { formType } = Settings
    const names = extractOtherNames(application)
    const applicantBirthdate = (Identification.ApplicantBirthDate || {}).Date
    const maritalStatus = (
      Relationships.Marital
      && Relationships.Marital.Status
      && Relationships.Marital.Status.value
    )
    const spouse = Relationships && extractSpouse(Relationships.Marital)

    const {
      Education = { HasAttended: '', HasDegree10: '', List: { items: [] } },
      Residence = { List: { items: [] } },
      Employment = { List: { items: [] } },
    } = History

    try {
      return {
        // Section-specific data
        ...sectionData && sectionData.data,
        ...sectionData,

        // General data
        Birthdate: processDate(Identification.ApplicantBirthDate),
        applicantBirthdate,
        addressBooks: AddressBooks,
        AddressBooks,
        suggestedNames: names,
        formType,

        // History
        ...selectHistoryFederalSection(state),
        Education,
        Residence,
        Employment,

        // Citizenship
        ...selectValidUSPassport(state),
        ...selectMultipleCitizenshipRenounced(state),
        ...selectCitizenshipForeignPassportsSection(state),

        // Financial
        ...selectFinancialDelinquentName(state),
        ...selectFinancialDelinquentNonFederal(state),
        ...selectFinancialBankruptcySection(state),
        ...selectFinancialGamblingSection(state),
        ...selectFinancialTaxesSection(state),
        ...selectFinancialCardSection(state),
        ...selectFinancialCreditSection(state),
        ...selectFinancialDelinquentSection(state),
        ...selectFinancialNonpaymentSection(state),
        ...selectFinancialCardDisciplinaryDate(state),

        // Foreign
        ...selectForeignCounterIntelligence(state),
        ...selectForeignExcessiveKnowledge(state),
        ...selectForeignSensitiveInformation(state),
        ...selectForeignThreatened(state),
        ...selectForeignContactsSection(state),
        ...selectForeignActivitiesSection(state),
        ...selectForeignBusinessSection(state),
        ...selectForeignTravelSection(state),

        // Legal
        ...selectLegalOffenseInvolvements(state),
        ...selectLegalOffenseSentenced(state),
        ...selectLegalOffenseIncarcerated(state),
        ...selectLegalPoliceFirearms(state),
        ...selectLegalPoliceDrugs(state),
        ...selectLegalInvestigationClearanceGranted(state),
        ...selectLegalOtherOffensesSection(state),
        ...selectLegalNonCriminalCourtSection(state),
        ...selectLegalTechnologySection(state),

        // Military
        ...selectForeignMilitaryMaintainsContact(state),
        showSelectiveService: !hideSelectiveServiceSelector(state),
        showDisciplinaryProcedures: !hideDisciplinaryProceduresSelector(state),

        // Psychological
        showExistingConditions: !hideExistingConditionsSelector(state),

        // Relationships
        maritalStatus,
        spouse,
        currentAddress: History && History.CurrentAddress,
        ...selectRelationshipMaritalForeignBornDocExpiration(state),
        ...selectRelationshipMaritalDivorcePhoneNumber(state),
        ...selectRelationshipRelativesUSResidenceDoc(state),
        ...selectRelationshipRelativesForeignGovtAffExplanation(state),

        // Substance use
        ...selectDrugWhileSafety(state),
        ...selectDrugWithClearance(state),
        ...selectDrugInFuture(state),
        ...selectAlcoholOrderedCounselingParty(state),
        ...selectAlcoholSections(state),
        ...selectAlcoholReceivedCounselingsSection(state),
        ...selectDrugWhileSafetySection(state),
        ...selectDrugWithClearanceSection(state),
      }
    } catch (e) {
      console.warn(`Unable to connect subsection ${key}`, e)
    }

    return {}
  }

  return connect(mapStateToProps)(ConnectedSubsection)
}

export default connectSubsection
