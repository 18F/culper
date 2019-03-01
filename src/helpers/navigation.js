/* eslint import/prefer-default-export: 0 */
import { i18n } from 'config'
import { formSectionsSelector } from 'selectors/navigation'

export const getBackAndNext = (state, { section, subsection }) => {
  let back
  let next

  const formSections = formSectionsSelector(state)

  const sectionConfig = formSections.find(s => s.key === section)
  const sectionIndex = formSections.findIndex(s => s.key === section)
  const subsectionIndex = sectionConfig.subsections.findIndex(s => s.name === subsection)

  if (subsectionIndex > 0) {
    back = sectionConfig.subsections[subsectionIndex - 1]
    back.navLabel = i18n.t(`${sectionConfig.name}.destination.${back.name}`)
  } else if (sectionIndex > 0) {
    // Go to the last subsection of the previous section
    const previousSection = formSections[sectionIndex - 1]
    back = previousSection.subsections[previousSection.subsections.length - 1]
    back.navLabel = i18n.t(`${previousSection.name}.destination.${back.name}`)
  }

  if (subsectionIndex < sectionConfig.subsections.length - 1) {
    next = sectionConfig.subsections[subsectionIndex + 1]
    next.navLabel = i18n.t(`${sectionConfig.name}.destination.${next.name}`)
  } else if (sectionIndex < formSections.length - 1) {
    // Go to the first subsection of the next section
    const nextSection = formSections[sectionIndex + 1]
    next = nextSection.subsections[0] /* eslint prefer-destructuring: 0 */
    next.navLabel = i18n.t(`${nextSection.name}.destination.${next.name}`)
  }

  return { back, next }
}
