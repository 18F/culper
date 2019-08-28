import React from 'react'
import PropTypes from 'prop-types'

import { FINANCIAL, FINANCIAL_REVIEW } from 'config/formSections/financial'

import Bankruptcies from 'components/Section/Financial/Bankruptcy'
import Gambling from 'components/Section/Financial/Gambling'
import Taxes from 'components/Section/Financial/Taxes'
import Card from 'components/Section/Financial/Card'
import Credit from 'components/Section/Financial/Credit'
import Delinquent from 'components/Section/Financial/Delinquent'
import Nonpayment from 'components/Section/Financial/Nonpayment'

import connectSubsection from 'components/Section/shared/SubsectionConnector'

const sectionConfig = {
  section: FINANCIAL.name,
  store: FINANCIAL.store,
  subsection: FINANCIAL_REVIEW.name,
}

const Review = ({
  requireFinancialBankruptcySection,
  requireFinancialGamblingSection,
  requireFinancialTaxesSection,
  requireFinancialCardSection,
  requireFinancialCreditSection,
  requireFinancialDelinquentSection,
  requireFinancialNonpaymentSection,
}) => {
  const subsectionProps = {
    required: true,
    scrollIntoView: false,
    scrollToBottom: undefined,
  }

  const sectionDivider = (
    <hr className="section-divider" />
  )

  return (
    <div>
      {requireFinancialBankruptcySection && (
        <span>
          <Bankruptcies {...subsectionProps} />
          {sectionDivider}
        </span>
      )}

      {requireFinancialGamblingSection && (
        <span>
          <Gambling {...subsectionProps} />
          {sectionDivider}
        </span>
      )}

      {requireFinancialTaxesSection && (
        <span>
          <Taxes {...subsectionProps} />
          {sectionDivider}
        </span>
      )}

      {requireFinancialCardSection && (
        <span>
          <Card {...subsectionProps} />
          {sectionDivider}
        </span>

      )}

      {requireFinancialCreditSection && (
        <span>
          <Credit {...subsectionProps} />
          {sectionDivider}
        </span>

      )}

      {requireFinancialDelinquentSection && (
        <span>
          <Delinquent {...subsectionProps} />
          {sectionDivider}
        </span>
      )}

      {requireFinancialNonpaymentSection && (
        <Nonpayment {...subsectionProps} />
      )}
    </div>
  )
}

Review.propTypes = {
  requireFinancialBankruptcySection: PropTypes.bool,
  requireFinancialGamblingSection: PropTypes.bool,
  requireFinancialTaxesSection: PropTypes.bool,
  requireFinancialCardSection: PropTypes.bool,
  requireFinancialCreditSection: PropTypes.bool,
  requireFinancialDelinquentSection: PropTypes.bool,
  requireFinancialNonpaymentSection: PropTypes.bool,
}

Review.defaultProps = {
  requireFinancialBankruptcySection: true,
  requireFinancialGamblingSection: true,
  requireFinancialTaxesSection: true,
  requireFinancialCardSection: true,
  requireFinancialCreditSection: true,
  requireFinancialDelinquentSection: true,
  requireFinancialNonpaymentSection: true,
}

export default connectSubsection(Review, sectionConfig)
