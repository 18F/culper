import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import i18n from 'util/i18n'

const PeopleCounter = ({ minimum, validCount }) => {
  const covered = validCount > minimum ? minimum : validCount

  const countClass = classnames(
    'count',
    { covered: validCount >= minimum }
  )

  return (
    <div className="people-counter">
      <div className={countClass}>
        {`${covered}/${minimum}`}
      </div>
      <div className="unit">{i18n.t('relationships.people.label.unit')}</div>
    </div>
  )
}

PeopleCounter.propTypes = {
  minimum: PropTypes.number,
  validCount: PropTypes.number,
}

PeopleCounter.defaultProps = {
  minimum: 3,
  validCount: 0,
}

export default PeopleCounter
