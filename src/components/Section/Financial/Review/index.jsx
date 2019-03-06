import React from 'react'

import Bankruptcies from 'components/Section/Financial/Bankruptcy'
import Gambling from 'components/Section/Financial/Gambling'
import Taxes from 'components/Section/Financial/Taxes'
import Card from 'components/Section/Financial/Card'
import Credit from 'components/Section/Financial/Credit'
import Delinquent from 'components/Section/Financial/Delinquent'
import Nonpayment from 'components/Section/Financial/Nonpayment'

const Review = ({ forPrint = false }) => {
  const subsectionProps = {
    required: true,
    scrollIntoView: false,
    scrollToBottom: undefined,
    defaultState: !forPrint,
  }

  const sectionDivider = (
    <hr className="section-divider" />
  )

  return (
    <div>
      <Bankruptcies {...subsectionProps} />
      {sectionDivider}
      <Gambling {...subsectionProps} />
      {sectionDivider}
      <Taxes {...subsectionProps} />
      {sectionDivider}
      <Card {...subsectionProps} />
      {sectionDivider}
      <Credit {...subsectionProps} />
      {sectionDivider}
      <Delinquent {...subsectionProps} />
      {sectionDivider}
      <Nonpayment {...subsectionProps} />
    </div>
  )
}

export default Review
