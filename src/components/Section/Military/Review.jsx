import React from 'react'
import PropTypes from 'prop-types'

import { MILITARY, MILITARY_REVIEW } from 'config/formSections/military'

import Selective from 'components/Section/Military/Selective'
import History from 'components/Section/Military/History'
import Disciplinary from 'components/Section/Military/Disciplinary'
import Foreign from 'components/Section/Military/Foreign'

import connectSubsection from 'components/Section/shared/SubsectionConnector'

const sectionConfig = {
  section: MILITARY.name,
  store: MILITARY.store,
  subsection: MILITARY_REVIEW.name,
}

const Review = ({ AddressBooks, showSelectiveService, showDisciplinaryProcedures }) => {
  const subsectionProps = {
    required: true,
    scrollIntoView: false,
  }

  const sectionDivider = (
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

Review.propTypes = {
  AddressBooks: PropTypes.object,
  showSelectiveService: PropTypes.bool,
  showDisciplinaryProcedures: PropTypes.bool,
}

Review.defaultProps = {
  AddressBooks: {},
  showSelectiveService: false,
  showDisciplinaryProcedures: false,
}

export default connectSubsection(Review, sectionConfig)
