import React from 'react'

import { FINANCIAL, FINANCIAL_REVIEW } from 'config/formSections/financial'

import Bankruptcies from 'components/Section/Financial/Bankruptcy'
import Gambling from 'components/Section/Financial/Gambling'
import Taxes from 'components/Section/Financial/Taxes'
import Card from 'components/Section/Financial/Card'
import Credit from 'components/Section/Financial/Credit'
import Delinquent from 'components/Section/Financial/Delinquent'
import Nonpayment from 'components/Section/Financial/Nonpayment'

import connectFinancialSection from '../FinancialConnector'

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

export default connectFinancialSection(Review, sectionConfig)
