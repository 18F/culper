import React from 'react'
import PropTypes from 'prop-types'

import SectionList from 'components/Navigation/SectionList'

const Navigation = ({ sections }) => (
  <nav className="form-navigation" role="navigation">
    <SectionList sections={sections} basePath="/form" />
  </nav>
)

Navigation.propTypes = {
  sections: PropTypes.array.isRequired,
}

export default Navigation
