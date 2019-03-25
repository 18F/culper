import React from 'react'

import ConnectedMarital from '../RelationshipStatus/Marital'
import ConnectedCohabitants from '../RelationshipStatus/Cohabitants'
import People from '../People'
import Relatives from '../Relatives'

const Review = () => {
  const subsectionProps = {
    required: true,
    scrollIntoView: false,
    scrollToBottom: '',
  }

  const sectionDivider = (
    <hr className="section-divider" />
  )

  return (
    <div>
      <ConnectedMarital {...subsectionProps} />
      {sectionDivider}
      <ConnectedCohabitants {...subsectionProps} />
      {sectionDivider}
      <People {...subsectionProps} />
      {sectionDivider}
      <Relatives {...subsectionProps} />
    </div>
  )
}

export default Review
