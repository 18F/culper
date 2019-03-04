import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getBackAndNext } from 'helpers/navigation'

import SectionNavButton from './SectionNavButton'

const SectionNavigation = ({ back, next }) => {
  if (!back && !next) {
    return null
  }

  return (
    <div className="bottom-btns">
      <div className="btn-wrap">
        <div className="btn-container">
          <SectionNavButton
            direction="back"
            label={back && back.navLabel}
            link={back && back.fullPath}
          />
          <div className="btn-spacer" />
          <SectionNavButton
            direction="next"
            label={next && next.navLabel}
            link={next && next.fullPath}
          />
        </div>
      </div>
    </div>
  )
}

/* eslint react/forbid-prop-types: 0 */
SectionNavigation.propTypes = {
  back: PropTypes.object,
  next: PropTypes.object,
}

SectionNavigation.defaultProps = {
  back: null,
  next: null,
}

const mapStateToProps = (state, ownProps) => {
  const { currentPath } = ownProps
  return getBackAndNext(state, { currentPath })
}

export default connect(mapStateToProps)(SectionNavigation)
