import { i18n } from 'config'
import {
  nestedFormSectionsSelector,
  formSectionsSelector,
} from 'selectors/navigation'

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

/**
 * Top-level sections only
 */
export const getSectionNumber = (state, { sectionKey }) => {
  const formSections = nestedFormSectionsSelector(state)

  const sectionIndex = formSections.findIndex(s => s.key === sectionKey)

  return sectionIndex + 1
}
