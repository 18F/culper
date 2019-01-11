import React from 'react'
import PropTypes from 'prop-types'

import SectionList from './SectionList'

function Navigation({ sections }) {
  return (
    <nav className="form-navigation" role="navigation">
      <SectionList sections={sections} />
    </nav>
  )
}

Navigation.propTypes = {
  sections: PropTypes.array.isRequired,

}

export default Navigation
