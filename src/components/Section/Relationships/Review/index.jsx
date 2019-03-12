import React from 'react'

import { Marital } from '../RelationshipStatus/Marital'
import { Cohabitants } from '../RelationshipStatus/Cohabitants'
import People from '../People'
import Relatives from '../Relatives'

const Review = ({ forPrint = false }) => {
  const subsectionProps = {
    required: true,
    scrollIntoView: false,
    scrollToBottom: '',
    defaultState: !forPrint,
    forPrint,
  }

  const sectionDivider = () => (
    <hr className="section-divider" />
  )

  return (
    <div>
      <Marital {...subsectionProps} />
      {sectionDivider}
      <Cohabitants {...subsectionProps} />
      {sectionDivider}
      <People {...subsectionProps} />
      {sectionDivider}
      <Relatives {...subsectionProps} />
    </div>
  )
}

export default Review
