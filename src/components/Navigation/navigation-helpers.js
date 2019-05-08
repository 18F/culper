export const parseFormUrl = (url) => {
  const crumbs = url
    .toLowerCase()
    .replace('/form/', '')
    .split('/')
  const subsectionRaw = crumbs.slice(1).join('/')

  return {
    crumbs,
    section: crumbs[0],
    subsectionRaw,
    subsection: subsectionRaw || 'intro',
  }
}

// Return `true` when at this exact section or one under it, `false` otherwise.
export const isActive = (route, pathname) => pathname.startsWith(route)

/* eslint no-param-reassign: 0 */
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
// https://stackoverflow.com/questions/41911309/how-to-listen-to-route-changes-in-react-router-v4/44410281#comment80823795_44410281
export const didRouteChange = (loc, prevLoc) => loc.pathname !== prevLoc.pathname
