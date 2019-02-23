import React from 'react'
import PropTypes from 'prop-types'

const SectionNavButton = (props) => {
  const {
    isEmpty,
    direction,
    label,
    onClick,
  } = props

  if (isEmpty) {
    return <div className="btn-cell" />
  }

  let directionText
  let ariaDirectionText
  let directionClass
  let iconClass

  switch (direction) {
    case 'next':
      directionText = 'Next'
      ariaDirectionText = 'next'
      directionClass = 'next'
      iconClass = 'fa-arrow-circle-right'
      break

    case 'back':
      directionText = 'Back'
      ariaDirectionText = 'previous'
      directionClass = 'back'
      iconClass = 'fa-arrow-circle-left'
      break
    default:
      break
  }

  const ariaLabel = `Go to ${ariaDirectionText} section ${label}`

  const icon = (
    <div className="icon">
      <i className={`fa ${iconClass}`} aria-hidden="true" />
    </div>
  )

  const text = (
    <div className="text">
      <div className="direction">{directionText}</div>
      <div className="label">{label}</div>
    </div>
  )

  return (
    // TODO: Use Link
    // https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/Link.md
    <button
      className={`btn-cell ${directionClass}`}
      title={ariaLabel}
      aria-label={ariaLabel}
      onClick={onClick}
      type="button"
    >
      <div className={`actions ${directionClass}`}>
        {direction === 'back' && icon}
        {text}
        {direction === 'next' && icon}
      </div>
    </button>
  )
}

SectionNavButton.propTypes = {
  direction: PropTypes.oneOf(['back', 'next']).isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func,
  isEmpty: PropTypes.bool,
}

SectionNavButton.defaultProps = {
  label: '',
  onClick: () => {},
  isEmpty: false,
}

export default SectionNavButton
