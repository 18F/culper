import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { totalSections, completedSections } from 'helpers/navigation'

const ProgressBar = ({ total, completed }) => {
  const styles = {
    width: `${completed / total * 100}%`,
  }

  return (
    <div className="eapp-progress">
      <div
        id="progress-bar"
        className="eapp-progress-current"
        style={styles}
      />
    </div>
  )
}

ProgressBar.propTypes = {
  total: PropTypes.number,
  completed: PropTypes.number,
}

ProgressBar.defaultProps = {
  total: 10,
  completed: 0,
}

const mapStateToProps = state => ({
  total: totalSections(state),
  completed: completedSections(state),
})

export { ProgressBar }

export default connect(mapStateToProps)(ProgressBar)
