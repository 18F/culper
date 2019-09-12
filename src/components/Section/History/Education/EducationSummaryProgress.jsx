import React from 'react'
import PropTypes from 'prop-types'

import SummaryCounter from 'components/Section/History/SummaryCounter'

const EducationSummaryProgress = (props) => {
  const { items, errors } = props

  const validSchoolItems = items.filter((i) => {
    if (!i.Item) return false
    if (!errors || !errors.length) return true
    if (errors.filter(e => e.indexOf(i.uuid) > -1).length > 0) return false
    return true
  })

  let validDiplomaItems = 0
  validSchoolItems.forEach((i) => {
    if (i.Item.Diplomas && i.Item.Diplomas.items) {
      i.Item.Diplomas.items.forEach((d) => {
        if (d.Item && d.Item.Date) validDiplomaItems += 1
      })
    }
  })

  return (
    <SummaryCounter
      className="education"
      schoolCount={validSchoolItems.length}
      diplomaCount={validDiplomaItems}
    />
  )
}

EducationSummaryProgress.propTypes = {
  items: PropTypes.array,
  errors: PropTypes.array,
}

EducationSummaryProgress.defaultProps = {
  items: [],
  errors: [],
}

export default EducationSummaryProgress
