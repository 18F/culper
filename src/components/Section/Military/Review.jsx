import React from 'react'

import Selective from 'components/Section/Military/Selective'
import History from 'components/Section/Military/History'
import Disciplinary from 'components/Section/Military/Disciplinary'
import Foreign from 'components/Section/Military/Foreign'

const Review = ({ AddressBooks, showSelectiveService, showDisciplinaryProcedures }) => {
  const subsectionProps = {
    required: true,
    scrollIntoView: false,
  }

  const sectionDivider = () => (
    <hr className="section-divider" />
  )

  return (
    <div>
      {showSelectiveService && <Selective {...subsectionProps} />}
      {showSelectiveService && sectionDivider}
      <History {...subsectionProps} />
      {sectionDivider}
      {showDisciplinaryProcedures && <Disciplinary {...subsectionProps} />}
      {showDisciplinaryProcedures && sectionDivider}
      <Foreign
        {...subsectionProps}
        addressBooks={AddressBooks}
      />
    </div>
  )
}

Review.defaultProps = {
  AddressBooks: {},
  showSelectiveService: false,
  showDisciplinaryProcedures: false,
}

export default Review
