import { i18n } from 'config'
import {
  nestedFormSectionsSelector,
  formSectionsSelector,
} from 'selectors/navigation'

import { navigationWalker } from 'config/navigation'

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
    const completedSection = Completed[s.name]

    if (completedSection && completedSection.every(i => (
      i.valid || !subsections.find(j => j.name === i.subsection)
    ))) {
      completedCount += 1
    }
  })

  return completedCount
}

// TODO - migrate/deprecate this after form validation logic is cleaned up
export const formHasErrors = (state) => {
  const { application } = state

  let errors = 0

  navigationWalker((path, child) => {
    if (path.length && path[0].store && child.store && child.validator) {
      if (child.excluded || child.hidden || (child.hiddenFunc && child.hiddenFunc(application))) {
        return
      }

      const data = (application[path[0].store] || {})[child.store] || {}
      let subsectionName = child.url
      if (path.length > 1) {
        for (let i = path.length - 1; i > 0; i -= 1) {
          subsectionName = `${path[i].url}/${subsectionName}`
        }
      }

      let valid = null
      try {
        // eslint-disable-next-line new-cap
        valid = new child.validator(data, data).isValid()
      } catch (e) {
        valid = null
      }

      if (valid !== true) {
        errors += 1
      }
    }
  })

  return errors > 0
}
