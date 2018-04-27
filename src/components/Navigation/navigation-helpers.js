import { navigation } from '../../config'

export const validations = (section, props = {}) => {
  if (!section || !section.subsections) {
    return 1
  }

  return section.subsections
    .filter(subsection => {
      if (subsection.hidden || (subsection.hiddenFunc && subsection.hiddenFunc(props.application))) {
        return false
      }

      if (subsection.exclude) {
        return false
      }

      return true
    })
    .reduce((count, subsection) => {
      return count + validations(subsection, props)
    }, 0)
}

/**
 * Determine if the route has any errors
 *
 * example:
 *  route => /form/identification/name
 */
export const hasErrors = (route, props = {}) => {
  const crumbs = route.replace('/form/', '').split('/')

  for (const section in props.errors) {
    if (section.toLowerCase() !== crumbs[0].toLowerCase()) {
      continue
    }

    const se = props.errors[section]
    if (crumbs.length === 1) {
      return se.some(
        e =>
          e.section.toLowerCase() === crumbs[0].toLowerCase() &&
          e.valid === false)
    } else if (crumbs.length > 1) {
      return se.some(
        e =>
          e.section.toLowerCase() === crumbs[0].toLowerCase() &&
          e.subsection.toLowerCase().indexOf(crumbs.slice(1, crumbs.length).join('/').toLowerCase()) === 0 &&
          e.valid === false)
    }
  }

  return false
}

/**
 * Determine if the route is considered complete and valid
 */
export const isValid = (route, props = {}) => {
  const crumbs = route.replace('/form/', '').split('/')

  // Find which node we should be checking against
  let node = null
  for (const crumb of crumbs) {
    if (!node) {
      node = navigation.find(x => x.url.toLowerCase() === crumb.toLowerCase())
    } else if (node.subsections) {
      node = node.subsections.find(x => x.url.toLowerCase() === crumb.toLowerCase())
    }
  }

  for (const section in props.completed) {
    if (section.toLowerCase() !== crumbs[0].toLowerCase()) {
      continue
    }

    let completedSections = props.completed[section].filter(e => e.section.toLowerCase() === crumbs[0].toLowerCase())
    if (crumbs.length > 1) {
      completedSections = completedSections.filter(e => e.subsection.toLowerCase().indexOf(crumbs.slice(1, crumbs.length).join('/').toLowerCase()) === 0)
    }

    return completedSections.filter(e => e.valid === true).length >= validations(node, props)
  }

  return false
}

/**
 * There is a bug in the react router which does not add the active
 * class to items in the route hiearchy
 */
export const isActive = (route, pathname) => {
  return pathname.indexOf(route) !== -1
}

export const sectionsTotal = () => {
  return navigation.filter(x => !x.hidden).filter(x => !x.exclude).length
}

export const sectionsCompleted = (store, props) => {
  let sections = 0

  for (const section in store) {
    const valid = store[section]
      .filter(e => e.section.toLowerCase() === section.toLowerCase() && e.valid === true)
      .length
    if (valid >= validations(navigation.find(n => n.url === section), props)) {
      sections++
    }
  }

  return sections
}
