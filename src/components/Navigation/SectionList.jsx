import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import SectionLink from './SectionLink'
import ToggleItem from './ToggleItem'

const SectionList = ({
  sections, className, basePath, topSection,
}) => {
  const classes = classnames(
    'usa-accordion',
    className,
  )

  return (
    <ol className={classes}>
      {sections.map((s) => {
        if (s.subsections) {
          return (
            <ToggleItem
              key={s.key}
              section={s}
              basePath={basePath}
              topSection={topSection}
            />
          )
        }

        return (
          <SectionLink
            key={s.key}
            section={s}
            basePath={basePath}
            topSection={topSection}
          />
        )
      })}
    </ol>
  )
}

SectionList.propTypes = {
  className: PropTypes.string,
  sections: PropTypes.array.isRequired,
  basePath: PropTypes.string,
  topSection: PropTypes.string,
}

SectionList.defaultProps = {
  basePath: '',
  topSection: undefined,
  className: 'usa-sidenav-list',
}

export default (SectionList)
