import { navigation } from '../../config/navigation'

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

export const parseFormUrl = (url) => {
  const crumbs = url.toLowerCase().replace('/form/', '').split('/')
  const subsectionRaw = crumbs.slice(1).join('/')

  return {
    crumbs,
    section: crumbs[0],
    subsectionRaw,
    subsection: subsectionRaw || 'intro'
  }
}

const errorMatches = (err, routeParts) => {
  const routeSection = routeParts.section
  return (
    err.section.toLowerCase() === routeSection &&
    (
      // either we're not within a subsection...
      !routeParts.subsectionRaw ||
      // ...or the subsection matches
      err.subsection.toLowerCase().startsWith(routeParts.subsectionRaw)
    )
  )
}

/**
 * Determine if the route has any errors
 *
 * example:
 *  route => /form/identification/name
 */
export const hasErrors = (route, errors = {}) => {
  const routeParts = parseFormUrl(route)
  if (!routeParts.section) {
    return false
  }
  const sectionErrors = errors[routeParts.section] || []

  return sectionErrors.some(e =>
    errorMatches(e, routeParts) &&
    e.valid === false
  )
}

// Find the navigation object that corresponds to this route
const findNode = (crumbs) => {
  let node = null
  for (const crumb of crumbs) {
    if (!node) {
      node = navigation.find(x => x.url.toLowerCase() === crumb)
    } else if (node.subsections) {
      node = node.subsections.find(x => x.url.toLowerCase() === crumb)
    }
  }
  return node
}

const getCompletedSections = (sections, routeParts) => {
  const routeSection = routeParts.section
  const routeSubSection = routeParts.subsection
  const routeSubSectionRaw = routeParts.subsectionRaw

  let completedSections = sections.filter(e => e.section.toLowerCase() === routeSection)
  if (routeSubSection) {
    completedSections = completedSections.filter(e => e.subsection.toLowerCase().indexOf(routeSubSectionRaw) === 0)
  }

  return completedSections.filter(e => e.valid)
}

/**
 * Determine if the route is considered complete and valid
 */
export const isValid = (route, props = {}) => {
  const routeParts = parseFormUrl(route)
  const crumbs = routeParts.crumbs
  const routeSection = routeParts.section
  const node = findNode(crumbs)

  for (const section in props.completed) {
    if (section.toLowerCase() !== routeSection) {
      continue
    }

    const sections = props.completed[section]
    const completedSections = getCompletedSections(sections, routeParts)

    return completedSections.length >= validations(node, props)
  }

  return false
}

// Return `true` when at this exact section or one under it, `false` otherwise.
export const isActive = (route, pathname) => {
  return pathname.startsWith(route)
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

export const findPosition = (el) => {
  let currentTop = 0

  if (el && el.offsetParent) {
    do {
      currentTop += el.offsetTop
      el = el.offsetParent
    } while (el)
  }

  return [currentTop]
}

// Compares location objects from React Router
export const didRouteChange = (loc, prevLoc) => {
  // https://stackoverflow.com/questions/41911309/how-to-listen-to-route-changes-in-react-router-v4/44410281#comment80823795_44410281
  return loc.pathname !== prevLoc.pathname
}
