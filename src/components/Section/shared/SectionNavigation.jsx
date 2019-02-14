import React from 'react'

import { i18n } from '@config'
import { env } from '@config'
import * as sections from '@constants/sections'
import * as formTypeConfig from '@config/formTypes'

import SectionNavButton from './SectionNavButton'

const SectionNavigation = ({ section, subsection, formType }) => {
  const formSections = formTypeConfig[formType]

  const sectionConfig = formSections.find(s => s.key === section)
  const sectionIndex = formSections.findIndex(s => s.key === section)
  const subsectionIndex = sectionConfig.subsections.findIndex(s => s.name === subsection)

  let back
  let next

  if (subsectionIndex > 0) {
    back = sectionConfig.subsections[subsectionIndex - 1]
  } else if (sectionIndex > 0) {
    // Go to the last subsection of the previous section
    const previousSection = formSections[sectionIndex - 1]
    back = previousSection.subsections[previousSection.subsections.length - 1]
  }

  if (subsectionIndex < sectionConfig.subsections.length - 1) {
    next = sectionConfig.subsections[subsectionIndex + 1]
  } else if (sectionIndex < formSections.length - 1) {
    // Go to the first subsection of the next section
    const nextSection = formSections[sectionIndex + 1]
    next = nextSection.subsections[0]
  }

  if (!back && !next) {
    return null
  }

  const backLabel = back && i18n.t(`${sectionConfig.name}.destination.${back.name}`)
  const nextLabel = next && i18n.t(`${sectionConfig.name}.destination.${next.name}`)

  const backButton = back ? (
    <SectionNavButton
      direction="back"
      label={backLabel}
      onClick={() => { goToSection(`/form${back.path}`)}} />
  ) : <SectionNavButton direction="back" isEmpty={true} />

  const nextButton = next ? (
    <SectionNavButton
      direction="next"
      label={nextLabel}
      onClick={() => { goToSection(`/form${next.path}`)}} />
  ) : <SectionNavButton direction="next" isEmpty={true} />

  const goToSection = (path) => {
    env.History().push(path)
  }

  return (
    <div className="bottom-btns">
      <div className="btn-wrap">
        <div className="btn-container">
          {backButton}
          <div className="btn-spacer" />
          {nextButton}
        </div>
      </div>
    </div>
  )
}

export default SectionNavigation
