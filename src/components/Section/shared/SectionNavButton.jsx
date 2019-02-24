import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

const SectionNavButton = ({ link, direction, label }) => {
  let directionText
  let ariaDirectionText
  let directionClass
  let iconClass

  if (direction === 'next') {
    directionText = 'Next'
    ariaDirectionText = 'next'
    directionClass = 'next'
    iconClass = 'fa-arrow-circle-right'
  }
  if (direction === 'back') {
    directionText = 'Back'
    ariaDirectionText = 'previous'
    directionClass = 'back'
    iconClass = 'fa-arrow-circle-left'
  }

  const ariaLabel = `Go to ${ariaDirectionText} section ${label}`

  const icon = (
    <div className="icon">
      <i className={`fa ${iconClass}`} aria-hidden="true" />
    </div>
  )

  return (
    <Link
      className={classnames(
        'btn-cell',
        { [directionClass]: directionClass && link },
      )}
      title={ariaLabel}
      aria-label={ariaLabel}
      to={link}
    >
      {link && (
        <div
          className={classnames(
            'actions',
            { [directionClass]: directionClass && link },
          )}
        >
          {direction === 'back' && icon}
          <div className="text">
            <div className="direction">{directionText}</div>
            <div className="label">{label}</div>
          </div>
          {direction === 'next' && icon}
        </div>
      )}
    </Link>
  )
}

SectionNavButton.propTypes = {
  direction: PropTypes.oneOf(['back', 'next']).isRequired,
  label: PropTypes.string,
  link: PropTypes.string,
}

SectionNavButton.defaultProps = {
  label: '',
  link: '',
}

export default SectionNavButton
