import React from 'react'
import PropTypes from 'prop-types'
import { i18n } from '@config'
import * as formTypeConfig from '@config/formTypes'

import SectionNavButton from './SectionNavButton'

const SectionNavigation = ({ section, subsection, formType }) => {
  const formSections = formTypeConfig[formType]
  const sectionConfig = formSections.find(s => s.key === section)
  const sectionIndex = formSections.findIndex(s => s.key === section)
  const subsectionIndex = sectionConfig.subsections.findIndex((s) => {
    if (s.path) {
      return s.path.subsection === subsection
    }
    return null
  })

  let back
  let next
  let backLabel
  let nextLabel

  if (subsectionIndex > 0) {
    if (sectionConfig.subsections[subsectionIndex - 1].path) {
      back = sectionConfig.subsections[subsectionIndex - 1]
    } else {
      back = sectionConfig.subsections[subsectionIndex - 2]
    }
    backLabel = i18n.t(`${sectionConfig.name}.destination.${back.name}`)
  } else if (sectionIndex > 0) {
    // Go to the last subsection of the previous section
    const previousSection = formSections[sectionIndex - 1]
    back = previousSection.subsections[previousSection.subsections.length - 1]
    backLabel = i18n.t(`${previousSection.name}.destination.${back.name}`)
  }

  if (subsectionIndex < sectionConfig.subsections.length - 1) {
    if (sectionConfig.subsections[subsectionIndex + 1].path) {
      next = sectionConfig.subsections[subsectionIndex + 1]
    } else {
      next = sectionConfig.subsections[subsectionIndex + 2]
    }
    nextLabel = i18n.t(`${sectionConfig.name}.destination.${next.name}`)
  } else if (sectionIndex < formSections.length - 1) {
    // Go to the first subsection of the next section
    const nextSection = formSections[sectionIndex + 1]
    next = nextSection.subsections[0]
    nextLabel = i18n.t(`${nextSection.name}.destination.${next.name}`)
  }

  if (!back && !next) {
    return null
  }

  const getLink = (subsectionConfig) => {
    if (subsectionConfig) {
      return `/form/${subsectionConfig.path.section}/${subsectionConfig.path.subsection || ''}`
    }
    return ''
  }

  return (
    <div className="bottom-btns">
      <div className="btn-wrap">
        <div className="btn-container">
          <SectionNavButton
            direction="back"
            label={backLabel}
            link={getLink(back)}
          />
          <div className="btn-spacer" />
          <SectionNavButton
            direction="next"
            label={nextLabel}
            link={getLink(next)}
          />
        </div>
      </div>
    </div>
  )
}

SectionNavigation.propTypes = {
  section: PropTypes.string.isRequired,
  subsection: PropTypes.string.isRequired,
  formType: PropTypes.string.isRequired,
}

export default SectionNavigation
