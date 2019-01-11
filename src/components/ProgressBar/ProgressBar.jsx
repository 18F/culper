import React from 'react'
import PropTypes from 'prop-types'
import AuthenticatedView from '../../views/AuthenticatedView'

class ProgressBar extends React.Component {
  render() {
    const {
      completedSectionsTotal,
      totalSections
    } = this.props
    const styles = {
      width: `${(totalSections / completedSectionsTotal) * 100}%`
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
}

ProgressBar.propTypes = {
  completedSectionsTotal: PropTypes.number.isRequired,
  totalSections: PropTypes.number.isRequired,
}

export default AuthenticatedView(ProgressBar)
