import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { env } from 'config'
import { getBackAndNext } from 'helpers/navigation'

import SectionNavButton from './SectionNavButton'

export const SectionNavigation = ({ back, next }) => {
  if (!back && !next) {
    return null
  }

  const goToSection = (path) => {
    env.History().push(path)
  }

  const backOnClick = back && (() => { goToSection(`/form${back.path}`) })
  const nextOnClick = next && (() => { goToSection(`/form${next.path}`) })

  return (
    <div className="bottom-btns">
      <div className="btn-wrap">
        <div className="btn-container">
          <SectionNavButton
            direction="back"
            label={back && back.navLabel}
            onClick={backOnClick}
            isEmpty={!back}
          />
          <div className="btn-spacer" />
          <SectionNavButton
            direction="next"
            label={next && next.navLabel}
            onClick={nextOnClick}
            isEmpty={!next}
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
  const { section, subsection } = ownProps
  return getBackAndNext(state, { section, subsection })
}

export default connect(mapStateToProps)(SectionNavigation)
