import { i18n } from 'config'
import {
  nestedFormSectionsSelector,
  formSectionsSelector,
} from 'selectors/navigation'

import { formStatusSelector } from 'selectors/validation'

export const getBackAndNext = (state, { currentPath }) => {
  const formSections = formSectionsSelector(state, true)

  const subsectionIndex = formSections.findIndex(s => s.fullPath === currentPath)

  const back = formSections[subsectionIndex - 1]
  const next = formSections[subsectionIndex + 1]

  if (back) {
    // TODO: Fix this hack; should work for now
    // It works because the section is always after /form/
    let sectionName = back.fullPath.split('/')[2]
    if (sectionName === 'package') { sectionName = 'application' }
    back.navLabel = i18n.t(`${sectionName}.destination.${back.name}`)
  }

  if (next) {
    // TODO: Fix this hack; should work for now
    // It works because the section is always after /form/
    let sectionName = next.fullPath.split('/')[2]
    if (sectionName === 'package') { sectionName = 'application' }
    next.navLabel = i18n.t(`${sectionName}.destination.${next.name}`)
  }

  return { back, next }
}

export const reduceSubsections = sections => (
  sections.reduce((acc, section) => {
    if (section.subsections) {
      return acc.concat(reduceSubsections(section.subsections))
    }

    acc.push(section)
    return acc
  }, [])
)

/**
 * Top-level sections only
 */
export const getSectionNumber = (state, { sectionKey }) => {
  const formSections = nestedFormSectionsSelector(state)

  const sectionIndex = formSections.findIndex(s => s.key === sectionKey)

  return sectionIndex + 1
}

export const totalSections = (state) => {
  const formSections = nestedFormSectionsSelector(state)
  return formSections.length
}

export const completedSections = (state) => {
  const { application } = state
  const { Completed } = application

  const formSections = nestedFormSectionsSelector(state)

  let completedCount = 0

  formSections.forEach((s) => {
    const { subsections } = s
    const completedSection = Completed[s.name] || []

    const flatSections = reduceSubsections(subsections)

    const completedSubsections = completedSection.filter(ss => (
      flatSections.find(i => i.name === ss.subsection)
    ))

    if (completedSubsections.length && completedSubsections.every(i => (
      i.valid
    ))) {
      completedCount += 1
    }
  })

  return completedCount
}

export const formHasErrors = (state) => {
  const formStatus = formStatusSelector(state)
  const { formIsValid } = formStatus
  return !formIsValid
}
