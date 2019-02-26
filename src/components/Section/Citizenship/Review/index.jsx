import React from 'react'

import Status from './../Status'
import Multiple from './../Multiple'
import Passports from './../Multiple/Passports'

const Review = () => {
  const subsectionProps = {
    required: true,
    scrollIntoView: false,
  }

  const sectionDivider = (
    <hr className="section-divider" />
  )

  return (
    <div>
      <Status {...subsectionProps} />
      {sectionDivider}
      <Multiple {...subsectionProps} />
      {sectionDivider}
      <Passports {...subsectionProps} />
    </div>
  )
}

export default Review
