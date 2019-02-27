import React from 'react'

import { i18n, env } from 'config'
import * as formTypeConfig from 'config/formTypes'

import * as sections from 'constants/sections'

import SectionNavButton from './SectionNavButton'

const SectionNavigation = ({ section, subsection, formType }) => {
  const formSections = formTypeConfig[formType]

  const sectionConfig = formSections.find(s => s.key === section)
  const sectionIndex = formSections.findIndex(s => s.key === section)
  const subsectionIndex = sectionConfig.subsections.findIndex(s => s.name === subsection)

  let back
  let next
  let backLabel
  let nextLabel

  if (subsectionIndex > 0) {
    back = sectionConfig.subsections[subsectionIndex - 1]
    backLabel = i18n.t(`${sectionConfig.name}.destination.${back.name}`)
  } else if (sectionIndex > 0) {
    // Go to the last subsection of the previous section
    const previousSection = formSections[sectionIndex - 1]
    back = previousSection.subsections[previousSection.subsections.length - 1]
    backLabel = i18n.t(`${previousSection.name}.destination.${back.name}`)
  }

  if (subsectionIndex < sectionConfig.subsections.length - 1) {
    next = sectionConfig.subsections[subsectionIndex + 1]
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
            label={backLabel}
            onClick={backOnClick}
            isEmpty={!back} />
          <div className="btn-spacer" />
          <SectionNavButton
            direction="next"
            label={nextLabel}
            onClick={nextOnClick}
            isEmpty={!next} />
        </div>
      </div>
    </div>
  )
}

export default SectionNavigation
