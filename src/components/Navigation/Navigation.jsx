import React from 'react'
import PropTypes from 'prop-types'

import { ScoreCard } from './../ScoreCard'
import SectionList from './SectionList'

function Navigation({ total, completed, sections }) {
  return (
    <nav className="form-navigation" role="navigation">
      <ScoreCard
        totalSections={total}
        completedSectionsTotal={completed}
      />
      <SectionList sections={sections} />
    </nav>
  )
}

Navigation.propTypes = {
  sections: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  completed: PropTypes.number.isRequired,

}

export default Navigation
